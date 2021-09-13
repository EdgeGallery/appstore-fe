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
  <div class="appIntroduction">
    <mavon-editor
      v-model="source"
      :toolbars-flag="false"
      :editable="false"
      :subfield="false"
      default-open="preview"
      :box-shadow="false"
      preview-background="#ffffff"
    />
  </div>
</template>

<script>
export default {
  props: {
    source: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      currentPageData: [],
      dataLoading: true,
      // source: 'this is app detail test',
      userId: sessionStorage.getItem('userId'),
      appName: '',
      language: localStorage.getItem('language')
    }
  },
  methods: {
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  }

}
</script>
<style lang="less">
.appIntroduction {
  margin: auto;
  background: #fff;
  border-radius: 16px;

  .paginationStyle{
    float: right;
    margin-top: 20px;
    margin-right: 30px;
  }
}
</style>
