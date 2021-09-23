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
    style="padding-right:30px"
  >
    <el-table
      :data="appData"
      class="tableStyle"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        :label="$t('common.appName')"
        width="200"
        :cell-class-name="hiddenClass"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="230"
            trigger="hover"
            v-if="scope.row.name.length>20"
          >
            <div>{{ scope.row.name }}</div>
            <div slot="reference">
              {{ scope.row.name }}
            </div>
          </el-popover>
          <div v-else>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="provider"
        :label="$t('common.provider')"
        width="130"
      />
      <el-table-column
        prop="type"
        :label="$t('store.type')"
        width="130"
      />
      <el-table-column
        prop="affinity"
        :label="$t('system.architecture')"
        width="105"
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
        width="145"
      />
      <el-table-column
        prop="shortDesc"
        :label="$t('common.description')"
        width="230"
        :cell-class-name="hiddenClass"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="300"
            trigger="hover"
            v-if="scope.row.shortDesc.length>20"
          >
            <div>{{ scope.row.shortDesc }}</div>
            <div slot="reference">
              {{ scope.row.shortDesc }}
            </div>
          </el-popover>
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
        width="130"
      >
        <template slot-scope="scope">
          <el-button
            id="applist_detail"
            @click="detail(scope.row)"
            class="detailStyle"
          >
            {{ $t('common.detail') }}
          </el-button>
          <el-button
            id="applist_delete"
            :disabled="ifDelete || userId === scope.row.userId ? false : true"
            @click="deleteRow(scope.row)"
            class="detailStyle"
          >
            {{ $t('common.delete') }}
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
import { deleteAppApi } from '../../tools/api.js'
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
      ifDelete: 'true',
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    detail (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
      sessionStorage.setItem('pathSource', 'index')
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
        }).catch((error) => {
          let defaultMsg = this.$t('promptMessage.operationFailed')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        })
      })
    },
    hiddenClass (row) {
      if (row.columnIndex === 5 || row.columnIndex === 0) {
        return 'hiddenClass'
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  },
  mounted () {
    if ((sessionStorage.getItem('userNameRole') === 'guest') || (sessionStorage.getItem('userNameRole') === 'tenant')) {
      this.ifDelete = false
    } else {
      this.ifDelete = true
    }
  }
}

</script>
<style lang='less' scoped>
.app-list{
  // padding: 20px 0;
  .pagination{
    margin: 20px;
  }
  .detailStyle{
    background-color: #EFEFEF;
    color: #7A6E8A;
    border: 0px;
    padding: 6px;
  }

}
</style>
