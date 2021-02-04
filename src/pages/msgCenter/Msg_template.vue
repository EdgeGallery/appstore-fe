<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
    <div class="left">
      <el-collapse
        v-model="activeNames"
      >
        <el-collapse-item
          v-for="(msg) in timeTable"
          :key="msg.index"
          :name="msg.index"
        >
          <template slot="title">
            {{ msg.value }}
          </template>
          <div
            v-for="(item,index) in msgs"
            :key="index"
            :class="index===isActive?'selectMsgBody':'msgBody'"
            v-show="(msg.index==='1'&&item.timeResult===1) || (msg.index==='2'&&item.timeResult===2) || (msg.index==='3'&&item.timeResult===3) ||(msg.index==='4'&&item.timeResult===4)"
            @click="showdetail(item, index)"
          >
            <div
              class="tipTitle"
              :class="!item.readed?'tipTitleNo':''"
            >
              {{ item.sourceAppStore }}
              <span
                class="msgTime"
                v-if="msg.index==='1'"
                :class="!item.readed?'msgTimeNo':''"
              >
                {{ item.time.split(' ')[1].substring(0, item.time.split(' ')[1].length-3) }}
              </span>
              <span
                class="msgTime"
                v-else
                :class="!item.readed?'msgTimeNo':''"
              >
                {{ item.time.split(' ')[0] }}
              </span>
              <div
                class="el-icon-document-delete"
                @click="handleDelete(index)"
                @mouseenter="enter(1, item)"
                @mouseleave="leave(item)"
              />
              <div
                class="el-icon-document-checked"
                @click="handleAccept(index)"
                @mouseenter="enter(2, item)"
                @mouseleave="leave(item)"
              />
              <div
                class="popUp"
                v-show="item.seen"
              >
                <span
                  v-if="operationType === 1"
                >{{ $t('apppromotion.deleteMsgTip') }}</span>
                <span
                  v-else
                >{{ $t('apppromotion.acceptMsgTip') }}</span>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="right">
      <RightContent
        v-if="hackReset"
        :data="msgDetail"
      />
    </div>
  </div>
</template>

