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
  <div class="docs">
    <eg-bread-crumb :data="breadCrumbData" />
    <div class="padding56">
      <div class="substeps">
        <div class="substep">
          <div
            class="subcontenttwo"
            :class="{'content-en': language === 'en'}"
          >
            <div class="characteristic">
              {{ $t('docs.beginnerGuide') }}
            </div>
            <div class="summaryContent">
              {{ $t('docs.beginnerPart1') }}
            </div>
            <div class="docImg">
              <div class="subDocImg">
                <img
                  :src="language === 'cn'? summary1 : summaryen1"
                  alt
                >
              </div>
              <div class="subDocImg">
                <img
                  :src="language === 'cn'? summary2 : summaryen2"
                  alt
                >
              </div>
              <div class="subDocImg">
                <img
                  :src="language === 'cn'? summary3 : summaryen3"
                  alt
                >
              </div>
            </div>
          </div>
          <div
            class="subcontenttwo"
            :class="{'content-en': language === 'en'}"
          >
            <div class="characteristic">
              {{ $t('docs.coreFunGuide') }}
            </div>
            <div class="summaryContent">
              {{ $t('docs.beginnerPart2') }}
            </div>
          </div>
          <div class="docImg docWrap">
            <div class="subDocImg1">
              <div class="docsNum">
                {{ $t('nav.appDownload3') }}
              </div>
              <img
                :src="language === 'cn'? worksIcon1 : worksIconen1"
                alt
              >
            </div>
            <div class="subDocImg1">
              <div class="docsNumbak" />
              <img
                :src="language === 'cn'? worksIcon2 : worksIconen2"
                alt
              >
            </div>
          </div>

          <div class="docImg docWrap">
            <div class="subDocImg2">
              <div class="docsNum2">
                {{ $t('docs.appPublishdoc') }}
              </div>
              <img
                :src="language === 'cn'? worksIcon3 : worksIconen3"
                alt
              >
            </div>
            <div class="subDocImg2">
              <div class="docsNum3">
                {{ $t('docs.appShare') }}
              </div>
              <img
                :src="language === 'cn'? worksIcon4 : worksIconen4"
                alt
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getDocsApi } from '../../tools/api.js'
import summary1 from '@/assets/images/summary1.png'
import summaryen1 from '@/assets/images/summaryen1.png'
import summary2 from '@/assets/images/summary2.png'
import summaryen2 from '@/assets/images/summaryen2.png'
import summary3 from '@/assets/images/summary3.png'
import summaryen3 from '@/assets/images/summaryen3.png'

