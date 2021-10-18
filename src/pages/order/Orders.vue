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
            :label="$t('order.orderNum')"
          />
          <el-table-column
            v-if="isAdmin"
            prop="userName"
            :label="$t('order.orderUserName')"
          />
          <el-table-column
            prop="appName"
            :label="$t('order.appName')"
          />
          <el-table-column
            prop="mecHostName"
            :label="$t('order.nodeName')"
          />
          <el-table-column
            prop="mecHostIp"
            :label="$t('order.nodeIp')"
          />
          <el-table-column
            prop="mecHostCity"
            :label="$t('order.nodeAddress')"
          />
          <el-table-column
            prop="orderTime"
            :label="$t('order.orderTime')"
          />
          <el-table-column
            prop="status"
            :label="$t('order.status')"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.status==='ACTIVATING' || scope.row.status==='DEACTIVATING'"
                style="color:#409EFF"
              >
                <el-button
                  :loading="scope.row.status==='ACTIVATING' || scope.row.status==='DEACTIVATING'"
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
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  @click="activate(scope.row)"
                  class="operations_btn"
                  :disabled="scope.row.status!=='DEACTIVATED' && scope.row.status!=='ACTIVATE_FAILED'"
                >
                  {{ $t('order.activation') }}
                </el-button>
                <el-button
                  @click="deactivate(scope.row)"
                  class="operations_btn"
                  :disabled="scope.row.status!=='ACTIVATED' && scope.row.status!=='DEACTIVATE_FAILED'"
                >
                  {{ $t('order.unsubscribe') }}
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
            v-if="pageCtrl.totalNum!=0"
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
      pageCtrl: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      orderList: [],
      isAdmin: sessionStorage.getItem('userName') === 'admin',
      orderStatusOptionList: [
        { value: 'ACTIVATING', label: this.$t('order.orderStatus.activating') },
        { value: 'ACTIVATE_FAILED', label: this.$t('order.orderStatus.activateFailed') },
        { value: 'ACTIVATED', label: this.$t('order.orderStatus.activated') },
        { value: 'DEACTIVATING', label: this.$t('order.orderStatus.deactivating') },
        { value: 'DEACTIVATE_FAILED', label: this.$t('order.orderStatus.deactivateFailed') },
        { value: 'DEACTIVATED', label: this.$t('order.orderStatus.deactivated') }
      ],
      loading: true
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
        'appId': '',
        'orderNum': '',
        'status': '',
        'orderTimeBegin': '',
        'orderTimeEnd': '',
        'queryCtrl': {
          'offset': (this.pageCtrl.currentPage - 1) * this.pageCtrl.pageSize,
          'limit': this.pageCtrl.pageSize,
          'sortItem': 'ORDERTIME',
          'sortType': 'DESC'
        }
      }
      subscribe.getOrderList(_queryParam).then(res => {
        this.orderList = res.data.results
        this.pageCtrl.totalNum = res.data.total
        this.loading = false
      })
    },
    activate (row) {
      this.$confirm(this.$t('order.confirmToActivate') + row.orderNum + ' ?', this.$t('order.tip'), {
        confirmButtonText: this.$t('order.confirm'),
        cancelButtonText: this.$t('order.cancel'),
        type: 'warning'
      }).then(() => {
        subscribe.activateApp(row.orderId).then(res => {
          this.$message.success(this.$t('order.success'))
          this.loading = true
          this.getOrderList()
        })
      })
    },
    deactivate (row) {
      this.$confirm(this.$t('order.confirmToUnsub') + row.orderNum + ' ?', this.$t('order.tip'), {
        confirmButtonText: this.$t('order.confirm'),
        cancelButtonText: this.$t('order.cancel'),
        type: 'warning'
      }).then(() => {
        subscribe.deactivateApp(row.orderId).then(res => {
          this.$message.success(this.$t('order.unsubSuccess'))
          this.loading = true
          this.getOrderList()
        })
      })
    },
    convertOrderStatus (row) {
      let _statusOption = this.orderStatusOptionList.find(item => item.value === row.status)
      if (_statusOption) {
        return _statusOption.label
      }

      return row.status
    }
  }
}
</script>

<style lang='less' scoped>
.orders{
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
    .orderTable{
      margin: 50px 0;
      .el-table td{
        padding: 0;
        height: 60px;
        max-height: 60px;
        line-height: 60px;
      }
      .operation_button{
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
    }
  }
}
.activatingBtn{
  border: none !important;
  color: #409EFF;
}
</style>
