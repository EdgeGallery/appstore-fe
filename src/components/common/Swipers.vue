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
        <img
          class="swiper-image"
          :src="language === 'cn'?item.imgUrl:item.imgUrlEN"
          alt=""
        >
        <div
          class="home_text"
          :class="item.style"
        >
          <p class="tit">
            {{ $t('common.bannerTitle') }}
          </p>
          <p class="info">
            {{ $t('common.bannerWord') }}
          </p>
          <p class="info">
            {{ $t('common.bannerWord1') }}
          </p>
          <el-button
            class="upload_app"
            @click="uploadPackage"
          >
            <em />{{ $t('store.uploadApp') }}
          </el-button>
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
import missPic from '@/assets/images/missPic.png'
import missPicEN from '@/assets/images/missPicEN.png'
import uploadPackage from '../../pages/home/UploadPackage.vue'
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
      // swiperOptions: {
      //   loop: true,
      //   autoplay: {
      //     disableOnInteraction: false,
      //     delay: 4000
      //   }
      // },
      uploadDiaVis: false,
      missPic: missPic,
      missPicEN: missPicEN,
      SwiperList: [
        {
          id: '0001',
          imgUrl: require('../../assets/images/home_banner.png'),
          imgUrlEN: require('../../assets/images/home_banner.png'),
          style: 'block'

        },
        {
          id: '0002',
          imgUrl: require('../../assets/images/missPic.png'),
          imgUrlEN: require('../../assets/images/missPicEN.png'),
          style: 'none'

        }]
    }
  },
  methods: {
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
  height: 500px;
  position: relative;
  .banner{
    // height: 500px;
    // padding: 0 0 0;
    // color: #fff;
    //background: url('../../assets/images/home_banner.png') center center no-repeat;
    .home_text{
      position: absolute;
      top: 100px;
      left: 150px;
    }
    .home_text.none{
      display: none;
    }
    .home_text.block{
      display: block;
    }
    .tit{
      font-size: 40px;
      margin-bottom: 30px;
    }
    .info{
      font-size: 20px;
      margin-bottom: 5px;
    }
    .upload_app{
      border: 2px solid #9163cc;
      color: #606266;
      border-radius: 15px;
      font-size: 16px;
      padding: 6px 20px;
      margin-top: 30px;
      em{
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url('../../assets/images/home_banner_upload_icon.png') center center no-repeat;
        background-size: contain;
        position: relative;
        top: 7px;
        margin-right: 7px;
      }
      span{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        position: relative;
        top: -5px;
      }
    }
  }
  .el-carousel__container{
    height: 500px;
  }
  img{
    width: 100%;
    height: 100%;
  }
  // height: ;
  .el-carousel__item{
    img{
      background-image:'../../assets/images/chocolate.png'
    }
  }
  .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 350px;
      // margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
      line-height: 350px;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
</style>
