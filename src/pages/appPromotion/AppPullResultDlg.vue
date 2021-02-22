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
  <div class="appPullDlg">
    <el-dialog
      :title="$t('appPull.pullAppResult')"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="app-pull">
        <el-table
          :data="appPullResultData"
          style="width: 100%"
          header-cell-class-name="headerStyle"
        >
          <el-table-column
            prop="name"
            :label="$t('appPull.name')"
          />
          <el-table-column
            prop="result"
            :label="$t('appPull.result')"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row[scope.column.property] === 'true'"
                class="el-icon-check"
                title="Succeed"
              />
              <span
                v-else
                class="el-icon-close"
                title="false"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleCloseDirect"
        >{{
          $t("appPull.closeDlg")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    appPullResultData: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    handleCloseDirect () {
      this.dialogVisible = false
      this.$emit('input', false)
    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.appPullDlg {
  .el-dialog__header{
    background-color: #688ef3 ;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .app-pull {
    height: 400px;
    overflow:auto;
    .el-icon-close:before{
      font-size: 25px;
      color: #d8363e;
    }
  }

  .el-dialog__footer {
    text-align: center;
  }
  .el-icon-loading {
    color: #607B36;
    font-size: 25px;
  }
  .el-icon-check {
    color: #40BF90;
    font-size: 25px;
  }
  .el-icon-finished{
    font-size: 25px;
    color: darkgrey;
  }
  .execute_style {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
}
</style>
