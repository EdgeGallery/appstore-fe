<template>
  <div
    class="box"
    ref="box"
  >
    <div class="left">
      <ul id="msgList">
        <br>
        <li
          v-for="(msg, index) in msgs"
          :key="index"
          :class="(index==selected || msg.readed===true)?&quot;selected&quot;:&quot;&quot;"
          onmouseover="this.style.background='#C1D6EA'"
          onmouseout="this.style.background='#F0F2F5'"
          @click="showdetail('/right_panel', msg, index)"
        >
          <br>
          <h4>
            {{ msg.type }}
          </h4>
          <h5>
            <span
              class="el-icon-chat-dot-round"
            />
            {{ msg.title }}
          </h5>
          <hr class="linestyle">
        </li>
      </ul>
    </div>
    <div
      class="resize"
      title="收缩侧边栏"
    />
    <div class="mid">
      <router-view />
    </div>
  </div>
</template>

<script>
import { getAppdownAnaApiByType, updateStatus } from '../../tools/api.js'
export default {
  components: {

  },
  data () {
    return {
      selected: -1,
      msgs: []
    }
  },

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goTo (path) {
      this.$router.replace(path)
    },
    showdetail (path, msg, index) {
      this.selected = index
      console.log('selected的值' + this.selected)
      this.updateMsgStatus(msg.messageId)
      let detailData = {
        messageId: msg.messageId,
        name: msg.name,
        provider: msg.provider,
        version: msg.version,
        struct: msg.struct,
        releation: msg.type,
        affinity: msg.affinity,
        direction: msg.industry,
        description: msg.shortDesc,
        testplatform: msg.testplatform,
        testresult: msg.atpTestStatus
      }
      this.$router.push({ path: '/right_panel', query: { detailData } }).catch(data => { })
      // 更新message的可读状态
    },
    dragControllerDiv: function () {
      var resize = document.getElementsByClassName('resize')
      var left = document.getElementsByClassName('left')
      var mid = document.getElementsByClassName('mid')
      var box = document.getElementsByClassName('box')
      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
          // 颜色改变提醒
          resize[i].style.background = '#818181'
          var startX = e.clientX
          resize[i].left = resize[i].offsetLeft
          // 鼠标拖动事件
          document.onmousemove = function (e) {
            var endX = e.clientX
            var moveLen = resize[i].left + (endX - startX)
            var maxT = box[i].clientWidth - resize[i].offsetWidth

            if (moveLen < 32) moveLen = 32
            if (moveLen > maxT - 150) moveLen = maxT - 150

            resize[i].style.left = moveLen

            for (let j = 0; j < left.length; j++) {
              left[j].style.width = moveLen + 'px'
              mid[j].style.width = (box[i].clientWidth - moveLen - 10) + 'px'
            }
          }
          // 鼠标松开事件
          document.onmouseup = function (evt) {
            // 颜色恢复
            resize[i].style.background = '#d6d6d6'
            document.onmousemove = null
            document.onmouseup = null
            resize[i].releaseCapture && resize[i].releaseCapture()
          }
          resize[i].setCapture && resize[i].setCapture()
          return false
        }
      }
    },
    getAppData () {
      this.uploadDiaVis = false
      getAppdownAnaApiByType().then((res) => {
        let data = res.data
        data.forEach(
          (item) => {
            let appDataItem = {
              messageId: item.messageId,
              title: item.description,
              type: item.messageType,
              name: item.basicInfo.name,
              provider: item.basicInfo.provider,
              version: item.basicInfo.version,
              affinity: item.basicInfo.affinity,
              industry: item.basicInfo.industry,
              shortDesc: item.basicInfo.shortDesc,
              testplatform: item.targetAppStore,
              atpTestStatus: item.atpTestStatus,
              readed: item.readed
            }
            this.msgs.push(appDataItem)
          }
        )
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.getNoticeFailed'),
          type: 'warning'
        })
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
    this.getAppData()
    this.dragControllerDiv()
  }
}
</script>

<style scoped>
.el-col-12{
  width: 15%;
}
/* .msg_left{
  float: left; */
  /* border: groove #89B5E9 4px;
   */
  /* border: solid #89B5E9 2px; */
  /* border: solid #CBCED3 2px;
  border-top:none;
  border-bottom:none;
  border-left:none;
  width: 500px;
  height: 596px;
  background-color: #F0F2F5; */
/* } */
/* .msg_right{ */
  /* border: groove #89B5E9 4px; */
  /* border: solid #89B5E9 2px; */

  /* width: 1230px;
  height: 600px;
  margin-left: 0px;
  float: left;
  background: #CEDBE8; */

  /* background-color: #525A58; */
/* } */
/* .msg_template{
  width: 1750px;
  height: 600px;
  margin: 40px auto;
  border: solid #CBCED3 2px;
  background: #CEDBE8; */

  /* background: #CBCED3; */
  /* background-color: #89BFAA; */
/* } */
.msg_left  ul li{
    width: 100%;
    font-size: 15px;
    margin-top: 0px;
    margin-left: 10px;
    border-bottom:1px solid #ccc;
    width: 70%;
    display: block;
    /* border: dotted; */
}
/* .msg_left  ul li:first-child {
    width: 100%;
    background-color: #C1D6EA;
} */
.currentli {
  color:#186ecc;
  background-color:#fff;
}
.selected {
  color: #ADC6DE;
  background: #ADC6DE;
  background-color:#F0F2F5;
}
/* .unselected {
  color: #ADC6DE;
  background: #ADC6DE;
  background-color:red;
} */
/* .el-icon-paperclip {
    color: #438BD3;
    font-size: 18px;
} */
.el-icon-chat-dot-round {
    color: #438BD3;
    font-size: 18px;
}
.linestyle{
  margin: 1px 20px;
}
/* 拖拽相关样式 */
    /*包围div样式*/
.box {
  width: 1650px;
  height: 100%;
  margin: 1% 150px;
  overflow: hidden;
  box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
  position: relative;
  border: solid #CBCED3 4px;
  /* background: #FFFFFF; */
}
/*左侧div样式*/
.left {
  width: calc(20% - 10px);  /*左侧初始化宽度*/
  height: 100%;
  background: #F0F2F5;
  float: left;
  /* margin-left: 5px; */
}
/*拖拽区div样式*/
.resize {
  cursor: col-resize;
  float: left;
  position: relative;
  top: 45%;
  background-color: #d6d6d6;
  border-radius: 5px;
  margin-top: -10px;
  width: 7px;
  height: 590px;
  background-size: cover;
  background-position: center;
  /*z-index: 99999;*/
  font-size: 32px;
  color: white;
}
/*拖拽区鼠标悬停样式*/
.resize:hover {
  color: #444444;
}
/*右侧div'样式*/
.mid {
  float: left;
  width: 80%;   /*右侧初始化宽度*/
  height: 100%;
  /* background: #fff; */
  background: #FFFFFF;
  box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
}
</style>
