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
    class="msgDialog"
    ref="msgDialog"
  >
    <div class="msgStatis">
      {{ $t('apppromotion.msgNum') }}(<span class="numStyle">
        {{ this.msgs.length }}
      </span>)
    </div>
    <div class="content">
      <div
        v-for="(item,index) in msgs.slice(0, 4)"
        :key="index"
        class="msgBody"
        @click="jumpToMsgDialog(item)"
      >
        <div
          class="tipTitleNo"
        >
          {{ item.sourceAppStore }}
          <span
            class="msgTime"
          >
            {{ item.time.split(' ')[1] }}
          </span>
        </div>
        <div
          class="tipDescNo"
        >
          {{ item.description }}
        </div>
      </div>
    </div>
    <div class="checkAll">
      <span @click="jumpToMsgDialog()">{{ $t('apppromotion.checkAllMsg') }}</span>
    </div>
  </div>
</template>

<script>

import { getAppdownAnaApiByType } from '../../tools/api.js'
export default {
  data () {
    return {
      msgs: [],
      interval: ''
    }
  },
  methods: {
    timeCompute (time) {
      var dateBegin = new Date(time.replace(/-/g, '/'))
      var dateEnd = new Date()
      var dateDiff = dateEnd.getTime() - dateBegin.getTime()
      return Math.floor(dateDiff / (24 * 3600 * 1000))
    },
    getMessage () {
      getAppdownAnaApiByType().then((res) => {
        this.msgs = []
        let data = res.data
        data.forEach(item => {
          item.timeResult = this.timeCompute(item.time)
          if (item.readed === false) {
            this.msgs.push(item)
          }
        })

        if (this.msgs.length > 0) {
          this.$emit('msgEvent', this.msgs.length)
        } else {
          this.$emit('msgEvent', 0)
        }
      }).catch(() => {
        console.log('get messages error')
      })
    },
    jumpToMsgDialog (item) {
      if (item) {
        this.$router.push({ name: 'msgCenter', query: { item } })
      } else {
        this.$router.push({ name: 'msgCenter' })
        this.$emit('msgCheckAllEvent', true)
      }
    },
    clearInterval () {
      this.interval = null
    }
  },
  mounted () {
    this.getMessage()
    this.interval = setInterval(() => {
      this.getMessage()
    }, 10000)
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>

<style lang="less" scoped>
.msgDialog{
  width: 350px;
  height: 315px;
  background-color: #404348;
}

.msgTime{
  font-size: 12px;
  color:#FFFFFF;
  margin-left:15px;
  float:right;
  padding-right:10px;
}
.msgBody{
    margin-top:18px;
    padding-left:10px;
    cursor: pointer;
    border-radius: 2px;
  .tipTitleNo{
    font-weight:solid;
    color:#FFFFFF;
    font-size: 15px;
  }
  .tipDescNo{
    font-weight: solid;
    color:#A0A0A0;
    font-size: 12px;
    margin-top: 7px;
  }
  .msgTime{
    color:#A0A0A0;
  }
}
  .msgBody:hover{
    background:#282B33;
  }
.msgStatis{
  height: 20px;
  margin-top: 5px;
  font-size: 15px;
  text-align: center;
}
.numStyle{
  color: #D90013;
}
.checkAll{
  text-align: center;
  font-size: 15px;
  cursor: pointer;
}
.content{
  border-bottom: 1px solid #f5f5f5;
  height: 245px;
}
</style>
