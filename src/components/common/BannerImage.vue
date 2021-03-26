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
  <div class="banner-image">
    <eg-banner
      :image-url="bannerImageUrl"
      :height="360"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import egBanner from 'eg-view/src/components/EgBanner.vue'
export default {
  components: {
    egBanner
  },
  data () {
    return {
      bannerImageUrl: 'images/how_it_works.png'
    }
  },
  computed: {
    ...mapState(['language'])
  }
}
</script>
<style lang='less' scoped>
.banner-image {
  width: 100%;
  position: relative;
  overflow: hidden;
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
</style>
