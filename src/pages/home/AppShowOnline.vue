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
    <div class="show_app clearfix">
      <div
        class="show_common lt"
      >
        <img
          class="status3-pic"
          :src="appTry"
          alt=""
        >
        <p class="show_btn">
          <el-button
            type="primary"
            class="batchProButton"
            style="width:110px;height:35px;"
            :disabled="btnInstantiate"
            @click="getNodePort(currentData)"
          >
            {{ $t('store.showOnline') }}
          </el-button>
          <el-button
            type="primary"
            class="batchProButton"
            style="width:110px;height:35px;margin-left:40px;"
            :disabled="btnClean"
            @click="cleanTestEnv(currentData)"
          >
            {{ $t('store.releaseResource') }}
          </el-button>
        </p>
      </div>

      <div class="show_step lt">
        <p class="top_titile">
          {{ $t('store.experiencePhase') }}
        </p>
        <div
          class="card_content"
        >
          <el-timeline class="timeline-class">
            <el-timeline>
              <el-timeline-item
                placement="top"
                :type="primary"
                :autofocus="true"
                :icon="iconStart"
                class="line_top"
              />
              <el-timeline-item
                placement="top"
                :class="{'line_list':btnType==='primary'}"
              >
                <el-button
                  :plain="true"
                  :type="btnType"
                  @click="step1"
                  :autofocus="true"
                  disabled="true"
                  style="width:170px;margin-bottom:15px;"
                  :icon="el-icon-check"
                >
                  {{ $t('store.assignTestNodes') }}
                </el-button>

                <p v-show="tip11">
                  {{ $t('store.step11') }}
                </p>
                <p v-show="tip12">
                  {{ $t('store.step12') }}
                </p>
                <p v-show="tip13">
                  {{ $t('store.step13') }}
                </p>
              </el-timeline-item>
              <el-timeline-item
                placement="top"
                :class="{'line_list':btnType1==='primary'}"
              >
                <el-button
                  :plain="true"
                  :type="btnType1"
                  @click="step2"
                  :autofocus="true"
                  disabled="true"
                  style="width:170px;margin-bottom:15px;"
                >
                  {{ $t('store.instantiateApplication') }}
                </el-button>

                <p v-show="tip21">
                  {{ $t('store.pleaseInstantiateApp') }}
                </p>
                <p v-show="tip22">
                  {{ $t('store.waitInstantiatedApp') }}
                </p>
                <p v-show="tip23">
                  {{ $t('store.StartDeployApp') }}
                </p>
              </el-timeline-item>
              <el-timeline-item
                placement="top"
                :class="{'line_list':btnType2==='primary'}"
              >
                <el-button
                  :plain="true"
                  :type="btnType2"
                  @click="step3"
                  disabled="true"
                  style="width:170px;margin-bottom:15px;"
                >
                  {{ $t('store.getDeploymentStatus') }}
                </el-button>
                <p v-show="tip31">
                  {{ $t('store.queryDeployStatus') }}
                </p>
                <p v-show="tip32">
                  {{ $t('store.waitQueryStatus') }}
                </p>
                <p v-show="tip33">
                  {{ $t('store.deployFinished') }}
                </p>
              </el-timeline-item>
              <el-timeline-item
                :icon="iconStart"
                placement="top"
                class="line_top"
              />
            </el-timeline>
          </el-timeline>
        </div>
        <div v-if="displayDom">
          <p class="bottom_titile">
            {{ $t('store.tryAppDes') }}
          </p>
          <div class="footer_title">
            <p class="bottom_titile1">
              {{ $t('store.serviceNodeInfo') }}
            </p>
            <div
              class="el-upload__tip"
              slot="tip"
            >
              <em class="el-icon-warning" />
              {{ $t('store.releaseAppResource') }}
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
      </div>
    </div>
  </div>
</template>

