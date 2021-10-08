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
  <div
    class="wrapper"
  >
    <el-carousel
      indicator-position="outside"
      direction="horizontal"
      class="banner"
    >
      <el-carousel-item
        v-for="item in SwiperList"
        :key="item.id"
      >
        <div
          class="banner_img"
          :style="'background:url('+item.imgUrl+') center center'"
        />
        <div
          class="home_text"
          :class="item.style"
        >
          <img
            :src="language === 'cn' ? require('@/assets/images/banner1_cn.png'): require('@/assets/images/banner1_en.png')"
            class="img_words"
            alt=""
          >
          <el-button
            class="upload_app"
            @click="uploadPackage"
          >
            <em />{{ $t('store.uploadApp') }}
          </el-button>
        </div>
        <div
          class="home_text"
          :class="item.style2"
        >
          <img
            :src="language === 'cn' ? require('@/assets/images/banner2_cn.png'): require('@/assets/images/banner2_en.png')"
            class="img_words"
            alt=""
          >
        </div>
      </el-carousel-item>
    </el-carousel>
    <div v-show="uploadDiaVis">
      <uploadPackage
        v-model="uploadDiaVis"
        @getAppData="getAppData"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import uploadPackage from '../../pages/home/UploadPackage.vue'
import { common } from '../../tools/comon.js'
export default {
  name: 'HomeSwiper',
  components: {
    uploadPackage
  },

  computed: {
    ...mapState(['language'])
  },
  data () {
    return {
      uploadDiaVis: false,
      screenHeight: document.body.clientHeight,
      SwiperList: [
        {
          id: '0001',
          imgUrl: require('../../assets/images/banner1.png'),
          style: 'block',
          style2: 'none'
        },
        {
          id: '0002',
          imgUrl: require('../../assets/images/banner2.png'),
          style: 'none',
          style2: 'block'
        }]
    }
  },
  mounted () {
    this.setDivHeight()
  },
  methods: {
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'el-carousel__container', 65)
    },
    uploadPackage () {
      let userName = sessionStorage.getItem('userNameRole')
      if (userName === 'guest') {
        this.uploadDiaVis = false
      } else {
        this.uploadDiaVis = true
      }
    }
  }
}
</script>

<style lang="less">
.wrapper{
  position: relative;
  .banner{
        overflow: hidden;
    .banner_img{
       height: 100%;
    }
    .home_text{
      position: absolute;
      top: 50px;
      left: 150px;
        .img_words{
      width:90%;
      margin-top:180px;
      margin-left:80px;
      display:block;
  }
    }
    .home_text.none{
      display: none;
    }
    .home_text.block{
      display: block;
    }
    .upload_app{
      height: 60px;
      width: 200px;
      background: linear-gradient(-37deg, #53DABD, #54AAF3);
      box-shadow: 0px 12px 12px 0px rgba(83,218,189, 0.7);
      border-radius: 30px;
      color: #606266;
      font-size: 20px;
      text-align: center;
      border: none;
      margin: 80px 0px 0px 95px;
    }
  }
  img{
    height: 100%;
  }
  .el-carousel__indicators--outside {
    position: relative;
    top: -100px;
    left: -660px;
  }
  .el-carousel__indicator--horizontal.is-active .el-carousel__button  {
    width: 60px !important;
    height: 10px !important;
    background: #55D8BF !important;
    border-radius: 5px !important;

  }
  .el-carousel__indicators--outside button{
    opacity: 1 !important;
  }
  .el-carousel__button {
    width: 12px !important;
    height: 10px !important;
    background: #2FA09F !important;
    border-radius: 5px !important;
  }
}

 @media (max-width: 1688px) and (min-width: 1200px){
   .wrapper {
    .img_words{
        width:80%;
        margin-top:200px;
        margin-left:-60px;
        display:block;
    }
    .upload_app{
      margin-left:100px !important;
    }
    }
      .el-carousel__indicators--outside {
        left: -470px !important;
    }
  }
</style>
