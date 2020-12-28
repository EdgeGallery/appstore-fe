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
            class="msgBody"
            v-show="(msg.index==='1'&&item.timeResult<4) || (msg.index==='2'&&item.timeResult>3&&item.timeResult<8) || (msg.index==='3'&&item.timeResult>7&&item.timeResult<32) ||(msg.index==='4'&&item.timeResult>31)"
            @click="showdetail(item)"
          >
            <div
              class="tipTitle"
              :class="!item.readed?'tipTitleNo':''"
            >
              {{ item.sourceAppStore }}
              <span
                class="msgTime"
                :class="!item.readed?'msgTimeNo':''"
              >
                {{ item.time.split(' ')[1] }}
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
      <RightContent :data="msgDetail" />
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
      timeTable: [
        {
          value: '最近',
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
    showdetail (item) {
      this.msgDetail = item
      if (!item.readed) {
        item.readed = true
        this.updateMsgStatus(item.messageId)
      }
    },
    timeCompute (time) {
      var dateBegin = new Date(time.replace(/-/g, '/'))
      var dateEnd = new Date()
      var dateDiff = dateEnd.getTime() - dateBegin.getTime()
      return Math.floor(dateDiff / (24 * 3600 * 1000))
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
        } else {
          this.msgDetail = param
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
    }
  },
  mounted () {
    let param = this.$route.params.item
    this.getAppData(param)
  }
}
</script>

<style lang="less" scoped>
.box {
  height: calc(100% - 60px);
  margin: 0 56px;
  overflow: hidden;
  background:#fff;
}
.left {
  width: 18%;
  height:100%;
  background: #fff;
  float: left;
  padding:0 12px;
  border-right:1px solid #eadfdf,
}
.right {
  margin-left:18%;
  width: 82%;
  height: 100%;
  background: #FFFFFF;
  padding:25px 35px;
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
