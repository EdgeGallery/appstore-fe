<template>
  <div
    class="box"
    ref="box"
  >
    <div class="left">
      <el-collapse
        v-model="activeNames"
      >
        <el-collapse-item name="1">
          <template slot="title">
            最近
          </template>
          <div
            v-for="(item,index) in msgs"
            :key="index"
            v-show="item.timeResult<4"
            class="msgBody"
            @click="showdetail(item)"
          >
            <div
              class="tipTitle"
              :class="!item.readed?'tipTitleNo':''"
            >
              {{ item.targetAppStore }}
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
        <el-collapse-item name="2">
          <template slot="title">
            上个周
          </template>
          <div
            v-for="(item,index) in msgs"
            :key="index"
            v-show="item.timeResult>3&&item.timeResult<8"
          >
            <div
              class="tipTitle"
              :class="!item.readed?'tipTitleNo':''"
            >
              {{ item.targetAppStore }}
              <span
                class="msgTime"
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
        <el-collapse-item name="3">
          <template slot="title">
            上个月
          </template>
          <div
            v-for="(item,index) in msgs"
            :key="index"
            v-show="item.timeResult>7&&item.timeResult<32"
          >
            <div
              class="tipTitle"
              :class="!item.readed?'tipTitleNo':''"
            >
              {{ item.targetAppStore }}
              <span
                class="msgTime"
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
        <el-collapse-item name="4">
          <template slot="title">
            更早
          </template>
          <div
            v-for="(item,index) in msgs"
            :key="index"
            v-show="item.timeResult>31"
          >
            <div
              class="tipTitle"
              :class="!item.readed?'tipTitleNo':''"
            >
              {{ item.targetAppStore }}
              <span
                class="msgTime"
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
      msgDetail: {}
    }
  },
  methods: {
    showdetail (item) {
      console.log(item)
      this.msgDetail = item
      if (!item.readed) {
        this.updateMsgStatus(item.messageId)
      }
    },
    timeCompute (time) {
      var dateBegin = new Date(time.replace(/-/g, '/'))
      var dateEnd = new Date()
      var dateDiff = dateEnd.getTime() - dateBegin.getTime()
      return Math.floor(dateDiff / (24 * 3600 * 1000))
    },
    getAppData () {
      getAppdownAnaApiByType().then((res) => {
        this.msgs = res.data
        this.msgDetail = this.msgs[0]
      })
    },
    updateMsgStatus (messageId) {
      updateStatus(messageId).then((res) => {
        console.log('zhaolongfei' + res)
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
    this.getAppData()
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
  overflow-y: auto;
}
.el-collapse{
  border-top:none!important;
}
.msgBody{
  border-bottom: 1px solid #f5f5f5;
  margin-top:3px;
  padding-left:10px;
  cursor: pointer;
  border-radius: 2px;
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
