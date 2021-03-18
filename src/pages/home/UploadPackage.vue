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
      width="40%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @close="clearForm"
    >
      <el-form
        :model="packageForm"
        label-width="110px"
        :rules="rules"
      >
        <el-form-item
          :label="$t('store.appPackage')"
          prop="fileList"
        >
          <div class="uploadMin">
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
              v-show="ifUploadMin"
            >
              <el-button
                slot="trigger"
                size="small"
                type="primary"
                plain
              >
                {{ $t('store.uploadApp') }}
              </el-button>
            </el-upload>
          </div>
          <!-- 上传大文件 -->
          <div class="uploadMin">
            <uploader
              :options="options"
              class="uploader-example"
              @file-complete="fileComplete"
              :limit="1"
              v-show="ifUploadBig"
            >
              <uploader-unsupport />
              <uploader-drop>
                <uploader-btn>{{ $t('store.uploadApp') }}</uploader-btn>
              </uploader-drop>
              <uploader-list />
            </uploader>
          </div>
          <div class="tipFile">
            <div class="tipFile">
              <el-radio-group
                v-model="radioVal"
                @change="getRadioVal"
              >
                <el-radio
                  v-for="(item, index) in radioData"
                  :key="index"
                  :label="item.value"
                >
                  {{ item.value }}
                </el-radio>
              </el-radio-group>
            </div>
            <div
              class="tipFile"
              slot="tip"
            >
              <em class="el-icon-warning" />
              {{ $t('store.onlyCsar') }}
            </div>
          </div>
        </el-form-item>
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
        <el-form-item
          :label="$t('common.type')"
          prop="types"
        >
          <el-select
            id="upload_select_types"
            v-model="packageForm.types"
            :placeholder="$t('common.type')"
            @change="changeIcon"
          >
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="language === 'cn'?item.label[0]:item.label[1]"
              :value="item.value"
              :id="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('store.appIcon')"
          :label-width="formLabelWidth"
          prop="type"
          class="icon"
        >
          <div class="default-icon">
            <div
              class="box"
              v-for="(item, index) in defaultIcon"
              @click="chooseDefaultIcon(item, index)"
              :key="item"
            >
              <img
                :src="item"
                alt=""
              >
              <em
                class="el-icon-success"
                :class="{ active: packageForm.defaultActive === index }"
              />
            </div>
          </div>
          <em
            class="upIcon el-icon-success"
            :class="{ active: uploadIcon }"
            v-if="uploadIcon"
          />
          <el-upload
            id="projectLogo"
            class="upload-demo clear"
            ref="upload"
            action=""
            list-type="picture-card"
            :limit="1"
            :file-list="logoFileList"
            :on-change="handleChangeLogo"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :on-remove="removeUploadLogo"
            accept=".jpg,.png"
            name="file"
          >
            <em class="el-icon-plus" />
          </el-upload>
          <el-tooltip
            class="item"
            effect="dark"
            :content="this.$t('store.limitition')"
            placement="right"
          >
            <em class="el-icon-question" />
          </el-tooltip>
          <div
            class="el-form-error"
            v-if="showErr"
          >
            {{ $t('store.iconRequired') }}
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('store.appVideo')"
          prop="videoFile"
        >
          <el-upload
            ref="upload"
            style="position:relative;top:3px;"
            action=""
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChangeVideo"
            :on-remove="handleDelteVideoFile"
            :file-list="packageForm.videoFile"
            :auto-upload="false"
            accept=".mp4"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              plain
            >
              {{ $t('store.uploadVideo') }}
            </el-button>
            <div
              class="el-upload__tip"
              slot="tip"
            >
              <em class="el-icon-warning" />
              {{ $t('store.onlyVideo') }}
              {{ $t('store.videoSizeLimit') }}
            </div>
          </el-upload>
        </el-form-item>
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
          @click="handleClose"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          :loading="uploadBtnLoading"
          @click="submitPackage"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { TYPES, AFFINITY, INDUSTRY } from '../../tools/constant.js'
