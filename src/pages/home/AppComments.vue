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
  <div class="appComments">
    <div class="submit_comment clearfix">
      <span class="score_span defaultFontLight">{{ $t('store.score') }}</span>
      <el-rate
        v-model="comments.score"
        allow-half
        show-score
      />
      <div class="comment_input">
        <img
          :src="userIconUrl"
          alt=""
          class="user_icon"
        >
        <el-input
          type="textarea"
          v-model="comments.message"
          rows="5"
          maxlength="200"
          show-word-limit
          :placeholder="$t('store.commentInfo')"
        />
      </div>
      <p
        class="submit_btn"
        @click="submitComment"
      >
        {{ $t('myApp.publish') }}
      </p>
    </div>
    <div
      class="no_comment"
      v-if="historyComentsList.length===0"
    >
      <img
        :src="noCommentIcon"
        alt=""
      >
      <p class="defaultFontLight">
        {{ $t('store.noComment') }}
      </p>
    </div>
    <div
      class="show_comment"
      v-if="historyComentsList.length!==0"
    >
      <div class="div_comment_total">
        <p class="p_count_Title defaultFontLight">
          {{ $t('store.allComments') }}
        </p>
        <p class="p_total defaultFontLight">
          {{ this.total }}
        </p>
      </div>
      <ul>
        <li
          v-for="(item,index) in historyComentsList"
          :key="index"
        >
          <div class="user_icon">
            <img
              :src="userIconUrl"
              alt=""
              v-if="!item.userIconUrl"
            >
            <img
              :src="item.userIconUrl"
              alt=""
              v-if="item.userIconUrl"
            >
          </div>
          <div class="user_info">
            <p class="p_userName defaultFontLight">
              {{ item.user.userName }}
            </p>
            <p class="commentTime defaultFontLight">
              {{ item.commentTime }}
            </p>
          </div>
          <div class="comment_content">
            <el-rate
              v-model="item.score"
              disabled
              text-color="#ff9900"
              score-template="{value}"
              show-score
            />
            {{ item.body }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getCommentsApi,
  submitAppCommentApi
} from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
  props: {
    currentData: {
      required: true,
      type: Array
    },
    appId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      appName: '',
      limit: 100,
      offset: 0,
      userIconUrl: require('../../assets/images/app_detail_user.png'),
      noCommentIcon: require('../../assets/images/no_info.png'),
      comments: {
        score: 0,
        message: ''
      },
      historyComentsList: [],
      language: localStorage.getItem('language'),
      total: 0
    }
  },
  methods: {
    submitComment () {
      if (sessionStorage.getItem('userNameRole') === 'guest') {
        this.$message.warning(this.$t('system.guestPrompt'))
      } else if (sessionStorage.getItem('userId') === this.currentData.userId) {
        this.$message.warning(this.$t('promptMessage.cannotComment'))
      } else {
        if (this.comments.score && this.comments.message) {
          let params = {
            score: this.comments.score,
            body: this.comments.message
          }
          params = JSON.stringify(params)
          let userId = sessionStorage.getItem('userId')
          let userName = sessionStorage.getItem('userName')
          submitAppCommentApi(this.appId, params, userId, userName).then(res => {
            this.getComments()
            this.comments.score = 0
            this.comments.message = ''
            this.getAppData()
          }).catch(error => {
            commonUtil.showTipMsg(this.language, error, this.$t('promptMessage.subCommentFail'))
          })
        } else {
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.subCommentFailReason')
          })
        }
      }
    },
    getComments () {
      getCommentsApi(this.appId, this.limit, this.offset).then(res => {
        this.historyComentsList = res.data.results
        this.total = this.historyComentsList.length
        if (this.historyComentsList.length > 0) {
          this.handleDate()
        }
      }).catch(error => {
        commonUtil.showTipMsg(this.language, error, this.$t('promptMessage.getCommentFail'))
      })
    },
    handleDate () {
      this.historyComentsList.sort(function (a, b) {
        return b.commentTime < a.commentTime ? -1 : 1
      })
      let year = new Date().getFullYear()
      this.historyComentsList.forEach(item => {
        if (item.commentTime.indexOf(year) !== -1) {
          item.commentTime = item.commentTime.replace((year + '-'), '')
        }
      })
    }

  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getComments()
  }
}
</script>
<style lang="less">
.appComments {
  margin: auto;
  background: #2E147C;
  border-radius: 16px;
  padding: 32px 59px ;
  p{
    margin: 0;
  }
  .submit_comment{
    .score_span{
      float: left;
      font-size: 16px;
      color: #fff;
    }
    .el-rate{
      float: left;
      height: 17px;
      margin: 3px 0 0 10px;
      .el-rate__icon{
        font-size: 12px;
      }
    }
    .comment_input{
      float: left;
      width: 100%;
      margin: 40px 0 20px;
      display: flex;
      .user_icon{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .el-textarea__inner{
        height: 80px;
        box-shadow: inset 14px 9px 17px 0px rgba(51, 26, 134, 0.3) !important;
        border-radius: 12px;
        background: #4E3494;
        padding: 10px 30px 15px !important;
      }
      .el-textarea .el-input__count{
        background:none ;
      }
    }
    .submit_btn{
      float: right;
      padding: 2px 30px;
      font-size: 16px;
      background-color:  #fff;
      color: #5944C0;
      border-radius: 12px;
    }
    .submit_btn:hover{
      background-color:  #5944C0;
      color: #fff;
      cursor: pointer;
    }
  }
  .show_comment{
    padding: 0 0 50px 20px;
    margin-top: -40px;
    li{
      border-bottom:1px solid #fff ;
    }
    .div_comment_total{
      position: relative;
      top: -11px;
      left: 80px;
      margin-top: 26px;
      .p_count_Title {
        float: left;
        margin-right: 20px;
        font-size: 14px;
        color: #fff;
      }
      .p_total {
        float: left;
        font-size: 14px;
        color: #fff;
      }
    }
    .user_icon {
      float: left;
      width: 100px;
      img{width:60px;height:60px}
    }
    .user_info {
      display: flex;
      .p_userName {
        height: 24px;
        font-size: 14px;
        color: #fff;
        line-height: 24px;
        margin-right: 30px;
      }
      .commentTime {
        height: 24px;
        font-size: 14px;
        color: #fff;
        line-height: 24px;
      }
      p{
        margin-right: 10px;
        float: left;
        }
    }
    .comment_content {
      width: 100%;
      max-height: 150px;
      font-size: 14px;
      color: #fff;
      line-height: 45px;
      padding: 0px 20px 0 100px;
      margin-top: 11px;
    }
    li{
      margin-left: 80px;
      padding: 34px 0;
    }
  }
  .no_comment{
    color: #fff;
    text-align: center;
    p{
      margin: 10px 0 30px;
      font-size: 14px;
    }
  }
}
</style>
