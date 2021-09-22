<template>
  <div class="orders">
    <div class="title_top title_left defaultFontBlod clear">
      订单管理
      <span class="line_bot1" />
    </div>
    <div class="content">
      <el-input
        v-model="nameQueryVal"
        :placeholder="$t('common.appName')"
        id="myAppSearch"
        class="search_input"
        @clear="queryApp"
        @change="queryApp"
      >
        <em
          slot="suffix"
          class="search_icon"
          @click="queryApp"
        />
      </el-input>
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
            label="订单编号"
          />
          <el-table-column
            prop="mecHostName"
            label="节点名称"
          />
          <el-table-column
            prop="appName"
            label="应用名称"
          />
          <el-table-column
            prop="mecHostIp"
            label="节点IP"
          />
          <el-table-column
            prop="orderTime"
            label="下单时间"
          />
          <el-table-column
            prop="mecHostCity"
            label="节点位置"
          />
          <el-table-column
            prop="status"
            label="状态"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.status=='3'"
                style="color:#409EFF"
              >
                <el-button
                  :loading="scope.row.status=='3'"
                  class="activatingBtn"
                >
                  激活中
                </el-button>
              </span>
              <span v-else>{{ scope.row.status=='0'?'待激活':(scope.row.status=='4'?'已退订':'已激活') }}</span>
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
                  :disabled="scope.row.status!=='0'"
                >
                  激活
                </el-button>
                <el-button
                  @click="deactivate(scope.row)"
                  class="operations_btn"
                  :disabled="scope.row.status=='4'"
                >
                  退订
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <eg-pagination
        class="eg_pagination"
        :page-num="pageNum"
        :page-size="pageSize"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      />
      <div class="clearfix" />
    </div>
  </div>
</template>

<script>
// import { subscribe } from '../../tools/api.js'
export default {
  data () {
    return {
      pageSize: 10,
      curPageSize: 10,
      pageNum: 1,
      total: 0,
      nameQueryVal: '',
      orderList: [
        {
          'orderId': 'aasdf',
          'orderNum': 'No.202110152458',
          'userId': 'aaa',
          'userName': 'Wenson',
          'appId': 'asdlfkjl',
          'appName': '希迪智驾',
          'orderTime': '2021-10-25 14:31',
          'operateTime': '2021-10-25 14:31',
          'status': '4',
          'mecHostIp': '119.8.47.5',
          'mecHostName': 'Node_V7_12',
          'mecHostCity': '陕西省/西安市/雁塔区'
        },
        {
          'orderId': 'aasdf',
          'orderNum': 'No.202110152458',
          'userId': 'aaa',
          'userName': 'Wenson',
          'appId': 'asdlfkjl',
          'appName': '兰亭VR',
          'orderTime': '2021-10-15 12:21',
          'operateTime': '2021-10-15 14:31',
          'status': '1',
          'mecHostIp': '119.8.63.45',
          'mecHostName': 'Node_E3_B2',
          'mecHostCity': '广东省/深圳市/龙岗区'
        },
        {
          'orderId': 'aasdf',
          'orderNum': 'No.202110152458',
          'userId': 'aaa',
          'userName': 'Wenson',
          'appId': 'asdlfkjl',
          'appName': '安恒WAF',
          'orderTime': '2021-10-03 08:05',
          'operateTime': '2021-10-25 14:31',
          'status': '0',
          'mecHostIp': '119.8.47.5',
          'mecHostName': 'Node_V9_E3',
          'mecHostCity': '广东省/深圳市/龙岗区'
        }
      ],
      param: {
        'appId': '',
        'orderNum': '',
        'status': '',
        'orderTimeBegin': '',
        'orderTimeEnd': '',
        'queryCtrl': {
          'offset': 0,
          'limit': 20,
          'sortItem': 'ORDERTIME',
          'sortType': 'DESC'
        }
      },
      userId: sessionStorage.getItem('userId')
    }
  },
  mounted () {
    if (sessionStorage.getItem('newOrder')) {
      this.orderList.push(JSON.parse(sessionStorage.getItem('newOrder')))
    }
    this.getOrderList()
  },
  methods: {
    sizeChange () {
      console.log(1)
    },
    currentChange () {
      console.log(2)
    },
    queryApp () {
      console.log(3)
    },
    getOrderList () {
      // subscribe.getOrderList(this.userId, this.param).then(res => {
      //   this.orderList = res.data
      // })
    },
    activate (row) {
      this.$confirm('确认激活 ' + row.appName + ' 应用？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('操作成功！')
        row.status = '3'
        setTimeout(() => {
          row.status = '1'
        }, 2000)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })

      // subscribe.activateApp(this.userId, row.id).then(res => {
      //   console.log(res)
      // })
    },
    deactivate (row) {
      this.$confirm('确认退订 ' + row.appName + ' 应用？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.orderList.forEach((item, index) => {
        //   console.log(index)
        //   if (item.appName === row.appName) {
        //     console.log(index)
        //     this.orderList.splice(index, 1)
        //   }
        // })
        this.$message.success('退订成功！')
        row.status = '4'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })

      // subscribe.deactivateApp(this.userId, row.id).then(res => {
      //   console.log(res)
      // })
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
