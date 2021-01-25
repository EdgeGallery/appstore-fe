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
    id="app"
    style="overflow-x:hidden"
  >
    <Navcomp />
    <router-view
      class="view"
      :key="$route.fullPath"
    />
  </div>
</template>

<script>
import Navcomp from './components/layout/Nav.vue'
export default {
  name: 'App',
  components: {
    Navcomp
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 320px;
  background: #F0F2F5;
  overflow: auto;
}
.view{
  height:calc(100% - 65px);
  background: white;
}
</style>
