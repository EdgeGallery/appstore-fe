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
    <div class="sence_app">
      <div class="sence_background">
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
              :key="('sence'+index)"
            >
              <img
                class="oneCase_img hover_pointer"
                :src="item.imgSrc"
                @click="senceDetail(item)"
                alt=""
              >
              <div class="oneCase_content">
                <p
                  v-if="language === 'en'"
                  class="oneCase_content_name"
                >
                  {{ item.nameEn }}
                </p>
                <p
                  v-else
                  class="oneCase_content_name"
                >
                  {{ item.nameCn }}
                </p>
                <p
                  v-if="language === 'en'"
                  class="oneCase_content_desc"
                >
                  {{ item.describtionEn }}
                </p>
                <p
                  v-else
                  class="oneCase_content_desc"
                >
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
            class="app_tab_title hover_pointer"
            :class="{'scoreApp_title2_en': language === 'en', 'app_tab_title_click': hotappType === false}"
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
          :key="('newApp'+index)"
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
          :key="('newAppBe'+index)"
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
          :key="('score'+index)"
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
          :key="('scoreHighest'+index)"
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
import { INDUSTRY, TYPES, AFFINITY, SORTITEM, SenceCaseData } from '../../tools/constant.js'
import HomeSwiper from '../../components/common/Swipers.vue'
import uploadPackage from '../home/UploadPackage.vue'
import commonUtil from '../../tools/commonUtil.js'
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
      senceCaseData: SenceCaseData,
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
      this.$router.push({
        path: '/senceDetail',
        query: {
          type: data.type
        }
      })
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
  .scoreApp_title_en{
    width: 130px;
  }
  .sence_line{
    width: 80px;
    height: 6px;
    margin: 0 auto;
    border-radius: 4px;
    background: rgba(250,250,250,0.3);
  }
  .sence_app{
    width: 100%;
    min-width: 1200px;
    z-index: 1000;
    margin-top: -54px;
    .sence_background{
      padding-top: 51px;
      background:rgba(46,20,124,0.7) ;
      .sence{
        width: 73.64%;
        margin: 0 auto;
        height: 900px;
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
            height: 300px;
            .oneCase_img{
              width: 100%;
              height: 190px;
              border-radius: 10px;
            }
            .oneCase_content{
              border-radius: 10px;
              width: 100%;
              height:130px;
              position: relative;
              top: -20px;
              left: 0;
              background: #4e3494;
              .oneCase_content_name{
                width: 85%;
                margin:0 auto;
                font-size: 20px;
                height: 48px;
                line-height: 50px;
              }
              .oneCase_content_desc{
                width: 85%;
                margin: 0 auto;
                font-size: 14px;
                color:#fff;
                text-indent: 2em;
                line-height: 18px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
              }
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
        margin: 20px 13.18% 0;
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
          width: 95px;
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
      width: 73.64%;
      margin: 0 auto;
      padding-top: 2%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding-left: 3%;
      padding-bottom: 80px;
      .oneAppStyle{
        width: 14.3%;
        border-radius: 8px;
        height: 220px;
        margin: 5% 4% 0 1.5%;
        display: flex;
        justify-content: center;
        background: #2E147C;
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
          overflow: hidden;
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
      width: 91px;
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
