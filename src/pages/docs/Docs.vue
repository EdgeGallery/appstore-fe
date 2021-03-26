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
    <div class="operation">
      <div
        style="margin-bottom: 10px;"
        class="btn"
      >
        <p class="clearfix" />
      </div>
    </div>
    <div class="substeps">
      <div class="substep">
        <div
          class="subcontenttwo"
          :class="{'content-en': language === 'en'}"
        >
          <div class="characteristic">
            <span />{{ $t('docs.summary') }}
          </div>
          <div class="summaryContent">
            <span />{{ $t('docs.summaryContent') }}
            <br>
            <span />{{ $t('docs.summaryContent1') }}
            <br>
            <span />{{ $t('docs.summaryContent2') }}
            <br>
            <span />{{ $t('docs.summaryContent3') }}
            <br>
            <span />{{ $t('docs.summaryContent4') }}
          </div>
        </div>
        <div
          class="subcontenttwo"
          :class="{'content-en': language === 'en'}"
        >
          <div class="characteristic">
            <span />{{ $t('docs.characteristic') }}
          </div>
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
  data () {
    return {
      source: '',
      summary1: summary1,
      summaryen1: summaryen1,
      summary2: summary2,
      summaryen2: summaryen2,
      summary3: summary3,
      summaryen3: summaryen3
    }
  },
  methods: {
    getAppStoreDocs () {
      getDocsApi(this.language).then(res => {
        this.source = res.data ? res.data : ''
      })
    }
  },
  mounted () {
    this.getAppStoreDocs()
  }
}
</script>
<style lang='less' scoped>
.docs {
  .substeps {
      margin-top: 20px;
      background: white;
      padding: 40px 30px 75px;
      box-sizing: border-box;
      display: flex;
      position: relative;
      justify-content: space-around;
        .substep {
          width: 100%;
          font-size: 16px;
          // flex-direction: row;
          .docImg{
            // margin-top: 10px;
            background: white;
            padding: 10px 30px 0px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            .subDocImg{
              box-shadow: 0 0 10px rgba(0,0,0,0.2);
              background-color: #fff;
              margin: 20px;
              img{
                width: 100%;
              }
            }
          }
          .subcontenttwo {
            float: left;
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            flex-direction: column;
            position: relative;
            .characteristic{
              width: 100%;
              text-align: left;
              border-bottom: solid #194686 2px;
              font-size: 24px;
              font-weight: 550;

            }
            .summaryContent{
              margin-left: 30px;
              margin-top: 15px;
              width: 97%;
              line-height: 30px;
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
