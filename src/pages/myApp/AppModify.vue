<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="appModify">
    <el-dialog
      :title="$t('apppromotion.appPromotion') + appModifyInfo.name"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @close="clearForm"
      width="40%"
    >
      <el-form
        :model="appModifyInfo"
        ref="form"
        label-width="140px"
      >
        <el-form-item
          :label="$t('common.industry')"
        >
          <el-select
            v-model="appModifyInfo.industry"
            :placeholder="$t('common.industry')"
            @change="checkProjectData"
          >
            <el-option
              v-for="(item,index) in appIndustrys"
              :key="index"
              :label="language === 'cn'?item.label[0]:item.label[1]"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('common.type')"
        >
          <el-select
            v-model="appModifyInfo.type"
            :placeholder="$t('common.type')"
            @change="changeIcon"
          >
            <el-option
              v-for="(item,index) in appTypes"
              :key="index"
              :label="language === 'cn'?item.label[0]:item.label[1]"
              :value="item.value"
              :id="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('store.appIcon')"
        >
          <div class="app-icon">
            <div
              class="box"
              v-for="(item, index) in defaultIcon"
              @click="chooseDefaultIcon(item, index)"
              :key="item"
            >
              <img
                :src="getAppIcon(item)"
                alt=""
              >
              <em
                class="el-icon-success"
                :class="{ active: appModifyInfo.defaultActive === index }"
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
        >
          <el-upload
            ref="upload"
            style="position:relative;top:3px;"
            action=""
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChangeVideo"
            :on-remove="handleDelteVideoFile"
            :file-list="appModifyInfo.videoFile"
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
        >
          <el-select
            v-model="appModifyInfo.affinity"
            :placeholder="$t('common.architecture')"
          >
            <el-option
              v-for="(item,index) in appAffinitys"
              :key="index"
              :label="item.label"
              :value="item.value"
              @click="key(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('common.description')"
        >
          <el-input
            id="appDescription"
            v-model="appModifyInfo.shortDesc"
          />
        </el-form-item>
        <el-form-item
          class="showType"
          :label="$t('common.appDisplay')"
        >
          <div class="showTypeCheckbox">
            <el-checkbox-group
              v-model="appModifyInfo.checkboxList"
              @change="showTypeChange"
            >
              <el-checkbox label="innerPublic">
                {{ $t('common.innerPublic') }}
              </el-checkbox>
              <el-checkbox
                label="public"
                :disabled="appModifyInfo.isSelectInnerPublic=== true? false:true"
              >
                {{ $t('common.public') }}
              </el-checkbox>
            </el-checkbox-group>
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
          @click="confirmButtonAction"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { TYPES, AFFINITY, INDUSTRY } from '../../tools/constant.js'
