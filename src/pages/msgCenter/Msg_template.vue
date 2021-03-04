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
    class="box"
    ref="box"
  >
    <div class="leftMsg">
      <div class="leftMsgInner">
        <ul>
          <li>
            <div
              :class="activeValue===1?'selectTimeDivStyle':'timeDivStyle'"
              @click="doClick(1)"
            >
              <img
                :src="language === 'cn'?dayMsg:enDayMsg"
                class="imgMsgStyle"
                alt=""
              >
              <div class="timeFontStyle">
                <span>{{ $t('messageCenter.msgToday') }}</span>
              </div>
            </div>
          </li>
          <li>
            <div
              :class="activeValue===2?'selectTimeDivStyle':'timeDivStyle'"
              @click="doClick(2)"
            >
              <img
                :src="language === 'cn'?weekMsg:enWeekMsg"
                class="imgMsgStyle"
                alt=""
              >
              <div class="timeFontStyle">
                <span>{{ $t('messageCenter.msgWeek') }}</span>
              </div>
            </div>
          </li>
          <li>
            <div
              :class="activeValue===3?'selectTimeDivStyle':'timeDivStyle'"
              @click="doClick(3)"
            >
              <img
                :src="language === 'cn'?monthMsg:enMonthMsg"
                class="imgMsgStyle"
                alt=""
              >
              <div class="timeFontStyle">
                <span>{{ $t('messageCenter.msgMonth') }}</span>
                <div />
              </div>
            </div>
          </li>
          <li>
            <div
              :class="activeValue===4?'selectTimeDivStyle':'timeDivStyle'"
              @click="doClick(4)"
            >
              <img
                :src="moreMsg"
                class="imgMoreMsgStyle"
                alt=""
              >
              <div class="timeFontStyle">
                <span>{{ $t('messageCenter.msgOld') }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="rightMsg"
      v-if="!isShowDlg"
    >
      <RightContent
        v-if="hackReset"
        @clickMsgItemEvent="getDetailMsg"
        @isShowDetailMsgDlg="isShowDetailDlg"
        :data="rightDetailData"
      />
    </div>
    <div
      class="rightMsg"
      v-else
    >
      <DetailMsgDlg
        :data="currentDetailMsg"
        @isShowDetailMsgDlg="isShowDetailDlg"
      />
    </div>
  </div>
</template>

<script>
import RightContent from './Right_template'
import DetailMsgDlg from './DetailMsgDlg'
import dayMsg from '@/assets/images/dayMsg.png'
import weekMsg from '@/assets/images/weekMsg.png'
import monthMsg from '@/assets/images/monthMsg.png'
import enDayMsg from '@/assets/images/enDayMsg.png'
import enWeekMsg from '@/assets/images/enWeekMsg.png'
import enMonthMsg from '@/assets/images/enMonthMsg.png'
import moreMsg from '@/assets/images/moreMsg.png'
import { getAppdownAnaApiByType, updateStatus, acceptMsg, deleteMsg } from '../../tools/api.js'
export default {
  components: {
    RightContent,
    DetailMsgDlg
  },
  data () {
    return {
      dayMsg: dayMsg,
      weekMsg: weekMsg,
      monthMsg: monthMsg,
      enDayMsg: enDayMsg,
      enWeekMsg: enWeekMsg,
      enMonthMsg: enMonthMsg,
      moreMsg: moreMsg,
      hackReset: true,
      activeValue: 1,
      currentDetailMsg: {},
      isShowDlg: false,
      allData: [],
      allRightDetailData: [],
      language: localStorage.getItem('language'),
      rightDetailData: [
        {
          name: 'unReadedMsg',
          title: 'unReadedMsg',
          content: []
        },
        {
          name: 'readedMsg',
          title: 'readedMsg',
          content: []
        },
        {
          name: 'allMsg',
          title: 'allMsg',
          content: []
        }
      ]
    }
  },
  methods: {
    getDataBySelectTime () {

    },
    getDetailMsg (value) {
      this.currentDetailMsg = value
    },
    isShowDetailDlg (value) {
      this.isShowDlg = value
    },
    doClick (value) {
      this.activeValue = value
      this.setCurrentTimeData(value)
    },
    setCurrentTimeData (value) {
      this.rightDetailData[0].content = []
      this.rightDetailData[1].content = []
      this.rightDetailData[2].content = []
      this.allRightDetailData.forEach(item => {
        if (item.timeResult === this.activeValue) {
          if (item.readed) {
            this.rightDetailData[1].content.push(item)
          } else {
            this.rightDetailData[0].content.push(item)
          }
          this.rightDetailData[2].content.push(item)
        }
      })
    },
    updateMsgStatus (messageId) {
      updateStatus(messageId).then((res) => {
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.acceptFailed'),
          type: 'warning'
        })
      })
    },
    locateMessage (message) {
      // 根据messge获取index并激活该index
      for (let i = 0; i < this.allRightDetailData.length; i++) {
        if (message.messageId === this.allRightDetailData[i].messageId) {
          this.isShowDlg = true
          this.currentDetailMsg = message
          break
        }
      }
      this.currentDetailMsg.readed = true
      this.updateMsgStatus(message.messageId)
    },
    handleAccept (index) {
      acceptMsg(this.msgs[index].messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.acceptSuccess'))
      }).catch((error) => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.acceptFailed') + error.response.data.message,
          type: 'warning'
        })
      })
    },
    handleDelete (index) {
      setTimeout(() => {
        deleteMsg(this.msgs[index].messageId).then((res) => {
          this.$message.success(this.$t('apppromotion.deleteMsgSuccess'))
          this.$router.go(0)
        }).catch((error) => {
          this.$message({
            duration: 2000,
            message: this.$t('apppromotion.deleteMsgFailed') + error.response.data.message,
            type: 'warning'
          })
        })
      }, 500)
    },
    timeCompute (time) {
      var today = new Date()
      var todayTime = today.getTime() % (1000 * 60 * 60 * 24)
      var offset = new Date(time).getTime() - today.getTime()
      var dateTime = offset + todayTime
      if (dateTime >= 0 && dateTime < 1000 * 60 * 60 * 24) {
        return 1
      } else if (dateTime < 0 && dateTime / (1000 * 60 * 60 * 24) >= -7) {
        return 2
      } else if (dateTime / (1000 * 60 * 60 * 24) < -7 && dateTime / (1000 * 60 * 60 * 24) >= -30) {
        return 3
      } else {
        return 4
      }
    },
    getAppData (param) {
      getAppdownAnaApiByType().then((res) => {
        let data = res.data
        data.forEach(item => {
          item.timeResult = this.timeCompute(item.time)
          this.allRightDetailData.push(item)
        })
        // 默认是选中今天数据
        this.allRightDetailData.forEach(item => {
          if (item.timeResult === 1) {
            if (item.readed) {
              this.rightDetailData[1].content.push(item)
            } else {
              this.rightDetailData[0].content.push(item)
            }
            this.rightDetailData[2].content.push(item)
          }
        })
      }).catch((err) => {
        if (err.response.data.code === 403) {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.guestUser'),
            type: 'warning'
          })
          this.handleClose()
        } else {
          this.$message({
            duration: 2000,
            message: this.$t('apppromotion.getNoticeFailed'),
            type: 'warning'
          })
        }
      })
    }

  },
  mounted () {
    let param = this.$route.query.item
    this.getAppData(param)
  },
  watch: {
    '$route': function (to, from) {
      console.log(to.query.item.messageId)
      this.locateMessage(to.query.item)
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>

<style lang="less">
.box {
  width: 80%;
  min-width: 1500px;
  height: 100%;
  background:#ffffff;
  margin:0px auto;

}
.leftMsg{
  width: 25%;
  background: #ffffff;
  float: left;
  padding:0 12px;
  overflow-y: auto;
  display: inline-block;
  height:100%;
  .leftMsgInner {
    height:70%;
    float: left;
    margin-top: 20px;
    padding:0 12px;
    overflow-y: auto;
    display: inline-block;
    .timeDivStyle {
      width: 280px;
      height: 60px;
      margin-left: 40px;
      margin-top: 10px;
      overflow: hidden;
      cursor: pointer;
      .imgMsgStyle {
        float: left;
        margin-left: 10px;
        margin-top: 12px;
        width: 32px;
        height: 32px;
      }
      .imgMoreMsgStyle {
        float: left;
        margin-top: 27px;
        margin-left: 13px;
      }
      .timeFontStyle {
        margin-left: 70px;
        margin-top: 20px;
      }
    }
    .selectTimeDivStyle {
      width: 280px;
      height: 60px;
      margin-left: 40px;
      margin-top: 10px;
      overflow: hidden;
      cursor: pointer;
      background:#E0E3E3;
      .imgMsgStyle {
        float: left;
        margin-left: 10px;
        margin-top: 12px;
        width: 32px;
        height: 32px;
      }
      .imgMoreMsgStyle {
        float: left;
        margin-top: 27px;
        margin-left: 13px;
      }
      .timeFontStyle {
        margin-left: 70px;
        margin-top: 20px;
      }
    }
    .timeDivStyle:hover{
      background:#E0E3E3;
    }
  }
}

.rightMsg {
  float: left;
  width: 75%;
  height: 100%;
  background: #FFFFFF;
  padding:25px 35px;
  overflow-y: auto;
  display: inline-block;
}

</style>
