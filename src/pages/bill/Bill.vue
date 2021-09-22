<template>
  <div class="bill">
    <div class="title_top title_left defaultFontBlod clear">
      账单管理
      <span class="line_bot1" />
    </div>
    <div class="billContent">
      <div class="select_box">
        <el-select
          v-model="time"
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
              <div class="mark_chart">
                <div
                  class="name_label"
                  v-for="(item,index) in overallData"
                  :key="index"
                  :class="'name_label'+index"
                >
                  {{ item.label }}（元）
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
                  v-for="(item,index) in lastAppList"
                  :key="index"
                >
                  <div class="appname appname_last">
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
              <div class="mark_icon">
                <span class="mark_icon_label num">销售数量</span>
                <span class="mark_icon_label account">销售金额</span>
              </div>
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
          >
            <template slot-scope="scope">
              {{ scope.row.billFlag == 'OUT' ?'支出':'收入' }}
            </template>
          </el-table-column>
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
            label="入账费用"
          />
          <el-table-column
            prop="supplierFee"
            label="出账费用"
          />
          <el-table-column
            prop="createTime"
            label="刷新日期"
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
      time: '',
      billList: [
        {
          'billId': 'asd6-fer8-4hyn-8jkh',
          'orderId': 'No.20210910158976',
          'orderNum': 'No.20210910258976',
          'userId': 'abcd-edfr-ehyd-ssss',
          'userName': 'admin',
          'billUserId': 'uuu',
          'billUserName': 'Wenson',
          'appId': 'aaasssddd',
          'appName': '希迪智驾',
          'provider': '希迪',
          'createTime': '2021-10-24 01:00',
          'billFlag': 'OUT',
          'billAmount': 47500.00,
          'operatorFee': 230.00,
          'supplierFee': 123.00
        },
        {
          'billId': 'asd6-fer8-4hyn-8jkh',
          'orderId': 'No.20210910158976',
          'orderNum': 'No.20210910258976',
          'userId': 'abcd-edfr-ehyd-ssss',
          'userName': 'admin',
          'billUserId': 'uuu',
          'billUserName': 'Wenson',
          'appId': 'aaasssddd',
          'appName': '云讯智能车牌识别系统',
          'provider': '云讯',
          'createTime': '2021-10-24 01:00',
          'billFlag': 'OUT',
          'billAmount': 368000.00,
          'operatorFee': 230.00,
          'supplierFee': 123.00
        },
        {
          'billId': 'asd6-fer8-4hyn-8jkh',
          'orderId': 'No.20210910158976',
          'orderNum': 'No.20210910258976',
          'userId': 'abcd-edfr-ehyd-ssss',
          'userName': 'admin',
          'billUserId': 'uuu',
          'billUserName': 'Wenson',
          'appId': 'aaasssddd',
          'appName': '安恒WAF',
          'provider': '安恒',
          'createTime': '2021-10-24 01:00',
          'billFlag': 'OUT',
          'billAmount': 30000.00,
          'operatorFee': 230.00,
          'supplierFee': 123.00
        },
        {
          'billId': 'asd6-fer8-4hyn-8jkh',
          'orderId': 'No.20210910158976',
          'orderNum': 'No.20210910258976',
          'userId': 'abcd-edfr-ehyd-ssss',
          'userName': 'admin',
          'billUserId': 'uuu',
          'billUserName': 'Wenson',
          'appId': 'aaasssddd',
          'appName': '河图应用',
          'provider': '华为',
          'createTime': '2021-10-24 01:00',
          'billFlag': 'OUT',
          'billAmount': 20002.00,
          'operatorFee': 230.00,
          'supplierFee': 123.00
        }
      ],
      overallData: [
        {
          'value': 200000.00,
          'label': '收入'
        },
        {
          'value': 80000.00,
          'label': '支出'
        }
      ],
      userId: sessionStorage.getItem('userId'),
      topAppList: [
        {
          'appId': '',
          'appName': '安恒WAF',
          'saleAmount': 20000.00,
          'saleCount': 20
        },
        {
          'appId': '',
          'appName': '希迪智驾',
          'saleAmount': 15000.00,
          'saleCount': 16
        },
        {
          'appId': '',
          'appName': '云讯智能车牌识别系统',
          'saleAmount': 3000.00,
          'saleCount': 9
        },
        {
          'appId': '',
          'appName': '工厂物语',
          'saleAmount': 1800.00,
          'saleCount': 8
        },
        {
          'appId': '',
          'appName': '魔幻相机',
          'saleAmount': 1500.00,
          'saleCount': 5
        }
      ],
      lastAppList: [
        {
          'appId': '',
          'appName': 'Zoneminder',
          'saleAmount': 0.00,
          'saleCount': 1
        },
        {
          'appId': '',
          'appName': 'Wordpress',
          'saleAmount': 0.00,
          'saleCount': 1
        },
        {
          'appId': '',
          'appName': 'Suduku',
          'saleAmount': 0.00,
          'saleCount': 2
        },
        {
          'appId': '',
          'appName': 'Cuber',
          'saleAmount': 0.00,
          'saleCount': 2
        },
        {
          'appId': '',
          'appName': '爱消除',
          'saleAmount': 0.00,
          'saleCount': 5
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
        let data = res.data
        for (let i in data) {
          let obj = {}
          obj.value = data(i)
          obj.label = i
          this.overallData.push(obj)
        }
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
          { // 上半截柱子
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
        height: 425px;
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
  .appname_last{
    background: url('../../assets/images/star_last_icon.png') no-repeat left;
  }
  .bill_chart{
    width: 100%;
    height: 100%;
  }
  .mark_chart{
    height: 40px;
    display: flex;
    justify-content: left;
    font-size: 12px;
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
      top: 2px;
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
    .mark_icon{
      height: 40px;
      margin: 5px 0;
    }
    .mark_icon_label::before{
      content:'';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      position: relative;
      top: 2px;
    }
    .num::before{
      background: #34aaf5;
    }
    .account::before{
      background: #fd8241;
    }
  }
</style>
