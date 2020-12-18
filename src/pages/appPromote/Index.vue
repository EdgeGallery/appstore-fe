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
  <div class="my-app padding56">
    <div class="stars-wrapper">
      <!-- <img ref="conf0" src="../../assets/images/logo.png"> -->
    </div>
    <div class="starry-sky">
      <canvas
        id="cvs"
        ref="canvas"
      />
    </div>
    <div class="my-app-content">
      <el-row>
        <el-col :span="24">
          <el-button
            id="addAppBtn"
            type="primary"
            class="rt"
            @click="register"
          >
            {{ $t('myApp.addApp') }}
          </el-button>
        </el-col>
      </el-row>
      <div class="packageTable">
        <el-table
          v-loading="dataLoading"
          :data="currentPageData"
          border
        >
          <el-table-column
            type="index"
            :label="$t('common.number')"
            width="50"
          />
          <el-table-column
            prop="appStoreName"
            :label="$t('common.appStoreName')"
          />
          <el-table-column
            prop="appStoreVersion"
            :label="$t('common.appStoreVersion')"
          />
          <el-table-column
            prop="company"
            :label="$t('common.company')"
          />
          <el-table-column
            prop="url"
            :label="$t('common.url')"
          />
          <el-table-column
            prop="appdTransId"
            :label="$t('common.appdTransId')"
          />
          <el-table-column
            prop="description"
            :label="$t('common.description')"
          />
          <el-table-column
            prop="operation"
            fixed="right"
            :label="$t('myApp.operation')"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                id="modifyBtn"
                @click="modifyApp(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('common.modifyApp') }}
              </el-button>
              <el-button
                id="deleteBtn"
                type="text"
                size="small"
                @click="getDelete(scope.row)"
              >
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        :table-data="appPackageData"
        @getCurrentPageData="getCurrentPageData"
      />
      <div class="clearfix" />
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="45%"
    >
      <el-row>
        <el-col>
          <el-form

            :model="form"
            ref="form"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item
              :label="$t('common.appStoreName')"
              prop="appStoreName"
            >
              <el-input
                id="appStoreName"
                maxlength="20"
                v-model="form.appStoreName"
              />
            </el-form-item>
            <el-form-item
              :label="$t('common.appStoreVersion')"
              prop="appStoreVersion"
            >
              <el-input
                id="appStoreVersion"
                v-model="form.appStoreVersion"
              />
            </el-form-item>
            <el-form-item
              :label="$t('common.company')"
              prop="company"
            >
              <el-input
                id="company"
                v-model="form.company"
              />
            </el-form-item>
            <el-form-item
              :label="$t('common.url')"
              prop="url"
            >
              <el-input
                id="url"
                v-model="form.url"
              />
            </el-form-item>
            <el-form-item
              :label="$t('common.appdTransId')"
              prop="types"
            >
              <el-select
                id="add_select_types"
                v-model="form.types"
                :placeholder="$t('common.appdTransId')"
              >
                <el-option
                  v-for="(item,index) in types"
                  :key="index"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('common.description')"
              prop="description"
            >
              <el-input
                id="port"
                v-model="form.description"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
          @click="dialogVisible = false"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          @click="confirmToRegister('form')"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import appList from '../home/AppList.vue'
