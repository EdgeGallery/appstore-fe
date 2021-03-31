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
  <div class="works">
    <div class="banner-image">
      <img
        :src="language === 'cn'?howworks:howworksEN"
        class="imgMsgStyle"
        alt=""
      >
    </div>
    <div class="home_content">
      <h3 class="home_tit">
        <img
          class="status3-pic"
          :src="biginnerGuideIcon"
          alt=""
        >
      </h3>
      <div class="docs_pics">
        <div class="docsIndexIcon">
          <img
            class="status3-pic"
            :src="beginnericon"
            alt=""
          >
          <div class="name-title">
            <h5 class="name-font">
              {{ $t("docs.userGuide") }}
            </h5>
          </div>
          <div class="content-title">
            <h5 class="title-font">
              {{ $t("docs.titleContent") }}
            </h5>
          </div>
          <el-link
            class="button"
            :underline="false"
            :href="beginnerDetail"
          >
            <img
              :src="language === 'cn'?cnDetailButton:enDetailButton"
              class="content-detail-button"
              alt=""
            >
          </el-link>
        </div>
        <div class="docsIndexIcon">
          <img
            class="status3-pic"
            :src="APPDStandard"
            alt=""
          >
          <div class="name-title">
            <h5 class="name-font">
              {{ $t("docs.appFolderStar") }}
            </h5>
          </div>
          <div class="content-title">
            <h5 class="title-font">
              {{ $t("docs.titleContentAPPD") }}
            </h5>
          </div>
          <el-link
            class="button"
            :underline="false"
            :href="docsAPPDDetail"
          >
            <img
              :src="language === 'cn'?cnDetailButton:enDetailButton"
              class="content-detail-button"
              alt=""
            >
          </el-link>
        </div>
        <div class="docsIndexIcon">
          <img
            class="status3-pic"
            :src="interfaceStandard"
            alt=""
          >
          <div class="name-title">
            <h5 class="name-font">
              {{ $t("docs.interfaceStar") }}
            </h5>
          </div>
          <div class="content-title">
            <h5 class="title-font">
              {{ $t("docs.titleContentinter") }}
            </h5>
          </div>
          <el-link
            class="button"
            :underline="false"
            @click="jumpTointerface('1')"
          >
            <img
              :src="language === 'cn'?cnDetailButton:enDetailButton"
              class="content-detail-button"
              alt=""
            >
          </el-link>
        </div>
      </div>
    </div>

    <div class="home_interface">
      <h3 class="interface_tit">
        <img
          :src="interfaceFileIcon"
          class="content-detail-button"
          alt=""
        >
      </h3>
      <div class="interface_pics">
        <div class="docsIndexIcon">
          <img
            :src="appPromoteIcon"
            class="content-detail-button"
            alt=""
          >
          <el-link
            class="interface-title"
            :underline="false"
            @click="jumpTointerface('2')"
          >
            <h5 class="title-font">
              {{ $t("nav.appQuery2") }}
            </h5>
          </el-link>
        </div>
        <div class="docsIndexIcon">
          <img
            :src="appPullIcon"
            class="content-detail-button"
            alt=""
          >
          <el-link
            class="interface-title"
            :underline="false"
            @click="jumpTointerface('3-1')"
          >
            <h5 class="title-font">
              {{ $t("nav.appDownload3") }}
            </h5>
          </el-link>
        </div>
        <div class="docsIndexIcon">
          <img
            :src="centerMsgIcon"
            class="content-detail-button"
            alt=""
          >
          <el-link
            class="interface-title"
            :underline="false"
            @click="jumpTointerface('1')"
          >
            <h5 class="title-font">
              {{ $t("nav.appMessage1") }}
            </h5>
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import howworks from '@/assets/images/how_it_works.png'
import howworksEN from '@/assets/images/how_it_worksEN.png'
import beginnericon from '@/assets/images/beginnericon.png'
import APPDStandard from '@/assets/images/APPD_standard.png'
import interfaceStandard from '@/assets/images/interface_standard.png'
import appPromoteIcon from '@/assets/images/appPromoteIcon.png'
import appPullIcon from '@/assets/images/appPullIcon.png'
import centerMsgIcon from '@/assets/images/centerMsgIcon.png'
import enDetailButton from '@/assets/images/contentdetailen.png'
import cnDetailButton from '@/assets/images/contentdetailcn.png'
import biginnerGuideIcon from '@/assets/images/biginnerGuideIcon.png'
import interfaceFileIcon from '@/assets/images/interfaceFileIcon.png'
export default {
  // components: {
  //   Docs, DocsAPPD
  // },
  computed: {
    ...mapState(['language'])
  },
  data () {
    return {
      enDetailButton: enDetailButton,
      cnDetailButton: cnDetailButton,
      howworks: howworks,
      howworksEN: howworksEN,
      beginnericon: beginnericon,
      APPDStandard: APPDStandard,
      interfaceStandard: interfaceStandard,
      appPromoteIcon: appPromoteIcon,
      appPullIcon: appPullIcon,
      centerMsgIcon: centerMsgIcon,
      biginnerGuideIcon: biginnerGuideIcon,
      interfaceFileIcon: interfaceFileIcon,
      beginnerDetail: '/#/docsBeginnerGuide',
      docsAPPDDetail: '/#/docsAPPD',
      docsInterface: '/#/docsInterface'
    }
  },
  methods: {
    jumpTointerfaceNew (value) {
      this.$router.push({ name: 'docsInterface', params: { value: value } })
    },
    jumpTointerface (value) {
      this.$router.push({ name: 'docsInterface', params: { value: value } })
    }

  }
}
</script>
<style lang='less'>
body, html{
  width: 100%;
  height: 100%;
}
.works {
  margin-top: 65px;
  .banner-image {
  width: 100%;
  position: relative;
  overflow: hidden;
  }
  .home_content{
    // margin-top: 20px;
    background: white;
    padding: 35px 360px;
    box-sizing: border-box;
    // display: flex;
    position: relative;
    .home_tit{
      margin-top: 25px;
      font-size: 32px;
      text-align: center;
    }
   .docs_pics{
     margin-top: 30px;
      display: flex;
      justify-content: center;
      .docsIndexIcon{
        width: 30%;
        text-align: center;
        .content-title{
          .title-font{
            font-size: 16px;
            margin-top: 20px;
          }
        }
        .button{
          margin-top: 20px;
        }
        .name-title{
          .name-font{
            font-weight: 600;
            margin-top: 30px;
          }
        }
      }
    }
    .home_more{
      text-align: center;
      margin: 15px 0 30px;
      .el-link{
        font-size: 16px;
      }
    }
  }
  .home_interface{
    background: #fafafa;
    padding: 35px 360px;
    box-sizing: border-box;
    // display: flex;
    position: relative;
    .interface_tit{
      font-size: 32px;
      text-align: center;
    }
   .interface_pics{
      display: flex;
      justify-content: center;
      .docsIndexIcon{
        width: 30%;
        text-align: center;
        .interface-title{
          .title-font{
            margin-top: -90px

          }

        }
      }
    }
    .home_more{
      text-align: center;
      margin: 15px 0 30px;
      .el-link{
        font-size: 16px;
      }
    }
  }
  .recommend{
    .recomment_list{
      .button{
            width: 350px;
            .content-detail-button{
              width: 90px;
              height: 30px;
              display: inline-block;
              cursor: pointer;
            }
          }
      li{
        float: left;
        width: 30%;
        img{
          width: 100%;
          display: block;
          max-width: 496px;
          border-radius: 20px;
          cursor: pointer;
        }
        .rec_tit{
          font-size: 24px;
          margin: 20px 0 15px;
        }
        .rec_content{
          line-height: 25px;
          color: #848484;
        }
        .rec_more{
          font-size: 16px;
          margin-top: 10px;
        }
      }
      li:nth-child(2){
        margin: 0 5%;
      }
    }
  }
  .word {
    color: white;
    position: absolute;
    top: 110px;
    left: 145px;
    p:nth-child(1){
      font-size: 40px;
      margin-bottom: 30px;
    }
    p:nth-child(2){
      width: 500px;
      font-size: 20px;
      line-height: 40px;
    }
  }
}
.title-font :focus{
       background-color: red;

          }
  // .banner {
  //   img {
  //     width: 100%;
  //     height: 500px;
  //   }
  // }
  .el-tabs__nav-scroll{
    // text-align: center;
    display: flex;
    justify-content: center;
  }
  .el-tabs__nav{
    float: none;
  }
  .el-tabs__item{
    font-size: 19px;
  }

  .how-it-works {
    padding: 35px 200px;
    box-sizing: border-box;
    background: #fff;
    .oprefile{
        padding: 30px;
        background-color: #fff;
        text-align: center;
      }
    .summary{
            margin-top: 30px;
            width: 100%;
            font-size: 18px;
            font-weight: 450;
            height: 30px;
            padding: 30px;
            background: #fff;
            text-align: left

          }
    .steps {
      background: white;
      padding: 40px 30px 0px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      .step img{
        width: 100%;
      }

      .step :hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        background-color: #fff;
        padding: 20px 30px 0px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
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
</style>
