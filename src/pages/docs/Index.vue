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
  <div class="works">
    <bannerImage />
    <div class="how-it-works">
      <div class="steps">
        <div
          class="step-box"
        >
          <div class="step">
            <img
              src="../../assets/images/how_it_works_icon1.png"
              alt
            >
            <h5>{{ $t('docs.step1') }}</h5>
            <div
              class="content"
              :class="{'content-en': language === 'en'}"
            >
              <div>
                <span>1</span>
                <p>
                  <a
                    style="color:#409eff"
                    href="https://gitee.com/edgegallery"
                    target="_blank"
                    rel="noopener noreferrer"
                  >EdgeGallery</a>
                  {{ $t('docs.step1Intr') }}
                </p>
              </div>
              <h6>
                <span />{{ $t('docs.step1Info1') }}
              </h6>
              <h6>
                <span />{{ $t('docs.step1Info1') }}
              </h6>
              <h6>{{ $t('docs.step1Process') }}</h6>
            </div>
          </div>
          <div class="raw">
            <img
              src="../../assets/images/how_it_works_raw.png"
              alt
            >
          </div>
        </div>
        <div
          class="step-box"
          v-for="(item, index) in workSteps"
          :key="index"
        >
          <div class="step">
            <img
              :src="item.img"
              alt
            >
            <h5>{{ $t(item.title1) }}</h5>
            <div
              class="content"
              :class="{'content-en': language === 'en'}"
            >
              <div>
                <span>{{ index + 2 }}</span>
                <p>{{ $t(item.title2) }}</p>
              </div>
              <h6
                v-for="content in item.content"
                :key="content"
              >
                <span />{{ $t(content) }}
              </h6>
              <h6>{{ $t(item.step) }}</h6>
            </div>
          </div>
          <div class="raw">
            <img
              src="../../assets/images/how_it_works_raw.png"
              alt
            >
          </div>
        </div>
      </div>
      <Docs class="docs" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bannerImage from '../../components/common/BannerImage.vue'
import Docs from './Docs.vue'
export default {
  components: {
    Docs, bannerImage
  },
  computed: {
    ...mapState(['language'])
  },
  data () {
    return {
      workSteps: [
        // {
        //   img: require('../../assets/images/how_it_works_icon1.png'),
        //   title1: 'docs.step1',
        //   title2: 'docs.step1Intr',
        //   content: [
        //     'docs.step1Info1',
        //     'docs.step1Info2'
        //   ],
        //   step: 'docs.step1Process'
        // },
        {
          img: require('../../assets/images/how_it_works_icon2.png'),
          title1: 'docs.step2',
          title2: 'docs.step2Intr',
          content: [
            'docs.step2Info1',
            'docs.step2Info2'
          ],
          step: 'docs.step2Process'
        },
        {
          img: require('../../assets/images/how_it_works_icon3.png'),
          title1: 'docs.step3',
          title2: 'docs.step3Intr',
          content: [
            'docs.step3Info1'
          ],
          step: 'docs.step3Process'
        },
        {
          img: require('../../assets/images/how_it_works_icon4.png'),
          title1: 'docs.step4',
          title2: 'docs.step4Intr',
          content: [
            'docs.step4Info1',
            'docs.step4Info2'
          ],
          step: 'docs.step4Process'
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
.works {
  margin-top: 65px;
  .banner {
    img {
      width: 100%;
      height: 500px;
    }
  }
  .how-it-works {
    padding: 35px 55px;
    box-sizing: border-box;
    background: #eee;
    .steps {
      background: white;
      padding: 40px 30px 75px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      .step-box {
        display: flex;
        .step {
          width: 290px;
          text-align: center;
          font-size: 14px;
          img{
            height: 170px;
          }
          h5 {
            font-size: 24px;
            line-height: 33px;
            margin: 20px 0;
            height: 66px;
          }
          .content {
            border-radius: 4px;
            background: #f5f9fb;
            padding: 20px;
            box-sizing: border-box;
            height: 330px;
            overflow: hidden;
            position: relative;
            div {
              padding: 0;
              span {
                display: inline-block;
                height: 32px;
                width: 32px;
                background: #2d9ead;
                font-size: 18px;
                line-height: 32px;
                border-radius: 50%;
                color: white;
              }
              p {
                line-height: 55px;
                color: #212121;
                font-weight: 600;
              }
            }
            h6 {
              text-align: left;
              font-weight: 500;
              color: #212121;
              font-size: 14px;
              line-height: 30px;
              padding: 0 20px;
              span {
                display: inline-block;
                height: 8px;
                width: 8px;
                background: #2d9ead;
                border-radius: 50%;
                margin-right: 8px;
              }
            }
            h6:last-child {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 20px;
              font-size: 10px;
              color: #999999;
              letter-spacing: 0;
              text-align: center;
            }
          }
          .content-en{
             height: 450px;
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
      }
      .step-box:last-child{
        .raw{
          img{
            display: none;
          }
        }
      }
    }
  }
}
</style>
