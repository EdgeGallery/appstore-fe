<!--
  -  Copyright 2020-2021 Huawei Technologies console., Ltd.
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
  <div class="myApp">
    <ul class="list_top clear">
      <li
        @click="click1()"
        :class="{'container_active':activeName==='unReadedMsg','container_default':activeName==='readedMsg','container_default2':activeName==='allMsg',}"
      >
        <span>
          {{ $t('messageCenter.unReadedMsg') }}
        </span>
      </li>
      <li
        @click="click2()"
        :class="{'vm_active':activeName==='readedMsg','vm_default':activeName==='unReadedMsg','vm_default2':activeName==='allMsg'}"
      >
        <span>
          <link-right
            v-if="activeName==='allMsg'"
            padding-right="5px"
            margin="5px"
            class="link-right"
          />
          {{ $t('messageCenter.readedMsg') }}
        </span>
      </li>
      <li
        @click="click3()"
        :class="{'push_active':activeName==='allMsg','push_default':activeName!=='allMsg','push_default2':activeName==='readedMsg'}"
      >
        <span>
          <link-right
            v-if="activeName==='unReadedMsg'"
            padding-right="5px"
            margin="5px"
            class="link-right"
          />
          {{ $t('messageCenter.allMsg') }}
        </span>
      </li>
      <li
        class="last_li"
        :class="{'push_active':activeName==='allMsg','last_default':activeName!=='allMsg','last_default2':activeName==='allMsg'}"
      >
        <span />
      </li>
    </ul>
    <div
      class="container_div"
      :class="{'container_div_active':activeName!=='unReadedMsg'}"
    >
      <div class="tables" />
      <div class="table-content">
        <template>
          <div>
            <el-table
              :data="msgcontents"
              :row-style="{height: '120px'}"
              :show-header="false"
              class="allContent common_background"
            >
              <el-table-column class="width:90%">
                <template slot-scope="scope">
                  <div
                    @dblclick="getDetailMsg(scope.row)"
                    class="imgContent"
                  >
                    <img
                      :src="scope.row.iconDownloadUrl"
                      alt=""
                      class="appIcon"
                    >
                    <div>
                      <div class="appName defaultFontLight">
                        <span :class="!scope.row.readed?'fontStyle':''"> {{ scope.row.basicInfo.name }} </span>
                      </div>
                      <div class="appDesc defaultFontLight">
                        <span :class="!scope.row.readed?'fontStyle':''"> {{ scope.row.description }} </span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div
                    @dblclick="getDetailMsg(scope.row)"
                    class="timeContent"
                  >
                    <div>
                      <div class="timeLine defaultFontLight">
                        <span> {{ scope.row.time }} </span>
                      </div>
                      <div class="opeLine">
                        <p
                          @click.stop="handleAccept(scope.row.messageId)"
                          class="acceptMsg defaultFontLight"
                        >
                          {{ $t('messageCenter.acceptMsg') }}
                        </p>
                        <p
                          @click.stop="handleDelete(scope.$index, scope.row.messageId)"
                          class="deleteMsg defaultFontLight"
                        >
                          {{ $t('messageCenter.deleteMsg') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { acceptMsg, deleteMsg, updateStatus } from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
  components: {
  },
  props: {
    data: {
      required: true,
      type: Array
    },
    msgcontents: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      activeName: 'unReadedMsg',
      activeTabIndex: '0',
      deletedMsgIds: [],
      allTabsMsg: [],
      language: localStorage.getItem('language')
    }
  },
  methods: {
    getTabsTitle (key) {
      let localKey = 'messageCenter.' + key
      return this.$t(localKey)
    },
    getDetailMsg (rowInfo) {
      this.$emit('clickMsgItemEvent', rowInfo)
      this.$emit('isShowDetailMsgDlg', true)
      if (!rowInfo.readed) {
        rowInfo.readed = true
        this.updateMsgStatus(rowInfo.messageId)
      }
    },
    updateMsgStatus (messageId) {
      updateStatus(messageId).then((res) => {
        // This is intentional
      }).catch((error) => {
        let defaultMsg = this.$t('messageCenter.updateMsgFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    handleAccept (messageId) {
      this.updateMsgStatus(messageId)
      acceptMsg(messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.acceptSuccess'))
      }).catch((error) => {
        let defaultMsg = this.$t('apppromotion.acceptFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
      this.$emit('accept', 'accept')
    },
    handleDelete (index, messageId) {
      deleteMsg(messageId).then((res) => {
        this.deletedMsgIds.push(messageId)
        this.msgcontents.splice(index, 1)
        this.$emit('deleteMsg', this.msgcontents)
        this.$message.success(this.$t('apppromotion.deleteMsgSuccess'))
      }).catch((error) => {
        let defaultMsg = this.$t('apppromotion.deleteMsgFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    click1 () {
      this.activeName = 'unReadedMsg'
      this.$emit('func', this.activeName)
    },
    click2 () {
      this.activeName = 'readedMsg'
      this.$emit('func', this.activeName)
    },
    click3 () {
      this.activeName = 'allMsg'
      this.$emit('func', this.activeName)
    },
    filterDeleteData (msgcontents) {
      let tempData = []
      for (let item of msgcontents) {
        if (this.deletedMsgIds.indexOf(item.messageId) === -1) {
          tempData.push(item)
        }
      }
      return tempData
    },
    parentMsg (curentPeriodData, msgId) {
      if (msgId) {
        this.deletedMsgIds.push(msgId)
      }
      this.allTabsMsg = curentPeriodData
      for (let item of this.allTabsMsg) {
        if (item.name === this.activeName) {
          this.msgcontents = this.filterDeleteData(item.content)
        }
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.allTabsMsg = this.data
    this.msgcontents = this.filterDeleteData
  }
}
</script>
<style lang='less' scoped>
.myApp {
  border: none;
  .list_top{
    li{
      float: left;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      background: #D4D1EC;
      span{
        display: block;
        width: 100%;
        height: 100%;
        font-size: 16px;
        padding: 0 50px;
        font-size: 20px;
        color: #fff;
        transition: all 0.5s;
        font-family: defaultFontLight,
        Arial,
        Helvetica,
        sans-serif !important;
      }
    }
    .last_li{
      cursor: default;
    }
    em{
      display: inline-block;
      width: 19px;
      height: 20px;
      position: relative;
      top: 4px;
      margin-right: 10px;
    }
    .image_container{
      background: url('../../assets/images/noread_unactive.png');
    }
    .image_vm{
      background: url('../../assets/images/read_unactive.png');
    }
    span{
      text-align: center;
    }
    .container_active{
      background: #4E3494;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #2E147C;
        border-radius: 16px 16px 0 0;
        color: #fff;
        transition: all 0.5s;
      }
    }
    .container_default{
      background: #2E147C;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #4E3494;
        border-radius: 16px 0 16px 0;
        transition: all 0.5s;
      }
    }
    .container_default2{
      background: #2E147C;
      border-radius: 16px 0 0 0;
      span{
        border-radius: 16px 0 0 0;
        background: #4E3494;
      }
    }
    .container_push_default{
      background: #fff;
      border-radius: 0 0 0 0;
      transition: all 0.5s;
      span{
        background: #2E147C;
        border-radius: 0 0 0 0;
        transition: all 0.5s;
      }

    }
    .vm_active{
      background: #4E3494;
      transition: all 0.5s;
      span{
        background: #2E147C;
        border-radius: 16px 16px 0 0;
        color: #fff;
        transition: all 0.5s;
      }
    }
    .vm_default{
      background: #2E147C;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #4E3494;
        border-radius: 0 0 0 16px;
        transition: all 0.5s;
      }
    }
    .vm_default2{
      background: #2E147C;
      span{
        background: #4E3494;
        border-radius: 0 0 16px 0;
      }
    }
    .last_li.last_active{
      background: #fff;
      span{
        background: #f5f6f8;
        border-radius: 0 0 0 0;
      }
    }
    .last_li.last_default{
      background: #4E3494;
      span{
        background: #3e279b;
        border-radius: 0 0 0 16px;
        transition: all 0.5s;
      }
    }
    .last_li.last_default2{
      background: #2E147C;
      span{
        background: #3e279b;
        border-radius: 0 0 0 16px;
        transition: all 0.5s;
      }
    }
    .push_active{
      background: #4E3494;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #2E147C;
        border-radius: 16px 16px 0 0;
        color: #5e40c8;
        transition: all 0.5s;
      }
    }
    .push_default{
      background: #3e279b;
      transition: all 0.5s;
      span{
        background: #4E3494;
        border-radius: 0 16px 0 0px;
        transition: all 0.5s;
      }

    }
    .push_default2{
      background: #2E147C;
      border-radius: 0 16px 0 0;
      span{
        background: #4E3494;
        border-radius: 0 16px 0 16px;
      }
    }
  }
  .container_div{
    background: #2E147C;
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
  }
  .container_div_active{
     background: #4E3494;
  }
  .vm_div{
    background: #d4d1ec;
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
  }
  .view_image_dialog .el-dialog{
    width: 40%;
    min-width: 600px;
  }
  .link-left {
    width: 3px;
    height: 10px;
    border-left:2px solid #331A85 ;
  }
  .link-right {
    width: 3px;
    height: 10px;
    margin-right: 10px;
    border-right:2px solid #331A85 ;
  }
}
.tables{
  width: 100%;
  min-height: 16px;
  background-color:#2E147C!important;
  border-radius: 16px 0 0 0 ;
  border-top-right-radius:16px !important;
}
div /deep/ .el-table__body-wrapper {
    margin-top: -10px !important;
}
.imgContent{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left:10.5% ;
}
.timeContent{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right:10.5% ;
}
.appIcon{
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 29px;
}
.appName{
  color: #fff;
  font-size: 20px;
  line-height: 50px;
  margin-top: -14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.appDesc{
  color: #fff;
  font-size: 14px;
}
.timeLine{
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;
}
.opeLine{
  display: flex;
  justify-content: space-around;
  p:hover{
    cursor: pointer;
    background: #5944C0;
    color: #fff;
  }
  p{
    width: 55px;
    height: 24px;
    font-size: 14px;
    background: #EFEFEF;
    border-radius: 5px;
    color: #5944C0;
    text-align: center;
    line-height: 24px;
    margin: 0;
  }
}
.allContent{
  min-height: 400px;
}
</style>
