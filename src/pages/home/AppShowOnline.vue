<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="appShowOnline">
    <div class="show_app">
      <div
        id="left_tableId"
        v-if="isTableShow"
        class="show_common lt"
      >
        <p class="stepTitleNode">
          {{ $t('store.experiencePhase') }}
        </p>
        <img
          :src="deployFinish"
          alt=""
        >
        <p class="stepTitle">
          {{ $t('store.deployFinished') }}
        </p>
        <p class="show_btn">
          <el-button
            type="primary"
            class="batchProButton"
            @click="cleanTestEnv(currentData)"
          >
            {{ $t('store.releaseResource') }}
          </el-button>
        </p>
        <p class="tryBigTip">
          <img
            class="picTip"
            :src="tryBigTip"
            alt=""
          >
          <span class="spanTitle">{{ $t('store.releaseAppResource') }}</span>
        </p>
      </div>
      <div
        id="right_tableId"
        class="lt"
        v-if="isTableShow"
      >
        <div class="footer_title">
          <div class="bottom_titile1">
            {{ $t('store.serviceNodeInfo') }}
          </div>
          <div
            class="el-upload__tip"
            slot="tip"
          >
            <em class="el-icon-warning" />
            {{ $t('store.urlTip') }}
          </div>
        </div>
        <div
          class="experienceData"
        >
          <el-table
            :data="experienceData"
            header-cell-class-name="headerStyle"
          >
            <el-table-column
              prop="serviceName"
              :label="$t('store.serviceName')"
              width="235"
            />
            <el-table-column
              prop="mecHost"
              :label="$t('store.Ip')"
              width="235"
            />
            <el-table-column
              prop="nodePort"
              :label="$t('store.port')"
              width="235"
            />
          </el-table>
        </div>
      </div>
      <p
        class="stepTitleNode"
        id="circleTitle"
      >
        {{ $t('store.experiencePhase') }}
      </p>
      <div
        id="canvasId"
        v-if="true"
        class="circle-progress"
      >
        <canvas
          :hidden="isCanvasHidden"
          id="circle"
          class="circle-item circleApp"
          width="850px"
          height="550px"
        />
        <canvas
          id="circleGray"
          class="circle-item"
          width="0px"
          height="0px"
        />
      </div>
    </div>
    <div class="btnClass">
      <el-button
        v-if="btnShow && switchBtn"
        type="primary"
        class="batchProButtonTry"
        @click="deployPackage(currentData)"
      >
        {{ $t('store.showOnline') }}
      </el-button>
      <el-button
        v-if="btnShow && !switchBtn"
        type="primary"
        class="batchProButtonTry"
        @click="cleanTestEnv(currentData)"
      >
        {{ $t('store.releaseResource') }}
      </el-button>
    </div>
    <div
      v-if="isTipShow"
      class="div_title_tip"
      slot="tip"
    >
      <img
        :src="this.experienceSmallTip"
        alt=""
      >
      <p class="title_tip">
        {{ $t('store.releaseAppResource') }}
      </p>
    </div>
  </div>
</template>

