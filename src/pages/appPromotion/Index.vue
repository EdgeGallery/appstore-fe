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
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane :label="$t('apppromotion.appPromotion')" name="prom">
          <!-- <el-row class="batchProm">
            <el-col :span="24">
              <el-button
                id="myapp_checktest"
                type="primary"
                class="rt"
                @click="jumpTo"
              >
                {{ $t('apppromotion.batchPro') }}
              </el-button>
            </el-col>
          </el-row> -->
          <appList
            v-if="activeName == 'prom'" ref="prom"
          >
          </appList>
        </el-tab-pane>
        <el-tab-pane :label="$t('apppromotion.downloadAna')" name="down">
          <downloadAna
            v-if="activeName == 'down'" ref="down"
          >
          </downloadAna>
        </el-tab-pane>
        <pagination
          :table-data="appData"
          @getCurrentPageData="getCurrentPageData"
        />
      </el-tabs>
      <div class="clearfix" />
    </div>
  </div>
</template>

<script>
import downloadAna from './DownloadAna.vue'
import appList from './AppList.vue'
import promTask from './PromTask.vue'
import { getMyAppApi } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  components: {
    appList,
    downloadAna,
    pagination
  },
  props:['table-data'],
  data () {
    return {
      activeName: 'prom',
      appData:[]
    };
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
    // jumpTo () {
    //   this.$router.push('/app/prom/task')
    // },
    // uploadPackage () {
    //   this.uploadDiaVis = true
    // },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    handleClick(tab, event) {
        this.activeName = tab.name;
        var that = this;
        setTimeout(function(){
            that.onQuery();
        },500);
    }
  },
  mounted () {
    // this.userId = sessionStorage.getItem('userId')
    // this.getAppData()
    // this.tableData.push(JSON.parse(sessionStorage.getItem('taskData')))
  }
}
</script>
<style lang='less'>
.my-app {
  .my-app-content {
    background: white;
    padding: 20px;
  }
}
.batchProm{
  float: right;
  margin-bottom: 5px;
}
.el-tabs__item{
  font-size: 18px !important;
}
</style>
