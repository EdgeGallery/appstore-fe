<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
    class="app-list"
  >
    <el-table
      :data="appData"
      class="common_table"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        :label="$t('common.appName')"
        width="160"
      >
        <template slot-scope="scope">
          <el-tooltip
            placement="top"
            width="160"
            effect="dark"
            :content="scope.row.name"
            v-if="scope.row.name.length>20"
          >
            <div>{{ scope.row.name }}</div>
            <div slot="reference">
              {{ scope.row.name }}
            </div>
          </el-tooltip>
          <div v-else>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="provider"
        :label="$t('common.provider')"
        width="100"
      />
      <el-table-column
        prop="type"
        :label="$t('store.type')"
        width="180"
      />
      <el-table-column
        prop="affinity"
        :label="$t('system.architecture')"
        width="115"
      />
      <el-table-column
        prop="deployMode"
        :label="$t('store.workloadType')"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.deployMode==='container'?$t('store.deployContainer'):$t('store.deployVM') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        :label="$t('common.uploadTime')"
        width="175"
      />
      <el-table-column
        prop="shortDesc"
        :label="$t('common.description')"
        width="220"
      >
        <template slot-scope="scope">
          <el-tooltip
            placement="top"
            width="300"
            effect="dark"
            :content="scope.row.shortDesc"
            v-if="scope.row.shortDesc.length>20"
          >
            <div>{{ scope.row.shortDesc }}</div>
            <div slot="reference">
              {{ scope.row.shortDesc }}
            </div>
          </el-tooltip>
          <div v-else>
            {{ scope.row.shortDesc }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="downloadCount"
        :label="$t('store.most')"
        width="90"
      />
      <el-table-column
        prop="score"
        :label="$t('store.score')"
        width="75"
      />
      <el-table-column
        :label="$t('common.operation')"
        width="170"
      >
        <template slot-scope="scope">
          <el-button
            id="applist_detail"
            @click="enterDetail(scope.row)"
            class="common_operationBtn"
          >
            {{ $t('common.detail') }}
          </el-button>
          <el-button
            id="applist_delete"
            @click="offShelfPackage(scope.row)"
            class="common_operationBtn"
          >
            {{ $t('common.offShelf') }}
          </el-button>
        </template>
      </el-table-column>
      <template slot="empty">
        <div>
          <img
            src="../../assets/images/empty.png"
            alt=""
            style="padding: 10px;"
          >
          <p>{{ $t('common.noData') }}</p>
        </div>
      </template>
    </el-table>
  </div>
</template>
<script>
import { offShelfAppApi } from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
  props: {
    appData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    enterDetail (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
      sessionStorage.setItem('pathSource', 'index')
    },
    offShelfPackage (row) {
      if (sessionStorage.getItem('userId') === row.userId || sessionStorage.getItem('userNameRole') === 'admin') {
        this.$confirm(this.$t('promptMessage.offShelfPrompt'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          let userId = sessionStorage.getItem('userId')
          let userName = sessionStorage.getItem('userName')
          offShelfAppApi(row.appId, row.packageId, userId, userName).then(res => {
            this.$emit('getAppData')
            this.$message({
              duration: 2000,
              message: this.$t('promptMessage.offShelfSuccess'),
              type: 'success'
            })
          }).catch((error) => {
            let defaultMsg = this.$t('promptMessage.operationFailed')
            commonUtil.showTipMsg(this.language, error, defaultMsg)
          })
        })
      } else {
        this.$message.warning(this.$t('system.noPermissionOffShelf'))
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}

</script>
<style lang='less'>
.app-list{
  border-radius:16px ;
  .detailStyle{
    background-color: #EFEFEF;
    color: #7A6E8A;
    border: 0px;
    padding: 6px;
  }
}
</style>
