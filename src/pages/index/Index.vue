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
  <div class="apphome">
    <!-- 新上车应用 -->
    <div class="banner">
      <home-swiper />
    </div>
    <div class="new_app home_content">
      <h3 class="home_tit">
        {{ $t('store.newUploadApp') }}
      </h3>
      <p class="home_more">
        <el-link
          :underline="false"
          @click="jumpToAppList"
        >
          {{ $t('store.viewMore') }}
        </el-link>
      </p>
      <el-row>
        <el-col
          :span="10"
          class="left"
        >
          <img
            :src="newAppPic"
            alt=""
          >
          <div class="new_app_tit">
            {{ $t('store.speakPeek') }}
            <p>
              <el-link
                :underline="false"
                @click="jumpToAppList"
              >
                {{ $t('store.clickViewMore') }}
              </el-link>
            </p>
          </div>
        </el-col>
        <el-col :span="14">
          <div
            v-for="(item,index) in newAppData"
            :key="index"
            class="new_app_icon"
          >
            <img
              :src="item"
              alt=""
              @click="jumpToAppList"
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 特别推荐 -->
    <div class="recommend home_content">
      <h3 class="home_tit">
        {{ $t('store.reCommendColletion') }}
      </h3>
      <p class="home_more">
        <el-link
          :underline="false"
          @click="jumpToAppList"
        >
          {{ $t('store.viewMore') }}
        </el-link>
      </p>
      <ul class="recomment_list clearfix">
        <li
          v-for="(item,index) in recommendData"
          :key="index"
        >
          <img
            :src="item.imgSrc"
            alt=""
            @click="selectedCondition(item.type,item.index)"
          >
          <p class="rec_tit">
            {{ item.title }}
          </p>
          <p
            v-html="item.content"
            class="rec_content"
          />
          <div
            @click="selectedCondition(item.type,item.index)"
            type="primary"
            class="rec_more"
          >
            {{ $t('store.moreInfo') }}
          </div>
        </li>
      </ul>
    </div>
    <!-- 评分最高 -->
    <div class="score home_content">
      <h3 class="home_tit">
        {{ $t('store.higherScore') }}
      </h3>
      <p class="home_more">
        <el-link
          v-for="(item,index) in scoreData"
          :key="index"
          @click="selectedCondition(item.type,item.index)"
          :underline="false"
        >
          {{ $t('store.viewMore') }}
        </el-link>
      </p>
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(item,index) in scoreHighestData"
          :key="index"
        >
          <div class="icon_box">
            <img
              :src="item.imgSrc"
              alt=""
              @click="jumpToAppList"
            >
          </div>
          <p class="app_name">
            {{ item.name }}
          </p>
          <el-rate
            v-model="item.score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
        </swiper-slide>
        <div
          class="swiper-button-prev"
          slot="button-prev"
        />
        <div
          class="swiper-button-next"
          slot="button-next"
        />
      </swiper>
    </div>
    <!-- 接入你的应用 -->
    <div class="app_upload home_content">
      <h3 class="home_tit">
        {{ $t('store.addYourApp') }}
      </h3>
      <p class="tit_bot">
        {{ $t('store.addYourAppTitle') }}
      </p>
      <p class="upload_btn">
        <el-button @click="uploadPackage">
          {{ $t('store.uploadApp') }}
        </el-button>
      </p>
      <div class="upload_list">
        <div class="upload_icon">
          <img
            src="../../assets/images/home_upload_icon1.png"
            alt=""
          >
          {{ $t('store.uploadApp') }}
        </div>
        <div class="upload_fgx" />
        <div class="upload_icon">
          <img
            src="../../assets/images/home_upload_icon3.png"
            alt=""
          >
          {{ $t('docs.appTest') }}
        </div>
        <div class="upload_fgx" />
        <div class="upload_icon">
          <img
            src="../../assets/images/home_upload_icon2.png"
            alt=""
          >
          {{ $t('store.appstore') }}
        </div>
        <div class="upload_fgx" />
        <div class="upload_icon">
          <img
            src="../../assets/images/home_upload_icon4.png"
            alt=""
          >
          {{ $t('store.appShare') }}
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer home_content">
      <div class="footer_list">
        <ul class="footer_ul">
          <li>
            <h3>{{ $t('common.industry') }}</h3>
            <el-link
              v-for="(item,index) in industry"
              :key="index"
              class="box-curp"
              :class="{selected: item.selected}"
              @click="selectedCondition('industry', index)"
              :underline="false"
            >
              <span>{{ language==='cn'?item.label[0]:item.label[1] }}</span>
            </el-link>
          </li>
          <li>
            <h3>{{ $t('common.type') }}</h3>
            <el-link
              v-for="(item,index) in types"
              :key="index"
              class="box-curp"
              :class="{selected: item.selected}"
              @click="selectedCondition('types', index)"
              :underline="false"
            >
              <span>{{ language==='cn'?item.label[0]:item.label[1] }}</span>
            </el-link>
          </li>
          <li>
            <h3>{{ $t('common.architecture') }}</h3>
            <el-link
              v-for="(item,index) in affinity"
              :key="index"
              class="box-curp"
              :class="{selected: item.selected}"
              @click="selectedCondition('affinity', index)"
              :underline="false"
            >
              {{ item.label }}
            </el-link>
          </li>
        </ul>
      </div>
      <p class="suggest">
        {{ $t('store.recommendBroswer') }}
      </p>
      <div class="link_list clearfix">
        <div class="left">
          <img
            src="../../assets/images/logo.png"
            alt=""
          >
          <p>
            <el-link
              :underline="false"
              :href="developerUrl"
              target="_blank"
            >
              {{ $t('store.developerPlateform') }}
            </el-link>
            <el-link
              :underline="false"
              :href="mecmUrl"
              target="_blank"
            >
              MECM
            </el-link>
            <el-link
              :underline="false"
              @click="$router.push('/docs')"
            >
              {{ $t('store.officialGuide') }}
            </el-link>
          </p>
        </div>
        <div class="right">
          <el-link
            :underline="false"
            :href="contactUrl"
            target="_blank"
          >
            <img
              src="../../assets/images/home_footer_contact.png"
              alt=""
            >
          </el-link>
          <el-link
            :underline="false"
            :href="giteeUrl"
            target="_blank"
          >
            <img
              src="../../assets/images/home_footer_gitee.png"
              alt=""
            >
          </el-link>
          <el-link :underline="false">
            <img
              src="../../assets/images/home_footer_wechat.png"
              alt=""
            >
          </el-link>
        </div>
      </div>
    </div>
    <!-- 上传组件 -->
    <div v-show="uploadDiaVis">
      <uploadPackage
        v-model="uploadDiaVis"
        @getAppData="getAppData"
      />
    </div>
  </div>
