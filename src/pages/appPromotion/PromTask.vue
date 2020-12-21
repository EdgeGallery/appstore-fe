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
          border
          style="width: 100%"
          :header-cell-style="{ background: '#FFFFFF', color: '#909399' }"
        >
          <el-table-column
            prop="number"
            :label="$t('apppromotion.number')"
            width="125"
          />
          <el-table-column
            prop="name"
            :label="$t('apppromotion.appName')"
            width="280"
          />
          <el-table-column
            v-for="item in providers"
            :key="item.number"
            :label="item.provider"
            :property="item.provider"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row[scope.column.property] === false"
                class="el-icon-close"
                title="false"
              />
              <!-- <span
                class="el-icon-loading primary"
                v-if="scope.row[scope.column.property] ==='undefined'"
                title="In Progress"
              /> -->
              <span
                v-if="scope.row[scope.column.property] === true"
                class="el-icon-check"
                title="Succeed"
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
import { promTaskApi, promProviderInfo } from '../../tools/api.js'
export default {
  data () {
    return {
      dialogVisible: true,
      appPromStatus: 'ready',
      appData: [],
      providers: [],
      plateformName: [],
      packageIds: []
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
      this.promTask(this.packageIds, this.plateformName)
    },
    getProviders () {
      promProviderInfo().then((res) => {
        console.log('zhaolongfei' + res)
        let data = res.data
        let index = 1
        data.forEach(
          (item) => {
            let providerItem = {
              number: index,
              provider: item.appStoreName
            }
            this.plateformName.push(providerItem.provider)
            this.providers.push(providerItem)
            index++
          }
        )
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.promoteFailed'),
          type: 'warning'
        })
      })
    },
    getPackageIds (data) {
      this.packageIds = []
      data.forEach(
        (item) => {
          this.packageIds.push(item.packageId)
        }
      )
    },
    promTask (packageIds, targetPlatform) {
      let param = {
        targetPlatform: targetPlatform
      }
      let tempDataArr = []
      this.appData.forEach(
        (data) => {
          promTaskApi(data.packageId, param)
            .then((res) => {
              let resData = res.data
              let tempData = data
              for (let i = 0; i < targetPlatform.length; i++) {
                let attr = targetPlatform[i]
                tempData[attr] = resData[i]
              }
              tempDataArr.push(tempData)
            })
            .catch((err) => {
              this.$message.error(this.$t('promptMessage.operationFailed'))
              console.log(err)
            })
        }
      )
      setTimeout(() => {
        this.appData = []
        this.appData = tempDataArr
        console.log('long' + this.appData.length)
      }, 500)
    }
  },
  watch: {
    value: function (newVal) {
      this.dialogVisible = newVal
    }
  },
  mounted () {
    this.getStatus = function () {
      this.appPromStatus = 'success'
    }

    this.getProviders()
    this.appData = JSON.parse(sessionStorage.getItem('appstordetail'))
    this.getPackageIds(this.appData)
  }
}
</script>
<style lang="less">
.promTask {
  .app-prom {
    height: 400px;
    overflow:auto;
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
  #app_prom_close {
    color: #fff;
    background-color: #5D5F64;
    border-color: #5D5F64;
  }
  #app_prom_execute {
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .execute_style {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
  .el-dialog__header{background-color: #F0F2F5}
}
</style>
