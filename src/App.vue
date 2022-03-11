<!--
  -  Copyright 2020-2022 Huawei Technologies Co., Ltd.
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
    <Nav />
    <router-view
      class="view"
      :key="$route.fullPath"
    />
  </div>
</template>

<script>
import Nav from '../src/components/layout/Nav.vue'
export default {
  name: 'App',
  components: {
    Nav
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: defaultFont, Arial, Helvetica, sans-serif;
  min-width: 1200px;
  background: #3E279B;
  overflow: auto;
}
.view{
  margin-top: 65px;
  height:calc(100% - 65px);
}
</style>
