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
              <h5 class="title-font">
                {{ $t("appShare.manager") }}
              </h5>
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
              <h5 class="title-font">
                {{ $t("nav.appPush") }}
              </h5>
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
              <h5 class="title-font">
                {{ $t("nav.appPull") }}
              </h5>
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
              <h5 class="title-font">
                {{ $t("nav.msgCenter") }}
              </h5>
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
              <h5 class="title-font">
                {{ $t("nav.operAna") }}
              </h5>
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
      width:60%;
      height: 650px;
      display: inline-block;
      background:#FAFAFA;
      margin-top: 10px;
      .part1{
        margin-top: 30px;
        width: 1130px;
        height: 300px;
        text-align: center;
        background:#FAFAFA;
        float: left;
        .item-style{
          width: 350px;
          height: 280px;
          margin: 5px 10px;
          background:#FFFFFF;
          display: inline-block;
          text-align: center;
          .icon{
            .img-icon{
              width: 70px;
              height: 70px;
              margin-top: 10px;
              display: inline-block;
            }
          }
          .content-title{
            width: 180px;
            height: 30px;
            margin-top: 10px;
            display: inline-block;
            .title-font{
              background: linear-gradient(to bottom, white 0%,white 50%, #c2f1f0 50%, #c2f1f0 100%);
              font-weight: bold;
            }
          }
          .content-detail{
            width: 250px;
            height: 110px;
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
      }
      .part2{
        margin-top: 30px;
        width: 1130px;
        height: 280px;
        text-align: left;
        margin-top: 20px;
        background:#FAFAFA;
        float: left;
        .item-style{
          width: 350px;
          height: 280px;
          margin: 5px 15px;
          background:#FFFFFF;
          display: inline-block;
          text-align: center;
          .icon{
            width: 350px;
            .img-icon{
              margin-top: 10px;
              width: 70px;
              height: 70px;
              display: inline-block;
            }
          }
          .content-title{
            width: 180px;
            height: 30px;
            margin-top: 10px;
            display: inline-block;
            .title-font{
              background: linear-gradient(to bottom, white 0%,white 50%, #c2f1f0 50%, #c2f1f0 100%);
              font-weight: bold;
            }
          }
          .content-detail{
            width: 250px;
            height: 110px;
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
            }
          }
        }
      }
    }
  }

}

</style>
