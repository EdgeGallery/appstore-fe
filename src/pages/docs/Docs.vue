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

        <div class="docImg">
          <div class="subDocImg">
            <img
              src="../../assets/images/summary1.png"
              alt
            >
          </div>
          <div class="subDocImg">
            <img
              src="../../assets/images/summary2.png"
              alt
            >
          </div>
          <div class="subDocImg">
            <img
              src="../../assets/images/summary3.png"
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
          .docImg{
            margin-top: 10px;
            background: white;
            padding: 40px 30px 0px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            .subDocImg{
              box-shadow: 0 0 10px rgba(0,0,0,0.2);
              background-color: #fff;
              margin: 20px;
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
            // width: 100%;
            .summary{
              width: 100%;
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
