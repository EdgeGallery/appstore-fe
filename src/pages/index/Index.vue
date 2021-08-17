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
    <ul
      class="scenceHref"
      v-show="showHerf == 1"
    >
      <li class="li1">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.newUploadApp') "
          placement="right-end"
        >
          <img
            src="../../assets/images/hot_selected.png"
            alt=""
            class="circle  hot_selected"
            @click="changeHash('#nearHotApp')"
          >
        </el-tooltip>
      </li>
      <li class="li2">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.senceCase') "
          placement="right-end"
        >
          <img
            src="../../assets/images/sence_unselected.png"
            alt=""
            class="circle"
            @click="changeHash('#sceneCase')"
          >
        </el-tooltip>
      </li>
      <li class="li3">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.higherScore') "
          placement="right-end"
        >
          <img
            src="../../assets/images/high_unselected.png"
            alt=""
            class="circle"
            @click="changeHash('#highScoreApp')"
          >
        </el-tooltip>
      </li>
    </ul>
    <ul
      class="scenceHref"
      v-show="showHerf == 2"
    >
      <li class="li1">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.newUploadApp') "
          placement="right-end"
        >
          <img
            src="../../assets/images/hot_unselected.png"
            alt=""
            class="circle  hot_selected"
            @click="changeHash('#nearHotApp')"
          >
        </el-tooltip>
      </li>
      <li class="li2">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.senceCase') "
          placement="right-end"
        >
          <img
            src="../../assets/images/sence_selected.png"
            alt=""
            class="circle"
            @click="changeHash('#sceneCase')"
          >
        </el-tooltip>
      </li>
      <li class="li3">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.higherScore') "
          placement="right-end"
        >
          <img
            src="../../assets/images/high_unselected.png"
            alt=""
            class="circle"
            @click="changeHash('#highScoreApp')"
          >
        </el-tooltip>
      </li>
    </ul>
    <ul
      class="scenceHref showHigh"
      v-show="showHerf == 3"
    >
      <li class="li1">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.newUploadApp') "
          placement="right-end"
        >
          <img
            src="../../assets/images/hot_unselected.png"
            alt=""
            class="circle  hot_selected"
            @click="changeHash('#nearHotApp')"
          >
        </el-tooltip>
      </li>
      <li class="li2">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.senceCase') "
          placement="right-end"
        >
          <img
            src="../../assets/images/sence_unselected.png"
            alt=""
            class="circle"
            @click="changeHash('#sceneCase')"
          >
        </el-tooltip>
      </li>
      <li class="li3">
        <el-tooltip
          class="item"
          effect="dark"
          :content=" $t('store.higherScore') "
          placement="right-end"
        >
          <img
            src="../../assets/images/high_selected.png"
            alt=""
            class="circle"
            @click="changeHash('#highScoreApp')"
          >
        </el-tooltip>
      </li>
    </ul>
    <div class="banner">
      <home-swiper />
    </div>
    <!-- Near Hot app -->
    <div
      class="score"
      id="nearHotApp"
      ref="pronbit"
    >
      <div class="titles">
        <h3>
          {{ $t('store.newUploadApp') }}
        </h3>
        <p class="lines" />
      </div>
      <div
        class="hot_data"
        v-loading="newAppDataLoading"
      >
        <div
          v-for="(item,index) in newAppData"
          :key="index"
          class="hotApp_bg"
          v-show="showDefaultData"
        >
          <img
            :src="item.imgSrc"
            alt=""
            @click="jumpToAppList"
          >
          <p class="high_name">
            {{ item.name }}
          </p>
        </div>
        <div
          v-for="(item,index) in newAppDataBe"
          :key="index"
          class="hotApp_bg"
          v-show="!showDefaultData"
        >
          <img
            :src="getImageUrl(item.appId)"
            alt=""
            @click="jumpToDetai(item)"
          >
          <p class="high_name">
            {{ item.name }}
          </p>
        </div>
      </div>
      <div class="more">
        <p
          class="home_more"
          :underline="false"
          @click="jumpToAppList"
        >
          {{ $t('store.viewMore') }}
        </p>
      </div>
    </div>
    <!-- Sence Case -->
    <div
      id="sceneCase"
      class="senceCase"
    >
      <div class="titles">
        <h3>
          {{ $t('store.senceCase') }}
        </h3>
        <p class="lines" />
      </div>
      <div class="case_data">
        <div
          class="oneCase"
          v-for="(item,index) in recommendData"
          :key="index"
          @click="dialogDetil(item)"
        >
          <img
            :src="item.imgSrc"
            alt=""
          >
          <div class="case_name">
            <p class="case_name1">
              {{ item.title }}
            </p>
            <img
              src="../../assets/images/case_name2.png"
              alt=""
              class="case_name2"
            >
          </div>
          <p class="case_content">
            {{ item.content }}
          </p>
        </div>
      </div>
      <div class="more">
        <p
          class="home_more"
          :underline="false"
          @click="jumpToAppList"
        >
          {{ $t('store.viewMore') }}
        </p>
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        class="sence_dialog"
      >
        <div class="dialog_data">
          <div class="dialog_top">
            <p>{{ this.dialog_datas.title }}</p>
            <img
              src="../../assets/images/closeDialog.png"
              alt=""
              @click="dialogVisible= false"
            >
          </div>
          <div class="dialog_center">
            <div class="center_left">
              <img
                :src="this.dialog_datas.imgSrc"
                alt=""
              >
            </div>
            <div class="center_right">
              <div class="right_content1">
                <p class="content_introduct">
                  {{ $t('store.introduct') }}:
                </p>
                <p class="content_introduct introducts">
                  {{ this.dialog_datas.introduce }}
                </p>
              </div>
              <div class="right_content2">
                <p class="content_tag">
                  {{ $t('store.tag') }}:
                </p>
                <div class="content_tags">
                  <span
                    class="dialog_label"
                    v-for="(label,index) in this.floor"
                    :key="index"
                    :style="randomRgb()"
                  >{{ label.title }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="dialog_footer">
            <p class="footer_name">
              {{ $t('store.reapp') }}
            </p>
            <div
              class="footer_apps"
            >
              <div
                class="footer_app"
                v-for="(item,index) in recommendData"
                :key="index"
                v-show="showApp"
              >
                <img
                  :src="item.imgSrc"
                  alt=""
                  @click="jumpToAppList"
                >
                <p>{{ item.title }}</p>
              </div>
              <div
                class="footer_app"
                v-for="(item,index) in this.appData"
                :key="index"
                v-show="!showApp"
              >
                <img
                  :src="getImageUrl(item.appId)"
                  @click="jumpToDetai(item)"
                  alt=""
                >
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- Highest rate-->
    <div
      class="score"
      id="highScoreApp"
    >
      <div class="titles">
        <h3>
          {{ $t('store.higherScore') }}
        </h3>
        <p class="lines" />
      </div>
      <div
        v-loading="scoreHighDataLoading"
        class="high_score"
      >
        <div
          v-for="(item,index) in scoreHighestData"
          :key="index"
          class="high_data"
          v-show="showDefaultScoreData"
        >
          <img
            :src="item.imgSrc"
            alt=""
            @click="jumpToAppList"
          >
          <p class="high_name">
            {{ item.name }}
          </p>
          <el-rate
            v-model="item.score"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          />
          <p class="score_num">
            {{ item.score }}
          </p>
        </div>
        <div
          v-for="(item,index) in scoreHighestDataBe"
          :key="index"
          class="high_data"
          v-show="!showDefaultScoreData"
        >
          <img
            :src="getImageUrl(item.appId)"
            alt=""
            @click="jumpToDetai(item)"
          >
          <p class="high_name">
            {{ item.name }}
          </p>
          <el-rate
            v-model="item.score"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          />
          <p class="score_num">
            {{ item.score }}
          </p>
        </div>
      </div>
      <div class="more">
        <p
          class="home_more"
          v-for="(item,index) in scoreData"
          :key="index"
          @click="selectedCondition(item.type,item.index)"
        >
          {{ $t('store.viewMore') }}
        </p>
      </div>
      <!-- Upload component -->
      <div v-show="uploadDiaVis">
        <uploadPackage
          v-model="uploadDiaVis"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getAppTableApi, URL_PREFIX } from '../../tools/api.js'
