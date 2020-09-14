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
  <div class="my-app padding56">
    <div class="my-app-content">
      <el-row>
        <el-col :span="24">
          <el-button
            id="myapp_checktest"
            type="primary"
            class="rt"
            @click="jumpTo"
          >
            {{ $t('myApp.checkTest') }}
          </el-button>
        </el-col>
      </el-row>
      <appList
        :app-data="currentPageData"
        :delete-btn="true"
        @getAppData="getAppData"
        :data-loading="dataLoading"
      />
      <pagination
        :table-data="appData"
        @getCurrentPageData="getCurrentPageData"
      />
      <div class="clearfix" />
    </div>
  </div>
</template>

<script>
import appList from '../home/AppList.vue'
import { getMyAppApi } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  components: {
    appList,
    pagination
  },
  data () {
    return {
      userId: '',
      appData: [],
      dataLoading: true,
      currentPageData: []
    }
  },
  methods: {
    getAppData () {
      getMyAppApi(this.userId)
        .then(res => {
          this.appData = res.data
          this.dataLoading = false
        }, () => {
          this.dataLoading = false
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.getMyAppFail'),
            type: 'warning'
          })
        })
    },
    jumpTo () {
      this.$router.push('/app/test/task')
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('userId')
    this.getAppData()
  }
}
</script>
<style lang='less' scoped>
.my-app {
  .my-app-content {
    background: white;
    padding: 20px;
  }
}
</style>