import { myApp, URL_PREFIX } from '../../tools/api.js'
import { getCookie } from '../../tools/request.js'
import axios from 'axios'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      deployPlatform: 'min',
      formLabelWidth: '110px',
      ifUploadBig: false,
      ifUploadMin: true,
      radioData: [
        { value: '文件大小不超过10M' },
        { value: '文件大小超过10M' }
      ],
      radioVal: '文件大小不超过10M',
      language: localStorage.getItem('language'),
      defaultActive: '',
      defaultIconFile: [],
      defaultIconData: [
        require('../../assets/images/project_videoapp.png'),
        require('../../assets/images/project_game.png'),
        require('../../assets/images/project_videosur.png'),
        require('../../assets/images/project_security.png'),
        require('../../assets/images/project_blockchain.png'),
        require('../../assets/images/project_smartdevice.png'),
        require('../../assets/images/project_iot.png'),
        require('../../assets/images/project_data.png'),
        require('../../assets/images/project_vr.png'),
        require('../../assets/images/project_api.png'),
        require('../../assets/images/project_sdk.png'),
        require('../../assets/images/project_mep.png')
      ],
      defaultIcon: [
        require('../../assets/images/project_videoapp.png')
      ],
      dialogVisible: this.value,
      packageForm: {
        fileList: [],
        videoFile: [],
        appIcon: [],
        shortDesc: '',
        // mepType: '',
        industry: 'Smart Park',
        types: 'Video Application',
        affinity: 'X86',
        base64Session: false,
        defaultActive: ''
      },
      // logoFileList: '',
      logoFileList: [],
      types: TYPES,
      affinity: AFFINITY,
      industry: INDUSTRY,
      uploadBtnLoading: false,
      defaultUrl: '',
      uploadIcon: false,
      showErr: false,
      rules: {
        fileList: [
          { required: true }
        ],
        videoFile: [
          { required: false }
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
        logoFileList: [
          { required: true, message: 'Icon is required', trigger: 'change' }
        ],
        shortDesc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      },
      fileAddress: '',
      name: '',
      mergerUrl: '',
      mergerUrlHttp: '',
      options: {
        testChunks: false,
        headers: {},
        forceChunkSize: true,
        simultaneousUploads: 5, // 并发数
        chunkSize: 8 * 1024 * 1024// 块大小
      }
    }
  },
  methods: {
    getRadioVal () {
      this.rules.fileList[0].required = false
      if (this.radioVal === '文件大小不超过10M') {
        this.ifUploadMin = true
        this.ifUploadBig = false
      } else {
        this.ifUploadMin = false
        this.ifUploadBig = true
      }
    },
    handleClose () {
      this.$emit('input', false)
    },
    clearForm () {
      this.packageForm.fileList = []
      this.packageForm.videoFile = []
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
    handleChangeVideo (file) {
      this.checkFileType(file, 'videoFile', 'mp4')
    },
    handleChangeApi (file, fileList) {
      this.checkFileType(file, 'apiFileList', 'json')
    },
    removeUploadLogo (file) {
      this.uploadIcon = false
      this.logoFileList = []
      this.showErr = this.logoFileList
      this.chooseDefaultIcon(this.defaultIcon[0], 0)
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },

    // 上传图标
    handleChangeLogo (file) {
      let listTemp = []
      this.packageForm.base64Session = true
      this.packageForm.appIcon = []
      this.defaultIconFile = []
      this.packageForm.defaultActive = ''
      if (file) {
        if (file.raw.name.indexOf(' ') !== -1) {
          this.$message.warning(this.$t('promptMessage.fileNameType'))
          this.logoFileList = []
        } else {
          this.logoFileList.push(file)
          listTemp.push(file.raw)
          this.packageForm.appIcon = listTemp
          this.uploadIcon = true
        }
        if (file.size / 1024 / 1024 > 2) {
          this.$message.warning(this.$t('promptMessage.moreThan2'))
          this.logoFileList = []
        }
        let fileTypeArr = ['jpg', 'png']
        this.fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
          this.$message.warning(this.$t('promptMessage.checkFileType'))
          this.logoFileList = []
        }
      }
      this.showErr = !this.logoFileList
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
    handleDelteVideoFile (file, fileList) {
      this.packageForm.videoFile = fileList
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
    changeIcon (val) {
      this.packageForm.base64Session = true
      this.defaultIconFile = []
      this.packageForm.defaultActive = 0
      switch (val) {
        case 'Video Application':
          this.defaultIcon.splice(0, 1, this.defaultIconData[0])
          break
        case 'Game Application':
          this.defaultIcon.splice(0, 1, this.defaultIconData[1])
          break
        case 'Video Surveillance':
          this.defaultIcon.splice(0, 1, this.defaultIconData[2])
          break
        case 'Safety':
          this.defaultIcon.splice(0, 1, this.defaultIconData[3])
          break
        case 'Blockchain':
          this.defaultIcon.splice(0, 1, this.defaultIconData[4])
          break
        case 'Smart Device':
          this.defaultIcon.splice(0, 1, this.defaultIconData[5])
          break
        case 'Internet of Things':
          this.defaultIcon.splice(0, 1, this.defaultIconData[6])
          break
        case 'Big Data':
          this.defaultIcon.splice(0, 1, this.defaultIconData[7])
          break
        case 'AR/VR':
          this.defaultIcon.splice(0, 1, this.defaultIconData[8])
          break
        case 'API':
          this.defaultIcon.splice(0, 1, this.defaultIconData[9])
          break
        case 'SDK':
          this.defaultIcon.splice(0, 1, this.defaultIconData[10])
          break
        case 'MEP':
          this.defaultIcon.splice(0, 1, this.defaultIconData[11])
          break
      }
      this.conversionIcon(this.defaultIcon[0])
      this.checkProjectData()
    },
    // 选择默认图标
    chooseDefaultIcon (file, index) {
      this.logoFileList = []
      this.uploadIcon = false
      this.packageForm.base64Session = true
      this.defaultIconFile = []

      if (this.packageForm.defaultActive === index) {
        this.packageForm.defaultActive = ''
        this.packageForm.appIcon = []
        this.showErr = !this.defaultIconFile.length
      } else {
        this.packageForm.defaultActive = index
        this.conversionIcon(file)
      }
    },
    conversionIcon (file) {
      let image = new Image()
      image.src = file
      image.onload = () => {
        // 将静态图片转化为base64
        let base64 = this.getBase64Image(image)
        // base64转化为文件流
        this.defaultIconFile.push(this.base64toFile(base64))
        this.packageForm.appIcon = this.defaultIconFile
        this.showErr = !this.defaultIconFile
      }
    },
    // default icon
    chooseDefaultIcons (file, index) {
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
      fd.append('fileAddress', this.fileAddress)
      fd.append('icon', packageForm.appIcon.length > 0 ? packageForm.appIcon[0] : this.defaultIconFile)
      fd.append('industry', packageForm.industry)
      fd.append('type', packageForm.types)
      fd.append('affinity', packageForm.affinity)
      fd.append('shortDesc', packageForm.shortDesc ? packageForm.shortDesc : '')
      fd.append('userId', userId)
      fd.append('userName', userName)
      fd.append('demoVideo', packageForm.videoFile[0])
      myApp.uploadVMAppApi(fd).then(res => {
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
    uploadMin () {
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
      fd.append('demoVideo', packageForm.videoFile[0])
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
      let appFilePackage
      if (this.ifUploadMin) {
        appFilePackage = (this.packageForm.fileList.length)
      } else {
        appFilePackage = (this.fileAddress.length)
      }
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
        if (this.ifUploadBig) {
          this.upload()
        } else {
          this.uploadMin()
        }
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
    },
    fileComplete () {
      const file = arguments[0].file
      let url = this.mergerUrl + file.name + '&guid=' + arguments[0].uniqueIdentifier
      axios.get(url).then(response => {
        this.fileAddress = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  destroyed () {
    this.clearForm()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.changeDataLanguage()
    },
    value: function (newVal) {
      this.dialogVisible = newVal
    }
  },
  mounted () {
    this.showErr = this.logoFileList
    this.chooseDefaultIcon(this.defaultIcon[0], 0)
    this.getRadioVal()
  },
  created () {
    this.options.headers = { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
    let url = window.location.origin
    url = url.replace('8083', '9082')
    this.options.target = url + URL_PREFIX + 'apps/upload'
    this.mergerUrl = url + URL_PREFIX + 'apps/merge?fileName='
  }
}

</script>
<style lang='less' >
.upload-package{
  .uploadMin{
    float: left;
    .el-button--primary.is-plain {
      margin-top: 5px;
      display: inline-block;
      position: relative;
      padding: 4px 22px;
      font-size: 100%;
      line-height: 1.4;
      color: #688ef3;
      border: 1px solid #c3d2fa;
      cursor: pointer;
      border-radius: 2px;
      background: #f0f4fe;
      outline: none
    }
    .uploader-btn {
      margin-top: 5px;
      display: inline-block;
      position: relative;
      padding: 4px 22px;
      font-size: 100%;
      line-height: 1.4;
      color: #688ef3;
      border: 1px solid #c3d2fa;
      cursor: pointer;
      border-radius: 2px;
      background: #f0f4fe;
      outline: none
    }
    .uploader-drop{
      padding: 0;
      border: 0;
      background-color: #fff;
    }
  }
  .tipFile{
    float: left;
    font-size: 12px;
    margin-left: 10px;
    margin-top: 6px;
    color: #606266;
    .el-icon-warning:before {
    content: aqua;
    }
    .lableStyle{
      margin-left: 10px;
      font-size: 12px;
      color: #606266;
      input{
        background: #688ef3;
      }
  }
  }

  .el-dialog__header{
    background-color: #5abdc7 ;
  }
  .el-form-error{
    display: inline-block;
    margin: 12px 0 0 5px;
  }
  .el-icon-upload{
    margin: 0px 0 16px !important;
  }
  .el-upload-dragger{
    height: auto !important;
    width: 100%;
  }
  .list-select input{
    height: 35px;
    line-height: 35px;
  }
  .upload-demo{
    float: left;
    .el-button--primary{
      background-color: #fff;
      border-color: #688ef3;
      color: #688ef3;
      padding: 6px 20px;
      margin-top: 8px;
    }
    .el-icon-warning{
      color: #688ef3;
      margin-right: 5px;
      font-size: 14px;
    }
    .el-upload{
      width: 34px;
      height: 34px;
      line-height: 34px;
      margin: 3px 15px 0 0;
      text-align: center;
    }
    .el-upload-list__item-preview{
      opacity: 0;
    }
    .el-icon-plus:before {
        content: "\e6d9";
    }
  }
  .el-icon-question{
      float: left;
      margin-top: 12px;
  }
  .el-icon-question:before {
    color: #688ef3;
    font-size: 16px;
  }
  .default-icon{
    float: left;
    display: flex;
    flex-wrap: wrap;
    .box{
      position: relative;
      width: 44px;
      height: 44px;
      margin: 0 15px 0 0;
      img{
        width: 40px;
        height: 40px;
      }
      em{
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .active{
        color: #409EFF;
      }
    }
  }
  .upIcon.el-icon-success{
    position: absolute;
    top: 30px;
    left: 88px;
    z-index: 99;
  }
  .upIcon.active{
    color: #409EFF;
  }
  .el-form-item{
    margin-bottom: 15px;
  }
  .el-form-item.icon{
    content: '';
    display: block;
    clear: both;
  }
  .f50{
    float: left;
    width: 50%;
    .el-form-item__content{
      width: calc(100% - 110px);
    }
    .el-select{
      width: 100%;
    }
  }
  .el-upload-list{
    width: auto;
  }
  .el-upload-list--picture-card .el-upload-list__item{
    width: 40px;
    height: 40px;
    min-width: 40px;
    border: none;
    margin: 0 15px 0 0;
  }
  #upload_package_detect{
    color: #fff;
    background-color: #fea712;
    border-color: #fea712;
  }
}
.uploader-file[status=success] .uploader-file-remove{
  display: block !important;
}
</style>
