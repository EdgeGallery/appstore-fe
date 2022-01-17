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
    class="senceDetail"
  >
    <div class="senceDetail_top">
      <img
        class="senceImg"
        :src="senceContents.imgSrc"
        alt=""
      >
      <div class="senceContent">
        <p class="senceTitle defaultFontLight">
          {{ senceContents.nameCn }}
        </p>
        <div class="senceLabel">
          <div
            class="oneLabel"
            v-for="(label,i ) in senceContents.label"
            :key="i"
          >
            <p class="oneLabel_line" />
            <p class="oneLabel_name defaultFontLight">
              {{ label.labelCn }}
            </p>
          </div>
        </div>
        <div class="senceImgs">
          <img
            class="oneImg"
            :src="senceContents.imgSrc"
            alt=""
          >
          <img
            class="oneImg"
            :src="senceContents.imgSrc"
            alt=""
          >
          <img
            class="oneImg"
            :src="senceContents.imgSrc"
            alt=""
          >
        </div>
      </div>
    </div>
    <div class="senceDetail_bottom common_background">
      <div class="introduce">
        <p class="title defaultFontLight">
          {{ senceContents.nameCn }}
        </p>
        <p class="content defaultFontLight">
          {{ introduce }}
        </p>
      </div>
      <div class="introduce">
        <p class="title sence_title defaultFontLight">
          应用场景
        </p>
        <p class="sence_content defaultFontLight">
          {{ appSence }}
        </p>
      </div>
      <div class="relevantApp">
        <p class="relevantApp_name defaultFontLight">
          相关应用
        </p>
        <div class="relevantApp_content">
          <div
            class="oneApp"
            v-for="(item ,index) in 3"
            :key="index"
          >
            <img
              class="oneApp_img"
              :src="senceContents.imgSrc"
              alt=""
            >
            <p
              class="oneApp_title"
              defaultFontLight
            >
              {{ appName }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { eventBus } from '../../tools/bus.js'
export default {
  name: 'SenceDetail',
  components: {
  },
  data () {
    return {
      senceContents: {
        imgSrc: require('../../assets/images/senceCase1.png'),
        nameCn: '5G移动',
        nameEn: '5G Mobile',
        label: [
          {
            labelCn: '生态环境',
            labelEn: 'Ecological environment'
          },
          {
            labelCn: '智慧工地',
            labelEn: 'Smart site'
          }
        ],
        describtionCn: '为解决智慧园区工地内网络差、通信难，加强施工现场质量与安全管理、降低事故发生频率、杜绝各种违规操作和不文明施工行为',
        describtionEn: 'In order to solve the poor network and difficult communication in the construction site of the smart Park, strengthen the quality and safety management of the construction site, reduce the frequency of accidents, and eliminate all kinds of illegal operations and uncivilized construction'
      },
      appName: '测试应用',
      introduce: '为解决小米智慧园区工地内网络差、通信难，加强施工现场质量与安全管理、降低事故发生频率、杜绝各种违规操作和不文明施工行为，客户提出工地智慧化建设诉求。5G智慧工地方案搭载人工智能、大数据、AR、VR等技术，通过定制化5G网络保障数据传输的实时、可靠，高清视频监控、AI安全管控、双360塔吊立体监控、人员定位、钢结构区块链、职业健康分析等功能模块助力工地提升管理效率与水平。',
      appSence: '1.定制化5G网络：搭建专属基站满足施工全生命周期各区域的网络覆盖，解决工地通信痛点难点问题<br> 2.双360塔吊立体监控：利用5G+高清摄像头+AI眼镜，实现720度监控，引入物联网传感器，实现塔吊防碰撞、数据异常及时预警等功能；<br> 3.5G移动巡检：巡检人员通过佩戴AI眼镜，实现核查现场工人信息、现场安全检查、问题抓怕等功能；<br> 4.5G远程协作：工作人员通过佩戴AI眼镜，可远程连线专家，进行语音、文字、视频交互，及时解决施工技术难题;<br> 5.AI安全预警：通过丰富的AI算法对工地内的监控画面进行实时分析，包括火焰和烟雾报警、周界防护、未戴安全帽、未穿反光衣等；<br> 6.钢结构区块链：搭建钢结构区块链信息管理平台，实现全生命周期各环节信息可信监管；<br> 7.人员定位：实现工地复杂环境下室内人员实时精准定位、轨迹追溯、危险预警等。'
    }
  },
  methods: {
    getSenceContent () {
      eventBus.$on('senceContent', function (val) {
        console.log(typeof (val))
      })
    }
  },
  computed: {
    ...mapState(['language'])
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.changeEnCn(this.language)
    }
  },
  mounted () {
    this.getSenceContent()
  }
}
</script>

