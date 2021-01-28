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
  <div class="upload-package">
    <el-dialog
      :title="$t('store.uploadApp')"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @close="clearForm"
    >
      <el-form
        :model="packageForm"
        :rules="rules"
        inline-message="true"
        label-position="top"
      >
        <el-form-item
          :label="$t('store.appPackage')"
          prop="fileList"
        >
          <el-upload
            ref="upload"
            action=""
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleDelte"
            :file-list="packageForm.fileList"
            :auto-upload="false"
            accept=".csar"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              plain
            >
              {{ $t('store.uploadApp') }}
            </el-button>
            <div
              class="el-upload__tip"
              slot="tip"
              style="display:inline-block;"
            >
              <em class="el-icon-warning" />
              {{ $t('store.onlyCsar') }}
              {{ $t('store.packageSizeLimit') }}
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('store.appIcon')"
          prop="appIcon"
        >
          <el-upload
            ref="upload"
            action=""
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChangeAppIcon"
            :on-remove="handleDelteAppIcon"
            :file-list="packageForm.appIcon"
            :auto-upload="false"
            accept=".jpg,.png"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              plain
            >
              {{ $t('store.uploadLogo') }}
            </el-button>
            <div
              class="el-upload__tip"
              slot="tip"
              style="display:inline-block;"
            >
              <em class="el-icon-warning" />
              {{ $t('store.onlyImg') }}
              {{ $t('store.iconSizeLimit') }}
            </div>
          </el-upload>
          <div class="default-icon">
            <div
              id="iconbox"
              style="display: none;"
            >
              <img
                :src="defaultUrl"
                alt=""
              >
            </div>
            <div
              class="box"
              v-for="(item, index) in defaultIcon"
              @click="chooseDefaultIcon(item, index)"
              :key="index"
            >
              <img
                :src="item"
                alt=""
              >
              <em
                class="el-icon-circle-check"
                :class="{ active: defaultActive === index }"
              />
            </div>
          </div>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              :label="$t('common.industry')"
              prop="industry"
            >
              <el-select
                id="upload_select_industry"
                v-model="packageForm.industry"
                :placeholder="$t('common.industry')"
                @change="checkProjectData"
              >
                <el-option
                  v-for="(item,index) in industry"
                  :key="index"
                  :label="language === 'cn'?item.label[0]:item.label[1]"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('common.type')"
              prop="types"
            >
              <el-select
                id="upload_select_types"
                v-model="packageForm.types"
                :placeholder="$t('common.type')"
                @change="checkProjectData"
              >
                <el-option
                  v-for="(item,index) in types"
                  :key="index"
                  :label="language === 'cn'?item.label[0]:item.label[1]"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('common.architecture')"
              prop="affinity"
            >
              <el-select
                id="upload_select_affinity"
                v-model="packageForm.affinity"
                :placeholder="$t('common.architecture')"
              >
                <el-option
                  v-for="(item,index) in affinity"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  @click="key(item)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" />
        </el-row>

        <el-form-item
          :label="$t('common.description')"
          prop="shortDesc"
        >
          <div id="upload_package_description">
            <el-input
              type="textarea"
              :rows="4"
              v-model="packageForm.shortDesc"
              maxlength="1024"
              show-word-limit
            />
          </div>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="upload_package_close"
          size="medium"
          @click="handleClose"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          id="upload_package_ipload"
          type="primary"
          size="medium"
          :loading="uploadBtnLoading"
          @click="submitPackage"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { TYPES, AFFINITY, INDUSTRY } from '../../tools/constant.js'
