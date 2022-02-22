<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
      :visible.sync="dialogVisible"
      width="53%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @close="clearForm"
    >
      <div class="modify_header">
        <span class="title_icon" />
        <div
          slot="title"
          class="header-title"
        >
          {{ $t('store.uploadApp') }}
        </div>
      </div>
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
              v-show="ifUploadMin"
              accept=".csar,.zip"
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
          <!-- Upload large files -->
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
              class="el-upload__tip"
              slot="tip"
            >
              <em class="el-icon-warning" />
              <span class="warning-tip">
                {{ $t('store.onlyCsar') }}
              </span>
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
              :label="language === 'cn'?item.labelcn:item.labelen"
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
              :label="language === 'cn'?item.labelcn:item.labelen"
              :value="item.value"
              :id="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('store.appIcon')"
          label-width="110px"
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
            <div
              class="el-upload__tip"
              style="line-height:-5px"
              slot="tip"
            >
              <em class="el-icon-warning" />
              <span class="warning-tip">
                {{ $t('store.limitition') }}
              </span>
            </div>
          </el-upload>
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
              class="app-upload"
              plain
            >
              {{ $t('store.uploadVideo') }}
            </el-button>
            <div
              class="el-upload__tip"
              slot="tip"
            >
              <em class="el-icon-warning" />
              <span class="warning-tip">
                {{ $t('store.onlyVideo') }}
                {{ $t('store.videoSizeLimit') }}
              </span>
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
          class="showType"
          :label="$t('common.appDisplay')"
        >
          <div class="showTypeCheckbox">
            <el-checkbox-group
              v-model="packageForm.checkList"
              @change="showTypeChange"
            >
              <el-checkbox label="innerPublic">
                {{ $t('common.innerPublic') }}
              </el-checkbox>
              <el-checkbox
                label="public"
                :disabled="packageForm.isSelectInnerPublic=== true? false:true"
              >
                {{ $t('common.public') }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item
          class="showAble"
          :label="$t('common.experienceable')"
        >
          <div class="showTypeCheckbox">
            <el-switch
              v-model="packageForm.experienceAble"
              active-color="#54C3D7"
            />
            <div
              class="el-upload__tip"
              slot="tip"
            >
              <em class="el-icon-warning" />
              <span class="warning-tip">
                {{ $t('store.tryAppTip') }}
              </span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer btns"
      >
        <el-button
          @click="handleClose"
          class="footer-button"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          class="footer-button"
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
import commonUtil from '../../tools/commonUtil.js'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
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
        checkList: ['innerPublic', 'public'],
        isSelectInnerPublic: true,
        industry: 'Smart Park',
        types: 'Video Application',
        affinity: 'X86',
        base64Session: false,
        defaultActive: '',
        experienceAble: false
      },
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
          { required: true, message: '描述不能为空', trigger: 'change' }
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
        simultaneousUploads: 5, // Concurrency
        chunkSize: 8 * 1024 * 1024// Block size
      }
    }
  },
  methods: {
    getRadioVal () {
      this.rules.fileList[0].required = false
      if (this.radioVal === '文件大小不超过10M' || this.radioVal === 'less than 10MB') {
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
    checkFileType (file, packageFormKey, fileTypeArr) {
      let type = file.raw.name.split('.')
      let fileSize = file.size / 1024 / 1024
      type = type[type.length - 1]
      if (fileTypeArr.indexOf(type.toLowerCase()) !== -1) {
        this.packageForm[packageFormKey].push(file.raw)
      } else {
        this.packageForm[packageFormKey] = []
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.canOnlyUpload') + fileTypeArr + this.$t('promptMessage.files')
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
      let fileTypeArr = ['zip', 'csar']
      this.checkFileType(file, 'fileList', fileTypeArr)
    },
    handleChangeVideo (file) {
      let fileTypeArr = ['mp4']
      this.checkFileType(file, 'videoFile', fileTypeArr)
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
    // Upload icon
    handleChangeLogo (file) {
      let listTemp = []
      this.packageForm.base64Session = true
      this.packageForm.appIcon = []
      this.defaultIconFile = []
      this.logoFileList = []
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
    handleDelte (file, fileList) {
      this.packageForm.fileList = fileList
    },
    handleDelteVideoFile (file, fileList) {
      this.packageForm.videoFile = fileList
    },
    getBase64Image (img) {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      return canvas.toDataURL('image/' + ext)
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
    handleUploadSuccess () {
      this.$message({
        duration: 2000,
        message: this.$t('promptMessage.uploadSuccess'),
        type: 'success'
      })
      this.handleClose()
      this.$router.push('/myapp')
    },
    changeIcon (val) {
      this.packageForm.base64Session = true
      this.defaultIconFile = []
      this.packageForm.defaultActive = 0
      switch (val) {
        case 'Video Application':
          this.defaultIcon.splice(0, 1, this.defaultIconData[0])
          break
        case 'Game':
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
      if (this.logoFileList.length !== 0) {
        this.handleChangeLogo(this.logoFileList[0])
      } else {
        this.conversionIcon(this.defaultIcon[0])
      }
      this.checkProjectData()
    },
    // Choose the default icon
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
        // Convert static images intobase64
        let base64 = this.getBase64Image(image)
        // Convert base64 to file stream
        this.defaultIconFile.push(this.base64toFile(base64))
        this.packageForm.appIcon = this.defaultIconFile
        this.showErr = !this.defaultIconFile
      }
    },
    getShowType (packageForm) {
      if (packageForm.checkList.length === 0) {
        return 'private'
      }
      return packageForm.checkList.length === 1 ? 'inner-public' : 'public'
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
      fd.append('showType', this.getShowType(packageForm))
      fd.append('userId', userId)
      fd.append('userName', userName)
      fd.append('demoVideo', packageForm.videoFile[0])
      fd.append('experienceAble', packageForm.experienceAble)
      myApp.uploadVMAppApi(fd).then(res => {
        this.handleUploadSuccess()
      }).catch((error) => {
        let defaultMsg = this.$t('promptMessage.uploadFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
        this.handleClose()
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
      fd.append('showType', this.getShowType(packageForm))
      fd.append('userId', userId)
      fd.append('userName', userName)
      fd.append('demoVideo', packageForm.videoFile[0])
      fd.append('experienceAble', packageForm.experienceAble)
      myApp.uploadAppPackageApi(fd).then(res => {
        this.handleUploadSuccess()
      }).catch(error => {
        this.showErrorMessage(error)
        this.handleClose()
      })
    },
    // confirm to submit
    submitPackage () {
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
      if (appFilePackage === 0) {
        this.$message({
          duration: 2000,
          type: 'warning',
          customClass: 'zZindex',
          message: this.$t('promptMessage.uploadPackageFile')
        })
      } else if (!appFileIcon) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.uploadIconFile')
        })
      } else if (!industry) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.industryEmpty')
        })
      } else if (!affinity) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.architectureEmpty')
        })
      } else if (!types) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.typeEmpty')
        })
      } else {
        if (this.ifUploadBig) {
          this.upload()
        } else {
          this.uploadMin()
        }
      }
    },
    checkProjectData () {
      INDUSTRY.forEach(itemFe => {
        let pos = this.packageForm.industry.indexOf(itemFe.labelcn)
        if (pos !== -1) {
          this.packageForm.industry.splice(pos, 1, itemFe.labelen)
        }
      })
      TYPES.forEach(itemFe => {
        if (this.packageForm.types === itemFe.labelcn) {
          this.packageForm.types = itemFe.labelen
        }
      })
    },
    fileComplete () {
      const file = arguments[0].file
      let url = this.mergerUrl + file.name + '&guid=' + arguments[0].uniqueIdentifier
      axios.get(url).then(response => {
        this.fileAddress = response.data
      }).catch(() => {
        // This is intentional
      })
    },
    changeLanguage (language) {
      if (language === 'en') {
        this.radioData[0].value = 'less than 10MB'
        this.radioData[1].value = 'more than 10MB'
        this.radioVal = 'less than 10MB'
      } else {
        this.radioData[0].value = '文件大小不超过10M'
        this.radioData[1].value = '文件大小超过10M'
        this.radioVal = '文件大小不超过10M'
      }
    },
    showTypeChange (val) {
      if (val.length === 0) {
        this.clearCheckList()
      } else if (val.length === 1 && val[0] === 'innerPublic') {
        this.packageForm.checkList = ['innerPublic']
        this.packageForm.isSelectInnerPublic = true
      } else if (val.length === 1 && val[0] === 'public') {
        this.clearCheckList()
      } else {
        this.packageForm.checkList = ['innerPublic', 'public']
        this.packageForm.isSelectInnerPublic = true
      }
    },
    clearCheckList () {
      this.packageForm.checkList = []
      this.packageForm.isSelectInnerPublic = false
    },
    showErrorMessage (error) {
      let retCode = error.response.data.retCode
      let errMsg = error.response.data.message
      if (retCode) {
        commonUtil.showTipMsg(this.language, error, errMsg)
      } else {
        let defaultMsg = this.$t('promptMessage.uploadFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      }
      this.handleClose()
    }
  },

  destroyed () {
    this.clearForm()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language') || 'cn'
      this.changeLanguage(this.language)
    },
    value: function (newVal) {
      this.dialogVisible = newVal
    }
  },
  mounted () {
    this.language = localStorage.getItem('language') || 'cn'
    this.changeLanguage(this.language)
    this.showErr = this.logoFileList
    this.chooseDefaultIcon(this.defaultIcon[0], 0)
    this.getRadioVal()
  },
  created () {
    this.options.headers = { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
    let url = window.location.origin
    this.options.target = url + URL_PREFIX + 'apps/upload'
    this.mergerUrl = url + URL_PREFIX + 'apps/merge?fileName='
  }
}