import { TTYPES } from '../../tools/constant.js'
import { myAppStore } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  components: {
    // appList,
    pagination
  },
  props: {
    point: {
      type: Number,
      default: 5 // 生成的星星（点）的个数, 默认25个
    },
    lineColor: {
      type: String,
      default: 'rgba(255,255,255,1)' // 线的颜色
    },
    roundColor: {
      type: String,
      default: 'rgba(255,255,255,1)' // 星星的颜色
    }
  },
  data () {
    return {
      currentPageData: [],
      pointNum: 5,
      tableData: [],
      userId: '',
      appData: [],
      appPackageData: [],
      dataLoading: false,
      interval: '',
      title: this.$t('myApp.addApp'),
      dialogVisible: false,
      form: {
        appStoreName: '',
        appStoreVersion: '',
        company: '',
        url: '',
        appdTransId: '',
        description: '',
        types: ''
      },
      editType: 1,
      types: TTYPES,
      rules: {
        appStoreName: [
          { required: true, message: '平台名称不能为空', trigger: 'blur' }
        ],
        appStoreVersion: [
          { required: true, message: '平台版本不能为空', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '公司不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: 'IP or URL不能为空', trigger: 'blur' },
          { pattern: /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/, message: this.$t('promptMessage.normalVerify') }
        ],
        types: [
          { required: true }
        ],
        shortDesc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      },
      docWidth: 0, // 画布宽
      docHeight: 0, // 画布高
      context: null, // canvasDom的执行上下文
      circleArr: [], // 圆点数组
      timer: null // 定时器对象
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    getAppData () {
      this.appPackageData = []
      myAppStore.getMyAppApi(this.userId)
        .then(res => {
          this.appData = res.data
          if (this.appData.length === 0) {
            this.dataLoading = false
          } else {
            this.getAppPackageData()
          }
        }, () => {
          this.dataLoading = false
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.getMyAppFail'),
            type: 'warning'
          })
        })
    },
    getAppPackageData () {
      this.appPackageData = []
      myAppStore.getMyAppApi(this.userId).then(res => {
        let data = res.data
        if (data.length === 1) {
          this.appPackageData.push(data[0])
        } else {
          data.forEach(csaritem => {
            this.appPackageData.push(csaritem)
          })
        }
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.getMyAppFail'),
          type: 'warning'
        })
        this.clearInterval()
      })
    },
    register () {
      this.createCircleArr()
      this.cycleDraw()
      this.editType = 1
      this.title = this.$t('myApp.addApp')
      this.isDisable = false
      this.dialogVisible = true
      this.form = {
        appStoreId: '',
        appStoreName: '',
        appStoreVersion: '',
        company: '',
        url: '',
        appdTransId: '',
        description: ''
      }
      this.dialogVisible = true
    },
    confirmToRegister (form) {
      console.log('&&&&&&&= ' + this.form.appStoreId + ' ' + this.form.appStoreName + '****=' + this.form)
      this.dialogVisible = false
      let fd = new FormData()
      fd.append('appStoreId', this.form.appStoreId)
      fd.append('appStoreName', this.form.appStoreName)
      fd.append('appStoreVersion', this.form.appStoreVersion)
      fd.append('company', this.form.company)
      fd.append('url', this.form.url)
      // fd.append('appdTransId', this.form.appdTransId)
      fd.append('appdTransId', '4c49a6f3-863b-5deb-bfc4-12ecd03502d8')
      fd.append('description', this.form.description)
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.editType === 1) {
            myAppStore.addAppStoreApi(fd).then(res => {
              this.$message.success(this.$t('promptMessage.addAppStoreSuccess'))
              this.getAppPackageData()
              this.dialogVisible = false
            }, error => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(error.response.data.details[0])
              } else {
                this.$message.error(error.message)
              }
            })
          } else {
            myAppStore.modifyAppStoreApi(fd, '4c49a6f3-863b-5deb-bfc4-12ecd03502d8').then(res => {
              this.$message.success(this.$t('promptMessage.addAppStoreSuccess'))
              this.getAppPackageData()
              this.dialogVisible = false
            }, error => {
              this.$message.error(error.message)
            })
          }
        }
      })
    },
    modifyApp (row) {
      this.editType = 2
      this.title = this.$t('myApp.modifyAppStore')
      this.isDisable = true
      let middleData = JSON.parse(JSON.stringify(row))
      this.form = middleData
      this.dialogVisible = true
    },
    getDelete (row) {
      console.log('*******appStoreId***********= ' + row.appStoreId)
      this.$confirm(this.$t('promptMessage.deletePrompt'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        myAppStore.deleteAppStoreApi(row.appStoreId).then(res => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.deleteSuccess'),
            type: 'success'
          })
          // 刷新页面
          this.getAppPackageData()
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        })
      }).catch(() => {
      })
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    /**
     * 生成min和max之间随机数
     */
    rangeRadom (max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    /**
     * 绘制原点
     */
    drawCircle (context, x, y, r, moveX, moveY) {
      let circle = {
        x,
        y,
        r,
        moveX,
        moveY
      }
      context.beginPath()
      context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
      context.closePath()
      context.fill()
      return circle
    },
    /**
     * 绘制线条
     */
    drawLine (context, beginX, beginY, closeX, closeY, opacity) {
      context.beginPath()
      context.strokeStyle = `rgba(255, 255, 255, ${opacity})`
      context.moveTo(beginX, beginY)
      context.lineTo(closeX, closeY)
      context.closePath()
      context.stroke()
    },
    /**
     * 生成圆点数组
     */
    createCircleArr () {
      for (let i = 0; i < this.pointNum; i++) {
        this.circleArr.push(this.drawCircle(
          this.context,
          this.rangeRadom(this.docWidth, 0),
          this.rangeRadom(this.docHeight, 0),
          this.rangeRadom(15, 2),
          this.rangeRadom(10, -10) / 40,
          this.rangeRadom(10, -10) / 40
        ))
      }
    },
    /**
     * 每一帧绘制
     */
    draw () {
      const circleArr = this.circleArr
      this.context.clearRect(0, 0, this.docWidth, this.docHeight)
      var imgObj = new Image()
      imgObj.src = '../../assets/logo.png'
      // 循环绘制点
      for (let i = 0; i < this.pointNum; i++) {
        this.drawCircle(this.context, circleArr[i].x, circleArr[i].y, 10)
        // this.drawCircle(this.context, circleArr[i].x, circleArr[i].y, circleArr[i].r)
      }
      // 循环绘制线
      for (let i = 0; i < this.pointNum; i++) {
        for (let j = 0; j < this.pointNum; j++) {
          if (i + j < this.pointNum) {
            // let A = Math.abs(circleArr[i + j].x - circleArr[i].x)
            // let B = Math.abs(circleArr[i + j].y - circleArr[i].y)
            // let lineLength = Math.sqrt(A * A + B * B)
            // let C = 1 / lineLength * 7 - 0.009
            let lineOpacity = 0.1
            if (lineOpacity > 0) {
              this.drawLine(
                this.context,
                circleArr[i].x,
                circleArr[i].y,
                circleArr[i + j].x,
                circleArr[i + j].y,
                lineOpacity
              )
            }
          }
        }
      }
    },
    /**
     * 循环绘制
     */
    cycleDraw () {
      console.log('@@@@@@@@@##########= ' + this.pointNum)
      this.timer = setInterval(() => {
        for (let i = 0; i < this.pointNum; i++) {
          let cir = this.circleArr[i]
          cir.x += cir.moveX
          cir.y += cir.moveY
          if (cir.x > this.docWidth) {
            cir.x = 0
          } else if (cir.x < 0) {
            cir.x = this.docWidth
          }
          if (cir.y > this.docHeight) {
            cir.y = 0
          } else if (cir.y < 0) {
            cir.y = this.docHeight
          }
        }
        this.draw()
      }, 10)
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('userId')
    this.getAppData()
    // this.getAppPackageData()
    // this.interval = setInterval(() => {
    //   // this.getAppPackageData()
    // }, 30000)
    this.appPackageData = this.currentPageData
    const canvasDom = this.$refs.canvas

    // 取画布的高宽来设置显示分辨率
    this.docWidth = canvasDom.offsetWidth
    this.docHeight = canvasDom.offsetHeight

    // 设置画布分辨率
    canvasDom.width = canvasDom.offsetWidth
    canvasDom.height = canvasDom.offsetHeight

    // 初始化canvas上下文
    this.context = canvasDom.getContext('2d')

    // 设置线条和星星颜色
    this.context.strokeStyle = this.lineColor
    this.context.lineWidth = 1
    this.context.fillStyle = this.roundColor

    // 初始化
    this.createCircleArr() // 设置星星数组
    this.draw() // 首屏绘制
    this.cycleDraw() // 循环绘制
  },
  beforeDestroy () {
    this.clearInterval()
    clearInterval(this.timer)
  }
}
</script>
<style lang='less'>
.my-app {
  .my-app-content {
    background:#fff;
    padding: 20px;
    .packageTable{
      margin: 20px 0;
      .el-table thead{
        th {
          background-color: #eee;
        }
      }
    }
  }
  .space>div{
    background: #000;
    height: 300px;
  }
  .stars-wrapper{
    width: 100%;
    height: 300px;
    background: url("../../assets/images/starsky.png") no-repeat center center #1e7388;
    background-size: cover;
  }
  .starry-sky {
    width: 100%;
    height: 300px;
    position: absolute;
    top: 135px;
    > canvas {
      width: 100%;
      height: 100%;
    }
  }
  #confirmBtn{
    color: #fff;
    background-color: #5abdc7;
    border-color: #5abdc7;
  }
  #cancelBtn{
    color: #fff;
    background-color: #688ef3;
    border-color: #688ef3;
  }
}
</style>