<script>
import en from '../../locales/en.js'
import cn from '../../locales/cn.js'
import $ from 'jquery'
import { myApp } from '../../tools/api.js'
import deployFinish from '@/assets/images/deployFinish.png'
import showEnd from '@/assets/images/showEnd.png'
import pkgUploading from '@/assets/images/pkg_uploading.png'
import pkgUploadingNone from '@/assets/images/pkg_uploadingNone.png'
import pkgGetStatusNone from '@/assets/images/pkg_getStatusNone.png'
import pkgInstatiateNone from '@/assets/images/pkg_instatiateNone.png'
import pkgGetStatusFinish from '@/assets/images/pkg_getStatusFinish.png'
import pkgReadyDeploy from '@/assets/images/pkg_readyDeploy.png'
import pkgInstatiateFinish from '@/assets/images/pkg_instatiateFinish.png'
import pkgDeployFinish from '@/assets/images/pkg_deployFinish.png'
import pkgWorking from '@/assets/images/pkg_working.png'
import tryBigTip from '@/assets/images/tryBigTip.png'
import pkgGetStatusTip from '@/assets/images/pkg_getStatusTip.png'
import pkgInstatiateTip from '@/assets/images/pkg_instatiateTip.png'
import pkgUploadingTip from '@/assets/images/pkg_uploadingTip.png'
import pkgGetStatusEndTip from '@/assets/images/pkg_getStatusEndTip.png'
import pkgInstatiateEndTip from '@/assets/images/pkg_instatiateEndTip.png'
import pkgUploadingEndTip from '@/assets/images/pkg_uploadingEndTip.png'
import experienceSmallTip from '@/assets/images/experienceSmallTip.png'
export default {
  props: {
    packageId: {
      required: true,
      type: String
    },
    appId: {
      required: true,
      type: String
    }
  },
  // name:
  data () {
    return {
      experienceData: [],
      isTipShow: false,
      btnShow: true,
      isTableShow: false,
      isCanvasHidden: false,
      switchBtn: true,
      timer: null,
      fillText: '',
      language: localStorage.getItem('language'),
      processImg: '',
      deployFinish: deployFinish,
      showEnd: showEnd,
      pkgUploadingNone: pkgUploadingNone,
      pkgGetStatusNone: pkgGetStatusNone,
      pkgInstatiateNone: pkgInstatiateNone,
      pkgGetStatusFinish: pkgGetStatusFinish,
      pkgReadyDeploy: pkgReadyDeploy,
      pkgInstatiateFinish: pkgInstatiateFinish,
      pkgDeployFinish: pkgDeployFinish,
      pkgWorking: pkgWorking,
      tryBigTip: tryBigTip,
      pkgGetStatusTip: pkgGetStatusTip,
      pkgInstatiateTip: pkgInstatiateTip,
      pkgUploadingTip: pkgUploadingTip,
      pkgGetStatusEndTip: pkgGetStatusEndTip,
      pkgInstatiateEndTip: pkgInstatiateEndTip,
      pkgUploadingEndTip: pkgUploadingEndTip,
      pkgUploading: pkgUploading,
      experienceSmallTip: experienceSmallTip,
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      name: '',
      ip: '',
      nodePort: '',
      btnInstantiate: false,
      reduceDeg: 60,
      progress: 0,
      onePercentDeg: 0,
      cradius: 185,
      circleX: 0,
      circleY: 0

    }
  },
  methods: {
    drawLeftCircle (cx, cy, r, ctx) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.fillStyle = '#E6EAED'
      ctx.arc(cx + 147, cy + 90.1, 8.6, 0, 2 * Math.PI)
      ctx.fill()
    },
    drawRightCircle (cx, cy, r, ctx) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.fillStyle = '#fff'
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()
    },
    drawText (text, circleX, circleY, width, ctx) {
      var chr = text.split('')
      var temp = ''
      var rows = []
      ctx.font = '20px Arial'
      ctx.fillStyle = 'black'
      ctx.textBaseline = 'middle'
      for (var a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < width) {
          ;
        } else {
          rows.push(temp)
          temp = ''
        }
        temp += chr[a]
      }
      rows.push(temp)
      for (var b = 0; b < rows.length; b++) {
        ctx.fillText(rows[b], circleX, circleY + (b + 1) * 20)
      }
    },
    loadWords (progress) {
      let _isCn = this.language === 'cn'
      let _store = _isCn ? cn.store : en.store
      if (progress === 0) {
        this.fillText = _store.startExperience
      } else if (progress > 0 && progress < 10) {
        this.fillText = _store.waitUploadApp
      } else if (progress > 10 && progress < 45) {
        this.fillText = _store.waitDistributeApp
      } else if (progress >= 45 && progress <= 50) {
        this.fillText = _store.waitInstantiatedApp
      } else if (progress > 50 && progress <= 90) {
        this.fillText = _store.waitGetInstantiatedInfo
      } else {
        this.fillText = _store.deployFinished
      }
    },
    loadImage (circleX, circleY, ctx, tip) {
      let img = new Image()
      img.src = tip
      img.onload = function () {
        ctx.drawImage(this, circleX, circleY)
      }
    },
    loadingPicByProgress (progress, circleX, circleY, ctx) {
      if (progress < 10) {
        this.loadImage(circleX / 3 - 17, circleY + 88, ctx, this.pkgUploadingTip)
        this.loadImage(circleX + 15, circleY / 6, ctx, this.pkgInstatiateTip)
        this.loadImage(circleX + 190, circleY + 83, ctx, this.pkgGetStatusTip)
        this.loadImage(circleX - 190, circleY + 50, ctx, this.pkgUploadingNone)
        this.loadImage(circleX - 25, circleY - 205, ctx, this.pkgInstatiateNone)
        this.loadImage(circleX + 150, circleY + 50, ctx, this.pkgGetStatusNone)
        this.loadImage(circleX - 70, circleY - 80, ctx, this.pkgReadyDeploy)
      }
      if (progress >= 10 && progress < 50) {
        this.loadImage(circleX / 3 - 17, circleY + 88, ctx, this.pkgUploadingEndTip)
        this.loadImage(circleX + 15, circleY / 6, ctx, this.pkgInstatiateTip)
        this.loadImage(circleX + 190, circleY + 83, ctx, this.pkgGetStatusTip)
        this.loadImage(circleX - 190, circleY + 50, ctx, this.showEnd)
        this.loadImage(circleX - 25, circleY - 205, ctx, this.pkgInstatiateNone)
        this.loadImage(circleX + 150, circleY + 50, ctx, this.pkgGetStatusNone)
        this.loadImage(circleX - 70, circleY - 80, ctx, this.pkgUploading)
      }
      if (progress >= 50 && progress < 90) {
        this.loadImage(circleX / 3 - 17, circleY + 88, ctx, this.pkgUploadingEndTip)
        this.loadImage(circleX + 15, circleY / 6, ctx, this.pkgInstatiateEndTip)
        this.loadImage(circleX + 190, circleY + 83, ctx, this.pkgGetStatusTip)
        this.loadImage(circleX - 190, circleY + 50, ctx, this.showEnd)
        this.loadImage(circleX - 25, circleY - 205, ctx, this.showEnd)
        this.loadImage(circleX + 150, circleY + 50, ctx, this.pkgGetStatusNone)
        this.loadImage(circleX - 70, circleY - 80, ctx, this.pkgInstatiateFinish)
      }
      if (progress >= 90 && progress < 100) {
        this.loadImage(circleX / 3 - 17, circleY + 88, ctx, this.pkgUploadingEndTip)
        this.loadImage(circleX + 15, circleY / 6, ctx, this.pkgInstatiateEndTip)
        this.loadImage(circleX + 190, circleY + 83, ctx, this.pkgGetStatusEndTip)
        this.loadImage(circleX - 190, circleY + 50, ctx, this.showEnd)
        this.loadImage(circleX - 25, circleY - 205, ctx, this.showEnd)
        this.loadImage(circleX + 150, circleY + 50, ctx, this.showEnd)
        this.loadImage(circleX - 70, circleY - 80, ctx, this.pkgGetStatusFinish)
      }

      if (progress === 100) {
        this.loadImage(circleX / 3 - 17, circleY + 88, ctx, this.pkgUploadingEndTip)
        this.loadImage(circleX + 15, circleY / 6, ctx, this.pkgInstatiateEndTip)
        this.loadImage(circleX + 190, circleY + 83, ctx, this.pkgGetStatusEndTip)
        this.loadImage(circleX - 190, circleY + 50, ctx, this.showEnd)
        this.loadImage(circleX - 25, circleY - 205, ctx, this.showEnd)
        this.loadImage(circleX + 150, circleY + 50, ctx, this.showEnd)
        this.loadImage(circleX - 70, circleY - 80, ctx, this.pkgDeployFinish)
      }
    },
    toCanvas (id, color, progress) {
      var canvas = document.getElementById(id)
      var ctx = canvas.getContext('2d')
      var percent = progress
      this.process = progress
      var circleX = canvas.width / 2
      var circleY = canvas.height / 2
      this.circleX = canvas.width / 2
      this.circleY = canvas.height / 2
      var radius = 185
      var lineWidth = 18
      var fontSize = 25
      ctx.font = fontSize + 'px April'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#000'
      fontSize = 18
      ctx.font = fontSize + 'px April'
      ctx.fillStyle = '#999'
      this.loadWords(this.progress, circleX, circleY, ctx)
      console.log(circleX)

      ctx.fillStyle = '#999'
      ctx.clearRect(circleX - 103, circleY + 10, canvas.width / 2, canvas.height / 4)
      this.drawText(this.fillText, circleX, circleY + 50, 198, ctx)
      this.toCanvasGray('circle', '#E6EAED', 0)
      this.drawLeftCircle(
        this.cradius + Math.cos(((2 * Math.PI) / 60) * 120) * radius,
        this.cradius + Math.sin(((2 * Math.PI) / 30) * 130) * radius,
        6.5, ctx
      )
      this.drawRightCircle(
        circleX, circleY,
        6.5, ctx
      )
      // control move speed
      if (this.process / this.percent > 0.9) {
        this.process += 0.3
      } else if (this.process / this.percent > 0.8) {
        this.process += 0.55
      } else if (this.process / this.percent > 0.7) {
        this.process += 0.75
      } else {
        this.process += 1.0
      }
      // draw arc
      this.circle(circleX, circleY, radius, lineWidth, ctx)
      this.sector(circleX, circleY, radius, percent, lineWidth, ctx)
      this.loadingPicByProgress(this.progress, circleX, circleY, ctx)
    },
    circle (circleX, circleY, radius, lineWidth, ctx) {
      ctx.beginPath()
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = '#E6EAED'
      ctx.arc(circleX, circleY, radius, (Math.PI * 2) / 3, (Math.PI * 1) / 3)
      ctx.stroke()
    },
    sector (circleX, circleY, radius, endAngle, lineWidth, ctx) {
      ctx.beginPath()
      // ctx.lineWidth = lineWidth
      let linGrad = ctx.createLinearGradient(
        circleX - radius - lineWidth,
        circleY,
        circleX + radius + lineWidth,
        circleY
      )
      linGrad.addColorStop(0.0, this.progress === 0 ? '#53DABD' : '#4444D0')
      linGrad.addColorStop(1.0, '#6724CB')
      ctx.strokeStyle = linGrad
      ctx.fillRect(0, 0, 175, 50)
      ctx.lineCap = 'round'
      ctx.arc(
        circleX,
        circleY,
        radius,
        (Math.PI * 2) / 3,
        (Math.PI * 2) / 3 + (endAngle / 100) * ((Math.PI * 5) / 3),
        false
      )
      ctx.stroke()
    },
    drawImage (id, color, progress) {
      var canvas = document.getElementById(id)
      var ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    toCanvasGray (id, color, progress) {
      var canvas = document.getElementById(id)
      var ctx = canvas.getContext('2d')
      var percent = progress
      var circleX = canvas.width / 2
      var circleY = canvas.height / 2
      var radius = 145
      var lineWidth = 10
      function circle (cx, cy, r) {
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = '#E6EAED'
        ctx.arc(cx, cy, r, 100, 0, (Math.PI * 1) / 3)
        ctx.stroke()
      }
      function sector (cx, cy, r, startAngle, endAngle) {
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.arc(
          cx,
          cy,
          r,
          (Math.PI * 2) / 3,
          (Math.PI * 2) / 3 + (endAngle / 100) * ((Math.PI * 5) / 3),
          false
        )
        ctx.stroke()
      }
      circle(circleX, circleY, radius)
      sector(circleX, circleY, radius, (Math.PI * 2) / 3, percent)
    },
    deployPackage () {
      this.switchBtn = false
      this.startInterval()
      if (this.timer !== null) {
        setTimeout(() => {
          clearInterval(this.timer)
        }, 800000)
      }
      myApp.getNodePort(this.appId, this.packageId, this.userId).then(
        (res) => {
          let experienceInfo = res.data
          let tmpExperienceData = experienceInfo.data
          if (experienceInfo.message.indexOf('please register host') !== -1) {
            this.showCanvas()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.registerHost')
            })
          } else if (experienceInfo.message.indexOf('instantiate application failed.') !== -1) {
            this.showCanvas()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.instantiateFailed')
            })
          } else if (experienceInfo.message.indexOf('get app nodeport url failed.') !== -1) {
            this.showCanvas()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.getNodePortFailed')
            })
          } else if (experienceInfo.message.indexOf('get app url success.') !== -1) {
            this.filterExperienceInfo(tmpExperienceData)
            setTimeout(() => this.slideToggle(), 500)
          } else {
            this.showCanvas()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: experienceInfo.message
            })
          }
        })
    },
    filterExperienceInfo (tmpExperienceData) {
      this.experienceData = []
      for (let item of tmpExperienceData) {
        let object = {
          serviceName: '',
          nodePort: '',
          mecHost: ''
        }
        object.serviceName = item.serviceName
        object.nodePort = item.nodePort === '' ? this.$t('promptMessage.uninvolved') : item.nodePort
        object.mecHost = item.mecHost
        this.experienceData.push(object)
      }
    },
    getExperienceStatus () {
      myApp.getExperienceStatus(this.packageId).then(
        (res) => {
          console.log(res.data)
          this.progress = res.data.data
        })
      console.log(this.progress)
    },
    cleanTestEnv () {
      this.switchBtn = true
      if (this.userName === 'guest') {
        this.$message.error(this.$t('system.guestPrompt'))
      } else {
        myApp.cleanTestEnv(this.packageId).then(
          (res) => {
            let result = res.data
            if (result) {
              this.experienceData = []
              this.showCanvas()
              this.activeFlag = false
              this.$message({
                duration: 2000,
                type: 'success',
                class: 'btnPasses',
                message: this.$t('promptMessage.cleanEnvSuccess')
              })
            } else {
              this.$message({
                duration: 2000,
                message: this.$t('promptMessage.cleanEnvFailed'),
                type: 'warning'
              })
            }
          })
      }
    },
    initStatus () {
      myApp.getNodeStatus(this.packageId, this.userId).then(
        (res) => {
          let experienceInfo = res.data
          let tmpExperienceData = experienceInfo.data
          this.filterExperienceInfo(tmpExperienceData)
          console.log(this.experienceData)
          if (this.experienceData.length === 0) {
            this.showCanvas()
          } else {
            this.initHidden()
          }
        })
    },
    stepClean () {
      this.isTableShow = false
    },
    startInterval () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getExperienceStatus()
      }, 2000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer)
      })
    },
    slideToggle () {
      $('#canvasId').fadeToggle(1300)
      $('#circleTitle').hide()
      this.btnShow = false
      setTimeout(() => {
        this.isTableShow = true
        $('#right_tableId').slideDown(400)
        $('#left_tableId').slideDown(400)
      }, 1296)
    },
    initHidden () {
      $('#canvasId').hide()
      $('#circleTitle').hide()
      this.btnShow = false
      this.isTableShow = true
      $('#right_tableId').slideDown(400)
      $('#left_tableId').slideDown(400)
    },
    showCanvas () {
      this.progress = 0
      this.isTableShow = false
      $('#canvasId').show()
      $('#circleTitle').show()
      this.stepClean()
      this.btnShow = true
      this.switchBtn = true
    },
    initCanvas () {
      this.toCanvas('circle', this.color, this.progress)
      this.toCanvasGray('circle', '#E6EAED', 0)
    }
  },
  computed: {
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    appId (newVal, oldVal) {
      this.appId = newVal
    },
    packageId (newStr) {
      this.packageId = newStr
      if (this.packageId) {
        this.initStatus()
      }
    },
    progress (newStr) {
      this.progress = newStr
      this.toCanvas('circle', this.color, this.progress)
    }
  },
  mounted () {
    if (this.progress === 0) {
      this.color = '#53DABD'
    }
    this.initCanvas()
    this.experienceData = []
    this.initStatus()
    this.startInterval()
    setTimeout(() => {
      clearInterval(this.timer)
    }, 600000)
  }
}
</script>
<style lang="less" scoped>
.appShowOnline {
  margin: auto;
  background: #fff;
  border-radius: 16px;
  .show_app {
    height: 550px;
    .show_common {
      padding: -100px;
      display: inline-block;
      width: 25%;
      margin-top: 50px;
      text-align: center;
      margin-right: 18%;
      .stepTitleNode{
        width: 185px;
        height: 19px;
        font-size: 20px;
        font-family: HarmonyHeiTi;
        font-weight: 600;
        color: #5844BE;
        line-height: 15px;
        margin-bottom: 50px;
        margin-left: 40px;
        margin-top: -50px;
      }
      .show_btn{
        display: inline-block;
        .batchProButton{
          width:139px;
          height:40px;
          margin-top: 30px;
          background-color: #5F45BE;
        }
      }
      .tryBigTip{
        margin-left:30%;
        width: 100%;
        height: 29px;
        font-size: 12px;
        font-family: HarmonyHeiTi;
        font-weight: 200;
        color: #5E40C8;
        line-height: 17px;
        margin-top: 20px;
        display: flex;
        margin-bottom: 70px;
        .spanTitle{
        display: flex;
          display: flex;
          margin-left: 5px;
          width: 245px;
          text-align: left;
        }

      }

      .stepTitle{
        margin-top: 11px;
        height: 15px;
        font-size: 16px;
        font-family: HarmonyHeiTi;
        font-weight: 400;
        color: #000000;
        line-height: 24px;
      }
    }
    .stepTitleNode{
        padding-top: 50px;
        margin: 0px 0 30px 98px;
        width: 185px;
        height: 19px;
        font-size: 20px;
        font-family: HarmonyHeiTi;
        font-weight: 600;
        color: #5844BE;
        line-height: 15px;
      }
    .circle-progress {
      display: flex;
      justify-content: center;
      position: relative;
      top: -80px;
    }
    .footer_title{
        width: 55%;
        display:flex;
        flex-direction: column;
        .bottom_titile1{
          margin-top: 50px;
          height: 19px;
          font-size: 20px;
          font-family: HarmonyHeiTi;
          font-weight: 600;
          color: #5844BE;
          line-height: 15px;
          width: 100%;
        }
        .el-upload__tip{
          padding-left: 0px;
          width: 76%;
          font-size: 14px;
          font-weight: 400;
          color: #8E8E8E;
          margin-top: 10px;
        }
      }
    .experienceData{
      flex-direction: column;
      margin-top: 30px;
      display: flex;
    }
  }
  .btnClass{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -110px;
    padding-bottom: 30px;
    .batchProButtonTry{
      width:110px;
      height:35px;
      background-color: #5F45BE;
      cursor: pointer;
    }
  }
  .div_title_tip{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: 55.5%;
    top: -160px;
    padding-bottom: 30px;
    width: 34%;
    font-size: 12px;
    font-family: HarmonyHeiTi;
    font-weight: 200;
    color: #5E40C8;
    line-height: 17px;
    .title_tip{
      padding: 0 0 0 6px;
    }
  }

}
</style>