import { INDUSTRY, TYPES, AFFINITY, SORT_BY } from '../../tools/constant.js'
import HomeSwiper from '../../components/common/Swipers.vue'
import uploadPackage from '../home/UploadPackage.vue'
import { mapState } from 'vuex'
import { common } from '../../tools/comon.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
  name: 'Home',
  components: {
    uploadPackage,
    HomeSwiper
  },
  data () {
    return {
      aletMsg: '建议使用Google Chrome及IE9以上浏览器浏览',
      altMsgen: 'It is recommended to use Google Chrome and IE9 or higher browsers to browse',
      displayStsates: 'none',
      dialogVisible: false,
      showHerf: 1,
      appData: [],
      fullHeight: document.documentElement.offsetTop,
      selectedConditions: [],
      uploadDiaVis: false,
      hot_1: true,
      sence_1: false,
      high_1: false,
      screenHeight: document.body.clientHeight,
      newAppData: [
        {
          imgSrc: require('../../assets/images/hot1.png'),
          name: '万能钥匙'
        },
        {
          imgSrc: require('../../assets/images/hot2.png'),
          name: 'AR APP'
        },
        {
          imgSrc: require('../../assets/images/hot3.png'),
          name: 'location'
        },
        {
          imgSrc: require('../../assets/images/hot4.png'),
          name: '5G MEC Cloud VR 教育平台'
        },
        {
          imgSrc: require('../../assets/images/hot5.png'),
          name: 'LocationTest'
        },
        {
          imgSrc: require('../../assets/images/hot6.png'),
          name: '智能家居'
        }
      ],
      scoreData: [
        {
          type: 'sortBy',
          index: 2
        }],
      floor: [],
      recommendDatas: [
        {
          title: '智慧园区',
          content: '重新定义园区,以数字平台打造智慧园区的数字底座,让智慧触手可及',
          introduce: '园区是生活和工作的载体,是经济发展的核心助手,是构建万物互联的智能世界的落脚点。EdgeGallery解决方案源于自身管理变革和数字化转型实践,依托数字平台,联合生态伙伴,实现园区整体智慧化,使能业务创新,提高运营效率,引领至简体验'
        },
        {
          title: '工业制造',
          content: '采用数字技术简化流程,广泛使用智能化信息提高质量与效率,使机器与思想数字化融合',
          introduce: '工业制造智能化是指具有信息自感知、自决策、自执行等功能的先进制造过程、系统与模式的总称。具体体现在制造过程中的各个环节与新一代信息技术的深度融合,如物联网、大数据、云计算、人工智能等'
        },
        {
          title: '交通物流',
          content: '人悦其行,物优其流,AI使能,驱动交通物流数字化转型',
          introduce: '在交通物流领域中充分运用物联网、云计算、互联网等技术，通过高新技术汇集交通信息,使交通系统在区域、城市范围具备感知、互联、分析、预测、控制等能力,提升交通系统运行效率和管理水平'
        }
      ],
      recommendData: [
        {
          imgSrc: require('../../assets/images/sence1.png'),
          title: '智慧园区',
          titleen: 'Smart Park',
          content: '重新定义园区,以数字平台打造智慧园区的数字底座,让智慧触手可及',
          contenten: 'Redefine the park, build the digital base of the smart park with a digital platform, and make wisdom at your fingertips',
          industry: 'Smart Park',
          introduceen: 'The park is the carrier of life and work, the core assistant of economic development, and the foothold of building an intelligent world with all things connected. The EdgeGallery solution is derived from its own management reform and digital transformation practices. It relies on digital platforms and cooperates with ecological partners to realize the overall intelligence of the park, enable business innovation, improve operational efficiency, and lead to a simple experience.',
          introduce: '园区是生活和工作的载体,是经济发展的核心助手,是构建万物互联的智能世界的落脚点。EdgeGallery解决方案源于自身管理变革和数字化转型实践,依托数字平台,联合生态伙伴,实现园区整体智慧化,使能业务创新,提高运营效率,引领至简体验',
          index: 5
        },
        {
          imgSrc: require('../../assets/images/sence2.png'),
          title: '工业制造',
          titleen: 'Industry manufacture',
          industry: 'Industrial Manufacturing',
          contenten: 'Using digital technology to simplify the process, extensive use of intelligent information to improve quality and efficiency, and digital integration of machines and ideas',
          content: '采用数字技术简化流程,广泛使用智能化信息提高质量与效率,使机器与思想数字化融合',
          introduceen: 'Industrial manufacturing intelligence refers to the general term for advanced manufacturing processes, systems and models with functions such as information self-perception, self-decision-making, and self-execution. It is specifically reflected in the in-depth integration of various links in the manufacturing process with a new generation of information technology, such as the Internet of Things, big data, cloud computing, artificial intelligence, etc.',
          introduce: '工业制造智能化是指具有信息自感知、自决策、自执行等功能的先进制造过程、系统与模式的总称。具体体现在制造过程中的各个环节与新一代信息技术的深度融合,如物联网、大数据、云计算、人工智能等',
          index: 0
        },
        {
          imgSrc: require('../../assets/images/sence3.png'),
          titleen: 'Traffic logistics',
          title: '交通物流',
          contenten: 'People are pleased to walk, things are optimized for their flow, AI enabled, driving the digital transformation of transportation and logistics',
          content: '人悦其行,物优其流,AI使能,驱动交通物流数字化转型',
          introduceen: 'In the field of transportation and logistics, make full use of technologies such as the Internet of Things, cloud computing, and the Internet, and collect traffic information through high-tech, so that the transportation system has the ability to sense, interconnect, analyze, predict, and control in the region and city, and improve the operation efficiency of the transportation system And management level',
          introduce: '在交通物流领域中充分运用物联网、云计算、互联网等技术，通过高新技术汇集交通信息,使交通系统在区域、城市范围具备感知、互联、分析、预测、控制等能力,提升交通系统运行效率和管理水平',
          industry: 'logistics',
          index: 7
        }
      ],
      scoreHighestData: [
        {
          imgSrc: require('../../assets/images/high1.png'),
          name: '金山云',
          score: 5
        },
        {
          imgSrc: require('../../assets/images/high2.png'),
          name: 'Zoneminder',
          score: 4.8
        },
        {
          imgSrc: require('../../assets/images/high3.png'),
          name: '河图',
          score: 4.7
        },
        {
          imgSrc: require('../../assets/images/high4.png'),
          name: '福建空天',
          score: 4.9
        },
        {
          imgSrc: require('../../assets/images/high5.png'),
          name: 'Ant Media',
          score: 4.9
        },
        {
          imgSrc: require('../../assets/images/high6.png'),
          name: 'MediaPipe',
          score: 4.8
        }
      ],
      industry: INDUSTRY,
      types: TYPES,
      affinity: AFFINITY,
      sortBy: SORT_BY,
      developerUrl: '',
      language: localStorage.getItem('language'),
      mecmUrl: '',
      showDefaultData: false,
      showApp: true,
      newAppDataLoading: true,
      newAppDataBe: [],
      showDefaultScoreData: false,
      scoreHighDataLoading: true,
      scoreHighestDataBe: [],
      showWechat: false,
      limitSize: 100,
      appName: '',
      offsetPage: 0,
      prop: 'createTime',
      order: 'asc',
      dialog_datas: [],
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
      userId: sessionStorage.getItem('userId'),
      searchCondition: {
        appName: '',
        type: [],
        affinity: [],
        industry: [],
        status: 'Published',
        deployMode: [],
        workloadType: [],
        userId: '',
        queryCtrl: {
          offset: this.offsetPage,
          limit: this.limitSize,
          sortItem: this.prop,
          sortType: this.order
        }
      }
    }
  },
  methods: {
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'banner', 65)
    },
    changeHash (idName) {
      document.querySelector(idName).scrollIntoView(true)
    },
    handleScrollx () {
      const lengths = -this.$refs.pronbit.getBoundingClientRect().top
      if (lengths < 195) {
        this.showHerf = 1
      } else if (lengths > 195 && lengths < 975) {
        this.showHerf = 2
      } else if (lengths > 1125) {
        this.showHerf = 3
      }
    },
    dialogDetil (item) {
      this.appData = []
      console.log(this.appData)
      this.dialogVisible = true
      this.dialog_datas = item
      this.dialog_type = item.industry
      this.getDialogApp()
      if (this.dialog_type === 'Smart Park' && this.language === 'cn') {
        this.floor = this.parkcn
      } else if (this.dialog_type === 'Smart Park' && this.language === 'en') {
        this.floor = this.parken
      } else if (this.dialog_type === 'Industrial Manufacturing' && this.language === 'cn') {
        this.floor = this.floor = this.industrialcn
      } else if (this.dialog_type === 'Industrial Manufacturing' && this.language === 'en') {
        this.floor = this.industrialen
      } else if (this.dialog_type === 'logistics' && this.language === 'cn') {
        this.floor = this.logisticscn
      } else if (this.dialog_type === 'logistics' && this.language === 'en') {
        this.floor = this.logisticsen
      }
    },
    randomRgb () {
      let R = Math.floor(Math.random() * 130 + 60)
      let G = Math.floor(Math.random() * 130 + 80)
      let B = Math.floor(Math.random() * 130 + 100)
      return {
        color: 'rgb(' + R + ',' + G + ',' + B + ')',
        background: 'rgba(' + R + ',' + G + ',' + B + ',0.25)'
      }
    },
    alertDia (msg) {
      this.displayStsates = 'block'
      if (this.language === 'cn') {
        this.aletMsg = msg
      } else {
        this.altMsgen = msg
      }
      window.setTimeout(() => {
        this.displayStsates = 'none'
      }, 2000)
    },
    uploadPackage () {
      let userName = sessionStorage.getItem('userNameRole')
      if (userName === 'guest') {
        this.uploadDiaVis = false
      } else {
        this.uploadDiaVis = true
      }
    },
    selectedCondition (type, index) {
      this[type][index].selected = !this[type][index].selected
      this.selectedCondition2()
    },
    selectedCondition1 (type, index) {
      this.selectedCondition2()
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
    selectedCondition2 () {
      this.selectedConditions = []
      let types = ['types', 'affinity', 'industry', 'sortBy']
      if (this.selectedConditions) {
        types.forEach((item) => {
          this[item].forEach((condition) => {
            if (condition.selected) this.selectedConditions.push(condition)
          })
        })
      }
      this.$router.push({ name: 'appstorename', params: { data: JSON.stringify(this.selectedConditions) } })
    },
    jumpToAppList () {
      this.$router.push('/index')
    },
    getPlatformUrl () {
      let currUrl = window.location.origin
      if (currUrl.indexOf('30091') !== -1) {
        this.developerUrl = currUrl.replace('30091', '30092')
        this.mecmUrl = currUrl.replace('30091', '30093')
      } else {
        this.developerUrl = currUrl.replace('appstore', 'developer')
        this.mecmUrl = currUrl.replace('appstore', 'mecm')
      }
    },
    changeDataLanguage () {
      let language = localStorage.getItem('language')
      this.language = language
    },
    changeEnCn (language) {
      if (language === 'en') {
        if (this.dialog_type === 'Smart Park') {
          this.floor = this.parken
        } else if (this.dialog_type === 'Industrial Manufacturing') {
          this.floor = this.industrialen
        } else if (this.dialog_type === 'logistics') {
          this.floor = this.logisticsen
        }
        this.recommendData[0].title = this.recommendData[0].titleen
        this.recommendData[0].content = this.recommendData[0].contenten
        this.recommendData[0].introduce = this.recommendData[0].introduceen
        this.recommendData[1].title = this.recommendData[1].titleen
        this.recommendData[1].content = this.recommendData[1].contenten
        this.recommendData[1].introduce = this.recommendData[1].introduceen
        this.recommendData[2].title = this.recommendData[2].titleen
        this.recommendData[2].content = this.recommendData[2].contenten
        this.recommendData[2].introduce = this.recommendData[2].introduceen
      } else {
        if (this.dialog_type === 'Smart Park') {
          this.floor = this.parkcn
        } else if (this.dialog_type === 'Industrial Manufacturing') {
          this.floor = this.industrialcn
        } else if (this.dialog_type === 'logistics') {
          this.floor = this.logisticscn
        }
        this.recommendData[0].title = this.recommendDatas[0].title
        this.recommendData[0].content = this.recommendDatas[0].content
        this.recommendData[0].introduce = this.recommendDatas[0].introduce
        this.recommendData[1].title = this.recommendDatas[1].title
        this.recommendData[1].content = this.recommendDatas[1].content
        this.recommendData[1].introduce = this.recommendDatas[1].introduce
        this.recommendData[2].title = this.recommendDatas[2].title
        this.recommendData[2].content = this.recommendDatas[2].content
        this.recommendData[2].introduce = this.recommendDatas[2].introduce
      }
    },
    buildQueryReq () {
      let _queryReq = this.searchCondition
      this.searchCondition.queryCtrl = {
        offset: this.offsetPage,
        limit: this.limitSize,
        sortItem: this.prop,
        sortType: this.order
      }
      return _queryReq
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
      let queryCtrl = {
        offset: 0,
        limit: 1000,
        sortItem: 'isHotApp',
        sortType: 'desc'
      }
      let params = {
        queryCtrl: queryCtrl,
        showType: ['inner-public', 'public'],
        status: 'Published'
      }
      getAppTableApi(params)
        .then(res => {
          let resDatas = res.data.results
          if (resDatas.length >= 6) {
            let tempPopularApp = []
            let tempDisplayApp = []
            for (let item of resDatas) {
              if (item.hotApp) {
                tempPopularApp.push(item)
              } else {
                tempDisplayApp.push(item)
              }
            }
            if (tempPopularApp.length >= 6) {
              this.newAppDataBe = this.getRandomArrayElements(tempPopularApp, 6)
            } else {
              if (tempPopularApp.length > 0) {
                let part1 = this.getRandomArrayElements(tempPopularApp, tempPopularApp.length)
                let part2 = this.getRandomArrayElements(tempDisplayApp, 6 - tempPopularApp.length)
                this.newAppDataBe = part1.concat(part2)
              } else {
                this.newAppDataBe = this.getRandomArrayElements(tempDisplayApp, 6)
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
      let params = {
        queryCtrl: {
          offset: 0,
          limit: 1000,
          sortItem: '',
          sortType: '' },
        industry: [this.dialog_type],
        showType: ['inner-public', 'public'],
        status: 'Published'
      }
      getAppTableApi(params)
        .then(res => {
          this.appData = res.data.results
          if (this.appData.length === 0) {
            this.showApp = true
          } else if (this.appData.length > 0 && this.appData.length < 6) {
            this.showApp = false
            this.appData = this.getRandomArrayElements(this.appData, this.appData.length)
          } else {
            this.showApp = false
            this.appData = this.getRandomArrayElements(this.appData, 6)
          }
        })
      console.log(this.appData)
    },
    getAppData () {
      getAppTableApi(this.buildQueryReq()).then(
        (res) => {
          let data = res.data.results
          data.sort(function (a, b) {
            return a.score < b.score ? 1 : -1
          })
          this.scoreHighestDataBe = []
          if (data.length >= 8) {
            for (let i = 0; i <= 7; i++) {
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
      this.changeDataLanguage()
      this.changeEnCn(this.language)
    }
  },
  mounted () {
    this.getAppData()
    this.getHotAppData()
    this.changeEnCn(this.language)
    this.alertDia(this.aletMsg)
    this.refreshCondition()
    this.getPlatformUrl()
    window.addEventListener('scroll', this.handleScrollx, true)
  }
}
</script>

<style lang="less">
.apphome{
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 1200px;
  .banner{
    padding: 0;
    color: #fff;
  }
  .home_content{
    padding: 70px 15% 50px;
    .home_tit{
      font-size: 32px;
      text-align: center;
    }
  }
  .home_content:last-child{
    padding: 70px 15% 0;
  }
  .scenceHref{
    padding-top: 30px;
    position: fixed;
    left: 30px;
    top:150px;
    li{
      display: flex;
    }
    li:hover{
      cursor: pointer;
    }
    a{
      text-decoration: none;
    }
    .lineHref{
      height: 35px;
      color: #CBCBCB;
      margin: -2px -6px -6px 6px
    }
    .circle{
      display: block;
      width: 36px;
      height: 36px;
      margin-bottom: 10px;
      border-radius:50% ;
    }
  }

  .home_more:hover{
    cursor: pointer;
    color: #5d3da0;
    border:1px solid #5d3da0 ;
    background-color: #f4f1ff;
  }
  .home_more{
      width: 148px;
      height: 48px;
      border: 1px solid #5D3DA0;
      border-radius: 4px;
      text-align: center;
      margin: 15px 0 30px;
      color: #5D3DA0;
      line-height: 48px;
    }
  .titles{
    width: 1412px;
    height: 235px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h3{
      height: 35px;
      font-size: 36px;
      font-family: HarmonyOS Sans SC;
      font-weight: bold;
      color: #5D3DA0;
      margin-bottom:26px ;
    }
    .lines{
      width: 88px;
      height: 7px;
      background: #9E7BCD;
      opacity: 0.2;
      border-radius: 4px;
    }
  }
  .more{
    width: 100%;
    min-width: 1200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-rate__decimal{
    color: rgb(239,242,247);
  }
  .score{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 590px;
    width: 73.54%;
    margin-left:13.23%;
    margin-right: 13.23%;
    background:#f3f3f8;
    .hot_data{
      display: flex;
      width: 100%;
      height: 180px;
      justify-content: space-between;
    }
  }
  .high_score{
      display: flex;
      width: 100%;
      height: 260px;
      justify-content: space-between;
    .high_data:hover{
      box-shadow: 0px 30px 50px 0px rgba(66, 36, 157, 0.15);
      background-color: rgba(248,248,248);
      cursor: pointer;
    }
    .high_data{
      width: 12.7%;
      height: 260px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 10px;
      img{
        margin-top: 10px;
        width: 66.7%;
        height: 42.2%;
      }
      .high_name{
        font-size: 16px;
        font-family: HarmonyOS Sans SC;
        font-weight: 400;
        color: #111111;
        text-align: center;
        margin: 0;
      }
      .score_num{
        width: 80%;
        font-size: 14px;
        font-family: HarmonyOS Sans SC;
        font-weight: 400;
        color: #380879;
        text-align: center;
        margin: 0;
      }
    }
  }
  .hotApp_bg:hover{
      box-shadow: 0px 30px 50px 0px rgba(66, 36, 157, 0.15);
      background-color: rgba(248,248,248);
      cursor: pointer;
    }
  .hotApp_bg{
    background-color: #fff;
    width: 12.7%;
    padding-top: 2%;
    height: 180px;
    border-radius:10px ;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
       img{
         border-radius: 16px;
         width: 44.4%;
       }
      .high_name{
        font-size: 16px;
        font-family: HarmonyOS Sans SC;
        font-weight: 400;
        width: 80%;
        color: #111111;
        line-height: 24px;
        text-align: center;
      }
  }
  .senceCase{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 911px;
    width: 73.54%;
    margin-left:13.23%;
    margin-right: 13.23%;
    .case_data{
        height:520px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      .oneCase:hover{
        transform: scale( 1.05);
        transition: all 0.5s;
        cursor: pointer;
      }
      .oneCase{
        width: 28%;
        height: 520px;
        background: #FFFFFF;
        box-shadow: 0px 30px 50px 0px rgba(66, 36, 157, 0.15);
        border-radius: 4px;
        img{
           width:100%;
           height: 340px;
           border-radius: 8px 8px 0px 0px;
        }
        .case_name{
          margin: 36px 16px 0px 20px;
          display: flex;
          justify-content: space-between;
          .case_name1{
            font-size: 26px;
            font-family: HarmonyOS Sans SC;
            font-weight: 400;
            color: #111111;
            float: left;
          }
          .case_name2{
            width: 24px;
            height: 24px;
            margin-top: 10px;
          }
        }
     .case_content{
          margin: 0px 20px;
          font-size: 16px;
          font-family: HarmonyOS Sans SC;
          font-weight: 400;
          height: 60px;
          line-height: 30px;
          width: 90%;
          color: #666666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .sence_dialog{
    width: 100%;
    .el-dialog__header {
     width: 100%;
     padding: 0;
    }
    .el-dialog__body{
        width: 100%;
        height: 640px;
        background: #FFFFFF;
        box-shadow: 0px 20px 30px 0px rgba(66, 36, 157, 0.1);
        padding: 0 !important;
        .dialog_data{
          width: 100%;
          height: 640px;
          padding: 4% 4%;
          .dialog_top{
            width: 100%;
            height: 32px;
            p{
              float: left;
              font-size: 32px;
              font-family: HarmonyOS Sans SC;
              font-weight: 400;
              color: #380879;
              margin-bottom: 10px;
            }
            img:hover{
              cursor: pointer;
            }
            img{
              width: 28px;
              height: 28px;
              float: right;
            }
          }
          .dialog_center{
            height: 340px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            .center_left{
              width: 50%;
              margin-right:10% ;
              height: 340px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .center_right{
                width: 40%;
                height: 340px;
                .right_content1{
                  height: 260px;
                  width: 100%;
                  margin-bottom: 20px;
                  overflow-y: auto;
                   .content_introduct{
                      color: #666666;
                      font-size: 16px;
                      line-height: 24px;
                      font-family: HarmonyOS Sans SC;

                  }
                }
                .right_content2{
                  margin-top:10px ;
                  height: 80px;
                  width: 100%;
                    .content_tag{
                      color: #666666;
                      font-size: 16px;
                      line-height: 22px;
                      font-family: HarmonyOS Sans SC;
                    }
                    .content_tags{
                      width: 100%;
                      display: flex;
                      justify-content: flex-start;
                      .dialog_label{
                        margin-right:6px ;
                        min-width: 50px;
                        text-align: center;
                        padding: 2px 4px;
                        background-color:#6625CA ;
                        border-radius:8px ;
                        font-family: HarmonyOS Sans SC;
                        margin-top: 10px;
                      }
                    }
                }
            }
          }
          .dialog_footer{
            width: 100%;
            margin-top:10px ;
            .footer_name{
              font-size: 28px;
              font-family: HarmonyOS Sans SC;
              font-weight: 400;
              color: #111111;
              margin: 0;
            }
            .footer_apps{
              width: 100%;
              .footer_app{
                margin-top:8px ;
                float: left;
                width: 8%;
                height: 110px;
                margin-right: 30px;
                img:hover{
                  cursor: pointer;
                }
                img{
                    width: 100%;
                    height: 60px;
                    margin-bottom: 10px;
                    border-radius:6px ;
                }
                p{
                  margin:0 ;
                  font-size: 14px;
                  font-family: HarmonyOS Sans SC;
                  font-weight: 400;
                  color: #111111;
                  text-align: center;
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
    }
    .el-icon-close:before {
         display: none;
    }
  }
  @media screen and (max-width: 1380px){
    .home_content{
      padding: 50px 8%;
    }
    .upload_fgx{
        background: url('../../assets/images/home_upload_fgx.png') center 50px no-repeat;
      }
  }
  @media (max-width: 1400px) and (min-width: 1200px) {
  .hotApp_bg{
    height: 120px;
       img{
         width: 44.4%;
       }
      .high_name{
        font-size: 14px;
        margin: 0;
        max-height: 90px;
        overflow: hidden;
        text-overflow :ellipsis;
      }
    }
     .high_score{
      display: flex;
      width: 100%;
      height: 180px;
      justify-content: space-between;
    .high_data:hover{
      box-shadow: 0px 30px 50px 0px rgba(66, 36, 157, 0.15);
      background-color: rgba(248,248,248);
      cursor: pointer;
    }
    .high_data{
      width: 12.7%;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 10px;
      img{
        margin-top: 10px;
        width: 66.7%;
        height: 42.2%;
      }
      .el-rate {
          height: 14px;
          line-height: 1;
        .el-rate__item {
          width: 14px;
          margin: 0 2px;
        }
      }
      .high_name{
        font-size: 14px;
        max-height: 56px;
        overflow: hidden;
        text-overflow :ellipsis;
      }
      .score_num{
        font-size: 14px;

      }
    }
  }
    .senceCase{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 911px;
    width: 73.54%;
    margin-left:13.23%;
    margin-right: 13.23%;
    .case_data{
        height:360px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      .oneCase:hover{
        transform: scale( 1.05);
        transition: all 0.5s;
        cursor: pointer;
      }
      .oneCase{
        width: 28%;
        height: 360px;
        background: #FFFFFF;
        box-shadow: 0px 30px 50px 0px rgba(66, 36, 157, 0.15);
        border-radius: 4px;
        img{
           width:100%;
           height: 200px;
           border-radius: 8px 8px 0px 0px;
        }
        .case_name{
          margin: 36px 16px 18px 20px;
          display: flex;
          justify-content: space-between;
          .case_name1{
            font-size: 18px;
            font-family: HarmonyOS Sans SC;
            font-weight: 400;
            color: #111111;
            float: left;
            margin: 0;
          }
          .case_name2{
            width: 24px;
            height: 24px;
            margin-top: 2px;
          }
        }
     .case_content{
            font-size: 14px;
            line-height: 26px;
            height: 52px;
        }
      }
    }
  }
  .el-carousel__indicators--outside {
    left: -500px;
}
  }
  @media (max-width: 1600px) and (min-width: 1200px) {
  .sence_dialog{
    width: 100%;
    .el-dialog__header {
     width: 100%;
     padding: 0;
    }
    .el-dialog__body{
        height: 440px;
        .dialog_data{
          height: 440px;
          .dialog_top{
            width: 100%;
            height: 32px;
            p{
              float: left;
              font-size: 24px;
              font-weight: 400;
            }
            img{
              width: 28px;
              height: 28px;

            }
          }
          .dialog_center{
            height: 240px;
            .center_left{
              margin-right:10% ;
              height: 240px;
            }
            .center_right{
                width: 40%;
                height: 240px;
                .right_content1{
                  height: 180px;
                  margin-bottom: 10px;
                   .content_introduct{
                      font-size: 14px;
                      line-height: 20px;
                      margin-bottom:4px ;
                  }
                }
                .right_content2{
                  margin-top:10px ;
                  height: 80px;
                  width: 100%;
                    .content_tag{
                      font-size: 14px;
                      line-height: 20px;
                    }
                    .content_tags{
                      font-size: 14px;
                      .dialog_label{
                        margin-top:6px ;
                        margin-right:6px ;
                        min-width: 50px;
                        text-align: center;
                        padding: 1px 2px;
                      }
                    }
                }
            }
          }
          .dialog_footer{
            width: 100%;
            margin-top:10px ;
            .footer_name{
              font-size: 20px;
            }
            .footer_apps{
              width: 100%;
              .footer_app{
                margin-top:8px ;
                width: 8%;
                height: 110px;
                margin-right: 30px;
                img{
                    height: 40px;
                    margin-bottom: 2px;
                    border-radius:6px ;
                }
                p{
                  font-size: 12px;
                }
              }
            }
          }
        }
    }
  }
  }

}

</style>
