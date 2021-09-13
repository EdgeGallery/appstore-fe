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
      <span class="score_span">{{ $t('store.score') }}</span>
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
      <p class="submit_btn">
        <el-button
          type="primary"
          @click="submitComment"
        >
          {{ $t('myApp.publish') }}
        </el-button>
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
      <p>
        {{ $t('store.noComment') }}
      </p>
    </div>
    <div
      class="show_comment"
      v-if="historyComentsList.length!==0"
    >
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
            <p>{{ item.user.userName }}</p>
            <p class="commentTime">
              {{ item.commentTime }}
            </p>
          </div>
          <div class="comment_content">
            {{ item.body }}
            <el-rate
              v-model="item.score"
              disabled
              text-color="#ff9900"
              score-template="{value}"
              show-score
            />
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
// import timeFormatTools from '../../tools/timeFormatTools.js'
// import commonUtil from '../../tools/commonUtil.js'
export default {
  props: {
    appId: {
      required: true,
      type: String
    }
  },
  components: {
    // EgPagination
  },
  data () {
    return {
      currentPageData: [],
      dataLoading: true,
      prop: 'isHotApp',
      order: 'desc',
      userId: sessionStorage.getItem('userId'),
      appName: '',
      limit: 100,
      offset: 0,
      userIconUrl: require('../../assets/images/app_detail_user.jpg'),
      noCommentIcon: require('../../assets/images/app_detail_info_icon.png'),
      comments: {
        score: 0,
        message: ''
      },
      historyComentsList: [],
      language: localStorage.getItem('language')
    }
  },
  methods: {
    submitComment () {
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
          if (error.response.data.code === 403) {
            this.$message({
              duration: 2000,
              message: this.$t('promptMessage.guestUser'),
              type: 'warning'
            })
          } else if (error.response.data.message.indexOf('can not comment own app') !== -1) {
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.cannotComment')
            })
          } else {
            this.$message({
              duration: 2000,
              message: this.$t('promptMessage.subCommentFail'),
              type: 'warning'
            })
          }
        })
      } else {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.subCommentFailReason')
        })
      }
    },

    getComments () {
      getCommentsApi(this.appId, this.limit, this.offset).then(res => {
        this.historyComentsList = res.data.results
        this.handleDate()
      }, () => {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.getCommentFail')
        })
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
      let language = localStorage.getItem('language')
      this.language = language
    },
    appId (newVal, oldVal) {
      this.appId = newVal
      this.getComments()
    }
  }
}
</script>
<style lang="less">
.appComments {
  margin: auto;
  background: #fff;
  border-radius: 16px;
  .submit_comment{
      padding: 20px;
      .score_span{
        float: left;
        font-size: 20px;
        font-weight: bold;
      }
      .el-rate{
        float: left;
        margin: 3px 0 0 10px;
        .el-rate__icon{
          font-size: 22px;
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
          box-shadow: inset 4px 4px 25px 5px rgba(36, 20, 119, 0.1) !important;
          border-radius: 12px;
          padding: 10px 30px 15px !important;
        }
      }
      .submit_btn{

        float: left;
        width: 100%;
        text-align: right;
        .el-button{
          font-size: 16px;
          background-color:  #8278B7;
          color: #FFFFFF;
          border-radius: 8pt;
        }
      }
    }
  .paginationStyle{
    float: right;
    margin-top: 20px;
    margin-right: 30px;
  }
}
</style>