<style lang="less">
  .senceDetail{
    width: 100%;
    color: #fff;
    min-width: 1200px;
    p{margin: 0;}
    .senceDetail_top{
      width: 76.08%;
      height: 260px;
      margin: 80px auto;
      display: flex;
      .senceImg{
        border-radius: 12px;
        width: 24.61%;
        margin-right: 3.3%;
      }
      .senceContent{
        width: 40.2%;
        .senceTitle{
          font-size: 28px;
          line-height: 60px;
        }
        .senceLabel{
          display: flex;
          .oneLabel{
            display: flex;
            width: 140px;
            margin-bottom: 10px;
            .oneLabel_line{
              width: 10px;
              height: 10px;
              position: relative;
              top:4px;
              left: 0;
              border-radius: 50%;
              background: #43F6AD;
              margin: 2% 8% 2% 0;
            }
            .oneLabel_name{
              font-size: 18px;
            }
          }
        }
        .senceImgs{
          display: flex;
          height: 144px;
          .oneImg{
            width: 32%;
            height: 100%;
            margin-right: 3.2%;
            border-radius: 12px;
          }
        }
        .senceImgs .oneImg:last-child{
          margin-right: 0;
        }
      }
    }
    .senceDetail_bottom{
      height: 800px;
      width: 76.08%;
      margin: 30px auto;
      padding: 50px 50px;
      border-radius: 24px;
      .introduce{
        .title{
          font-size: 20px;
          margin-bottom:20px ;
        }
        .sence_title{
          margin-top: 30px;
        }
        .content{
          text-indent: 2em;
          font-size: 16px;
        }
        .sence_content{
          font-size: 16px;
          line-height: 36px;
        }
      }
      .relevantApp{
        .relevantApp_name{
          font-size: 20px;
          margin: 20px 0;
        }
        .relevantApp_content{
          display: flex;
          .oneApp{
            margin-right: 40px;
            .oneApp_img{
              width: 100px;
              height: 100px;
              border-radius: 8px;
            }
            .oneApp_title{
              text-align: center;
              line-height: 48px;
            }
          }
        }
      }
    }
    @media (max-width: 1600px) and (min-width: 1200px) {
      .senceDetail_top{
        height: 180px;
        .senceContent{
          width: 40.2%;
          .senceTitle{
            font-size: 18px;
            line-height: 40px;
          }
          .senceLabel{
            .oneLabel{
              width: 100px;
              .oneLabel_line{
                width: 5px;
                height: 5px;
                position: relative;
                left: 0;
                top: 5px;
              }
              .oneLabel_name{
                font-size: 14px;
              }
            }
          }
          .senceImgs{
            height: 100px;
            .oneImg{
              border-radius: 8px;
            }
          }
          .senceImgs .oneImg:last-child{
            margin-right: 0;
          }
        }
      }
      .senceDetail_bottom{
        height: 640px;
        padding: 30px 30px;
        border-radius: 18px;
        .introduce{
          .title{
            font-size: 16px;
            margin-bottom:10px ;
          }
          .sence_title{
            margin-top: 20px;
          }
          .content{
            text-indent: 2em;
            font-size: 14px;
          }
          .sence_content{
            font-size: 14px;
            line-height: 30px;
          }
        }
        .relevantApp{
          .relevantApp_name{
            font-size: 16px;
          }
          .relevantApp_content{
            .oneApp{
              margin-right: 24px;
              .oneApp_img{
                width: 80px;
                height: 80px;
                border-radius: 6px;
              }
              .oneApp_title{
                font-size: 14px;
                line-height: 36px;
              }
            }
          }
        }
      }
    }
  }
</style>
