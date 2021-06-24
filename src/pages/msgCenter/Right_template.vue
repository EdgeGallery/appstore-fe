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
  <div>
    <el-tabs
      v-model="activeName"
    >
      <el-tab-pane
        v-for="(item) in allTabsMsg"
        :key="item.name"
        :label="getTabsTitle(item.title)"
        :name="item.name"
      >
        <template>
          <div>
            <el-table
              :data="item.content"
              :row-style="{height: '80px'}"
              :show-header="false"
            >
              <el-table-column>
                <template slot-scope="scope">
                  <div
                    @dblclick="getDetailMsg(scope.row)"
                  >
                    <img
                      :src="scope.row.iconDownloadUrl"
                      alt=""
                      class="appIcon"
                    >
                    <div>
                      <div class="fontLine">
                        <span :class="!scope.row.readed?'fontStyle':''"> {{ scope.row.basicInfo.name }} </span>
                      </div>
                      <div class="fontLine">
                        <span :class="!scope.row.readed?'fontStyle':''"> {{ scope.row.description }} </span>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div
                    @dblclick="getDetailMsg(scope.row)"
                  >
                    <div>
                      <div class="timeLine">
                        <span> {{ scope.row.time }} </span>
                      </div>
                      <div class="opeLine">
                        <el-tooltip
                          class="item"
                          effect="light"
                          :content="$t('apppromotion.acceptMsgTip')"
                          placement="bottom-start"
                          :visible-arrow="false"
                        >
                          <img
                            src="../../assets/images/acceptMsg.png"
                            alt=""
                            class="operatorLine"
                            @click.stop="handleAccept(scope.row.messageId)"
                          >
                        </el-tooltip>
                        <el-tooltip
                          class="item"
                          effect="light"
                          :content="$t('apppromotion.deleteMsgTip')"
                          placement="bottom-start"
                          :visible-arrow="false"
                        >
                          <img
                            src="../../assets/images/deleteMsg.png"
                            alt=""
                            class="operatorLine"
                            @click.stop="handleDelete(scope.row.messageId)"
                          >
                        </el-tooltip>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { acceptMsg, deleteMsg, updateStatus } from '../../tools/api.js'
export default {
  components: {
  },
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      allTabsMsg: [],
      activeName: 'unReadedMsg',
      operationType: 1
    }
  },
  methods: {
    getTabsTitle (key) {
      let localKey = 'messageCenter.' + key
      return this.$t(localKey)
    },
    getDetailMsg (rowInfo) {
      this.$emit('clickMsgItemEvent', rowInfo)
      this.$emit('isShowDetailMsgDlg', true)
      if (!rowInfo.readed) {
        rowInfo.readed = true
        this.updateMsgStatus(rowInfo.messageId)
      }
    },
    updateMsgStatus (messageId) {
      updateStatus(messageId).then((res) => {
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('messageCenter.updateMsgFailed'),
          type: 'warning'
        })
      })
    },
    handleAccept (messageId) {
      this.updateMsgStatus(messageId)
      acceptMsg(messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.acceptSuccess'))
      }).catch((error) => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.acceptFailed') + error.response.data.message,
          type: 'warning'
        })
      })
    },
    handleDelete (messageId) {
      deleteMsg(messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.deleteMsgSuccess'))
      }).catch((error) => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.deleteMsgFailed') + error.response.data.message,
          type: 'warning'
        })
      })
    }
  },
  mounted () {
    this.allTabsMsg = this.data
  }
}
</script>
<style lang="less" scoped>
  .el-tabs__item{
    font-size: 16px;
  }
  .appIcon{
    width: 50px;
    height: 50px;
    float: left;
    margin-top: 7px;
  }
  .fontLine{
    padding: 5px 0px;
    margin-left: 65px;
  }
  .timeLine{
    padding: 5px 0px;
    margin-left: 10px;
    text-align: right;
  }
  .opeLine{
    padding: 5px 0px;
    margin-left: 10px;
    text-align: right;
  }
  .tipMsg{
    width: 130px;
    height: 20px;
    z-index: 999999;
    text-align: right;
    float: right;
    font-size: 10px;
    position: absolute;
  }
  .fontStyle{
    font-weight:bold;
    color:#000;
  }

  .operatorLine{
    margin-left: 20px;
    cursor: pointer;
  }
</style>
