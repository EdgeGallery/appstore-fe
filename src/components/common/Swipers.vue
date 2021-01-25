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
      loop="true"
    >
      <el-carousel-item
        v-for="item in SwiperList"
        :key="item.id"
      >
        <a
          :href="item.url"
          target="_blank"
        >
          <img
            class="swiper-image"
            :src="item.imgUrl"
            alt=""
          >
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      // swiperOptions: {
      //   loop: true,
      //   autoplay: {
      //     disableOnInteraction: false,
      //     delay: 4000
      //   }
      // },
      SwiperList: [{
        id: '0001',
        imgUrl: require('../../assets/images/chocolate.png'),
        url: 'http://www.edgegallery.org/577.html'
      }, {
        id: '0002',
        imgUrl: require('../../assets/images/missPic.png')

      }]
    }
  }
}
</script>

<style lang="less">
.wrapper{
  .el-carousel__container{
    height: 330px;
  }
  height: 350px;
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
