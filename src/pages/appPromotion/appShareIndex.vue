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
      <div class="part1">
        <div class="introduce_words">
          <p class="introduce_name">
            {{ $t("appShare.manager") }}
          </p>
          <p class="introduce_line" />
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
          <p class="introduce_line" />
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
      <div class="part1">
        <div class="introduce_words">
          <p class="introduce_name">
            {{ $t("nav.appPull") }}
          </p>
          <p class="introduce_line" />
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
      <div class="part1 style3">
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
          <p class="introduce_line" />
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
  created () {
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
    // background-size:100% 100%;
    padding-top: 167px;
    padding-left: 13.2%;
    .share_words{
      // height: 215px;
      width: 36.1%;

    }
  }
  .introduceApp{
    width: 100%;
    padding: 0 13.23%;
    min-width: 1200px;
  }
  .part1{
    width: 100%;
    height: 520px ;
    display: flex;
    justify-content: center;
    align-items: center;
    .introduce_words{
      width: 100%;
      height: 520px;
      width: 50%;
      padding: 106px 5.6% ;
      .introduce_name{
        height: 40px;
        font-size: 32px;
        font-family: HarmonyHeiTi;
        font-weight: bold;
        color: #5D3DA0;
      }
      .introduce_line{
        width: 88px;
        height: 7px;
        background: #9E7BCD;
        opacity: 0.2;
        border-radius: 4px;
        margin-top: 25px;
        margin-bottom: 40px;
      }
      .introduce_content{
        font-size: 18px;
        font-family: HarmonyOS Sans SC;
        font-weight: 400;
        color: #666666;
        line-height: 32px;
        margin-bottom: 90px;
      }
      .introduce_button{
        width: 148px;
        font-size: 16px;
        font-family: HarmonyOS Sans SC;
        font-weight: 300;
        color: #5D3DA0;
        text-align: center;
        line-height: 40px;
        border: 1px solid #5D3DA0;
        border-radius: 4px;
      }
      .introduce_button:hover{
        cursor: pointer;
        background-color: rgb(239, 230, 240);
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
  .style2{
    .intronduce_img{
      margin-left: -10%;
      img{
        height: 60%;
      }
    }
  }
  .style3{
    .intronduce_img{
      margin-left: -10%;
    }
  }
}
</style>
