<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->
<template>
  <div
    class="box"
    ref="box"
  >
    <div>
      <div class="title">
        <p class="title_left">
          {{ $t("nav.msgCenter") }}
        </p>
        <span class="line_bot1 title_line" />
      </div>
      <div class="message">
        <div class="timeSelect">
          <el-select
            v-model="value"
            @change="doClick(value)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="language === 'cn'?item.label:item.labelen"
              :value="item.value"
            />
          </el-select>
        </div>
        <div
          class="messageContent"
        >
          <RightContent
            @clickMsgItemEvent="getDetailMsg"
            @isShowDetailMsgDlg="isShowDetailDlg"
            :data="rightDetailData"
            @func="clickMsgType"
            :msgcontents="msgcontents"
            @deleteMsg="getDeleteMsg"
            @accept="updateMessage"
            ref="rightTabPanel"
          />
          <div class="messagePage">
            <eg-pagination
              class="paginationStyle"
              :page-num="pageNum"
              :page-size="pageSize"
              :total="total"
              @sizeChange="sizeChange"
              @currentChange="currentChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="dialogs"
      v-if="isShowDlg"
    >
      <div class="dialogShadow" />
      <div class="rightMsg">
        <DetailMsgDlg
          :data="currentDetailMsg"
          @isShowDetailMsgDlg="isShowDetailDlg"
          @deletedMsgId="deletedMsgId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RightContent from './Right_template'