<script>
import RightContent from './Right_template'
import { getAppdownAnaApiByType, updateStatus, acceptMsg, deleteMsg } from '../../tools/api.js'
export default {
  components: {
    RightContent
  },
  data () {
    return {
      msgs: [],
      activeNames: ['1'],
      msgDetail: {},
      isActive: 0,
      hackReset: true,
      operationType: 1,
      timeTable: [
        {
          value: '今天',
          index: '1'
        },
        {
          value: '一周内',
          index: '2'
        },
        {
          value: '一个月前',
          index: '3'
        },
        {
          value: '更早',
          index: '4'
        }
      ]
    }
  },
  methods: {
    showdetail (item, index) {
      this.msgDetail = item
      this.isActive = index
      if (!item.readed) {
        item.readed = true
        this.updateMsgStatus(item.messageId)
      }
      this.rebuileComponents()
    },
    timeCompute (time) {
      var today = new Date()
      var todayTime = today.getTime() % (1000 * 60 * 60 * 24)
      var offset = new Date(time).getTime() - today.getTime()
      var dateTime = offset + todayTime
      if (dateTime >= 0 && dateTime < 1000 * 60 * 60 * 24) {
        return 1
      } else if (dateTime < 0 && dateTime / (1000 * 60 * 60 * 24) >= -7) {
        return 2
      } else if (dateTime / (1000 * 60 * 60 * 24) < -7 && dateTime / (1000 * 60 * 60 * 24) >= -30) {
        return 3
      } else {
        return 4
      }
    },

    getAppData (param) {
      getAppdownAnaApiByType().then((res) => {
        let data = res.data
        data.forEach(item => {
          item.timeResult = this.timeCompute(item.time)
          item.seen = false
        })
        this.msgs = data
        // 跳转到定位的item
        if (!param) {
          this.msgDetail = this.msgs[0]
          if (this.msgs[0].readed === false) {
            this.msgDetail.readed = true
            this.updateMsgStatus(this.msgs[0].messageId)
          }
        } else {
          // 根据messge获取index并激活该index
          for (let i = 0; i < this.msgs.length; i++) {
            if (param.messageId === this.msgs[i].messageId) {
              this.isActive = i
              break
            }
          }
          this.msgDetail = param
          this.msgDetail.readed = true
          this.updateMsgStatus(param.messageId)
        }
      }).catch((err) => {
        if (err.response.data.code === 403) {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.guestUser'),
            type: 'warning'
          })
          this.handleClose()
        } else {
          this.$message({
            duration: 2000,
            message: this.$t('apppromotion.getNoticeFailed'),
            type: 'warning'
          })
        }
      })
    },
    updateMsgStatus (messageId) {
      updateStatus(messageId).then((res) => {
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.acceptFailed'),
          type: 'warning'
        })
      })
    },
    locateMessage (message) {
      // 根据messge获取index并激活该index
      for (let i = 0; i < this.msgs.length; i++) {
        if (message.messageId === this.msgs[i].messageId) {
          this.isActive = i
          break
        }
      }
      this.msgDetail = message
      this.msgDetail.readed = true
      this.updateMsgStatus(message.messageId)
    },
    rebuileComponents () {
      // 销毁子标签
      this.hackReset = false
      // 重新创建子标签
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    handleAccept (index) {
      acceptMsg(this.msgs[index].messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.acceptSuccess'))
      }).catch((error) => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.acceptFailed') + error.response.data.message,
          type: 'warning'
        })
      })
    },
    handleDelete (index) {
      deleteMsg(this.msgs[index].messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.deleteMsgSuccess'))
      }).catch((error) => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.deleteMsgFailed') + error.response.data.message,
          type: 'warning'
        })
      })
    },
    enter (type, item) {
      item.seen = true
      this.operationType = type
    },
    leave (item) {
      item.seen = false
    }
  },
  mounted () {
    let param = this.$route.query.item
    this.getAppData(param)
  },
  watch: {
    '$route': function (to, from) {
      console.log(to.query.item.messageId)
      this.locateMessage(to.query.item)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  margin: 65px 0px 0px;
  background:#fff;
}
.left {
  width: 18%;
  height:100%;
  background: #fff;
  float: left;
  padding:0 12px;
  overflow-y: auto;
  border-right:1px solid #eadfdf,
}
.right {
  margin-left:18%;
  width: 82%;
  height: 100%;
  background: #FFFFFF;
  padding:25px 35px;
  overflow-y: auto;
}
.el-collapse{
  border-top:none!important;
}
.msgBody:hover{
 background:#cedbe8;
}
.tipTitle{
  font-size:15px;
  color:#686b73;
  .el-icon-document-checked{
    font-size: 16px;
    color: #409EFF;
    margin-right: 3px;
    margin-top: 3px;
    float:right;
  }
  .el-icon-document-delete{
    font-size: 16px;
    color: #409EFF;
    float:right;
    margin-top: 3px;
  }
  .popUp{
    width: 150px;
    height: 20px;
    background-color: #FFFFFF;
    z-index: 999999;
    right: 10px;
    float: right;
    border: 1px solid gray;
    font-size: 10px
  }
}
.msgTime{
  font-size: 13px;
  color:#b6b8bd;
  margin-left:3px;
  float:right;
  padding-right:10px;
}
.selectMsgBody{
  background:#cedbe8;
  border-bottom: 1px solid #f5f5f5;
  margin-top:3px;
  padding-left:10px;
  cursor: pointer;
  border-radius: 2px;
  height:50px;
  .tipTitleNo{
    font-weight:bold;
    color:#000;
  }
  .msgTime{
    color:#000;
  }
}
.msgBody{
  border-bottom: 1px solid #C0C0C0;
  margin-top:3px;
  padding-left:10px;
  cursor: pointer;
  border-radius: 2px;
  height:50px;
  .tipTitleNo{
    font-weight:bold;
    color:#000;
  }
  .msgTime{
    color:#000;
  }
}
</style>