</script>
<style lang='less'>
.upload-package{
  .el-dialog{
    width: 911px;
    max-height: 745px;
    border-radius: 20px;
    background: rgba(46, 20, 124, 0.7);
  }
  .el-dialog__footer{
    margin-top: -20px;
  }
  .btns{
    position: relative;
    right: 40px;
  }
  .el-dialog__body{
    padding-left:40px !important ;
  }
  .modify_header{
    display: inline-flex;
    margin-bottom: 20px;
    .title_icon{
      background: #43F6AD;
      border-radius: 50%;
      height: 9px;
      width: 9px;
      position: relative;
      top: 7px;
    }
    .header-title{
      margin-left: 10px;
      color: #fff;
      font-size: 18px;
      letter-spacing: 1px;
    }
  }
  .el-form-item__label{
    font-size: 14px;
    color: #fff;
    line-height: 36px !important;
  }
  .el-form-item .el-form-item__content {
    padding:0 !important;
  }
  .el-form-item {
    margin-bottom: 17px;
    .app-upload{
      background: #4E3494;
      border: none;
      color: #FFFFFF;
      width: 169px;
      height: 36px;
    }
    .el-input__inner {
      border-radius: 10px;
      width: 95%;
      color: #C9BDF3;
      border: none;
      background: #4E3494;
    }
    .el-input__suffix{
      right: 79px;
    }
    .desc-input{
      width: 95%;
      .el-textarea__inner {
        height: 80px;
        border-radius: 10px;
        width: 100%;
        color: #fff;
      }
    }
  }
  .showType{
    margin-top: 11px;
    .showTypeCheckbox{
      margin-top: 11px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: #54C3D7;
      background-color:#54C3D7;
      .warning-tip{
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .showAble {
    .showTypeCheckbox{
      margin-top: 6px;
    }
  }
  .warning-tip{
    color: #fff;
    font-size: 12px;
  }
  .el-radio__label{
    color: #fff;
    font-size: 12px;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #fff;
    font-size: 12px;
  }
  .el-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    color: #fff;
    font-size: 12px;
}
  .el-icon-warning{
    color: #fff;
    margin-right: 5px;
    font-size: 12px;
  }
  .uploadMin{
    float: left;
    .el-button--primary.is-plain {
      background: #4E3494;
      border: none;
      color: #fff;
      width: 169px;
      height: 36px;
    }
    .uploader-btn {
      background: #4E3494;
      border: none;
      color: #fff;
      width: 169px;
      height: 36px;
      text-align: center;
      font-size: 12px;
      line-height: 2.4;
      margin: 0;
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
    .lableStyle{
      margin-left: 10px;
      font-size: 12px;
      color: #fff;
      input{
        background: #688ef3;
      }
    }
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
      background: #59508f;
      border: none;
      color: #fff;
      width: 169px;
      height: 36px;
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
    .el-upload__tip {
      margin-top: 13px;
      margin-left: -12px;
    }
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
        color: #fff;
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
    color: #fff;
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
.el-form-item__error{
  padding-top: 1px;
}
.uploader-file[status=success] .uploader-file-remove{
  display: block !important;
}
.zZindex {
  z-index: 3000 !important;
}
</style>
