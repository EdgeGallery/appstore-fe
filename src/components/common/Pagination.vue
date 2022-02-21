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
  <div class="my-paginations">
    <el-pagination
      background
      class="page rt"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="pageSizeArr"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper, total"
      :total="totalNum"
      id="pagination"
    />
    <el-pagination
      background
      class="page-small rt"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      layout="prev, pager, next"
      :total="totalNum"
      id="pagination"
      :page-size="pageSize"
      :pager-count="5"
    />
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
      default: 15
    },
    currentPageProp: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      totalNum: 0,
      currentPage: this.currentPageProp,
      data: [],
      pageSize: 15
    }
  },
  watch: {
    tableData (val) {
      this.data = val
      let page = sessionStorage.getItem('currentPage') ? Number(sessionStorage.getItem('currentPage')) : 1
      this.handleCurrentPageChange(page)
    },
    size (val) {
      this.handlePageSizeChange(val * 2)
    },
    total (val) {
      this.totalNum = val
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
      this.$emit('getCurrentPageData', this.data, this.pageSize, start)
    }
  },
  beforeMount () {
    this.currentPage = sessionStorage.getItem('currentPage') ? Number(sessionStorage.getItem('currentPage')) : 1
  }
}

</script>
<style lang="less">
.my-paginations{
  padding: 40px 50px;
  .page-small{
    display: none;
  }
  .el-pagination__total{
    color:#fff;
    margin-left: 10px;
  }
  .el-pagination__jump{
    color: #fff;
    margin: 0;
  }
  .el-pagination__sizes{
    margin: 0;
  }
  .el-pagination__editor.el-input{
    width: 32px;
    margin:0 6px ;
  }
  .el-select .el-input--suffix .el-input__inner{
    background: rgba(46, 20, 124, 0.7);
    border: 1px solid #4D2DA8;
    height: 24px;
    line-height: 24px;
    color: #fff !important;
  }
  .el-pagination__editor.el-input .el-input__inner {
    height: 24px;
    background: none;
    color: #fff;
    border: 1px solid #4D2DA8;
  }
  .btn-prev .el-icon, .el-pagination .btn-next .el-icon {
    color: #fff !important;
    font-weight: lighter;
  }
  .el-pagination.is-background .el-pager li{
    background:none ;
    color: #fff;
    font-size: 14px;
    min-width: 20px !important;
    height: 20px;
    line-height: 20px;
    margin-top: 4px;
  }
  .el-pagination.is-background .el-pager .number:not(.disabled).active{
    background-color: #fff ;
    color: #4D2DA8;
  }
  .el-select .el-icon-arrow-up:before {
    position: relative;
    top: 0px;
    background:none !important ;
    color: #fff !important;
  }
  @media screen and (max-width: 767px){
    .page{
      display: none;
    }
    .page-small{
      display: block;
    }
  }
}
</style>
