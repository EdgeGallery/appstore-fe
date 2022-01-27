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
    class="senceDetail"
  >
    <div class="senceDetail_top">
      <img
        class="senceImg"
        :src="senceContent.imgSrc"
        alt=""
      >
      <div class="senceContent">
        <p
          v-if="language === 'cn'"
          class="senceTitle defaultFontLight"
        >
          {{ senceContent.nameCn }}
        </p>
        <p
          v-else
          class="senceTitle defaultFontLight"
        >
          {{ senceContent.nameEn }}
        </p>
        <div class="senceImgs">
          <img
            class="oneImg"
            v-for="(item,index) in senceContent.imgData"
            :key="index"
            :src="item"
            alt=""
          >
        </div>
      </div>
    </div>
    <div class="senceDetail_bottom common_background">
      <div class="introduce">
        <p
          v-if="language === 'cn'"
          class="title defaultFontLight"
        >
          {{ senceContent.nameCn }}
        </p>
        <p
          v-else
          class="title defaultFontLight"
        >
          {{ senceContent.nameEn }}
        </p>
        <p
          v-if="language === 'cn'"
          class="content defaultFontLight"
        >
          {{ senceContent.describtionCn }}
        </p>
        <p
          v-else
          class="content defaultFontLight"
        >
          {{ senceContent.describtionEn }}
        </p>
      </div>
      <div class="introduce">
        <p class="title sence_title defaultFontLight">
          {{ $t('store.senceApp') }}
        </p>
        <div v-if="language === 'cn'">
          <p
            v-for="(item,index) in senceContent.appSenceCn"
            :key="index"
            class="sence_content defaultFontLight"
          >
            {{ item }}
          </p>
        </div>
        <div v-else>
          <p
            v-for="(item,index) in senceContent.appSenceEn"
            :key="index"
            class="sence_content defaultFontLight"
          >
            {{ item }}
          </p>
        </div>
      </div>
      <div class="relevantApp">
        <p class="relevantApp_name defaultFontLight">
          {{ $t('store.reapp') }}
        </p>
        <div class="relevantApp_content">
          <div
            class="oneApp"
            v-for="(item ,index) in relevantAppData"
            :key="index"
          >
            <img
              class="oneApp_img"
              :src="getImageUrl(item.appId)"
              alt=""
            >
            <p
              class="oneApp_title"
              defaultFontLight
            >
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { queryApp, URL_PREFIX } from '../../tools/api.js'
import { SenceCaseData } from '../../tools/constant.js'
export default {
  name: 'SenceDetail',
  components: {
  },
  data () {
    return {
      senceCaseData: SenceCaseData,
      senceContent: {},
      relevantAppData: [],
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
    getSenceContent () {
      this.senceCaseData.forEach(item => {
        if (item.type === this.$route.query.type) {
          this.senceContent = item
          this.searchCondition.industry.push(item.nameEn)
          queryApp(this.searchCondition).then(res => {
            if (res.data.results.length >= 3) {
              this.relevantAppData = res.data.results.slice(0, 3)
            }
          })
        }
      })
    },
    getImageUrl (appId) {
      return URL_PREFIX + 'apps/' + appId + '/icon'
    }
  },
  computed: {
    ...mapState(['language'])
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.changeEnCn(this.language)
    }
  },
  mounted () {
    this.getSenceContent()
  }
}
</script>

<style lang="less">
  .senceDetail{
    width: 100%;
    color: #fff;
    min-width: 1200px;
    p{margin: 0;}
    .senceDetail_top{
      width: 76.08%;
      height: 260px;
      margin: 80px auto;
      display: flex;
      .senceImg{
        border-radius: 12px;
        width: 28.61%;
        margin-right: 3.3%;
      }
      .senceContent{
        width: 46%;
        .senceTitle{
          font-size: 30px;
          line-height: 44px;
          margin-bottom: 40px;
        }
        .senceImgs{
          display: flex;
          height: 171px;
          .oneImg{
            width: 32%;
            height: 100%;
            margin-right: 3.2%;
            border-radius: 12px;
          }
        }
        .senceImgs .oneImg:last-child{
          margin-right: 0;
        }
      }
    }
    .senceDetail_bottom{
      height: 800px;
      width: 76.08%;
      margin: 30px auto;
      padding: 50px 50px;
      border-radius: 24px;
      .introduce{
        .title{
          font-size: 20px;
          margin-bottom:20px ;
        }
        .sence_title{
          margin-top: 30px;
        }
        .content{
          text-indent: 2em;
          font-size: 16px;
        }
        .sence_content{
          font-size: 16px;
          line-height: 36px;
        }
      }
      .relevantApp{
        .relevantApp_name{
          font-size: 20px;
          margin: 20px 0;
        }
        .relevantApp_content{
          display: flex;
          .oneApp{
            margin-right: 40px;
            .oneApp_img{
              width: 100px;
              height: 100px;
              border-radius: 8px;
            }
            .oneApp_title{
              text-align: center;
              line-height: 48px;
            }
          }
        }
      }
    }
    @media (max-width: 1600px) and (min-width: 1200px) {
      .senceDetail_top{
        height: 180px;
        .senceContent{
          width: 40.2%;
          .senceTitle{
            font-size: 18px;
            line-height: 40px;
          }
          .senceImgs{
            height: 100px;
            .oneImg{
              border-radius: 8px;
            }
          }
          .senceImgs .oneImg:last-child{
            margin-right: 0;
          }
        }
      }
      .senceDetail_bottom{
        height: 640px;
        padding: 30px 30px;
        border-radius: 18px;
        .introduce{
          .title{
            font-size: 16px;
            margin-bottom:10px ;
          }
          .sence_title{
            margin-top: 20px;
          }
          .content{
            text-indent: 2em;
            font-size: 14px;
          }
          .sence_content{
            font-size: 14px;
            line-height: 30px;
          }
        }
        .relevantApp{
          .relevantApp_name{
            font-size: 16px;
          }
          .relevantApp_content{
            .oneApp{
              margin-right: 24px;
              .oneApp_img{
                width: 80px;
                height: 80px;
                border-radius: 6px;
              }
              .oneApp_title{
                font-size: 14px;
                line-height: 36px;
              }
            }
          }
        }
      }
    }
  }
</style>
