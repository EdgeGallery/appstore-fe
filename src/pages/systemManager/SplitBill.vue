<template>
  <div class="bills">
    <div class="title_top title_left defaultFontBlod clear">
      分账管理
      <span class="line_bot1" />
    </div>
    <div class="content top">
      <div>
        <span>默认分账比例</span>
        <el-input-number
          v-model="rate"
          class="rate_input"
          ref="rateinput"
          :controls="false"
          :disabled="!showConfirmBtn"
        />
        <span class="percent">%</span>
        <el-button
          class="bgBtn"
          @click="setRateVal"
          v-if="!showConfirmBtn"
        >
          设置
        </el-button>
        <el-button
          class="bgBtn"
          @click="modifyDefaultVal"
          v-if="showConfirmBtn"
        >
          确定
        </el-button>
        <el-button
          class="bgBtn rt"
          @click="addSplitBillDialog=true"
        >
          添加
        </el-button>
      </div>
    </div>
    <div class="content">
      <div class="billTable">
        <el-table
          class="tableStyle"
          :data="splitBillList"
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
            prop="appName"
            label="应用名称"
          />
          <el-table-column
            prop="provider"
            label="厂商"
          />
          <el-table-column
            prop="splitRatio"
            label="分账比例"
          >
            <template slot-scope="scope">
              <div>
                <el-progress
                  stroke-width="20"
                  color="#5844be"
                  :percentage="scope.row.splitRatio*100"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('myApp.operation')"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  @click="modify(scope.row.appId)"
                  class="operations_btn"
                >
                  修改
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

    <!-- 修改分账设置 -->
    <el-dialog
      :visible.sync="splitBillDialog"
      :close-on-click-modal="false"
      width="30%"
      :show-close="false"
      class="dialog_host default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        应用分账设置
      </div>
      <div style="margin-top:25px;">
        <el-form>
          <el-form-item label="应用名称">
            <span>appName</span>
          </el-form-item>
          <el-form-item label="分账比例">
            <el-input-number
              v-model="splitRatio"
              class="rate_input"
              :controls="false"
            />
            <span class="percent">%</span>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer dialogPadding"
      >
        <el-button
          @click="splitBillDialog = false"
          class="bgBtn"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="setAppBillRate()"
          class="bgBtn"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>

    <!-- 添加分账设置 -->
    <el-dialog
      :visible.sync="addSplitBillDialog"
      :close-on-click-modal="false"
      width="50%"
      :show-close="false"
      class="dialog_host default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        添加分账设置
      </div>
      <div>
        <div class="billInputBox">
          分账设置
          <el-input-number
            v-model="rate"
            class="rate_input"
            :controls="false"
          />
          <span class="percent">%</span>
        </div>
        <div class="billInputBox">
          <el-table
            class="tableStyle"
            :data="appList"
          >
            <el-table-column
              type="selection"
              width="55"
            />
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
          </el-table>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer dialogPadding"
      >
        <el-button
          @click="addSplitBillDialog = false"
          class="bgBtn"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="addNewSplitConfig()"
          class="bgBtn"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { subscribe } from '../../tools/api.js'
export default {
  data () {
    return {
      pageSize: 10,
      curPageSize: 10,
      pageNum: 1,
      total: 0,
      nameQueryVal: '',
      splitBillList: [
        {
          'appId': 'ALL',
          'appName': 'asdf',
          'provider': 'asdf',
          'splitRatio': 0.15
        },
        {
          'appId': 'xxxxxxxxxxxx',
          'appName': 'PCB检测',
          'provider': 'Some Company',
          'splitRatio': 0.25
        }
      ],
      appList: [
        {}
      ],
      rate: 15,
      splitBillDialog: false,
      showConfirmBtn: false,
      appId: '',
      splitRatio: 0,
      addSplitBillDialog: false,
      userId: sessionStorage.getItem('userId')
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
    modify (id) {
      this.splitBillDialog = true
      this.appId = id
    },
    addNewSplitConfig () {
      let param = {
        splitRatio: this.splitRatio
      }
      subscribe.addSplitconfigs(this.userId, this.appId, param).then(res => {
        this.splitBillDialog = false
      })
    },
    setAppBillRate () {
      let param = {
        splitRatio: this.splitRatio
      }
      subscribe.modifySplitconfigs(this.userId, this.appId, param).then(res => {
        this.splitBillDialog = false
      })
    },
    setRateVal () {
      this.$refs.rateinput.focus()
      this.showConfirmBtn = true
    },
    modifyDefaultVal () {
      let param = {
        splitRatio: this.splitRatio
      }
      subscribe.modifyDefaultSplitconfigs(this.userId, param).then(res => {
        this.showConfirmBtn = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.bills{
  padding: 0 13%;
  .top{
    height: auto;
    min-height: 0!important;
    margin-bottom: 25px;
  }
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
    .billTable{
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
    .percent{
      display: inline-block;
      position: relative;
      left: -32px;
    }
  }
  .rate_input{
    margin: 0 15px;
    width: 60px;
  }
  .billInputBox{
    margin: 15px 0;
  }
}
</style>
