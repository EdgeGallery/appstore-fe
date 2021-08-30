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
        <p class="titleName">
          {{ $t("nav.msgCenter") }}
        </p>
        <p class="lines" />
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
import { getNoticeMessage, updateStatus, acceptMsg, deleteMsg } from '../../tools/api.js'
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
        value: 1,
        label: '今天',
        labelen: 'Today'
      }, {
        value: 2,
        label: '一周内',
        labelen: 'This Week'
      }, {
        value: 3,
        label: '一月内',
        labelen: 'This Month'
      }, {
        value: 4,
        label: '更早',
        labelen: 'Old'
      }],
      value: 1,
      activeValue: 1,
      currentDetailMsg: {},
      isShowDlg: false,
      allData: [],
      allRightDetailData: [],
      language: localStorage.getItem('language'),
      pageSize: 5,
      curPageSize: 5,
      pageNum: 1,
      prop: '',
      order: '',
      total: 0,
      msgType: 'read',
      offsetPage: 0,
      appName: '',
      messageType: '',
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
    clickMsgType (data) {
      if (data === 'unReadedMsg') {
        this.msgType = 'read'
      } else if (data === 'readedMsg') {
        this.msgType = 'noread'
      } else {
        this.msgType = ''
      }
    },
    getDetailMsg (value) {
      this.currentDetailMsg = value
    },
    isShowDetailDlg (value) {
      this.isShowDlg = value
    },
    deletedMsgId (msgId) {
      this.$refs.rightTabPanel.parentMsg(this.rightDetailData, msgId)
    },
    doClick (value) {
      this.offsetPage = 0
      this.pageNum = 1
      this.activeValue = value
      this.setCurrentTimeData()
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
    },
    setCurrentTimeData () {
      let tempRightDetailData = this.rightDetailData
      tempRightDetailData[0].content = []
      tempRightDetailData[1].content = []
      tempRightDetailData[2].content = []
      this.allRightDetailData.forEach(item => {
        if (item.timeResult === this.activeValue) {
          if (item.readed) {
            tempRightDetailData[1].content.push(item)
          } else {
            tempRightDetailData[0].content.push(item)
          }
          tempRightDetailData[2].content.push(item)
        }
      })
      this.rightDetailData = tempRightDetailData
      this.$refs.rightTabPanel.parentMsg(this.rightDetailData)
    },
    updateMsgStatus (messageId) {
      updateStatus(messageId).then((res) => {
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
    timeCompute (time) {
      var today = new Date()
      var todayTime = (today.getTime() + 28800000) % (1000 * 60 * 60 * 24)
      var timeValue = today.getTime() - todayTime - new Date(time).getTime()
      if (timeValue <= 0) {
        return 1
      } else if (timeValue / (1000 * 60 * 60 * 24) > 0 && timeValue / (1000 * 60 * 60 * 24) <= 7) {
        return 2
      } else if (timeValue / (1000 * 60 * 60 * 24) > 7 && timeValue / (1000 * 60 * 60 * 24) <= 30) {
        return 3
      } else {
        return 4
      }
    },
    getAppData (param) {
      getNoticeMessage(this.messageType, this.curPageSize, this.offsetPage, this.appName, this.prop, this.order).then((res) => {
        if (param) {
          this.isShowDlg = true
          this.currentDetailMsg = param
          this.currentDetailMsg.readed = true
          this.updateMsgStatus(param.messageId)
        }
        let data = res.data.results
        this.total = res.data.total
        data.forEach(item => {
          item.timeResult = this.timeCompute(item.time)
          if (param && item.messageId === param.messageId) {
            item.readed = true
          }
          this.allRightDetailData.push(item)
        })
        // The default is to select today's data
        this.allRightDetailData.forEach(item => {
          if (item.timeResult === 1) {
            if (item.readed) {
              this.rightDetailData[1].content.push(item)
            } else {
              this.rightDetailData[0].content.push(item)
            }
            this.rightDetailData[2].content.push(item)
          }
        })
        this.$refs.rightTabPanel.parentMsg(this.rightDetailData)
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
    },
    showDialog (isShowDlg) {
      if (isShowDlg === true) {
        document.body.style = 'background: #4A4D54;opacity: 0.7;'
      }
    },
    curPageSize: function () {
      this.getAppData()
    }
  }
}
</script>

<style lang="less" scoped>
.box {
    width: 100%;
    min-width: 1200px;
    .title{
      min-width: 1200px;
      margin-left:19.4% ;
      margin-top: 44px;
      .titleName{
        font-size: 30px;
        font-family: HarmonyOS Sans SC;
        font-weight: bold;
        color: #5D3DA0;
        margin: 0;
      }
      .lines{
        margin-top: 22px;
        width: 88px;
        height: 7px;
        background: #9E7BCD;
        opacity: 0.2;
        border-radius: 4px;
        margin-bottom: 0;
      }
    }
    .message{
      width: 73.64%;
      margin: auto;
      min-width: 1200px;
      min-height: 380px;
      margin-top: 40px;
      position: relative;
    .timeSelect{
      background: #FFFFFF;
      width: 160px;
      height: 40px;
      position: absolute;
      right: 0;
    }
    .messageContent{
      padding-top: 10px;
      width: 100%;
    }
    }
    .dialogs{
      position:absolute;
      left: 0;
      top: -60px;
      width: 100%;
      height: 150%;
      background: #4A4D54;
      display: flex;
    }
.rightMsg {
  margin: auto;
  border-radius: 12px;
  width: 47.5%;
  min-width: 911px;
  border-radius:10px ;
  margin-top: 200px;
  height: 560px;
  background: #fff;
  opacity: 1;
  overflow-y: auto;
  display: inline-block;
  z-index: 100;
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