import DetailMsgDlg from './DetailMsgDlg'
import EgPagination from 'eg-view/src/components/EgPagination.vue'
import { getMessages, updateStatus, acceptMsg, deleteMsg } from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
  components: {
    RightContent,
    DetailMsgDlg,
    EgPagination
  },
  data () {
    return {
      options: [{
        value: 'TODAY',
        label: '今天',
        labelen: 'Today'
      }, {
        value: 'WEEK',
        label: '一周内',
        labelen: 'Within a week'
      }, {
        value: 'MONTH',
        label: '一月内',
        labelen: 'Within a month'
      }, {
        value: 'EARLIER',
        label: '更早',
        labelen: 'Earlier'
      }],
      value: 'TODAY',
      timeFlag: 'TODAY',
      currentDetailMsg: {},
      isShowDlg: false,
      allData: [],
      allRightDetailData: [],
      language: localStorage.getItem('language'),
      pageSize: 10,
      curPageSize: 10,
      pageNum: 1,
      prop: 'time',
      order: 'desc',
      total: 0,
      offsetPage: 0,
      msgcontents: '',
      messageType: 'NOTICE',
      readable: false,
      allMessage: false,
      updateMsg: '',
      rightDetailData: [
        {
          name: 'unReadedMsg',
          title: 'unReadedMsg',
          content: [],
          active: require('@/assets/images/noread_active.png'),
          unactive: require('@/assets/images/noread_unactive.png')
        },
        {
          name: 'readedMsg',
          title: 'readedMsg',
          content: [],
          active: require('@/assets/images/read_active.png'),
          unactive: require('@/assets/images/read_unactive.png')
        },
        {
          name: 'allMsg',
          title: 'allMsg',
          content: [],
          active: require('@/assets/images/all_active.png'),
          unactive: require('@/assets/images/all_unactive.png')
        }
      ]
    }
  },
  methods: {
    getDeleteMsg (data) {
      this.msgcontents = data
      this.getAppData()
    },
    updateMessage (data) {
      this.updateMsg = data
      if (this.updateMsg === 'accept') {
        this.getAppData()
      }
    },
    clickMsgType (data) {
      if (data === 'unReadedMsg') {
        this.readable = false
        this.allMessage = false
        this.getAppData()
      } else if (data === 'readedMsg') {
        this.readable = true
        this.allMessage = false
        this.getAppData()
      } else {
        this.readable = ''
        this.allMessage = true
        this.getAppData()
      }
    },
    getDetailMsg (value) {
      this.currentDetailMsg = value
    },
    isShowDetailDlg (value) {
      this.isShowDlg = value
    },
    deletedMsgId (msgId) {
      this.$refs.rightTabPanel.parentMsg(this.msgcontents, msgId)
    },
    doClick (value) {
      this.offsetPage = 0
      this.pageNum = 1
      this.timeFlag = value
      this.getAppData()
      this.isShowDlg = true
      this.$nextTick(() => {
        this.isShowDlg = false
      })
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      this.getAppData()
    },
    sizeChange (val) {
      this.curPageSize = val
      this.getAppData()
    },
    updateMsgStatus (messageId) {
      updateStatus(messageId).then((res) => {
        // This is intentional
      }).catch((error) => {
        let defaultMsg = this.$t('messageCenter.updateMsgFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    locateMessage (message) {
      if (this.allRightDetailData.indexOf(message.messageId) !== -1) {
        this.isShowDlg = true
        this.currentDetailMsg = message
      }
      this.currentDetailMsg.readed = true
      this.updateMsgStatus(message.messageId)
    },
    handleAccept (index) {
      acceptMsg(this.msgs[index].messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.acceptSuccess'))
      }).catch((error) => {
        let defaultMsg = this.$t('apppromotion.acceptFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    handleDelete (index) {
      setTimeout(() => {
        deleteMsg(this.msgs[index].messageId).then((res) => {
          this.$message.success(this.$t('apppromotion.deleteMsgSuccess'))
          this.$router.go(0)
        }).catch((error) => {
          let defaultMsg = this.$t('apppromotion.deleteMsgFailed')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        })
      }, 500)
    },
    getAppData (param) {
      let params = {
        offset: this.offsetPage,
        limit: this.curPageSize,
        sortItem: this.prop,
        sortType: this.order,
        messageType: this.messageType,
        timeFlag: this.timeFlag,
        readable: this.readable,
        allMessage: this.allMessage

      }
      getMessages(params).then((res) => {
        if (param) {
          this.isShowDlg = true
          this.currentDetailMsg = param
          this.currentDetailMsg.readed = true
          this.updateMsgStatus(param.messageId)
        }
        this.msgcontents = res.data.results
        this.total = res.data.total
        this.$refs.rightTabPanel.parentMsg(this.msgcontents)
      }).catch((error) => {
        let defaultMsg = this.$t('apppromotion.getNoticeFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    }

  },
  mounted () {
    let param = this.$route.query.item
    this.getAppData(param)
  },
  watch: {
    '$route': function (to, from) {
      this.locateMessage(to.query.item)
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>

<style lang="less" scoped>
.box {
    width: 100%;
    min-width: 1200px;
    min-height:660px;
    background-color: #f0f2f5;
    .title{
      min-width: 1200px;
      margin: 60px 0 60px 13.18%;
      .title_line{
        margin-left: 140px;
      }
    }
    .message{
      width: 73.64%;
      margin: auto;
      min-width: 1200px;
      min-height: 380px;
      margin-top: 10px;
      position: relative;
    .timeSelect{
      background: #FFFFFF;
      width: 160px;
      height: 40px;
      position: absolute;
      right: 0;
    }
    .messageContent{
      width: 100%;
    }
    }
    .dialogs{
      position:absolute;
      left: 0;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: 10001;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dialogShadow{
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        top: 0;
        background: #4A4D54;
        opacity: 0.8;
      }
      .rightMsg{
        z-index: 10;

      }
}
.messagePage{
  height: 70px;
  width: 100%;
  background-color: #fff;
  .paginationStyle{
    float: right;
    margin: 20px 20px 0 0;
  }
}
div /deep/ .el-table::before {
    height: 0px !important;
}
div /deep/  .el-table::before, .el-table--group::after, .el-table--border::after {
    background-color:none !important;
    z-index: 0 none !important;
}
</style>
