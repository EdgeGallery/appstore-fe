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
  <el-row class="developing-box">
    <div class="developing" />
    <div class="developing-tips">
      Page is under construction...
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'Developing',
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
.developing-box{
    background:#f4f4f4;
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 80px;
    .developing{
        background: url('../../assets/images/construct.png') center;
        width:445px;
        height:371px;
        margin:-186px 0 0 -223px;
        position: relative;
        top:50%;
        left:50%;
    }
    .developing-tips{
        position: relative;
        text-align: center;
        margin-top: 25px;
        font-size: 1.5em;
        top:52%;
    }
}
</style>
