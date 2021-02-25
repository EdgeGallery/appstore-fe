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
  <div class="app-grid">
    <div
      class="curp content"
      :class="{'both-border': index % 4 !== 0 && index % 4 !== 3, 'right-border': index % 4 === 0, 'left-border': index % 4 === 3}"
      v-for="(item, index) in appData"
      :key="index"
      :id="item.appStoreId"
    >
      <div
        class="application"
      >
        <div class="img-box">
          <img
            style="height: 100px;"
            :src="require(`@/assets/images/liantong_store.png`)"
            alt
            v-if="item.appdTransId.indexOf('联通') > -1"
          >
          <img
            style="height: 100px;"
            :src="require(`@/assets/images/logo.png`)"
            alt
            v-else-if="item.appdTransId.indexOf('社区') > -1"
          >
          <img
            style="height: 100px;"
            :src="require(`@/assets/images/appStoreDefault.svg`)"
            alt
            v-else-if="item.appdTransId.indexOf('联通') < 0 && item.appdTransId.indexOf('社区') < 0"
          >
          <img
            :src="require(`@/assets/images/underlineOfstoreImg.png`)"
            alt=""
          >
        </div>
        <div class="intr">
          <div class="type-size">
            <div class="type">
              {{ $t('common.appStoreName') }}
            </div>
            <div class="size">
              {{ item.appStoreName?item.appStoreName:'' }}
            </div>
          </div>
          <p class="type-size">
            <span class="type">
              {{ $t('common.appStoreVersion') }}
            </span>
            <span class="size">
              {{ item.appStoreVersion?item.appStoreVersion:'' }}
            </span>
          </p>
          <p class="type-size">
            <span class="type">
              {{ $t('common.company') }}
            </span>
            <span class="size">
              {{ item.company?item.company:'' }}
            </span>
          </p>
          <p class="type-size">
            <span class="type">
              {{ $t('common.appdTransId') }}
            </span>
            <span class="size">
              {{ item.appdTransId? item.appdTransId : '' }}
            </span>
          </p>
          <p class="type-size">
            <span class="type">
              {{ $t('common.url') }}
            </span>
            <span class="size">
              {{ item.url?item.url:'' }}
            </span>
          </p>
          <p class="type-size">
            <span class="type">
              {{ $t('common.description') }}
            </span>
            <el-tooltip
              v-if="item.description && item.description.length > 20"
              effect="light"
              :content="item.description"
              placement="top"
            >
              <span class="size">{{ item.description?item.description:'' }}</span>
            </el-tooltip>
            <span
              class="size"
              v-else
            >
              {{ item.description?item.description:'' }}
            </span>
          </p>
        </div>
        <el-button-group class="no-display">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            @click="handleEdit(item)"
          >
            {{ $t('common.modifyApp') }}
          </el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-delete"
            @click="handleDelete(item)"
          >
            {{ $t('common.delete') }}
          </el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appData: {
      type: Array,
      default () {
        return [
        ]
      }
    },
    dataLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleEdit (param) {
      this.$emit('modifyApp', param)
    },
    handleDelete (param) {
      this.$emit('deleteApp', param)
    }
  },
  watch: {
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
.no-display {
  display: none;
}
.both-border {
  padding: 0 15px;
}
.left-border {
  padding: 0 0 0 15px;
}
.right-border {
  padding: 0 15px 0 0;
}
.app-grid {
  display: flex;
  padding: 20px 0;
  flex-wrap: wrap;
  .content {
    width: 25%;
    box-sizing: border-box;
    padding-bottom: 20px;
    .application {
      border: 1px solid #e6e6e6;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      transition: transform 0.3s ease-in;
      background: #fafafa;
      .img-box {
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: inherit;
        img {
          width: 50%;
          display: block;
          margin: 0 auto;
        }
      }
      .intr {
        width: 100%;
        padding: 14px 32px;
        h4 {
          line-height: 34px;
        }
      p {
        color: black;
        line-height: 28px;
      }
      span {
        display: inline-block;
        height: 28px;
      }
      .name {
        text-align: left;
        .app-name {
          width: 75%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 22px;
        }
        .app-version {
          font-size: 14px;
          color: #999999;
        }
      }
      .type-size {
        line-height: 28px;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
        .type {
          text-align: left;
          width: 30%;
          display: inline-block;
          color: #949494
        }
        .size {
          width: 70%;
          padding-left: 10px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .core {
        display: flex;
        align-items: center;
        }
      }
      .el-button-group {
        width: 100%;
        .el-button {
          width: 50%;
          border: 1px solid #e6e6e6;
        }
        .el-button.is-plain:focus {
          color: #688ef3!important;
        }
      }
    }
    .application:hover{
      transform: translate3d(0,-10px,0);
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      background-color: #fff;
      .no-display {
        display: block;
        margin-top: -12px;
        opacity: 0.8;
      }
      .intr {
        padding: 0 32px;
      }
    }
  }
}
</style>