<script>
// import { myApp, getAppTableApi } from '../../tools/api.js'
// import timeFormatTools from '../../tools/timeFormatTools.js'
// import commonUtil from '../../tools/commonUtil.js'
import { myApp } from '../../tools/api.js'
import appTry from '@/assets/images/apptry.png'
import startTry from '@/assets/images/startTry.png'
export default {
  props: {
    packageId: {
      required: true,
      type: String
    },
    appId: {
      required: true,
      type: String
    },
    ifExperience: {
      required: true,
      type: Boolean
    }
  },
  components: {
    // EgPagination
  },
  data () {
    return {
      deployMode: '',
      appTry: appTry,
      startTry: startTry,
      currentPageData: [],
      dataLoading: true,
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      userName: sessionStorage.getItem('userName'),
      name: '',
      ip: '',
      nodePort: '',
      experienceData: [],
      btnInstantiate: false,
      btnClean: true,
      deployStatus: 'NOTDEPLOY',
      workStatus: '',
      instantiateInfo: '',
      btnType: 'info',
      btnType1: 'info',
      btnType2: 'info',
      tip11: true,
      tip12: false,
      tip13: false,

      tip21: true,
      tip22: false,
      tip23: false,

      tip31: true,
      tip32: false,
      tip33: false,
      iconStart: 'el-icon-more',
      icon1: 'el-icon-more',
      icon2: 'el-icon-more',
      icon3: 'el-icon-more',
      displayDom: false,
      version: ''
    }
  },
  methods: {
    getExperienceAbleInfo () {
      myApp.getPackageDetailApi(this.appId, this.packageId).then(res => {
        let data = res.data
        let experienceAble = data.experienceAble
        this.deployMode = data.deployMode
        if (experienceAble) {
          this.ifExperience = true
          // this.initStatus()
        }
      })
    },
    step () {
      this.btnType = 'primary'
      this.tip11 = false
      this.tip12 = true
      setTimeout(() => this.step1(), 3000)
      this.tip12 = false
      this.tip13 = true
    },
    step1 () {
      this.btnType1 = 'primary'
      this.tip21 = false
      this.tip22 = true
      myApp.getNodePort(this.appId, this.packageId, this.userId, this.name, this.ip).then(
        (res) => {
          // this.nodePort = res.data
          let experienceInfo = res.data
          if (experienceInfo.message.indexOf('please register host') !== -1) {
            this.stepClean()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.registerHost')
            })
          } else if (experienceInfo.message.indexOf('instantiate application failed.') !== -1) {
            this.stepClean()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.instantiateFailed')
            })
          } else if (experienceInfo.message.indexOf('get app nodeport url failed.') !== -1) {
            this.stepClean()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.getNodePortFailed')
            })
          } else if (experienceInfo.message.indexOf('get app url success.') !== -1) {
            setTimeout(() => this.step2(experienceInfo), 3000)
          } else {
            this.stepClean()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: experienceInfo.message
            })
          }
        })
    },
    step2 (experienceInfo) {
      this.tip22 = false
      this.tip23 = true
      this.tip31 = false
      this.tip32 = true
      this.btnType2 = 'primary'
      setTimeout(() => this.step3(experienceInfo), 1000)
    },
    step3 (experienceInfo) {
      this.tip32 = false
      this.tip33 = true
      if (experienceInfo.data) {
        let tmpExperienceData = experienceInfo.data
        this.filterExperienceInfo(tmpExperienceData)
        this.displayDom = true
      }
      this.handleUploadSuccess()
    },
    stepClean () {
      this.btnClean = true
      this.btnInstantiate = false

      this.tip33 = false
      this.tip31 = true
      this.btnType = 'info'
      this.tip23 = false
      this.tip22 = false
      this.tip21 = true
      this.btnType1 = 'info'
      this.tip13 = false
      this.tip11 = true
      this.btnType2 = 'info'
    },
    getNodePort () {
      if (this.userName === 'guest') {
        this.$message.error(this.$t('system.guestPrompt'))
      } else {
        this.step()
        this.btnInstantiate = true
        this.btnClean = false
      }
    },
    filterExperienceInfo (tmpExperienceData) {
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
    cleanTestEnv () {
      if (this.userName === 'guest') {
        this.$message.error(this.$t('system.guestPrompt'))
      } else {
        myApp.cleanTestEnv(this.packageId, this.userId, this.name, this.ip).then(
          (res) => {
            let result = res.data
            if (result) {
              this.stepClean()
              this.experienceData = [
                {
                  serviceName: '',
                  nodePort: '',
                  mecHost: ''
                }
              ]
              this.displayDom = false
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
      myApp.getNodeStatus(this.packageId, this.userId, this.name, this.ip).then(
        (res) => {
          let experienceInfo = res.data
          this.initeData(experienceInfo)
          if (experienceInfo.message.indexOf('please register host.') !== -1) {
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.registerHost')
            })
          } else {
            this.initeData(experienceInfo)
          }
        })
    },
    initeData (experienceInfo) {
      if (experienceInfo.data) {
        let tmpExperienceData = experienceInfo.data
        this.filterExperienceInfo(tmpExperienceData)
        this.initeStatus()
      } else {
        this.btnInstantiate = false
        this.btnClean = true
      }
    },
    initeStatus () {
      this.btnInstantiate = true
      this.btnClean = false
      this.btnType = 'primary'
      this.btnType1 = 'primary'
      this.btnType2 = 'primary'
      this.tip11 = false
      this.tip21 = false
      this.tip31 = false
      this.tip12 = false
      this.tip22 = false
      this.tip32 = false
      this.tip13 = true
      this.tip23 = true
      this.tip33 = true
    },
    handleUploadSuccess () {
      this.$message({
        duration: 2000,
        message: this.$t('promptMessage.getNodePortSuccess'),
        type: 'success'
      })
    }

  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
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
    ifExperience (newStr) {
      this.ifExperience = newStr
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
.appShowOnline {
  margin: auto;
  background: #fff;
  border-radius: 16px;

  .paginationStyle{
    float: right;
    margin-top: 20px;
    margin-right: 30px;
  }
}
</style>
