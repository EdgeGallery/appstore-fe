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
  <div
    class="orders"
    v-loading="loading"
    :element-loading-text="$t('common.loading')"
  >
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('order.orderMana') }}
      <span class="line_bot1" />
    </div>
    <div class="content">
      <div class="orderTable">
        <el-table
          class="tableStyle"
          :data="orderList"
        >
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
          <el-table-column
            prop="orderNum"
            width="140"
            :label="$t('order.orderNum')"
          />
          <el-table-column
            v-if="isAdmin"
            prop="userName"
            width="150"
            :label="$t('order.orderUserName')"
          />
          <el-table-column
            prop="appName"
            width="130"
            :label="$t('order.appName')"
          />
          <el-table-column
            prop="mecHostIp"
            width="140"
            :label="$t('order.nodeIp')"
          />
          <el-table-column
            prop="mecHostCity"
            width="200"
            :label="$t('order.nodeAddress')"
          />
          <el-table-column
            prop="orderTime"
            width="180"
            :label="$t('order.orderTime')"
          />
          <el-table-column
            prop="status"
            width="80"
            :label="$t('order.status')"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row.status === 'ACTIVATING' ||
                    scope.row.status === 'DEACTIVATING'
                "
                style="color:#409EFF"
              >
                <el-button
                  :loading="
                    scope.row.status === 'ACTIVATING' ||
                      scope.row.status === 'DEACTIVATING'
                  "
                  class="activatingBtn"
                >
                  {{ convertOrderStatus(scope.row) }}
                </el-button>
              </span>
              <span v-else>{{ convertOrderStatus(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('myApp.operation')"
            width="220"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  @click="activate(scope.row)"
                  class="operations_btn"
                  :disabled="
                    scope.row.status !== 'DEACTIVATED' &&
                      scope.row.status !== 'ACTIVATE_FAILED'
                  "
                >
                  {{ $t('order.activation') }}
                </el-button>
                <el-button
                  @click="deactivate(scope.row)"
                  class="operations_btn"
                  :disabled="
                    scope.row.status !== 'ACTIVATED' &&
                      scope.row.status !== 'DEACTIVATE_FAILED'
                  "
                >
                  {{ $t('order.unsubscribe') }}
                </el-button>
                <el-button
                  class="operations_btn"
                  @click="handleClick(scope.row)"
                >
                  {{ $t('order.record') }}
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :visible.sync="dialogVisible"
          width="500px"
          class="recordDialog"
        >
          <div class="recordTitle">
            <p class="recordTitle-circle" />
            <p class="recordTitle-content">
              {{ $t('order.OrderOperation') }}
            </p>
          </div>
          <div class="recordContent">
            <div class="recordContent-lines">
              <p
                v-for="(item,index) in recordDay"
                :key="index"
                class="lines"
              >
                <span class="lines-circle" /><span class="lines-line" />
              </p>
            </div>
            <div class="recordContent-item">
              <p
                v-for="(item,index) in recordDay"
                :key="index"
              >
                {{ item }}
              </p>
            </div>
            <div class="recordContent-item dayStyle">
              <p
                v-for="(item,index) in recordTime"
                :key="index"
              >
                {{ item }}
              </p>
            </div>
            <div class="recordContent-item stateStyle">
              <p
                v-for="(item,index) in recordState"
                :key="index"
              >
                {{ item }}
              </p>
            </div>
          </div>
          <div class="recordBtns">
            <el-button @click="dialogVisible = false">
              {{ $t('order.cancel') }}
            </el-button>
            <el-button
              type="primary"
              @click="dialogVisible = false"
            >
              {{ $t('order.confirm') }}
            </el-button>
          </div>
        </el-dialog>
        <div class="pageBar">
          <el-pagination
            background
            class="rt"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page="pageCtrl.currentPage"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pageCtrl.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCtrl.totalNum"
            v-if="pageCtrl.totalNum != 0"
          />
        </div>
      </div>
      <div class="clearfix" />
    </div>
  </div>
</template>

<script>
import { subscribe } from '../../tools/api.js'
export default {
  data () {
    return {
      nameQueryVal: '',
      detailCn: '',
      detailEn: '',
      language: localStorage.getItem('language'),
      pageCtrl: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      orderList: [],
      isAdmin: sessionStorage.getItem('userName') === 'admin',
      orderStatusOptionList: [
        { value: 'ACTIVATING', label: this.$t('order.orderStatus.activating') },
        {
          value: 'ACTIVATE_FAILED',
          label: this.$t('order.orderStatus.activateFailed')
        },
        { value: 'ACTIVATED', label: this.$t('order.orderStatus.activated') },
        {
          value: 'DEACTIVATING',
          label: this.$t('order.orderStatus.deactivating')
        },
        {
          value: 'DEACTIVATE_FAILED',
          label: this.$t('order.orderStatus.deactivateFailed')
        },
        {
          value: 'DEACTIVATED',
          label: this.$t('order.orderStatus.deactivated')
        }
      ],
      loading: true,
      dialogVisible: false,
      recordInfo: [],
      recordDay: [],
      recordTime: [],
      recordState: []
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    handlePageSizeChange (val) {
      this.pageCtrl.currentPage = 1
      this.pageCtrl.pageSize = val
      this.getOrderList()
    },
    handleCurrentPageChange (val) {
      this.pageCtrl.currentPage = val
      this.getOrderList()
    },
    queryApp () {
      console.log(3)
    },
    getOrderList () {
      let _queryParam = {
        appId: '',
        orderNum: '',
        status: '',
        orderTimeBegin: '',
        orderTimeEnd: '',
        queryCtrl: {
          offset: (this.pageCtrl.currentPage - 1) * this.pageCtrl.pageSize,
          limit: this.pageCtrl.pageSize,
          sortItem: 'ORDERTIME',
          sortType: 'DESC'
        }
      }
      subscribe.getOrderList(_queryParam).then(res => {
        this.orderList = res.data.results
        this.pageCtrl.totalNum = res.data.total
        this.loading = false
      })
    },
    activate (row) {
      this.$confirm(
        this.$t('order.confirmToActivate') + row.orderNum + ' ?',
        this.$t('order.tip'),
        {
          confirmButtonText: this.$t('order.confirm'),
          cancelButtonText: this.$t('order.cancel'),
          type: 'warning'
        }
      ).then(() => {
        subscribe.activateApp(row.orderId).then(res => {
          this.$message.success(this.$t('order.success'))
          this.loading = true
          this.getOrderList()
        })
      })
    },
    deactivate (row) {
      this.$confirm(
        this.$t('order.confirmToUnsub') + row.orderNum + ' ?',
        this.$t('order.tip'),
        {
          confirmButtonText: this.$t('order.confirm'),
          cancelButtonText: this.$t('order.cancel'),
          type: 'warning'
        }
      ).then(() => {
        subscribe.deactivateApp(row.orderId).then(res => {
          this.$message.success(this.$t('order.unsubSuccess'))
          this.loading = true
          this.getOrderList()
        })
      })
    },
    convertOrderStatus (row) {
      let _statusOption = this.orderStatusOptionList.find(
        item => item.value === row.status
      )
      if (_statusOption) {
        return _statusOption.label
      }
      return row.status
    },
    handleClick (order) {
      this.language = localStorage.getItem('language')
      this.recordInfo = this.language === 'cn' ? order.detailCn.split('\n') : order.detailEn.split('\n')
      this.recordInfo.forEach(item => {
        this.recordDay.push(item.substring(0, 10))
        this.recordTime.push(item.substring(11, 19))
        this.recordState.push(item.substring(20, 50))
      })
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.orders {
  padding: 0 13%;
  .content {
    background: #ffffff;
    border-radius: 20px;
    padding: 30px 60px;
    min-height: 500px;
    position: relative;
    .search_input {
      float: left;
      width: 200px;
    }
    .orderTable {
      margin: 50px 0;
      .el-table td {
        padding: 0;
        height: 60px;
        max-height: 60px;
        line-height: 60px;
      }
      .operation_button {
        background: #efefef;
        border: none;
        color: #7a6e8a;
        border-radius: 5px;
        padding: 6px 12px !important;
        margin-left: 5px;
      }
      em {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 6px;
        position: relative;
        top: 3px;
      }
      .recordDialog{
        .recordTitle{
          display: flex;
          width: 90%;
          margin-top: -20px;
          margin-left: 20px;
          .recordTitle-circle{
            width: 17px;
            height: 17px;
            background: #55D8BF;
            border-radius: 3px;
            margin-right: 9px;
            margin-top: 8px;
          }
          .recordTitle-content{
            color:#380879;
            font-Size:20px;
          }
        }
        .recordContent{
          display: flex;
          justify-content: flex-start;
          margin-left: 46px;
          margin-top: 20px;
          .recordContent-lines{
            margin-right: 10px;
            .lines{
              margin: -4px 0 0 0;
              .lines-circle{
                display: block;
                width: 10px;
                height: 10px;
                background: #61CDD0;
                border-radius: 5px;
              }
              .lines-line{
                display: block;
                width: 1px;
                height: 45px;
                border-right: 1px solid #61CDD0;
                opacity: 0.6;
                margin-left: 4px;
              }
            }
          }
          .recordContent-lines .lines:last-child{
              .lines-line{
                display: none;
              }
          }
          .recordContent-item{
            color: #380879;
            width: 100px;
            margin-right: 10px;
            p{
              margin: -10px 0 0 10px;
              height: 61px;
              font-size: 16px;
            }
          }
          .dayStyle{
            margin-right: 30px;
            width: 80px;
          }
          .stateStyle{
            width: 160px;
          }
        }
        .recordBtns{
          display: flex;
          justify-content: flex-end;
          margin-right: 20px;
          .el-button{
            background: #fff;
            color: #5e40c8;
            border: 1px solid #5e40c8;
          }
          .el-button:hover{
            background: #5e40c8;
            color: #fff;
          }
        }
      }
    }
  }
}
.activatingBtn {
  border: none !important;
  color: #409eff;
}
div /deep/ .el-dialog__header{
  border-radius: 12px !important;
}
div /deep/ .el-dialog{
  border-radius: 12px !important;
  padding-bottom: 30px;
}
div /deep/ .el-icon-close:before{
  font-size: 30px !important;
  color: #999999 !important;
}
.el-table th>.cell {
    font-size: 20px;
    height: 59px;
    line-height: 59px;
    font-weight: lighter;
}
.el-table td>.cell {
    font-size: 14px;
}
</style>
