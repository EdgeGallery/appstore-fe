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
  <div
    v-if="isShow"
  >
    <eg-bread-crumb :data="dataNeedShown" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EgBreadCrumb from 'eg-view/src/components/EgBreadCrumb'
export default {
  components: {
    EgBreadCrumb
  },
  data () {
    return {
      breadCrumbData: [],
      dataNeedShown: [],
      isShow: false
    }
  },
  computed: {
    ...mapState(['language'])
  },
  watch: {
    $route (route) {
      this.isShow = false
      this.breadCrumbData = route.meta.breadcrumb
      if (this.breadCrumbData && this.breadCrumbData.length > 0) this.isShow = true
      this.getNeedShowData()
    },
    '$i18n.locale': function () {
      this.getNeedShowData()
      this.getBreadCrumbData()
    }
  },
  methods: {
    getNeedShowData () {
      let language = localStorage.getItem('language')
      let showData = []
      language === 'en' ? this.breadCrumbData.forEach(ele => showData.push({ name: ele.nameEn, path: ele.path }))
        : this.breadCrumbData.forEach(ele => showData.push({ name: ele.nameCn, path: ele.path }))
      this.dataNeedShown = showData
    },
    getBreadCrumbData () {
      this.breadCrumbData = this.$route.meta.breadcrumb
      let nameObj = {
        nameCn: '',
        nameEn: ''
      }
      if (this.$route.fullPath === '/myappdetail') {
        let detailData = JSON.parse(sessionStorage.getItem('myappdetail'))
        nameObj.nameCn = detailData.name + this.$t('common.detail')
        nameObj.nameEn = detailData.name + this.$t('common.detail')
        this.breadCrumbData.splice(2, 1, nameObj)
      } else if (this.$route.fullPath === '/detail') {
        let detailData = JSON.parse(sessionStorage.getItem('appstordetail'))
        nameObj.nameCn = detailData.name + this.$t('common.detail')
        nameObj.nameEn = detailData.name + this.$t('common.detail')
        this.breadCrumbData.splice(1, 1, nameObj)
      }
      if (this.breadCrumbData && this.breadCrumbData.length > 0) {
        this.isShow = true
        this.getNeedShowData()
      }
    }

  },
  mounted () {
    this.getBreadCrumbData()
  }
}
</script>