import { myApp } from '../../tools/api.js'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      defaultActive: '',
      defaultIconFile: '',
      defaultIcon: [
        require('../../assets/images/project_smartdevice.png'),
        require('../../assets/images/project_security.png'),
        require('../../assets/images/project_videosur.png')
      ],
      dialogVisible: this.value,
      packageForm: {
        fileList: [],
        appIcon: [],
        shortDesc: '',
        // mepType: '',
        industry: 'Smart Park',
        types: 'Video Application',
        affinity: 'X86'
      },
      types: TYPES,
      affinity: AFFINITY,
      industry: INDUSTRY,
      uploadBtnLoading: false,
      defaultUrl: '',
      rules: {
        fileList: [
          { required: true }
        ],
        appIcon: [
          { required: true }
        ],
        industry: [
          { required: true, message: '行业不能为空' }
        ],
        types: [
          { required: true }
        ],
        affinity: [
          { required: true, message: '架构不能为空' }
        ],
        shortDesc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    clearForm () {
      this.packageForm.fileList = []
      this.packageForm.appIcon = []
      this.packageForm.shortDesc = ''
      this.packageForm.industry = 'Smart Park'
      this.packageForm.types = 'Video Application'
      this.packageForm.affinity = 'X86'
    },
    checkFileType (file, packageFormKey, fileType) {
      let type = file.raw.name.split('.')
      let fileSize = file.size / 1024 / 1024
      type = type[type.length - 1]
      if (type === fileType) {
        this.packageForm[packageFormKey].push(file.raw)
      } else {
        this.packageForm[packageFormKey] = []
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.canOnlyUpload') + fileType + this.$t('promptMessage.files')
        })
      }
      if (fileSize > 10) {
        this.packageForm[packageFormKey] = []
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('store.packageSizeLimit')
        })
      }
    },
    handleChange (file, fileList) {
      this.checkFileType(file, 'fileList', 'csar')
    },
    handleChangeApi (file, fileList) {
      this.checkFileType(file, 'apiFileList', 'json')
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    handleChangeAppIcon (file, fileList) {
      this.packageForm.appIcon = []
      this.defaultIconFile = []
      this.defaultActive = ''
      let type = file.raw.type.split('/')[0]
      let fileSize = file.size / 1024 / 1024
      if (type === 'image') {
        this.packageForm.appIcon.push(file.raw)
      } else {
        this.packageForm.appIcon = []
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.uploadPicture')
        })
      }
      if (fileSize > 2) {
        this.packageForm.appIcon = []
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('store.iconSizeLimit')
        })
      }
    },
    handleDelte (file, fileList) {
      this.packageForm.fileList = fileList
    },
    handleDelteAppIcon (file, fileList) {
      this.packageForm.appIcon = fileList
    },
    removeUploadapi (file, fileList) {
      this.packageForm.apiFileList = fileList
    },
    getBase64Image (img) {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      let dataURL = canvas.toDataURL('image/' + ext)
      return dataURL
    },
    base64toFile (dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename + '.' + suffix, {
        type: mime
      })
    },
    getFileStream (img) {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      let dataURL = canvas.toDataURL('image/' + ext)
      return this.base64toFile(dataURL)
    },
    // default icon
    chooseDefaultIcon (file, index) {
      this.packageForm.appIcon = []
      if (this.defaultActive === index) {
        this.defaultActive = ''
      } else {
        this.defaultActive = index
      }
      let image = new Image()
      image.src = file
      image.onload = () => {
        this.defaultUrl = file
        this.defaultIconFile = this.getFileStream(image)
      }
    },
    upload () {
      let userId = sessionStorage.getItem('userId')
      let userName = sessionStorage.getItem('userName')
      let fd = new FormData()
      let packageForm = this.packageForm
      fd.append('file', packageForm.fileList[0])
      fd.append('icon', packageForm.appIcon.length > 0 ? packageForm.appIcon[0] : this.defaultIconFile)
      fd.append('industry', packageForm.industry)
      fd.append('type', packageForm.types)
      fd.append('affinity', packageForm.affinity)
      fd.append('shortDesc', packageForm.shortDesc ? packageForm.shortDesc : '')
      fd.append('userId', userId)
      fd.append('userName', userName)
      myApp.uploadAppPackageApi(fd).then(res => {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.uploadSuccess'),
          type: 'success'
        })
        this.handleClose()
        // this.$emit('getAppData')
        this.$router.push('/myapp')
      }).catch(error => {
        if (error.response.data.code === 403) {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.guestUser'),
            type: 'warning'
          })
          this.handleClose()
        } else if (error.response.data.message) {
          this.$message({
            duration: 2000,
            message: error.response.data.message,
            type: 'warning'
          })
          this.handleClose()
        } else {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.uploadFailed'),
            type: 'warning'
          })
          this.handleClose()
        }
      })
    },
    // confirm to submit
    submitPackage () {
      // this.uploadBtnLoading = true
      // judgement of if file is exist
      let appFileIcon = (this.packageForm.appIcon.length || this.defaultIconFile)
      let appFilePackage = (this.packageForm.fileList.length)
      let industry = this.packageForm.industry.length
      let types = this.packageForm.types
      let affinity = this.packageForm.affinity.length
      let shortDesc = this.packageForm.shortDesc
      if (!appFilePackage) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.uploadPackageFile')
        })
        // this.uploadBtnLoading = false
      } else if (!appFileIcon) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.uploadIconFile')
        })
        // this.uploadBtnLoading = false
      } else if (!industry) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.industryEmpty')
        })
        // this.uploadBtnLoading = false
      } else if (!affinity) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.architectureEmpty')
        })
        // this.uploadBtnLoading = false
      } else if (!types) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.typeEmpty')
        })
        // this.uploadBtnLoading = false
      } else if (!shortDesc) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.shortDescEmpty')
        })
        // this.uploadBtnLoading = false
      } else {
        this.upload()
      }
    },
    changeDataLanguage () {
      let language = localStorage.getItem('language')
      this.language = language
    },
    checkProjectData () {
      INDUSTRY.forEach(itemFe => {
        let pos = this.packageForm.industry.indexOf(itemFe.label[0])
        if (pos !== -1) {
          this.packageForm.industry.splice(pos, 1, itemFe.label[1])
        }
      })
      TYPES.forEach(itemFe => {
        if (this.packageForm.types === itemFe.label[0]) {
          this.packageForm.types = itemFe.label[1]
        }
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.changeDataLanguage()
    },
    value: function (newVal) {
      this.dialogVisible = newVal
    },
    fileList (val) {
      console.log(val)
    }
  },
  mounted () {
  }
}

</script>
<style lang='less' scoped>
.upload-package{
  .el-dialog__header{
  background-color: #5abdc7 ;
  }
  .el-upload{
    width: 100%;
    text-align: left;
  }
  .el-icon-upload{
    margin: 0px 0 16px !important;
  }
  .el-upload-dragger{
    height: auto !important;
    width: 100%;
  }
  .default-icon{
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    .box{
      position: relative;
      border: 1px solid #eee;
      margin-right: 15px;
      width: 30px;
      height: 30px;
      margin-bottom: 10px;
      border-radius: 50%;
      img{
        width: 30px;
        height: 30px;
      }
      em{
        display: inline-block;
        position: absolute;
        bottom: -5px;
        right: -5px;
      }
      .active{
        color: #03a9f4;
        font-weight: 800;
      }
    }
  }
  .el-dialog__footer{
    text-align: center;
  }
  .el-button{
    margin-right: 35px  ;
  }
  // #upload_package_ipload{
  //   color: #fff;
  //   background-color: #5abdc7;
  //   border-color: #5abdc7;
  // }
  // #upload_package_close{
  //   color: #fff;
  //   background-color: #738fea;
  //   border-color: #738fea;
  // }
  // #upload_package_detect{
  //   color: #fff;
  //   background-color: #fea712;
  //   border-color: #fea712;
  // }
}
</style>
