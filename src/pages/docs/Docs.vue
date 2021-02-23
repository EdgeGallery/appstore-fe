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
          class="subcontent"
          :class="{'content-en': language === 'en'}"
        >
          <div class="summary">
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
          </div>
        </div>

        <div
          class="subcontenttwo"
          :class="{'content-en': language === 'en'}"
        >
          <div class="characteristic">
            <span />{{ $t('docs.characteristic') }}
          </div>
          <div class="chaContent">
            <span />{{ $t('docs.appUpload') }}
            <span />{{ $t('docs.appTest') }}
            <span />{{ $t('docs.appPublish') }}
            <br>
            <span />{{ $t('docs.appDetail') }}
            <span />{{ $t('docs.appDownload') }}
            <span />{{ $t('docs.appPromote') }}
            <br>
            <span />{{ $t('docs.appPull') }}
            <span />{{ $t('docs.messageMgmt') }}
            <span />{{ $t('docs.appstoreMgmt') }}
          </div>
        </div>
        <!-- <div class="docImg">
          <img
            src="../../assets/images/all-the-arch.png"
            alt
          >
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getDocsApi } from '../../tools/api.js'
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
      source: ''
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
          font-size: 16px;
          // flex-direction: row;
          docImg{
            height: 200px;
            line-height:200px;
            padding: 20px;
            width: 500px;
            position: relative;
            margin-top: 20px;
            // border-top: solid #194686 2px;
            text-align: center;
          }
          .subcontenttwo {
            float: left;
            width: 50%;
            padding: 20px;
            box-sizing: border-box;
            // height: 280px;
            flex-direction: column;
            position: relative;
            .characteristic{
              // margin-bottom: 15px;
              width: 90%;
              border-bottom: solid #194686 2px;
              font-size: 24px;
              font-weight: 550;
            }
            .chaContent{
              width: 70%;
              margin-top: 15px;
              scroll-margin-left: 15px;
            }
            div {
              padding: 0;
              span {
                display: inline-block;
                height: 32px;
                width: 32px;
                //background: #2d9ead;
                font-size: 18px;
                line-height: 32px;
                border-radius: 50%;
                color: white;
              }

            }
          }
          .subcontent {
            border-radius: 4px;
            float: left;
            padding: 20px;
            box-sizing: border-box;
            // height: 280px;
            overflow: hidden;
            position: relative;
            flex-direction: column;
            width: 50%;
            .summary{
              width: 90%;
              border-bottom: solid #194686 2px;
              font-size: 24px;
              font-weight: 550;

            }
            .summaryContent{
              margin-left: 30px;
              margin-top: 15px;
              width: 80%;
              line-height: 30px;
            }
            div {
              padding: 0;
              span {
                display: inline-block;
                height: 32px;
                width: 32px;
                //background: #2d9ead;
                font-size: 18px;
                line-height: 32px;
                border-radius: 50%;
                color: white;
              }

            }
          }
          .content-en{
             height: 450px;
             width: 100%;
          }
        }
        .raw{
          position: relative;
          img{
            width: 100px;
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
