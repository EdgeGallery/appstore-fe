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
    <div class="share_banner">
      <img
        :src="language === 'cn'?bannerImgcn:bannerImgen"
        alt=""
        class="share_words"
      >
    </div>
    <div class="introduceApp">
      <div class="part1 style1">
        <div class="introduce_words">
          <p class="introduce_name">
            {{ $t("appShare.manager") }}
          </p>
          <p class="introduce_content">
            {{ $t("appShare.appstoreManager") }}
          </p>
          <p
            class="introduce_button"
            @click="jumperToModule('appStoreManager')"
          >
            {{ $t("appShare.lookmore") }}
          </p>
        </div>
        <div class="intronduce_img">
          <img
            src="../../assets/images/outApp.png"
            alt=""
          >
        </div>
      </div>
      <div class="part1 style2">
        <div class="intronduce_img">
          <img
            src="../../assets/images/pushApp.png"
            alt=""
          >
        </div>
        <div class="introduce_words">
          <p class="introduce_name">
            {{ $t("nav.appPush") }}
          </p>
          <p class="introduce_content">
            {{ $t("appShare.appstorePush") }}
          </p>
          <p
            class="introduce_button"
            @click="jumperToModule('appStorePush')"
          >
            {{ $t("appShare.lookmore") }}
          </p>
        </div>
      </div>
      <div class="part1 style3">
        <div class="introduce_words">
          <p class="introduce_name">
            {{ $t("nav.appPull") }}
          </p>
          <p class="introduce_content">
            {{ $t("appShare.appstorePull") }}
          </p>
          <p
            class="introduce_button"
            @click="jumperToModule('appStorePull')"
          >
            {{ $t("appShare.lookmore") }}
          </p>
        </div>
        <div class="intronduce_img">
          <img
            src="../../assets/images/pullApp.png"
            alt=""
          >
        </div>
      </div>
      <div class="part1 style4">
        <div class="intronduce_img">
          <img
            src="../../assets/images/operateApp.png"
            alt=""
          >
        </div>
        <div class="introduce_words">
          <p class="introduce_name">
            {{ $t("nav.operAna") }}
          </p>
          <p class="introduce_content">
            {{ $t("appShare.appstoreOperAna") }}
          </p>
          <p
            class="introduce_button"
            @click="jumperToModule('appStoreOperAna')"
          >
            {{ $t("appShare.lookmore") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import enDetailButton from '@/assets/images/contentdetailen.png'
import cnDetailButton from '@/assets/images/contentdetailcn.png'
import bannerImgcn from '@/assets/images/share_cn.png'
import bannerImgen from '@/assets/images/share_en.png'
export default {
  components: {
  },
  data () {
    return {
      bannerImgcn: bannerImgcn,
      bannerImgen: bannerImgen,
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
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}

</script>

<style lang="less" scoped>
.app-share{
  width: 100%;
  .share_banner{
    width: 100%;
    min-width: 1200px;
    height:540px;
    background:url(../../assets/images/share_banner.png) center center no-repeat;
    padding-top: 167px;
    padding-left: 13.2%;
    .share_words{
      width: 36.1%;
    }
  }
  .part1{
    width: 100%;
    padding: 0 13.18%;
    min-width: 1200px;
    height: 660px ;
    display: flex;
    justify-content: center;
    align-items: center;
    .introduce_words{
      width: 100%;
      height: 520px;
      padding: 106px 5.6% ;
      .introduce_name{
        font-family:defaultFontBlod, Arial, Helvetica, sans-serif;
        height: 40px;
        font-size: 40px;
        color: #fff;
        margin-bottom: 50px;
      }
      .introduce_content{
        font-size: 24px;
        color: #fff;
        line-height: 40px;
        margin-bottom: 50px;
        .defaultFontLight {
          font-family: defaultFontLight,
            Arial,
            Helvetica,
            sans-serif !important;
        }
      }
      .introduce_button{
        width: 148px;
        font-size: 18px;
        color: #5944c0;
        background:#fff ;
        text-align: center;
        line-height: 40px;
        border: none;
        border-radius: 50px;
      }
      .introduce_button:hover{
        cursor: pointer;
        color:#fff ;
        background: #5944c0;
      }
    }
    .intronduce_img{
      width: 50%;
      height: 520px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 55%;
        height: 60%;
        min-width: 360px;
      }
    }
  }
  .style1{
    background: #331a85;
  }
  .style2{
    background: #3e279b;
    .intronduce_img{
      margin-left: -10%;
      img{
        height: 60%;
      }
    }
  }
  .style3{
    background: #331a85;
  }
  .style4{
    background: #3e279b;
    .intronduce_img{
      margin-left: -10%;
    }
  }
}
</style>
