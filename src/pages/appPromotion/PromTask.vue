<template>
  <div class="promTask">
    <el-dialog
      :title="$t('apppromotion.appPromotion')"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="app-prom">
        <el-table
          :data="appData"
          style="width: 100%"
          :header-cell-style="{ background: '#A0A5A7', color: '#fff' }"
        >
          <el-table-column
            prop="number"
            :label="$t('apppromotion.number')"
            width="125"
          />
          <el-table-column
            prop="appName"
            :label="$t('apppromotion.appName')"
            width="280"
          />
          <el-table-column
            prop="appName1"
            :label="$t('apppromotion.dianxin')"
            width="170"
          >
            <template>
              <img
                :src="imageUrl"
                class="execute_style"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="appName2"
            :label="$t('apppromotion.liantong')"
            width="170"
          >
            <template>
              <img
                :src="imageUrl"
                class="execute_style"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="appName3"
            :label="$t('apppromotion.yidong')"
            width="170"
          >
            <template>
              <img
                :src="imageUrl"
                class="execute_style"
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="app_prom_execute"
          @click="handleExecute"
        >{{
          $t("apppromotion.execute")
        }}</el-button>
        <el-button
          id="app_prom_close"
          @click="dialogVisible = false"
        >{{
          $t("apppromotion.closePanel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { promTaskApi, getAppdownAnaApi } from '../../tools/api.js'
export default {
  // props: {
  //   value: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data () {
    return {
      // dialogVisible: this.value,
      dialogVisible: true,
      // imageUrl:require("@/assets/images/execute_success.png"),
      imageUrl: require('@/assets/images/waiting.gif'),
      appData: []
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
      this.$emit('getAppData')
    },
    handleExecute () {
      this.imageUrl = require('@/assets/images/execute_failed.png')
    },
    getTableData () {
      getAppdownAnaApi(this.appId).then(res => {
      //   let data = res.data
      //   data.forEach(item => {
      //     this.tableData.push(item)
      //   }, () => {
      //   })
      //   if (data.length !== 0) {
      //     this.editDetails = this.source = data[0].details
      //     this.appDetailFileList = [JSON.parse(data[0].format)]
      //     this.packageId = data[0].csarId
      //   }
      })
    },
    promTask (val) {
      let userId = sessionStorage.getItem('userId')
      let userName = sessionStorage.getItem('userName')
      promTaskApi(val.appId, userId, userName)
        .then((res) => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.uploadSuccess'),
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error(this.$t('promptMessage.operationFailed'))
          console.log(err)
        })
    }
  },
  watch: {
    value: function (newVal) {
      this.dialogVisible = newVal
    }
  },
  mounted () {
    // alert('dd');
    // this.$refs.imageT.src = "../../assets/images/execute_failed.png";

    // this.getTableData()
    this.appData = JSON.parse(sessionStorage.getItem('appstordetail'))
    // this.getAppData()
    // this.tableData.push(JSON.parse(sessionStorage.getItem('taskData')))
  }
}
</script>
<style lang="less">
.promTask {
  .app-prom {
    height: 400px;
  }
  .el-dialog__footer {
    text-align: center;
  }
  #app_prom_close {
    color: #fff;
    background-color: #738fea;
    border-color: #738fea;
  }
  #app_prom_execute {
    color: #fff;
    background-color: #fea712;
    border-color: #fea712;
  }
  .execute_style {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
}
</style>
