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
  <div class="appVedio">
    <div
      class="vedio"
      v-show="playerOptions.sources.length===0"
    >
      <img
        class="dedio_img"
        :src="videoIconUrl"
        alt=""
      >
      <p>
        {{ $t('store.hasNotVideo') }}
      </p>
    </div>
    <div v-show="playerOptions.sources.length!==0">
      <video-player
        class="video-player-box vjs-big-play-centered demo-tab"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playerOptions: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      videoIconUrl: require('../../assets/images/no_info.png'),
      userId: sessionStorage.getItem('userId')
    }
  }
}
</script>
<style lang="less">
.appVedio {
  background: #2E147C;
  border-radius: 16px ;
  padding: 20px;
  .vedio{
    color: #2E147C;
    text-align: center;
    .dedio_img{
      margin-top: 10px;
    }
    p{
      margin: -10px 0 20px;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
