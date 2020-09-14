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
  <div class="app-list">
    <el-table
      :data="appData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        :label="$t('common.appName')"
      />
      <el-table-column
        prop="provider"
        :label="$t('common.provider')"
      />
      <el-table-column
        prop="type"
        :label="$t('common.type')"
        width="180"
      />
      <el-table-column
        prop="affinity"
        :label="$t('common.affinity')"
        width="180"
      />
      <el-table-column
        prop="shortDesc"
        :label="$t('common.description')"
      />
      <el-table-column
        prop="downloadCount"
        :label="$t('store.most')"
        width="120"
      />
      <el-table-column
        prop="score"
        :label="$t('store.score')"
        width="120"
      />
      <el-table-column
        :label="$t('common.operation')"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            id="applist_detail"
            @click="detail(scope.row)"
            type="text"
            size="small"
          >
            {{ $t('common.detail') }}
          </el-button>
          <el-button
            id="applist_delete"
            v-if="deleteBtn"
            @click="deleteRow(scope.row)"
            type="text"
            size="small"
          >
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteAppApi } from '../../tools/api.js'
export default {
  props: {
    appData: {
      type: Array,
      default: () => []
    },
    deleteBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    detail (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
    },
    deleteRow (row) {
      this.$confirm(this.$t('promptMessage.deletePrompt'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let userId = sessionStorage.getItem('userId')
        let userName = sessionStorage.getItem('userName')
        deleteAppApi(row.appId, userId, userName).then(res => {
          this.$emit('getAppData')
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.deleteSuccess'),
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        })
      }).catch(() => {
      })
    }
  },
  mounted () {
  }
}

</script>
<style lang='less' scoped>
.app-list{
  .el-table {
    font-size: 17px;
  }
  padding: 20px 0;
  .pagination{
    margin: 20px;
  }
}
</style>
