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
                {{ item.time.split(' ')[1] }}
              </span>
              <span
                class="msgTime"
                v-else
                :class="!item.readed?'msgTimeNo':''"
              >
                {{ item.time }}
              </span>
            </div>
            <div
              class="tipDesc"
              :class="!item.readed?'tipDescNo':''"
            >
              {{ item.description }}
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
import { getAppdownAnaApiByType, updateStatus } from '../../tools/api.js'
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
  // height: calc(100% - 60px);
  height: 100%;
  margin: 65px 56px 0;
  // overflow: hidden;
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
  font-size:13px;
  color:#686b73;
}
.tipDesc{
  font-size: 11px;
  color:#b6b8bd;
}
.msgTime{
  font-size: 11px;
  color:#b6b8bd;
  margin-left:15px;
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
  .tipTitleNo{
    font-weight:bold;
    color:#000;
  }
  .tipDescNo{
    font-weight: bold;
    color:#6089f5;
  }
  .msgTime{
    color:#000;
  }
}
.msgBody{
  border-bottom: 1px solid #f5f5f5;
  margin-top:3px;
  padding-left:10px;
  cursor: pointer;
  border-radius: 2px;
  .tipTitleNo{
    font-weight:bold;
    color:#000;
  }
  .tipDescNo{
    font-weight: bold;
    color:#6089f5;
  }
  .msgTime{
    color:#000;
  }
}
</style>
