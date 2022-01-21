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
  <div
    class="apphome"
    ref="apphome"
  >
    <div class="banner">
      <home-swiper />
    </div>
    <div class="sence_app common_background">
      <div class="sence">
        <p
          class="sence_title defaultFontBlod"
          :class="{'sence_title_en': language === 'en' }"
        >
          {{ $t('store.senceCase') }}
        </p>
        <p class="sence_line" />
        <div class="sence_case">
          <div
            class="oneCase"
            v-for="(item ,index) in senceCaseData"
            :key="index"
          >
            <img
              class="oneCase_img hover_pointer"
              :src="item.imgSrc"
              @click="senceDetail(item)"
              alt=""
            >
            <div class="oneCase_content">
              <p class="oneCase_content_name">
                {{ item.nameCn }}
              </p>
              <div class="oneCase_content_labels">
                <div
                  v-for="(label,i ) in item.label"
                  :key="i"
                  class="oneLabel"
                >
                  <p class="oneLabel_spot" />
                  <p class="oneLabel_name">
                    {{ label.labelCn }}
                  </p>
                </div>
              </div>
              <p class="oneCase_content_desc">
                {{ item.describtionCn }}
              </p>
            </div>
          </div>
        </div>
        <p
          class="more defaultFontLight"
          @click="jumpToAppList"
        >
          {{ $t('store.viewMore') }}
        </p>
      </div>
      <div class="app_recommend">
        <p
          class="sence_title defaultFontBlod"
          :class="{'apprecommend_title_en': language === 'en' }"
        >
          {{ $t('store.appRecommend') }}
        </p>
        <p class="sence_line" />
        <div class="app_tab">
          <p
            class="app_tab_title hover_pointer"
            :class="{'hotApp_title_en': language === 'en', 'app_tab_title_click': hotappType === true}"
            @click="showHotApp"
          >
            {{ $t('store.hotApp') }}
            <span
              v-if="hotappType"
              class="title_line"
            />
          </p>
          <p
            class="app_tab_title hover_pointer scoreApp_title"
            :class="{'scoreApp_title_en': language === 'en', 'app_tab_title_click': hotappType === false}"
            @click="showScoreApp"
          >
            {{ $t('store.higherScore') }}
            <span
              v-if="!hotappType"
              class="title_line"
            />
          </p>
        </div>
      </div>
      <div
        v-show="hotappType"
        class="hotApp"
        v-loading="newAppDataLoading"
      >
        <div
          v-for="(item,index) in newAppData"
          :key="index"
          class="oneAppStyle"
          v-show="showDefaultData"
        >
          <img
            :src="item.imgSrc"
            class="oneApp_img hover_pointer"
            alt=""
            @click="jumpToAppList"
          >
          <p class="oneApp_name defaultFontLight">
            {{ item.name }}
          </p>
        </div>
        <div
          v-for="(item,index) in newAppDataBe"
          :key="index"
          class="oneAppStyle"
          v-show="!showDefaultData"
        >
          <img
            :src="getImageUrl(item.appId)"
            class="oneApp_img hover_pointer"
            alt=""
            @click="jumpToDetai(item)"
          >
          <p class="oneApp_name defaultFontLight">
            {{ item.name }}
          </p>
        </div>
      </div>
      <div
        v-show="!hotappType"
        class="hotApp"
        v-loading="scoreHighDataLoading"
      >
        <div
          v-for="(item,index) in scoreHighestData"
          :key="index"
          class="oneAppStyle"
          v-show="showDefaultData"
        >
          <img
            :src="item.imgSrc"
            alt=""
            class="oneApp_img hover_pointer"
            @click="jumpToAppList"
          >
          <p class="oneApp_name">
            {{ item.name }}
          </p>
          <el-rate
            v-model="item.score"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          />
        </div>
        <div
          v-for="(item,index) in scoreHighestDataBe"
          :key="index"
          class="oneAppStyle"
          v-show="!showDefaultData"
        >
          <img
            :src="getImageUrl(item.appId)"
            alt=""
            class="oneApp_img hover_pointer"
            @click="jumpToDetai(item)"
          >
          <p class="oneApp_name">
            {{ item.name }}
          </p>
          <el-rate
            v-model="item.score"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          />
        </div>
      </div>
      <p
        class="more defaultFontLight hotAppMore scoreMore"
        @click="jumpToAppList"
      >
        {{ $t('store.viewMore') }}
      </p>
    </div>
    <div v-show="uploadDiaVis">
      <uploadPackage
        v-model="uploadDiaVis"
      />
    </div>
  </div>
