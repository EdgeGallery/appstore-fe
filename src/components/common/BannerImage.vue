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
  <div class="banner-image">
    <img
      src="../../assets/images/how_it_works.png"
      alt
    >
    <div class="word">
      <p>{{ $t('common.bannerTitle') }}</p>
      <p>{{ $t('common.bannerWord') }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['language'])
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang='less' scoped>
.banner-image {
  height: 360px;
  width: 100%;
  position: relative;
  overflow: hidden;
  color: white;
  img{
    height: 360px;
    width: 100%;
  }
  .word {
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
</style>
