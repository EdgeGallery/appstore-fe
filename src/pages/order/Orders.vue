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
            prop="userName"
            label="用户名称"
          />
          <el-table-column
            prop="orderTime"
            label="下单时间"
          />
          <el-table-column
            prop="operateTime"
            label="修改时间"
          />
          <el-table-column
            prop="status"
            label="状态"
          />
          <el-table-column
            prop="mechostIp"
            label="节点IP"
          />
          <el-table-column
            :label="$t('myApp.operation')"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  @click="deploy(scope.row.appId)"
                >
                  部署
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
          packageName: 'apppppppp',
          orderId: '123456',
          orderNum: 'asdfasdf',
          userId: 'aksjdhfkjsh',
          userName: 'tenant',
          appId: 'adsf',
          orderTime: '2021-09-10',
          operateTime: '2021-09-10',
          status: 'active',
          mechostIp: '10.25.24.6',
          mecmappid: '11111',
          mecminstanceId: 'asdf',
          mecmapppackageId: 'asdf'
        }
      ]
    }
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
    deploy (id) {
      console.log(id)
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

</style>