import { myApp, URL_PREFIX } from '../../tools/api.js'
export default {
  props: {
    rowAppModifyInfo: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      dialogVisible: true,
      appModifyInfo: {
        industry: '',
        type: '',
        appIcon: [],
        appVideo: '',
        affinity: '',
        shortDesc: '',
        checkboxList: [],
        isSelectInnerPublic: false,
        defaultActive: '',
        videoFile: [],
        appId: '',
        packageId: ''
      },
      defaultIcon: [
        require('../../assets/images/project_videoapp.png')
      ],
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
      language: localStorage.getItem('language'),
      defaultIconFile: [],
      logoFileList: [],
      uploadIcon: false,
      appTypes: TYPES,
      appAffinitys: AFFINITY,
      appIndustrys: INDUSTRY,
      showErr: false,
      isFirstShowModifyDlg: true
    }
  },
  methods: {
    getAppIcon (item) {
      if (this.isFirstShowModifyDlg) {
        setTimeout(() => {
          this.isFirstShowModifyDlg = false
        }, 500)
        return URL_PREFIX + 'apps/' + this.appModifyInfo.appId + '/icon'
      } else {
        return item
      }
    },
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    handleCloseDirect () {
      this.dialogVisible = false
      this.$emit('input', false)
    },
    clearForm () {
      this.appModifyInfo.videoFile = []
      this.appModifyInfo.appIcon = []
      this.appModifyInfo.shortDesc = ''
      this.appModifyInfo.industry = 'Smart Park'
      this.appModifyInfo.types = 'Video Application'
      this.appModifyInfo.affinity = 'X86'
    },
    handleChangeVideo (file) {
      this.checkFileType(file, 'videoFile', 'mp4')
    },
    checkFileType (file, packageFormKey, fileType) {
      let type = file.raw.name.split('.')
      let fileSize = file.size / 1024 / 1024
      type = type[type.length - 1]
      if (type === fileType) {
        this.appModifyInfo[packageFormKey].push(file.raw)
      } else {
        this.appModifyInfo[packageFormKey] = []
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.canOnlyUpload') + fileType + this.$t('promptMessage.files')
        })
      }
      if (fileSize > 10) {
        this.appModifyInfo[packageFormKey] = []
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('store.packageSizeLimit')
        })
      }
    },
    handleDelteVideoFile (file, fileList) {
      this.appModifyInfo.videoFile = fileList
    },
    chooseDefaultIcon (file, index) {
      this.logoFileList = []
      this.uploadIcon = false
      this.defaultIconFile = []

      if (this.appModifyInfo.defaultActive === index) {
        this.appModifyInfo.defaultActive = ''
        this.appModifyInfo.appIcon = []
        this.showErr = !this.defaultIconFile.length
      } else {
        this.appModifyInfo.defaultActive = index
        this.conversionIcon(file)
      }
    },
    removeUploadLogo (file) {
      this.uploadIcon = false
      this.logoFileList = []
      this.showErr = this.logoFileList
      this.chooseDefaultIcon(this.defaultIcon[0], 0)
    },
    handleChangeLogo (file) {
      let listTemp = []
      this.appModifyInfo.appIcon = []
      this.defaultIconFile = []
      this.logoFileList = []
      this.appModifyInfo.defaultActive = ''
      if (file) {
        if (file.raw.name.indexOf(' ') !== -1) {
          this.$message.warning(this.$t('promptMessage.fileNameType'))
          this.logoFileList = []
        } else {
          this.logoFileList.push(file)
          listTemp.push(file.raw)
          this.appModifyInfo.appIcon = listTemp
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
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    showTypeChange (val) {
      if (val.length === 0) {
        this.appModifyInfo.checkboxList = []
        this.appModifyInfo.isSelectInnerPublic = false
      } else if (val.length === 1 && val[0] === 'innerPublic') {
        this.appModifyInfo.checkboxList = ['innerPublic']
        this.appModifyInfo.isSelectInnerPublic = true
      } else if (val.length === 1 && val[0] === 'public') {
        this.appModifyInfo.checkboxList = []
        this.appModifyInfo.isSelectInnerPublic = false
      } else {
        this.appModifyInfo.checkboxList = ['innerPublic', 'public']
        this.appModifyInfo.isSelectInnerPublic = true
      }
    },
    confirmButtonAction () {
      let fd = new FormData()
      fd.append('industry', this.appModifyInfo.industry)
      fd.append('type', this.appModifyInfo.type)
      fd.append('icon', this.appModifyInfo.appIcon.length > 0 ? this.appModifyInfo.appIcon[0] : this.defaultIconFile)
      fd.append('vedio', this.appModifyInfo.videoFile[0])
      fd.append('affinity', this.appModifyInfo.affinity)
      fd.append('shortDesc', this.appModifyInfo.shortDesc)
      fd.append('showType', this.appModifyInfo.checkboxList.length === 0 ? 'private' : (this.appModifyInfo.checkboxList.length === 1 ? 'inner-public' : 'public'))
      myApp.modifyAppAttr(fd, this.appModifyInfo.appId, this.appModifyInfo.packageId).then(res => {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.modifySuccess'),
          type: 'success'
        })
        this.$emit('reloadData', true)
        this.$emit('input', false)
        this.dialogVisible = false
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.modifyFail'),
          type: 'warning'
        })
      })
    },
    conversionIcon (file) {
      let image = new Image()
      image.src = file
      image.onload = () => {
        let base64 = this.getBase64Image(image)
        this.defaultIconFile.push(this.base64toFile(base64))
        this.appModifyInfo.appIcon = this.defaultIconFile
        this.showErr = !this.defaultIconFile
      }
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
    checkProjectData () {
      INDUSTRY.forEach(itemFe => {
        let pos = this.appModifyInfo.industry.indexOf(itemFe.label[0])
        if (pos !== -1) {
          this.appModifyInfo.industry.splice(pos, 1, itemFe.label[1])
        }
      })
      TYPES.forEach(itemFe => {
        if (this.appModifyInfo.types === itemFe.label[0]) {
          this.appModifyInfo.types = itemFe.label[1]
        }
      })
    },
    changeIcon (val) {
      this.appModifyInfo.base64Session = true
      this.defaultIconFile = []
      this.appModifyInfo.defaultActive = 0
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
    changeDataLanguage () {
      let language = localStorage.getItem('language')
      this.language = language
    },
    initModifyData (data) {
      if (data.showType === 'private') {
        data.isSelectInnerPublic = false
        data.checkboxList = []
      } else if (data.showType === 'inner-public') {
        data.isSelectInnerPublic = true
        data.checkboxList = ['innerPublic']
      } else {
        data.isSelectInnerPublic = true
        data.checkboxList = ['innerPublic', 'public']
      }
      this.appModifyInfo = {
        name: data.name,
        industry: data.industry,
        type: data.type,
        appIcon: data.appIcon,
        appVideo: data.appVideo,
        affinity: data.affinity,
        shortDesc: data.shortDesc,
        checkboxList: data.checkboxList,
        isSelectInnerPublic: data.isSelectInnerPublic,
        defaultActive: '',
        videoFile: [],
        appId: data.appId,
        packageId: data.packageId
      }
    }
  },
  watch: {
    value: function (newVal) {
      this.dialogVisible = newVal
    },
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.changeCnEn(language)
      this.changeDataLanguage()
    }
  },
  mounted () {
    this.initModifyData(this.rowAppModifyInfo)
    this.isFirstShowModifyDlg = true
    this.changeIcon(this.rowAppModifyInfo.type)
  }
}
</script>
<style lang="less">
.appModify {
  .app-icon{
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
  .showType{
    margin-top: -10px;
    .showTypeCheckbox{
      margin-top: 11px;
    }
  }
}
</style>
