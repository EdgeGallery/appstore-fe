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
  <div class="docs">
    <div class="operation">
      <div
        style="margin-bottom: 10px;"
        class="btn"
      >
        <p class="clearfix" />
      </div>
    </div>
    <el-tabs
      class="appdpane"
      v-model="activeName"
      tab-position="left"
      @tab-click="getAppStoreDocs"
    >
      <el-tab-pane
        :label="$t('docs.summary')"
        name="first"
      >
        <div id="test-editor">
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('docs.toscaFolder')"
        name="second"
      >
        <div id="test-editor">
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('docs.APPDFolder')"
        name="third"
      >
        <div id="test-editor">
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('docs.imageFolder')"
        name="four"
      >
        <div id="test-editor">
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('docs.manifestFile')"
        name="five"
      >
        <div id="test-editor">
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('docs.artifactsFolder')"
        name="six"
      >
        <div id="test-editor">
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getDocsApi } from '../../tools/api.js'
export default {
  props: {
    treeId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['language'])
  },
  watch: {
    language (val) {
      this.getAppStoreDocs()
      if (val === 'en') {
        this.updateMdUrl = './APPPackageDefinition.md'
      }
    }
  },
  data () {
    return {
      activeName: 'second',
      source: '',
      updateMdUrl: './APPPackageDefinition.md'
    }
  },
  methods: {
    getAppStoreDocs () {
      console.log(this.activeName)
      getDocsApi(this.language, this.activeName).then(res => {
        this.source = res.data ? res.data : ''
      })
    }
  },
  mounted () {
    this.getAppStoreDocs()
  }
}
</script>
<style lang='less' scoped>
.docs {
  .appdpane {
    font-size: 15px;
  }
  margin-top: 10px;
  font-size: 14px;
  .operation {
    margin-bottom: 10px;
    .btn {
      padding: 5px 0;
      font-size: 14px;
      span {
        margin-right: 12px;
      }
    }
  }
}
</style>
