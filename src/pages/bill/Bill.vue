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
  <div
    class="bill"
    v-loading="loading"
    :element-loading-text="$t('common.loading')"
  >
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('bill.billMana') }}
      <span class="line_bot1" />
    </div>
    <div class="billContent">
      <div class="select_box">
        <el-select
          v-model="time"
          :placeholder="$t('common.choose')"
          class="timeSelect"
          @change="handleChangeTime"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="top_content">
        <el-row :gutter="10">
          <el-col :span="8">
            <div
              id="chart1"
              class="chart"
            >
              <div class="chart_top">
                <span class="chart_title">{{ $t('bill.overall') }}</span>
              </div>
              <div
                id="billChart"
                class="bill_chart"
              />
              <div class="mark_chart">
                <div
                  class="name_label"
                  v-for="(item,index) in overallData"
                  :key="index"
                  :class="'name_label'+index"
                >
                  {{ item.label }}{{ $t('bill.yuan') }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div
              id="chart2"
              class="chart"
            >
              <div class="chart_top">
                <span class="chart_title">{{ $t('bill.sales') }}</span>
                <el-switch
                  v-model="sortType"
                  :active-text="$t('bill.count')"
                  :inactive-text="$t('bill.amount')"
                  class="rt"
                  active-color="#34aaf5"
                  inactive-color="#fd8241"
                  active-value="SaleCount"
                  inactive-value="SaleAmount"
                  @change="sortTypeChanged"
                />
              </div>
              <el-col :span="12">
                <div class="chart_sub_title">
                  Top5
                </div>
                <div
                  class="top_list_content"
                  v-for="(item,index) in topSaleAppDataList"
                  :key="index"
                >
                  <div class="appname">
                    {{ (index+1) +'.'+item.appName }}
                  </div>
                  <div>
                    <el-progress
                      type="line"
                      :percentage="item.saleCount"
                      :format="formatCount(item.saleCount)"
                      v-if="sortType==='SaleCount'"
                      class="el-bg-inner-count"
                    />
                    <el-progress
                      type="line"
                      :percentage="item.saleAmount/1000"
                      :format="formatAmount(item.saleAmount)"
                      v-if="sortType==='SaleAmount'"
                      class="el-bg-inner-amount"
                    />
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="chart_sub_title">
                  Last5
                </div>
                <div
                  class="top_list_content"
                  v-for="(item,index) in lastSaleAppDataList"
                  :key="index"
                >
                  <div class="appname appname_last">
                    {{ (index+1) +'.'+item.appName }}
                  </div>
                  <el-progress
                    type="line"
                    :percentage="item.saleCount"
                    :format="formatCount(item.saleCount)"
                    v-if="sortType==='SaleCount'"
                    class="el-bg-inner-count"
                  />
                  <el-progress
                    type="line"
                    :percentage="item.saleAmount/1000"
                    :format="formatAmount(item.saleAmount)"
                    v-if="sortType==='SaleAmount'"
                    class="el-bg-inner-amount"
                  />
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="bottom_content">
        <el-table
          class="tableStyle"
          :data="billList"
        >
          <template slot="empty">
            <div>
              <img
                src="../../assets/images/empty.png"
                alt=""
                style="padding: 10px;"
              >
              <p>{{ $t('common.noData') }}</p>
            </div>
          </template>
          <el-table-column
            prop="createTime"
            width="200"
            :label="$t('bill.billTime')"
          />
          <el-table-column
            v-if="isAdmin"
            prop="billUserName"
            :label="$t('bill.billUserName')"
          />
          <el-table-column
            prop="orderNum"
            :label="$t('order.orderNum')"
          />
          <el-table-column
            prop="orderUserName"
            :label="$t('bill.orderUserName')"
          />
          <el-table-column
            prop="appName"
            :label="$t('bill.appName')"
          />
          <el-table-column
            prop="provider"
            :label="$t('bill.provider')"
          />
          <el-table-column
            prop="billType"
            :label="$t('bill.type')"
          >
            <template slot-scope="scope">
              {{ scope.row.billType == 'OUT' ? $t('bill.expenditure') : $t('bill.income') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="billAmount"
            :label="$t('bill.billAmount')"
          />
          <el-table-column
            :label="$t('bill.billAmountDesc')"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.billType==='IN'"
              >
                {{ convertSubTypeOfInType(scope.row.billSubType) }}
              </span>
              <span v-else>
                {{ $t('bill.supplierFee') + ': ' + scope.row.supplierFee + ' + ' + $t('bill.operatorFee') + ': ' + scope.row.operatorFee }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBar">
          <el-pagination
            background
            class="rt"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page="pageCtrl.currentPage"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pageCtrl.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCtrl.totalNum"
            v-if="pageCtrl.totalNum!=0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { subscribe } from '../../tools/api.js'
import { common } from '../../tools/comon.js'
import echarts from 'echarts'
export default {
  data () {
    return {
      options: [
        {
          value: '7',
          label: '近一周'
        },
        {
          value: '30',
          label: '近一月'
        },
        {
          value: '180',
          label: '近半年'
        },
        {
          value: '360',
          label: '近一年'
        }
      ],
      time: '7',
      timeRangeCtrl: {
        startTime: '',
        endTime: ''
      },
      pageCtrl: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      billList: [],
      overallData: [],
      isAdmin: sessionStorage.getItem('userName') === 'admin',
      topSaleAppDataList: [],
      lastSaleAppDataList: [],
      sortType: 'SaleCount',
      loading: true
    }
  },
  mounted () {
    this.refreshOnTimeChange()
  },
  methods: {
    handleChangeTime () {
      this.refreshOnTimeChange()
    },
    refreshOnTimeChange () {
      let _currTime = new Date().getTime()
      this.timeRangeCtrl.startTime = common.formatDate(_currTime - this.time * 24 * 3600 * 1000)
      this.timeRangeCtrl.endTime = common.formatDate(_currTime)

      this.getOverallData()
      this.getTopSaleAppList('DESC', this.sortType)
      this.getTopSaleAppList('ASC', this.sortType)

      this.pageCtrl.currentPage = 1
      this.getBillsList()
    },
    handlePageSizeChange (val) {
      this.pageCtrl.currentPage = 1
      this.pageCtrl.pageSize = val
      this.getBillsList()
    },
    handleCurrentPageChange (val) {
      this.pageCtrl.currentPage = val
      this.getBillsList()
    },
    formatCount (val) {
      return () => {
        return val + '个'
      }
    },
    formatAmount (val) {
      return () => {
        return val / 10000 + '万元'
      }
    },
    getBillsList () {
      let param = {
        'startTime': this.timeRangeCtrl.startTime,
        'endTime': this.timeRangeCtrl.endTime,
        'queryCtrl': {
          'offset': (this.pageCtrl.currentPage - 1) * this.pageCtrl.pageSize,
          'limit': this.pageCtrl.pageSize,
          'sortItem': 'CREATETIME',
          'sortType': 'DESC'
        }
      }
      subscribe.getBillsList(param).then(res => {
        this.billList = res.data.results
        this.pageCtrl.totalNum = res.data.total
        this.loading = false
      })
    },
    getOverallData () {
      let param = {
        'startTime': this.timeRangeCtrl.startTime,
        'endTime': this.timeRangeCtrl.endTime
      }
      this.overallData = []
      subscribe.getOverAllData(param).then(res => {
        let obj = {}
        obj.value = res.data.data.incomeNum
        obj.label = this.$t('bill.income')
        this.overallData.push(obj)
        let obj1 = {}
        obj1.value = res.data.data.expendNum
        obj1.label = this.$t('bill.expenditure')
        this.overallData.push(obj1)
        this.regAndSetOption()
      })
    },
    sortTypeChanged (val) {
      this.getTopSaleAppList('DESC', val)
      this.getTopSaleAppList('ASC', val)
    },
    getTopSaleAppList (sortType, topCriterion) {
      let param = {
        'startTime': this.timeRangeCtrl.startTime,
        'endTime': this.timeRangeCtrl.endTime,
        'sortType': sortType,
        'topNum': 5,
        'topCriterion': topCriterion
      }
      subscribe.getTopSaleApps(param).then(res => {
        if (sortType === 'DESC') {
          this.topSaleAppDataList = res.data.data
        } else {
          this.lastSaleAppDataList = res.data.data
        }
      })
    },
    regAndSetOption (data) {
      var barBotColors = ['#05aefd', '#fd74ea', '#ffcc01']
      let barTopColors = ['#31beff', '#ff94f0', '#ffea01']
      let seriesData = []
      let xAxisData = []
      this.overallData.map((item) => {
        seriesData.push(item.value)
        xAxisData.push(item.label)
      })
      let option = {
        tooltip: {
          trigger: 'item'
        },
        grid: {
          left: 0,
          bottom: 100
        },
        xAxis: {
          data: xAxisData,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false,
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 12
            },
            margin: 26
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#fff',
              fontSize: 16
            }
          }
        },
        series: [
          {
            type: 'pictorialBar',
            symbolSize: [25, 10],
            symbolOffset: [0, -5],
            itemStyle: {
              normal: {
                color: function (params) {
                  return barTopColors[params.dataIndex]
                }
              }
            },
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              fontWeight: 'bold',
              itemStyle: {
                normal: {
                  color: function (params) {
                    return barBotColors[params.dataIndex]
                  }
                }
              },
              formatter: function (params, index) {
                return params.value
              }
            },
            symbolPosition: 'end',
            data: seriesData
          },
          {
            type: 'pictorialBar',
            symbolSize: [25, 10],
            symbolOffset: [0, 5],
            z: 11,
            itemStyle: {
              normal: {
                color: function (params) {
                  return barBotColors[params.dataIndex]
                }
              }
            },
            data: seriesData
          },
          {
            type: 'bar',
            barWidth: 24,
            barGap: '-100%',
            z: 0,
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.dataIndex === 0) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                      {
                        offset: 0,
                        color: '#6b4eeb'
                      },
                      {
                        offset: 1,
                        color: '#05aefd'
                      }
                    ])
                  } else if (params.dataIndex === 1) {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                      {
                        offset: 0,
                        color: '#fd74ea'
                      },
                      {
                        offset: 1,
                        color: '#fd74ea'
                      }
                    ])
                  } else {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                      {
                        offset: 0,
                        color: '#ff7802'
                      },
                      {
                        offset: 1,
                        color: '#ffcc01'
                      }
                    ])
                  }
                }
              }
            },
            data: this.overallData
          },
          {
            type: 'pictorialBar',
            symbolSize: [52, 16],
            symbolOffset: [0, 11],
            z: 0,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#3ACDC5',
                borderWidth: 2
              }
            },
            data: [1, 1, 1]
          }, {
            type: 'pictorialBar',
            symbolSize: [72, 22],
            symbolOffset: [0, 17],
            z: 0,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#02c3f1',
                borderWidth: 2
              }
            },
            data: [1, 1, 1]
          }
        ]
      }
      let myChart = echarts.init(document.getElementById('billChart'))
      myChart.setOption(option)
    },
    convertSubTypeOfInType (billSubType) {
      if (billSubType === 'OPERATOR') {
        return this.$t('bill.operatorIncome')
      } else if (billSubType === 'APPSUPPLY') {
        return this.$t('bill.supplierIncome')
      } else {
        return this.$t('bill.operatorIncome')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .bill{
    padding: 0 13%;
  }
  .billContent{
      background: #ffffff;
      border-radius: 20px;
      padding: 30px 60px;
      min-height: 500px;
      position: relative;
    }
    .select_box{
      margin-bottom: 25px;
      .timeSelect{
        width: 150px;
      }
    }
    .top_content{
      margin-bottom: 25px;
      .chart{
        height: 465px;
        border: 1px solid #dddddd;
        background: #2b137e;
        border-radius: 16px;
        padding: 20px;
      }
      .chart_top{
        height: 35px;
        color: #ffffff;
        .chart_title{
          font-size: 20px;
        }
      }
      .chart_sub_title{
        font-size: 18px;
        color: #ffffff;
        padding-bottom: 15px;
      }
    }
  .el-progress-bar__inner{
    background-color: unset!important;
    background-image: linear-gradient(to right,#34aaf5,#00f8ff ) !important;
  }
  .appname{
    height: 30px;
    line-height: 30px;
    color: #fff;
    background: url('../../assets/images/star_icon.png') no-repeat left;
    padding-left: 25px;
  }
  .appname_last{
    background: url('../../assets/images/star_last_icon.png') no-repeat left;
  }
  .bill_chart{
    width: 100%;
    height: 100%;
  }
  .mark_chart{
    height: 40px;
    line-height: 40px;;
    display: flex;
    justify-content: left;
    font-size: 16px;
    color:#ffffff;
    position: relative;
    top: -70px;
    left: 20px;
    .name_label{
      margin-right: 15px;
    }
    .name_label::before{
      content:'';
      display: inline-block;
      width: 4px;
      height: 12px;
      border-radius: 12px;
      position: relative;
      top: 1px;
    }
    .name_label0::before{
      background: #05aefd;
    }
    .name_label1::before{
      background: #fd74ea;
    }
    .name_label2::before{
      background: #ffcc01;
    }
  }
  .mark_icon_label{
    height: 32px;
    color: #fff;
  }
  .mark_icon_label::before{
    content:'';
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    position: relative;
    top: 2px;
  }
  .num::before{
    background: #34aaf5;
    margin: 0 8px 0 5px;
  }
  .account::before{
    background: #fd8241;
    margin: 0 8px 0 30px;
  }
  .mark_icon{
    height: 40px;
    line-height: 40px;
    margin: 5px 0;
  }
</style>