</template>

<script>
import { INDUSTRY, TYPES, AFFINITY, SORT_BY } from '../../tools/constant.js'
import HomeSwiper from '../../components/common/Swipers.vue'
import uploadPackage from '../home/UploadPackage.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    uploadPackage,
    HomeSwiper

  },
  data () {
    return {
      aletMsg: '建议使用Google Chrome及IE9以上浏览器浏览',
      displayStsates: 'none',
      selectedConditions: [],
      uploadDiaVis: false,
      newAppPic: require('../../assets/images/home_new_pic.jpg'),
      newAppData: [
        require('../../assets/images/home_new_app1.png'),
        require('../../assets/images/home_new_app2.png'),
        require('../../assets/images/home_new_app3.png'),
        require('../../assets/images/home_new_app4.png'),
        require('../../assets/images/home_new_app5.png'),
        require('../../assets/images/home_new_app6.png')
      ],
      scoreData: [
        {
          type: 'sortBy',
          index: 2
        }],
      recommendData: [
        {
          imgSrc: require('../../assets/images/home_recommend_pic1.jpg'),
          title: '游戏',
          content: '游戏专区给大家带来了<br/>2020年度最热门的游戏<br/>应用推荐及下载',
          type: 'industry',
          index: 5
        },
        {
          imgSrc: require('../../assets/images/home_recommend_pic2.jpg'),
          title: '智慧园区',
          content: '利用大数据、物联网、云计算、<br/>人工智能等先进手段为园区赋能<br/>打造安全高效的园区',
          type: 'industry',
          index: 0
        },
        {
          imgSrc: require('../../assets/images/home_recommend_pic3.jpg'),
          title: 'AI',
          content: '最佳创意的AI应用<br/>这些应用帮你启发灵感、<br/>挥洒创意',
          type: 'industry',
          index: 8
        }
      ],
      scoreHighestData: [
        {
          imgSrc: require('../../assets/images/home_score_icon1.png'),
          name: '金山云',
          score: 5
        },
        {
          imgSrc: require('../../assets/images/home_score_icon2.png'),
          name: 'Zoneminder',
          score: 5
        },
        {
          imgSrc: require('../../assets/images/home_score_icon3.png'),
          name: '河图',
          score: 5
        },
        {
          imgSrc: require('../../assets/images/home_score_icon4.png'),
          name: '福建空天',
          score: 5
        },
        {
          imgSrc: require('../../assets/images/home_score_icon5.png'),
          name: '安安物联',
          score: 5
        },
        {
          imgSrc: require('../../assets/images/home_score_icon6.png'),
          name: 'BattleCityGame',
          score: 4.5
        },
        {
          imgSrc: require('../../assets/images/home_score_icon7.png'),
          name: 'Ant Media',
          score: 4.4
        },
        {
          imgSrc: require('../../assets/images/home_score_icon8.png'),
          name: 'MediaPipe',
          score: 4.3
        }
      ],
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
      industry: INDUSTRY,
      types: TYPES,
      affinity: AFFINITY,
      sortBy: SORT_BY,
      contactUrl: 'http://www.edgegallery.org',
      giteeUrl: 'https://gitee.com/edgegallery',
      developerUrl: '',
      mecmUrl: ''
    }
  },
  methods: {
    alertDia (msg) {
      this.displayStsates = 'block'
      this.aletMsg = msg
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
    }
  },
  computed: {
    ...mapState(['language'])
  },
  mounted () {
    let language = localStorage.getItem('language')
    if (language === 'en') {
      this.recommendData[0].title = 'Game'
      this.recommendData[0].content = 'The game zone brings you<br>The hottest games of 2020 Application recommendation and download'
      this.recommendData[1].title = 'Smart Park'
      this.recommendData[1].content = 'Using big data, Internet of Things, cloud computing, artificial intelligence and other advanced methods to empower the park to create a safe and efficient park'
      this.recommendData[2].content = 'The best creative AI applications These applications help you inspire and express your creativity'
    } else {
      this.recommendData[0].title = '游戏'
      this.recommendData[0].content = '游戏专区给大家带来了<br/>2020年度最热门的游戏<br/>应用推荐及下载'
      this.recommendData[1].title = '智慧园区'
      this.recommendData[1].content = '利用大数据、物联网、云计算、<br/>人工智能等先进手段为园区赋能<br/>打造安全高效的园区'
      this.recommendData[0].content = '最佳创意的AI应用<br/>这些应用帮你启发灵感、<br/>挥洒创意'
    }
    this.alertDia(this.aletMsg)
    this.refreshCondition()
    this.getPlatformUrl()
  }
}
</script>

