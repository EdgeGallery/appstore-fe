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
  <div class="app-share">
    <div class="app-hare-content">
      <eg-banner
        :image-url="bannerImg"
      />
      <div class="nav-content">
        <div class="part1">
          <div class="item-style">
            <div class="icon">
              <img
                src="../../assets/images/appstoremanager.png"
                class="img-icon"
                alt=""
              >
            </div>
            <div class="content-title">
              <span class="title-font">
                {{ $t("appShare.manager") }}
              </span>
            </div>
            <div class="content-detail">
              <span class="detailStyle">{{ $t("appShare.appstoreManager") }}</span>
            </div>
            <div class="button">
              <img
                :src="language === 'cn'?cnDetailButton:enDetailButton"
                class="content-detail-button"
                @click="jumperToModule('appStoreManager')"
                alt=""
              >
            </div>
          </div>
          <div class="item-style">
            <div class="icon">
              <img
                src="../../assets/images/apppush.png"
                class="img-icon"
                alt=""
              >
            </div>
            <div class="content-title">
              <span class="title-font">
                {{ $t("nav.appPush") }}
              </span>
            </div>
            <div class="content-detail">
              <span class="detailStyle">{{ $t("appShare.appstorePush") }}</span>
            </div>
            <div class="button">
              <img
                :src="language === 'cn'?cnDetailButton:enDetailButton"
                class="content-detail-button"
                @click="jumperToModule('appStorePush')"
                alt=""
              >
            </div>
          </div>
          <div class="item-style">
            <div class="icon">
              <img
                src="../../assets/images/apppull.png"
                class="img-icon"
                alt=""
              >
            </div>
            <div class="content-title">
              <span class="title-font">
                {{ $t("nav.appPull") }}
              </span>
            </div>
            <div class="content-detail">
              <span class="detailStyle">{{ $t("appShare.appstorePull") }}</span>
            </div>
            <div class="button">
              <img
                :src="language === 'cn'?cnDetailButton:enDetailButton"
                class="content-detail-button"
                @click="jumperToModule('appStorePull')"
                alt=""
              >
            </div>
          </div>
        </div>
        <div class="part2">
          <div class="item-style">
            <div class="icon">
              <img
                src="../../assets/images/messagecenter.png"
                class="img-icon"
                alt=""
              >
            </div>
            <div class="content-title">
              <span class="title-font">
                {{ $t("nav.msgCenter") }}
              </span>
            </div>
            <div class="content-detail">
              <span class="detailStyle">{{ $t("appShare.appstoreMsg") }}</span>
            </div>
            <div class="button">
              <img
                :src="language === 'cn'?cnDetailButton:enDetailButton"
                class="content-detail-button"
                @click="jumperToModule('appStoreMsg')"
                alt=""
              >
            </div>
          </div>
          <div class="item-style">
            <div class="icon">
              <img
                src="../../assets/images/operationana.png"
                class="img-icon"
                alt=""
              >
            </div>
            <div class="content-title">
              <span class="title-font">
                {{ $t("nav.operAna") }}
              </span>
            </div>
            <div class="content-detail">
              <span class="detailStyle">{{ $t("appShare.appstoreOperAna") }}</span>
            </div>
            <div class="button">
              <img
                :src="language === 'cn'?cnDetailButton:enDetailButton"
                class="content-detail-button"
                @click="jumperToModule('appStoreOperAna')"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EgBanner from 'eg-view/src/components/EgBanner.vue'
import enDetailButton from '@/assets/images/contentdetailen.png'
import cnDetailButton from '@/assets/images/contentdetailcn.png'
export default {
  components: {
    EgBanner
  },
  data () {
    return {
      bannerImg: 'images/sharebannercn.png',
      enDetailButton: enDetailButton,
      cnDetailButton: cnDetailButton,
      language: localStorage.getItem('language')
    }
  },
  methods: {
    jumperToModule (type) {
      switch (type) {
        case 'appStoreManager':
          this.$router.push('/apppromote')
          break
        case 'appStorePush':
          this.$router.push('/apppromotion')
          break
        case 'appStorePull':
          this.$router.push('/appPull')
          break
        case 'appStoreMsg':
          this.$router.push('/msgCenter')
          break
        case 'appStoreOperAna':
          this.$router.push('/operationAnalyse')
          break
        default:
      }
    }
  },
  mounted () {
    this.language = localStorage.getItem('language')
    this.bannerImg = this.language === 'cn' ? 'images/sharebannercn.png' : 'images/sharebanneren.png'
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.bannerImg = this.language === 'cn' ? 'images/sharebannercn.png' : 'images/sharebanneren.png'
    }
  }
}

</script>

<style lang="less" scoped>
.app-share{
  width: 100%;
  height: 100%;
  .app-hare-content {
    background:#FFFFFF;
    margin:0 auto;
    text-align: center;
    .nav-content{
      width: 1110px;
      height: 710px;
      display: inline-block;
      background:#FAFAFA;
      margin-top: 10px;
      .part1{
        margin-top: 20px;
        height: 320px;
        text-align: center;
        background:#FAFAFA;
        .item-style{
          width: 350px;
          height: 320px;
          margin: 5px 10px;
          background:#FFFFFF;
          display: inline-block;
          text-align: center;
          .icon{
            .img-icon{
              width: 93px;
              height: 93px;
              margin-top: 10px;
              display: inline-block;
            }
          }
          .content-title{
            width: 330px;
            height: 30px;
            margin-top: 10px;
            display: inline-block;
            .title-font{
              background: linear-gradient(to bottom, white 0%,white 50%, #c2f1f0 50%, #c2f1f0 100%);
              font-weight: bold;
              font-size: 20px;
              font-family: Microsoft YaHei , sans-serif;
            }
          }
          .content-detail{
            width: 260px;
            height: 95px;
            margin-top: 10px;
            word-wrap:break-word;
            display: inline-block;
            color: #A5A5A5;
            font-size: 14px;
          }
          .button{
            width: 350px;
            .content-detail-button{
              width: 90px;
              height: 30px;
              display: inline-block;
              cursor: pointer;
            }
          }
        }
        .item-style:hover{
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          background-color: #fff;
        }
      }
      .part2{
        height: 320px;
        text-align: left;
        margin-top: 20px;
        background:#FAFAFA;
        .item-style{
          width: 350px;
          height: 320px;
          margin: 5px 10px;
          background:#FFFFFF;
          display: inline-block;
          text-align: center;
          .icon{
            width: 350px;
            .img-icon{
              margin-top: 10px;
              width: 93px;
              height: 93px;
              display: inline-block;
            }
          }
          .content-title{
            width: 330px;
            height: 30px;
            margin-top: 10px;
            display: inline-block;
            .title-font{
              background: linear-gradient(to bottom, white 0%,white 50%, #c2f1f0 50%, #c2f1f0 100%);
              font-weight: bold;
              font-size: 18px;
              font-family: Microsoft YaHei , sans-serif;
            }
          }
          .content-detail{
            width: 260px;
            height: 95px;
            margin-top: 10px;
            word-wrap:break-word;
            display: inline-block;
            color: #A5A5A5;
            font-size: 14px;
          }
          .button{
            width: 350px;
            .content-detail-button{
              width: 90px;
              height: 30px;
              display: inline-block;
              cursor: pointer;
            }
          }
        }
        .item-style:hover{
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          background-color: #fff;
        }
      }
    }
  }

}

</style>
