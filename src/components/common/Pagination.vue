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
  <div class="my-pagination">
    <el-pagination
      background
      class="rt"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="pageSizeArr"
      :page-size="pageSize"
      layout="slot, sizes, prev, pager, next, jumper"
      :total="totalNum"
    >
      <span class="page-total">{{ $t('common.pageTotalNum') }} : {{ totalNum }}</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      required: true,
      type: Array
    },
    size: {
      type: Number,
      default: 12
    },
    currentPageProp: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      totalNum: 0,
      currentPage: this.currentPageProp,
      data: [],
      pageSize: 12
    }
  },
  watch: {
    tableData (val) {
      console.log(val)
      this.data = val
      console.log(this.data)
      this.totalNum = val.length
      // this.handleCurrentPageChange(this.currentPage)
      let page = sessionStorage.getItem('currentPage') ? Number(sessionStorage.getItem('currentPage')) : 1
      this.handleCurrentPageChange(page)
    },
    size (val) {
      this.handlePageSizeChange(val * 2)
    }
  },
  computed: {
    pageSizeArr () {
      let arr = []
      for (let i = 1; i < 4; i++) {
        let size = i * this.size
        arr.push(size)
      }
      return arr
    }
  },
  methods: {
    handlePageSizeChange (val) {
      this.pageSize = val
      this.returnTableData()
    },
    handleCurrentPageChange (val) {
      this.currentPage = val
      sessionStorage.setItem('currentPage', this.currentPage)
      this.returnTableData()
    },
    returnTableData () {
      let start = (this.currentPage - 1) * this.pageSize
      let end = this.currentPage * this.pageSize
      let currentPageData = this.data.slice(start, end)
      console.log(currentPageData)
      this.$emit('getCurrentPageData', currentPageData, this.pageSize, start)
    }
  },
  beforeMount () {
    this.currentPage = sessionStorage.getItem('currentPage') ? Number(sessionStorage.getItem('currentPage')) : 1
  }
}

</script>
<style lang="less" scoped>
.page-total{
  color: #606266;
  font-weight: normal;
}
</style>
