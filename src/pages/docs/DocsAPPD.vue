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
    <div id="test-editor">
      <mavon-editor
        v-model="source"
        :toolbars-flag="false"
        :editable="false"
        :subfield="false"
        default-open="preview"
      />
    </div>
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
      source: '',
      updateMdUrl: './APPPackageDefinition.md'
    }
  },
  methods: {
    getAppStoreDocs () {
      getDocsApi(this.language).then(res => {
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
  margin-top: 10px;
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
