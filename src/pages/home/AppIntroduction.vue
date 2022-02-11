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
  }
}
</script>
<style lang="less">
.appIntroduction {
  margin: auto;
  border-radius: 16px;
}
.v-note-wrapper{
  border: none !important;
}
.markdown-body{
  background: transparent !important;
}
.v-note-wrapper .v-note-panel{
  border-radius:0 16px 16px 16px !important ;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html{
  color: #fff;
  font-family: defaultFontLight,
    Arial,
    Helvetica,
    sans-serif !important;
   padding: 32px 59px !important;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  background: transparent !important;
  padding: 40px;
}
</style>
