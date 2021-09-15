<template>
  <div class="bill">
    <div class="title_top title_left defaultFontBlod clear">
      账单管理
      <span class="line_bot1" />
    </div>
    <div class="billContent">
      <div class="select_box">
        <el-select
          v-model="value"
          placeholder="请选择"
          class="timeSelect"
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
                <span class="chart_title">整体收支情况</span>
              </div>
              <div
                id="billChart"
                class="bill_chart"
              />
            </div>
          </el-col>
          <el-col :span="16">
            <div
              id="chart2"
              class="chart"
            >
              <div class="chart_top">
                <span class="chart_title">应用销售情况</span>
              </div>
              <el-col :span="12">
                <div class="chart_sub_title">
                  Top5
                </div>
                <div
                  class="top_list_content"
                  v-for="(item,index) in topAppList"
                  :key="index"
                >
                  <div class="appname">
                    {{ (index+1) +'.'+item.appName }}
                  </div>
                  <el-progress
                    :percentage="item.saleCount"
                    color="#34aaf5"
                    :format="formatCount(item.saleCount)"
                  />
                  <el-progress
                    :percentage="item.saleAmount/1000"
                    color="#fde166"
                    :format="formatAmount(item.saleAmount)"
                  />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="chart_sub_title">
                  Last5
                </div>
                <div
                  class="top_list_content"
                  v-for="(item,index) in topAppList"
                  :key="index"
                >
                  <div class="appname">
                    {{ (index+1) +'.'+item.appName }}
                  </div>
                  <el-progress
                    :percentage="item.saleCount"
                    color="#34aaf5"
                    :format="formatCount(item.saleCount)"
                  />
                  <el-progress
                    :percentage="item.saleAmount/1000"
                    color="#fde166"
                    :format="formatAmount(item.saleAmount)"
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
            prop="appName"
            label="应用名称"
          />
          <el-table-column
            prop="provider"
            label="厂商"
          />
          <el-table-column
            prop="billFlag"
            label="类型"
          />
          <el-table-column
            prop="userName"
            label="用户名"
          />
          <el-table-column
            prop="billAmount"
            label="账单金额"
          />
          <el-table-column
            prop="operatorFee"
            label="出账费用（运营商）"
          />
          <el-table-column
            prop="supplierFee"
            label="出账费用（供应商）"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { subscribe } from '../../tools/api.js'
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
      billList: [
        {
          'billId': '',
          'orderId': '',
          'orderNum': '',
          'userId': '',
          'userName': '',
          'billUserId': '',
          'billUserName': '',
          'appId': '',
          'appName': '',
          'provider': '',
          'createTime': '',
          'billFlag': '',
          'billAmount': 353.00,
          'operatorFee': 230.00,
          'supplierFee': 123.00
        }
      ],
      overallData: {
        'incomeNum': 2000.00,
        'expendNum': 1000.00
      },
      userId: sessionStorage.getItem('userId'),
      topAppList: [
        {
          'appId': '',
          'appName': 'asdf',
          'saleAmount': 20000.00,
          'saleCount': 5
        },
        {
          'appId': '',
          'appName': 'asdf',
          'saleAmount': 15000.00,
          'saleCount': 6
        }
      ]
    }
  },
  mounted () {
    // this.getOverallData()
    // this.getTopAppList()
    // this.getBillList()
    this.regAndSetOption()
  },
  methods: {
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
        'startTime': '',
        'endTime': '',
        'queryCtrl': {
          'offset': 0,
          'limit': 20,
          'sortItem': 'CREATETIME',
          'sortType': 'DESC'
        }
      }
      subscribe.getBills(this.userId, param).then(res => {
        this.billList = res.data
      })
    },
    getOverallData () {
      let param = {
        'startTime': '',
        'endTime': ''
      }
      subscribe.getoverallData(this.userId, param).then(res => {
        console.log(res)
      })
    },
    getTopAppList () {
      let param = {
        'startTime': '',
        'endTime': '',
        'sortType': 'DESC',
        'topNum': 5,
        'topCriterion': 'SaleAmount'
      }
      subscribe.getTopApps(this.userId, param).then(res => {
        this.topAppList = res.data
      })
    },
    regAndSetOption (data) {
      var chartdata = [
        {
          value: '100',
          label: '南越'
        },
        {
          value: '100',
          label: '南越'
        },
        {
          value: '100',
          label: '南越'
        }
      ]
      var barBotColors = ['#6b4eeb', '#fd74ea', '#ff7802']
      let barTopColors = ['#31beff', '#ff94f0', '#ffea01']
      let seriesData = []
      let xAxisData = []
      chartdata.map((item) => {
        seriesData.push(item.value)
        xAxisData.push(item.label)
      })
      let option = {
        tooltip: {
          trigger: 'item'
        },
        grid: {
          left: 0,
          bottom: 80
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
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 16
            },
            margin: 26 // 刻度标签与轴线之间的距离。
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
            name: '柱顶部',
            type: 'pictorialBar',
            symbolSize: [25, 10],
            symbolOffset: [0, -5],
            z: 16,
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
            name: '柱底部',
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
          { // 上半截柱子
            name: '2019',
            type: 'bar',
            barWidth: 24,
            barGap: '-100%',
            z: 0,
            itemStyle: {
              normal: {
                color: function (params) {
                  return barBotColors[params.dataIndex]
                }
              }
            },
            data: chartdata
          },
          {
            name: '第一圈',
            type: 'pictorialBar',
            symbolSize: [52, 16],
            symbolOffset: [0, 11],
            z: 2,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#3ACDC5',
                borderWidth: 2
              }
            },
            data: [1, 1, 1]
          }, {
            name: '第二圈',
            type: 'pictorialBar',
            symbolSize: [72, 22],
            symbolOffset: [0, 17],
            z: 10,
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
    }
  }
}
</script>

<style lang="less" scoped>
  .bill{
    padding: 0 13%;
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
        height: 300px;
        border: 1px solid #dddddd;
        background: #2b137e;
        border-radius: 16px;
        padding: 20px;
      }
      .chart_top{
        height: 50px;
        color: #ffffff;
        .chart_title{
          font-size: 20px;
        }
      }
      .chart_sub_title{
        font-size: 18px;
        color: #ffffff;
      }
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
  .bill_chart{
    width: 100%;
    height: 100%;
  }
</style>