<style lang="less">
.apphome{
  .banner{
    height: 530px;
    padding: 0;
    color: #fff;
    .tit{
      font-size: 40px;
      margin-bottom: 30px;
    }
    .info{
      font-size: 20px;
      margin-bottom: 5px;
    }
    .upload_app{
      border: 2px solid #9163cc;
      color: #606266;
      border-radius: 15px;
      font-size: 16px;
      padding: 6px 20px;
      margin-top: 30px;
      em{
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url('../../assets/images/home_banner_upload_icon.png') center center no-repeat;
        background-size: contain;
        position: relative;
        top: 7px;
        margin-right: 7px;
      }
      span{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        position: relative;
        top: -5px;
      }
    }
  }
  .home_content{
    padding: 70px 15% 50px;
    .home_tit{
      font-size: 32px;
      text-align: center;
    }
    .home_more{
      text-align: center;
      margin: 15px 0 30px;
      .el-link{
        font-size: 16px;
      }
    }
  }
  .home_content:last-child{
    padding: 70px 15% 0;
  }
  .new_app{
    .left{
      position: relative;
      img{
        width: 100%;
        display: block;
        max-width: 620px;
        border-radius: 20px;
      }
      .new_app_tit{
        position: absolute;
        bottom: 80px;
        left: 60px;
        color: #fff;
        font-size: 40px;
        .box-curp{
          color: #fff;
          font-size: 16px;
          margin-top: 20px;
          line-height: 20px;
        }
        .el-link{
          color: #fff;
          font-size: 16px;
          margin-top: 20px;
        }
        .el-link:hover{
          text-decoration: underline;
        }
      }
    }
    .new_app_icon{
      float: left;
      width: 21%;
      margin: 6%;
      img{
        width: 100%;
        max-width: 160px;
        cursor: pointer;
      }
    }
  }
  .recommend{
    .recomment_list{
      li{
        float: left;
        width: 30%;
        img{
          width: 100%;
          display: block;
          max-width: 496px;
          border-radius: 20px;
          cursor: pointer;
        }
        .rec_tit{
          font-size: 24px;
          margin: 20px 0 15px;
        }
        .rec_content{
          line-height: 25px;
          color: #848484;
        }
        .rec_more{
          font-size: 16px;
          margin-top: 10px;
        }
      }
      li:nth-child(2){
        margin: 0 5%;
      }
    }
  }
  .score{
    .swiper-container {
      width: 100%;
      padding: 0 20px;
    }
    .swiper-slide {
      padding: 20px;
      .icon_box{
        background: #fff;
        text-align: center;
        padding: 5px 5px 2px;
        img{
          width: 100%;
          max-width: 130px;
          cursor: pointer;
        }
      }
      .app_name{
        margin: 10px 0;
      }
      .el-rate__icon{
        margin-right: 5px;
      }
    }
    .swiper-button-prev{
      left: 0;
      height: 100%;
      top: 20px;
      background: #f0f2f5;
    }
    .swiper-button-next{
      right: 0;
      height: 100%;
      top: 20px;
      background: #f0f2f5;
    }
    .swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled{
      background: #f0f2f5;
    }
  }
  .app_upload{
    .tit_bot{
      font-size: 18px;
      color: #787575;
      text-align: center;
      margin: 20px 0;
    }
    .upload_btn{
      text-align: center;
      .el-button{
        color: #9265cd;
        font-size: 16px;
        padding: 6px 20px;
        border: 1px solid #9265cd;
        background: none;
        border-radius: 0;
      }
      .el-button:hover{
        background: #9265cd;
        color: #fff;
      }
    }
    .upload_list{
      display: flex;
      justify-content: center;
      margin: 50px 0 30px;
      .upload_icon{
        width: 11%;
        margin: 0 1%;
        text-align: center;
        font-size: 24px;
        img{
          width: 100%;
          max-width: 168px;
        }
      }
      .upload_fgx{
        width: 15%;
        background: url('../../assets/images/home_upload_fgx.png') center 70px no-repeat;
        background-size: contain;
      }
      @media screen and (max-width: 1380px){
        .upload_fgx{
          background: url('../../assets/images/home_upload_fgx.png') center 55px no-repeat;
          background-size: contain;
        }
      }
    }
  }
  .footer{
    .footer_list{
      border-top: 2px solid #707070;
      border-bottom: 2px solid #707070;
      .footer_ul{
        display: flex;
        li{
          width: 33%;
          padding: 20px 50px;
          border-right: 1px solid #707070;
          h3{
            font-size: 20px;
            margin-bottom: 15px;
          }
          .el-link{
            line-height: 30px;
            display: block;
            width: 100%;
            font-size: 16px;
          }
        }
        li:last-child{
          border-right: none;
        }
      }
    }
    .suggest{
      border-bottom: 2px solid #707070;
      padding: 20px 0;
    }
    .link_list{
      margin-top: 20px;
      .left{
        display: flex;
        float: left;
        img{
          height: 55px;
        }
        p{
          height: 20px;
          margin: 17px 0 0 20px;
          border-left: 1px solid #707070;
          .el-link{
            font-size: 16px;
            height: 20px;
            line-height: 20px;
            margin-left: 30px;
          }
        }
      }
      .right{
        float: right;
        text-align: right;
        .el-link{
          display: inline-block;
          width: 40px;
          height: 40px;
          margin:5px 0 0 20px;
          img{
            width: 100%;
          }
        }
      }
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
}
</style>
