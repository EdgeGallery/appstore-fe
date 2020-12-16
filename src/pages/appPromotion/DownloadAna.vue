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
      :header-cell-style="{ background: '#A0A5A7', color: '#fff' }"
    >
      <el-table-column
        prop="number"
        :label="$t('apppromotion.number')"
        width="150"
      />
      <el-table-column
        prop="appName"
        :label="$t('apppromotion.appName')"
        width="250"
      />
      <el-table-column
        prop="provider"
        :label="$t('apppromotion.provider')"
        width="250"
      />
      <el-table-column
        prop="version"
        :label="$t('apppromotion.version')"
        width="250"
      />
      <el-table-column
        prop="operationType"
        :label="$t('apppromotion.operationType')"
        width="250"
      />
      <el-table-column
        prop="dateTime"
        :label="$t('apppromotion.dateTime')"
        width="250"
      />
      <el-table-column
        prop="appStore"
        :label="$t('apppromotion.appStore')"
        width="325"
      />
    </el-table>
  </div>
</template>

<script>
import { deleteAppApi, getAppdownAnaApi } from '../../tools/api.js'
export default {
  data () {
    return {
      appData: [
        {
          number: '1',
          appName: '人脸识别',
          provider: '华为',
          version: 'V1.0',
          operationType: '拉取',
          dateTime: '2020-12-08 13:55:12',
          appStore: '电信AppStore'
        },
        {
          number: '2',
          appName: '人脸识别',
          provider: '华为',
          version: 'V1.0',
          operationType: '通知',
          dateTime: '2020-12-08 13:55:12',
          appStore: '电信AppStore'
        },
        {
          number: '3',
          appName: '人脸识别',
          provider: '华为',
          version: 'V1.0',
          operationType: '拉取',
          dateTime: '2020-12-08 13:55:12',
          appStore: '电信AppStore'
        }
      ]
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    getTableData () {
      getAppdownAnaApi(this.appId).then((res) => {
        let data = res.data
        data.forEach(
          (item) => {
            this.tableData.push(item)
          },
          () => {}
        )
        if (data.length !== 0) {
          // this.editDetails = this.source = data[0].details
          // this.appDetailFileList = [JSON.parse(data[0].format)]
          // this.packageId = data[0].csarId
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    isDisabled (deleteRow) {
      if (deleteRow.userId === sessionStorage.getItem('userId')) {
        return false
      } else {
        return true
      }
    },
    detail (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
    },
    deleteRow (row) {
      this.$confirm(
        this.$t('promptMessage.deletePrompt'),
        this.$t('promptMessage.prompt'),
        {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          let userId = sessionStorage.getItem('userId')
          let userName = sessionStorage.getItem('userName')
          deleteAppApi(row.appId, userId, userName)
            .then((res) => {
              this.$emit('getAppData')
              this.$message({
                duration: 2000,
                message: this.$t('promptMessage.deleteSuccess'),
                type: 'success'
              })
            })
            .catch(() => {
              this.$message({
                duration: 2000,
                message: this.$t('promptMessage.operationFailed'),
                type: 'warning'
              })
            })
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="less" scoped>
.app-list {
  .el-table {
    font-size: 17px;
  }
  padding: 20px 0;
  .pagination {
    margin: 20px;
  }
}
</style>
