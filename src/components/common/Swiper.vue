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
    <swiper
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="item of SwiperList"
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
      </swiper-slide>
      <div
        class="swiper-pagination"
        slot="pagination"
      />
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination' },
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 4000
        }
      },
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
  .swiper-pagination-bullet{
    background: #fff;
    width: 12px;
    height: 12px;
  }
  // overflow: hidden;
  // width: 100%;
  // height: 0;
  // padding-bottom: 38.15%;
  margin-top: 65px;
  background: #eee;
  .swiper-image{
    width: 100%
  }
}
</style>