import worksIcon1 from '@/assets/images/how_it_works_icon1.png'
import worksIconen1 from '@/assets/images/how_it_works_icon-en1.png'
import worksIcon2 from '@/assets/images/how_it_works_icon2.png'
import worksIconen2 from '@/assets/images/how_it_works_icon-en2.png'
import worksIcon3 from '@/assets/images/how_it_works_icon3.png'
import worksIconen3 from '@/assets/images/how_it_works_icon-en3.png'
import worksIcon4 from '@/assets/images/how_it_works_icon4.png'
import worksIconen4 from '@/assets/images/how_it_works_icon-en4.png'
import docsLine from '@/assets/images/docsLine.png'
import docsNum1 from '@/assets/images/docsNum1.png'
import docsNum2 from '@/assets/images/docsNum2.png'
import docsNum3 from '@/assets/images/docsNum3.png'
import EgBreadCrumb from 'eg-view/src/components/EgBreadCrumb.vue'
export default {
  props: {
    treeId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['language'])
  },
  components: {
    EgBreadCrumb
  },
  data () {
    return {
      source: '',
      docsNum1: docsNum1,
      docsNum2: docsNum2,
      docsNum3: docsNum3,
      summary1: summary1,
      summaryen1: summaryen1,
      summary2: summary2,
      summaryen2: summaryen2,
      summary3: summary3,
      summaryen3: summaryen3,
      worksIcon1: worksIcon1,
      worksIconen1: worksIconen1,
      worksIcon2: worksIcon2,
      worksIconen2: worksIconen2,
      worksIcon3: worksIcon3,
      worksIconen3: worksIconen3,
      worksIcon4: worksIcon4,
      worksIconen4: worksIconen4,
      docsLine: docsLine,
      breadCrumbData: [],
      language: localStorage.getItem('language') || 'cn'
    }
  },
  watch: {
    language (val) {
      this.getAppStoreDocs()
      this.updateBreadCrumbData(this.activeName)
      if (val === 'en') {
        this.updateMdUrl = './APPPackageDefinition.md'
      }
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.updateBreadCrumbData(this.activeName)
      this.getAppStoreDocs()
    }
  },
  methods: {
    getAppStoreDocs () {
      getDocsApi(this.language).then(res => {
        this.source = res.data ? res.data : ''
      })
    },
    updateBreadCrumbData (activeName) {
      this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('docs.beginnerGuide'), path: '' }]
    }
  },
  mounted () {
    this.getAppStoreDocs()
    this.updateBreadCrumbData(this.activeName)
  }
}
</script>
<style lang='less' scoped>
.docs {
  background: #fff;
  .substeps {
      padding: 0px 0 75px;
      box-sizing: border-box;
      display: flex;
      position: relative;
      justify-content: space-around;
        .substep {
          width: 100%;
          font-size: 16px;
          // flex-direction: row;
          .docImg{
            margin-top: 10px;
            background: white;
            padding: 10px 30px 0px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            // flex-wrap: wrap;
            .docsNum{
              height: 10%;
              width: 100%;
              text-align: left;
              font-size: 18px;
              font-weight: 550;
              height: 58px;
              line-height: 58px;
              background: url('../../assets/images/docsNum1.png') left center no-repeat;
              padding-left: 30px;
              // margin-left: 100px;
            }
            .docsNumbak{
              height: 10%;
              width: 100%;
              text-align: left;
              font-size: 18px;
              font-weight: 550;
              height: 58px;
              line-height: 58px;
              padding-left: 30px;
              // margin-left: 100px;
            }
            .docsNum2{
              width: 100%;
              text-align: left;
              font-size: 18px;
              font-weight: 550;
              height: 58px;
              line-height: 58px;
              background: url('../../assets/images/docsNum2.png') left center no-repeat;
              padding-left: 30px;
            }
            .docsNum3{
              width: 100%;
              font-size: 18px;
              font-weight: 550;
              height: 58px;
              line-height: 58px;
              background: url('../../assets/images/docsNum3.png') left center no-repeat;
              padding-left: 30px;
            }
            .subDocImg1{
              padding: 20px 50px;
            }
            .subDocImg2{
              padding: 20px 50px;
            }
            .subDocImg{
              background-color: #fff;
              margin: 20px;
              img{
                width: 100%;
              }
            }
          }
          .docImg.docWrap{
            width: 100%;
            flex-wrap: wrap;

          }
          .subcontenttwo {
            float: left;
            width: 100%;
            padding: 20px 0;
            box-sizing: border-box;
            flex-direction: column;
            position: relative;

            .characteristic{
              width: 100%;
              text-align: left;
              font-size: 18px;
              font-weight: 550;
              height: 28px;
              line-height: 28px;
              background: url('../../assets/images/docsLine.png') left center no-repeat;
              padding-left: 15px;

            }
            .characteristic::before{
              background:#409EFF;
            }
            .summaryContent{
              width: 97%;
              margin-top: 5px;
              line-height: 20px;
              font-size: 14px;
            }
            div {
              padding: 0;
              span {
                // display: inline-block;
                height: 32px;
                width: 32px;
                // background: #2d9ead;
                font-size: 18px;
                line-height: 32px;
                border-radius: 50%;
                color: white;
              }

            }

          }

          .content-en{
             //height: 450px;
             width: 100%;
          }
        }
        .raw{
          position: relative;
          img{
            width: 10%;
            position: absolute;
            top: 100px;
            left: -50px;
          }
        }
      // }
      .step-box:last-child{
        .raw{
          img{
            display: none;
          }
        }
      }
    }
  .operation {
    margin-bottom: 10px;
    .btn {
      padding: 5px 0;
      font-size: 14px;
      span {
        margin-right: 12px;
      }
    }
  }

}
</style>
