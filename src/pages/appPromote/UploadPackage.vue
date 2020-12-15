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
  <div class="add-package">
    <el-dialog
      :title="$t('myApp.addApp')"
      :visible.sync="dialogVisible"
      width="45%"
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
          :label="$t('common.plateformName')"
          prop="plateformName"
        >
          <div id="upload_package_plateformName">
            <el-input
              type="textarea"
              :rows="1"
              v-model="packageForm.plateformName"
              show-word-limit
            />
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('common.plateformVersion')"
          prop="plateformVersion"
        >
          <div id="upload_package_plateformVersion">
            <el-input
              type="textarea"
              :rows="1"
              v-model="packageForm.plateformVersion"
              show-word-limit
            />
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('common.IPOrUrl')"
          prop="IPOrUrl"
        >
          <div id="upload_package_IPOrUrl">
            <el-input
              type="textarea"
              :rows="1"
              v-model="packageForm.IPOrUrl"
              show-word-limit
            />
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('common.transferTool')"
          prop="types"
        >
          <el-select
            id="upload_select_types"
            v-model="packageForm.types"
            :placeholder="$t('common.transferTool')"
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
          @click="handleClose"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          id="upload_package_ipload"
          type="primary"
          :loading="uploadBtnLoading"
          @click="submitPackage"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { TTYPES, AFFINITY, INDUSTRY } from '../../tools/constant.js'
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
        require('../../assets/images/appicon1.png'),
        require('../../assets/images/appicon2.png'),
        require('../../assets/images/appicon3.png')
      ],
      dialogVisible: this.value,
      packageForm: {
        plateformName: '',
        plateformVersion: '',
        IPOrUrl: '',
        shortDesc: '',
        transferTool: '',
        types: '转换器'
      },
      types: TTYPES,
      defaultUrl: '',
      rules: {
        plateformName: [
          { required: true, message: '平台名称不能为空', trigger: 'blur' }
        ],
        plateformVersion: [
          { required: true, message: '平台版本不能为空', trigger: 'blur' }
        ],
        IPOrUrl: [
          { required: true, message: 'IP or URL不能为空', trigger: 'blur' }
        ],
        types: [
          { required: true }
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
      this.packageForm.shortDesc = ''
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
      let types = this.packageForm.types
      let plateformName = this.packageForm.plateformName
      let plateformVersion = this.packageForm.plateformVersion
      let IPOrUrl = this.packageForm.IPOrUrl
      let transferTool = this.packageForm.transferTool
      let shortDesc = this.packageForm.shortDesc
      if (!appFilePackage) {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.uploadPackageFile')
        })
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
      TTYPES.forEach(itemFe => {
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
<style lang='less'>
.add-package{
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
    .box{
      position: relative;
      border: 1px solid #eee;
      margin-right: 15px;
      width: 68px;
      height: 68px;
      margin-bottom: 10px;
      img{
        width: 68px;
        height: 68px;
      }
      em{
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
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
  #upload_package_ipload{
    color: #fff;
    background-color: #5abdc7;
    border-color: #5abdc7;
  }
  #upload_package_close{
    color: #fff;
    background-color: #738fea;
    border-color: #738fea;
  }
  #upload_package_detect{
    color: rgb(88, 88, 92);
    background-color: #fea712;
    border-color: #fea712;
  }
}
</style>