</template>
<script>
import { queryApp, URL_PREFIX } from '../../tools/api.js'
import { INDUSTRY, TYPES, AFFINITY, SORTITEM } from '../../tools/constant.js'
import HomeSwiper from '../../components/common/Swipers.vue'
import uploadPackage from '../home/UploadPackage.vue'
import { mapState } from 'vuex'
import commonUtil from '../../tools/commonUtil.js'
import { eventBus } from '../../tools/bus.js'
export default {
  name: 'Home',
  components: {
    uploadPackage,
    HomeSwiper
  },
  data () {
    return {
      dialogVisible: false,
      hotappType: true,
      appData: [],
      apps: [],
      selectedConditions: [],
      uploadDiaVis: false,
      swiperOption: {
        slidesPerView: 6,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      senceCaseData: [
        {
          imgSrc: require('../../assets/images/senceCase1.png'),
          nameCn: '5G移动',
          nameEn: '5G Mobile',
          label: [
            {
              labelCn: '生态环境',
              labelEn: 'Ecological environment'
            },
            {
              labelCn: '智慧工地',
              labelEn: 'Smart site'
            }
          ],
          describtionCn: '为解决智慧园区工地内网络差、通信难，加强施工现场质量与安全管理、降低事故发生频率、杜绝各种违规操作和不文明施工行为',
          describtionEn: 'In order to solve the poor network and difficult communication in the construction site of the smart Park, strengthen the quality and safety management of the construction site, reduce the frequency of accidents, and eliminate all kinds of illegal operations and uncivilized construction'
        },
        {
          imgSrc: require('../../assets/images/senceCase2.png'),
          nameCn: '5G移动',
          nameEn: '5G Mobile',
          label: [
            {
              labelCn: '生态环境',
              labelEn: 'Ecological environment'
            },
            {
              labelCn: '智慧工地',
              labelEn: 'Smart site'
            }
          ],
          describtionCn: '为解决智慧园区工地内网络差、通信难，加强施工现场质量与安全管理、降低事故发生频率、杜绝各种违规操作和不文明施工行为',
          describtionEn: 'In order to solve the poor network and difficult communication in the construction site of the smart Park, strengthen the quality and safety management of the construction site, reduce the frequency of accidents, and eliminate all kinds of illegal operations and uncivilized construction'
        },
        {
          imgSrc: require('../../assets/images/senceCase3.png'),
          nameCn: '5G移动',
          nameEn: '5G Mobile',
          label: [
            {
              labelCn: '生态环境',
              labelEn: 'Ecological environment'
            },
            {
              labelCn: '智慧工地',
              labelEn: 'Smart site'
            }
          ],
          describtionCn: '为解决智慧园区工地内网络差、通信难，加强施工现场质量与安全管理、降低事故发生频率、杜绝各种违规操作和不文明施工行为',
          describtionEn: 'In order to solve the poor network and difficult communication in the construction site of the smart Park, strengthen the quality and safety management of the construction site, reduce the frequency of accidents, and eliminate all kinds of illegal operations and uncivilized construction'
        },
        {
          imgSrc: require('../../assets/images/senceCase4.png'),
          nameCn: '5G移动',
          nameEn: '5G Mobile',
          label: [
            {
              labelCn: '生态环境',
              labelEn: 'Ecological environment'
            },
            {
              labelCn: '智慧工地',
              labelEn: 'Smart site'
            }
          ],
          describtionCn: '为解决智慧园区工地内网络差、通信难，加强施工现场质量与安全管理、降低事故发生频率、杜绝各种违规操作和不文明施工行为',
          describtionEn: 'In order to solve the poor network and difficult communication in the construction site of the smart Park, strengthen the quality and safety management of the construction site, reduce the frequency of accidents, and eliminate all kinds of illegal operations and uncivilized construction'
        },
        {
          imgSrc: require('../../assets/images/senceCase5.png'),
          nameCn: '5G移动',
          nameEn: '5G Mobile',
          label: [
            {
              labelCn: '生态环境',
              labelEn: 'Ecological environment'
            },
            {
              labelCn: '智慧工地',
              labelEn: 'Smart site'
            }
          ],
          describtionCn: '为解决智慧园区工地内网络差、通信难，加强施工现场质量与安全管理、降低事故发生频率、杜绝各种违规操作和不文明施工行为',
          describtionEn: 'In order to solve the poor network and difficult communication in the construction site of the smart Park, strengthen the quality and safety management of the construction site, reduce the frequency of accidents, and eliminate all kinds of illegal operations and uncivilized construction'
        },
        {
          imgSrc: require('../../assets/images/senceCase6.png'),
          nameCn: '5G移动',
          nameEn: '5G Mobile',
          label: [
            {
              labelCn: '生态环境',
              labelEn: 'Ecological environment'
            },
            {
              labelCn: '智慧工地',
              labelEn: 'Smart site'
            }
          ],
          describtionCn: '为解决智慧园区工地内网络差、通信难，加强施工现场质量与安全管理、降低事故发生频率、杜绝各种违规操作和不文明施工行为',
          describtionEn: 'In order to solve the poor network and difficult communication in the construction site of the smart Park, strengthen the quality and safety management of the construction site, reduce the frequency of accidents, and eliminate all kinds of illegal operations and uncivilized construction'
        }
      ],
      newAppData: [
        {
          imgSrc: require('../../assets/images/hotApp1.jpg'),
          name: 'kingsoftcloud'
        },
        {
          imgSrc: require('../../assets/images/hotApp2.jpg'),
          name: 'ktmedia'
        },
        {
          imgSrc: require('../../assets/images/hotApp3.jpg'),
          name: 'TcsaeAnalysis'
        },
        {
          imgSrc: require('../../assets/images/hotApp4.jpg'),
          name: 'AnanMeeting'
        },
        {
          imgSrc: require('../../assets/images/hotApp5.jpg'),
          name: 'cras'
        },
        {
          imgSrc: require('../../assets/images/hotApp6.jpg'),
          name: 'position_service'
        }
      ],
      scoreData: [
        {
          type: 'sortItem',
          index: 2
        }],
      floor: [],
      relateApp1: [
        {
          name: 'zoneminder',
          appId: require('../../assets/images/zoneminder.jpg')
        },
        {
          name: 'Anheng-WAF',
          appId: require('../../assets/images/anheng-WAF.jpg')
        }, {
          name: 'Kingsoftcloud',
          appId: require('../../assets/images/kingsoftcloud.jpg')
        }, {
          name: 'CloudVR',
          appId: require('../../assets/images/cloudVR.png')
        },
        {
          name: 'Edge_VR教育平台',
          appId: require('../../assets/images/edge_VR.jpg')
        },
        {
          name: 'ktmedia',
          appId: require('../../assets/images/ktmedia.jpg')
        }
      ],
      relateApp2: [
        {
          name: 'factorywording',
          appId: require('../../assets/images/factorywording.jpg')
        },
        {
          name: 'PCB_defet_detection',
          appId: require('../../assets/images/pcb_defect_detection.png')
        }
      ],
      relateApp3: [
        {
          name: 'TcsaeAnalysis',
          appId: require('../../assets/images/hotApp3.jpg')
        },
        {
          name: 'Yunex',
          appId: require('../../assets/images/yunex.jpg')
        },
        {
          name: 'roadSideUnit',
          appId: require('../../assets/images/roadSideUnit.jpg')
        }
      ],
      scoreHighestData: [
        {
          imgSrc: require('../../assets/images/yunex.jpg'),
          name: 'Yunex',
          score: 5
        },
        {
          imgSrc: require('../../assets/images/roadSideUnit.jpg'),
          name: 'roadSideUnit',
          score: 4.9
        },
        {
          imgSrc: require('../../assets/images/hotApp3.jpg'),
          name: 'TcsaeAnalysis',
          score: 4.9
        },
        {
          imgSrc: require('../../assets/images/cloudVR.png'),
          name: 'CloudVR',
          score: 4.8
        },
        {
          imgSrc: require('../../assets/images/anheng-WAF.jpg'),
          name: 'Anheng-WAF',
          score: 4.7
        },
        {
          imgSrc: require('../../assets/images/factorywording.jpg'),
          name: 'factorywording',
          score: 4.7
        },
        {
          imgSrc: require('../../assets/images/edge_VR.jpg'),
          name: 'Edge_VR教育平台',
          score: 4.7
        },
        {
          imgSrc: require('../../assets/images/pcb_defect_detection.png'),
          name: 'PCB_defet_detection',
          score: 4.7
        }
      ],
      industry: INDUSTRY,
      types: TYPES,
      affinity: AFFINITY,
      sortItem: SORTITEM,
      language: localStorage.getItem('language'),
      showDefaultData: false,
      showApp: true,
      newAppDataLoading: true,
      newAppDataBe: [],
      showDefaultScoreData: false,
      scoreHighDataLoading: true,
      scoreHighestDataBe: [],
      dialog_datas: {},
      dialog_type: '',
      parkcn: [ { title: '高效' },
        { title: '5G' },
        { title: '安全' }],
      parken: [ { title: 'Efficient' },
        { title: '5G' },
        { title: 'Safety' }],
      industrialcn: [ { title: '数字' },
        { title: '智能化' },
        { title: '感知' }],
      industrialen: [ { title: 'Digitizing' },
        { title: 'Intelligent' },
        { title: 'Perceive' }],
      logisticscn: [{ title: '分析' },
        { title: 'AI' },
        { title: '预测' }],
      logisticsen: [
        { title: 'Analyze' },
        { title: 'AI' },
        { title: 'Predict' }],
      searchCondition: {
        type: [],
        affinity: [],
        industry: [],
        deployMode: [],
        workloadType: [],
        userId: '',
        queryCtrl: {
          status: ['Published'],
          appName: '',
          offset: 0,
          limit: 100,
          sortItem: 'createTime',
          sortType: 'asc'
        }
      }
    }
  },
  methods: {
    changeHash (idName) {
      document.querySelector(idName).scrollIntoView(true)
    },
    senceDetail (data) {
      this.$router.push({ name: 'senceDetail' })
      eventBus.$emit('senceContent', data)
    },
    dialogDetil (item) {
      this.appData = []
      this.apps = []
      this.dialogVisible = true
      this.dialog_datas = item
      this.dialog_type = item.industry
      this.getDialogApp()
      if (this.dialog_type === 'Smart Park' && this.language === 'cn') {
        this.floor = this.parkcn
        this.apps = this.relateApp1
      } else if (this.dialog_type === 'Smart Park' && this.language === 'en') {
        this.floor = this.parken
        this.apps = this.relateApp1
      } else if (this.dialog_type === 'Industrial Manufacturing' && this.language === 'cn') {
        this.floor = this.floor = this.industrialcn
        this.apps = this.relateApp2
      } else if (this.dialog_type === 'Industrial Manufacturing' && this.language === 'en') {
        this.floor = this.industrialen
        this.apps = this.relateApp2
      } else if (this.dialog_type === 'logistics' && this.language === 'cn') {
        this.floor = this.logisticscn
        this.apps = this.relateApp3
      } else if (this.dialog_type === 'logistics' && this.language === 'en') {
        this.floor = this.logisticsen
        this.apps = this.relateApp3
      }
    },
    randomRgb () {
      let R = Math.floor(window.crypto.getRandomValues(new Uint8Array(1)) * 0.001 * 130 + 60)
      let G = Math.floor(window.crypto.getRandomValues(new Uint8Array(1)) * 0.001 * 130 + 80)
      let B = Math.floor(window.crypto.getRandomValues(new Uint8Array(1)) * 0.001 * 130 + 100)
      return {
        color: 'rgb(' + R + ',' + G + ',' + B + ')',
        background: 'rgba(' + R + ',' + G + ',' + B + ',0.25)'
      }
    },
    selectedCondition (type, index) {
      this[type][index].selected = !this[type][index].selected
      this.selectedConditions = []
      let types = ['types', 'affinity', 'industry', 'sortItem']
      if (this.selectedConditions) {
        types.forEach((item) => {
          this[item].forEach((condition) => {
            if (condition.selected) this.selectedConditions.push(condition)
          })
        })
      }
      this.$router.push({ name: 'appstorename', params: { data: JSON.stringify(this.selectedConditions) } })
    },
    refreshCondition () {
      let types = ['types', 'affinity', 'industry']
      if (this.selectedConditions) {
        types.forEach((item) => {
          this[item].forEach((condition) => {
            condition.selected = false
          })
        })
      }
    },
    jumpToAppList () {
      this.$router.push('/index')
    },
    getRandomArrayElements (arr, count) {
      let shuffled = arr.slice(0); let i = arr.length; let min = i - count; let temp; let index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    getHotAppData () {
      let queryParam = {
        queryCtrl: {
          status: ['Published'],
          appName: '',
          offset: 0,
          limit: 1000,
          sortItem: 'isHotApp',
          sortType: 'desc'
        },
        showType: ['inner-public', 'public']
      }
      queryApp(queryParam)
        .then(res => {
          let resDatas = res.data.results
          if (resDatas.length >= 15) {
            let tempPopularApp = []
            let tempDisplayApp = []
            for (let item of resDatas) {
              if (item.hotApp) {
                tempPopularApp.push(item)
              } else {
                tempDisplayApp.push(item)
              }
            }
            if (tempPopularApp.length >= 15) {
              this.newAppDataBe = this.getRandomArrayElements(tempPopularApp, 15)
            } else {
              if (tempPopularApp.length > 0) {
                let part1 = this.getRandomArrayElements(tempPopularApp, tempPopularApp.length)
                let part2 = this.getRandomArrayElements(tempDisplayApp, 15 - tempPopularApp.length)
                this.newAppDataBe = part1.concat(part2)
              } else {
                this.newAppDataBe = this.getRandomArrayElements(tempDisplayApp, 15)
              }
            }
            this.showDefaultData = false
          } else {
            this.showDefaultData = true
          }
          this.newAppDataLoading = false
        }).catch((error) => {
          let defaultMsg = this.$t('appManager.queryHotAppFailed')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        })
    },
    getDialogApp () {
      let queryParam = {
        queryCtrl: {
          status: ['Published'],
          appName: '',
          offset: 0,
          limit: 1000,
          sortItem: '',
          sortType: ''
        },
        industry: [this.dialog_type],
        showType: ['inner-public', 'public']
      }
      queryApp(queryParam)
        .then(res => {
          this.appData = res.data.results
          if (this.appData.length === 0) {
            this.showApp = true
          } else if (this.appData.length > 0 && this.appData.length < 15) {
            this.showApp = false
            this.appData = this.getRandomArrayElements(this.appData, this.appData.length)
          } else {
            this.showApp = false
            this.appData = this.getRandomArrayElements(this.appData, 15)
          }
        })
    },
    getAppData () {
      queryApp(this.searchCondition).then(
        (res) => {
          let data = res.data.results
          data.sort(function (a, b) {
            return a.score < b.score ? 1 : -1
          })
          this.scoreHighestDataBe = []
          if (data.length >= 15) {
            for (let i = 0; i <= 14; i++) {
              this.scoreHighestDataBe.push(data[i])
            }
          } else {
            this.showDefaultScoreData = true
          }
          this.scoreHighDataLoading = false
        },
        () => {
          this.showDefaultData = true
          this.showDefaultScoreData = true
          this.newAppDataLoading = false
          this.scoreHighDataLoading = false
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.getAppFail')
          })
        }
      )
    },
    showHotApp () {
      this.hotappType = true
    },
    showScoreApp () {
      this.hotappType = false
    },
    getImageUrl (appId) {
      return URL_PREFIX + 'apps/' + appId + '/icon'
    },
    jumpToDetai (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
      sessionStorage.setItem('pathSource', 'index')
    }
  },
  computed: {
    ...mapState(['language'])
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getAppData()
    this.getHotAppData()
    this.refreshCondition()
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less">
.apphome{
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 1200px;
  color: #fff;
  .banner{
    padding: 0;
  }
  p{
    margin: 0;
  }
  .more{
    margin: 0px auto;
    font-size: 18px;
    color:#5944C0;
    width: 120px;
    height: 40px;
    position: relative;
    top: 8px;
    left: 0;
    text-align: center;
    line-height: 40px;
    background: #fff;
    border-radius: 28px;
    margin-top: 10px;
  }
  .scoreMore{
    position: relative;
    top: -58px;
    left: 0;
  }
  .more:hover{
    color:#fff;
    cursor: pointer;
    background: #5944C0;
  }
  .sence_title{
    font-size: 36px;
    margin: 20px auto 6px;
    width: 174px;
    letter-spacing: 4px;
  }
  .sence_title_en{
    width: 234px;
  }
  .apprecommend_title_en{
    width: 350px;
  }
  .hotApp_title_en{
    width: 58px;
  }
  .scoreApp_title_en{
    width: 110px;
  }
  .sence_line{
    width: 80px;
    height: 6px;
    margin: 0 auto;
    border-radius: 4px;
    background: rgba(250,250,250,0.3);
  }
  .sence_app{
    width: 76.08%;
    border-radius: 24px;
    z-index: 1000;
    margin: 0 auto;
    .sence{
      width: 100%;
      height: 1000px;
      padding: 0 2%;
      padding-bottom:30px;
      .sence_case{
        width: 100%;
        height: 85.4%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        .oneCase{
          width:28%;
          height: 43%;
          .oneCase_img{
            width: 100%;
            height: 60%;
            border-radius: 10px;
          }
          .oneCase_content{
            border-radius: 10px;
            width: 100%;
            height: 50%;
            position: relative;
            top: -10%;
            left: 0;
            background: #4e3494;
            .oneCase_content_name{
              width: 85%;
              margin: 2% auto;
              font-size: 24px;
              height: 48px;
              line-height: 60px;
            }
            .oneCase_content_labels{
              width: 85%;
              margin: 0 auto;
              display: flex;
              .oneLabel{
                display: flex;
                width: 140px;
                .oneLabel_spot{
                  width: 10px;
                  height: 10px;
                  position: relative;
                  top:4px;
                  left: 0;
                  border-radius: 50%;
                  background: #43F6AD;
                  margin: 2% 8% 2% 0;
                }
                .oneLabel_name{
                  font-size: 18px;
                }
              }
            }
            .oneCase_content_desc{
              width: 85%;
              margin: 2% auto;
              font-size: 16px;
              color:#fff;
              text-indent: 2em;
              line-height: 26px;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
    .app_recommend{
      width: 100%;
      height:80px;
      padding: 0 2%;
      .app_tab{
        margin: 20px 3.2% 0;
        display: flex;
        .app_tab_title{
          font-size:20px;
          margin-right: 20px;
          min-width: 80px;
          line-height: 20px;
          .title_line{
            display: block;
            width: 40px;
            height: 8px;
            margin: 8px auto;
            text-align: center;
            border-bottom: 2px solid #43F6AD;
          }
        }
        .scoreApp_title{
          width: 152px;
        }
        .app_tab_title_click{
          font-size: 22px;
        }
        .app_tab_title:hover{
          font-size: 22px;
        }
      }
    }
    .hotApp{
      width: 100%;
      padding-top: 2%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding-left: 4%;
      padding-bottom: 80px;
      .oneAppStyle{
        width: 14.3%;
        border-radius: 8px;
        height: 220px;
        margin: 5% 4% 0 1.5%;
        display: flex;
        justify-content: center;
        background: #4e3494;
        flex-direction: column;
        .oneApp_img{
          width: 55.56%;
          height: 50%;
          border-radius: 10px;
          margin: 10px auto;
        }
        .oneApp_name{
          font-size: 20px;
          width: 80%;
          height: 24px;
          margin: 0 auto;
          text-align: center;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .el-rate{
          margin:0 auto;
        }
        .el-rate__icon{
          font-size: 14px;
        }
      }
    }
    .hotAppMore{
      margin: 20px auto 30px ;
    }
  }
  @media (max-width: 1600px) and (min-width: 1200px) {
    .more{
      font-size: 14px;
      width: 100px;
      height: 28px;
      position: relative;
      top: 8px;
      left: 0;
      line-height: 24px;
      border-radius: 28px;
      margin-top: 10px;
    }
    .scoreMore{
      position: relative;
      top: -40px;
      left: 0;
    }
    .sence_title{
      font-size: 24px;
      margin: 20px auto 6px;
      width: 120px;
      letter-spacing: 4px;
    }
    .sence_title_en{
      width: 168px;
    }
    .apprecommend_title_en{
      width: 250px;
    }
    .hotApp_title_en{
      width: 58px;
    }
    .scoreApp_title_en{
      width: 110px;
    }
    .sence_line{
      width: 40px;
      height: 4px;
      border-radius: 4px;
    }
    .sence_app{
      border-radius: 24px;
      margin: 0 auto 100px;
      .sence{
        height: 670px;
        padding-top: 10px;
        padding-bottom:30px;
        .sence_case{
          .oneCase{
            .oneCase_content{
              .oneCase_content_name{
                font-size: 16px;
                height: 36px;
                line-height: 48px;
              }
              .oneCase_content_labels{
                .oneLabel{
                  width: 100px;
                  .oneLabel_spot{
                    width: 5px;
                    height: 5px;
                  }
                  .oneLabel_name{
                    font-size: 14px;
                  }
                }
              }
              .oneCase_content_desc{
                font-size: 12px;
                -webkit-line-clamp: 2;
                line-height: 22px;
              }
            }
          }
        }
      }
      .app_recommend{
        width: 100%;
        height:80px;
        padding: 0 2%;
        .app_tab{
          margin: 20px 3.2% 0;
          .app_tab_title{
            font-size:14px;
            margin-right: 20px;
            line-height: 20px;
            .title_line{
              width: 30px;
              height: 6px;
              margin: 4px auto;
              border-bottom: 2px solid #43F6AD;
            }
          }
          .app_tab_title_click{
            font-size: 16px;
          }
          .app_tab_title:hover{
            font-size: 16px;
          }
        }
      }
      .hotApp{
        width: 100%;
        padding-top: 2%;
        padding-left: 4%;
        .oneAppStyle{
          width: 14.3%;
          border-radius: 8px;
          height: 160px;
          margin: 5% 4% 0 1.5%;
          .oneApp_img{
            width: 55.56%;
            height: 50%;
            border-radius: 10px;
            margin: 10px auto;
          }
          .oneApp_name{
            font-size: 14px;
            width: 80%;
            height: 24px;
          }
          .el-rate__icon{
            font-size: 14px;
          }
        }
      }
      .hotAppMore{
        margin: 20px auto 30px ;
      }
    }
  }
}

</style>
