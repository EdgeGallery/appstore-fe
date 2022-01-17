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
  <div class="app-grid">
    <div
      class="application"
      v-for="(item, index) in appData"
      :key="index"
      :id="item.appStoreId"
    >
      <div class="img-box">
        <img
          :src="require(`@/assets/images/liantong_store.png`)"
          alt
          v-if="item.appdTransId.indexOf('联通') > -1"
        >
        <img
          :src="require(`@/assets/images/logo.png`)"
          alt
          v-else-if="item.appdTransId.indexOf('社区') > -1"
        >
        <img
          :src="require(`@/assets/images/yidong_store.png`)"
          alt
          v-else-if="item.appdTransId.indexOf('移动') > -1"
        >
        <img
          :src="require(`@/assets/images/dianxin_store.png`)"
          alt
          v-else-if="item.appdTransId.indexOf('电信') > -1"
        >
        <img
          :src="require(`@/assets/images/appStoreDefault.svg`)"
          alt
          v-else-if="item.appdTransId.indexOf('联通') < 0 && item.appdTransId.indexOf('社区') < 0 && item.appdTransId.indexOf('移动') < 0 && item.appdTransId.indexOf('电信') < 0"
        >
      </div>
      <div class="intr">
        <div class="type-size">
          <div class="type">
            {{ $t('common.appStoreName') }}:
          </div>
          <div class="size">
            {{ item.appStoreName?item.appStoreName:'' }}
          </div>
        </div>
        <p class="type-size">
          <span class="type">
            {{ $t('common.appStoreVersion') }}:
          </span>
          <span class="size">
            {{ item.appStoreVersion?item.appStoreVersion:'' }}
          </span>
        </p>
        <p class="type-size">
          <span class="type">
            {{ $t('common.company') }}:
          </span>
          <span class="size">
            {{ item.company?item.company:'' }}
          </span>
        </p>
        <p class="type-size">
          <span class="type">
            {{ $t('common.appdTransId') }}:
          </span>
          <span class="size">
            {{ item.appdTransId? item.appdTransId : '' }}
          </span>
        </p>
        <p class="type-size">
          <span class="type">
            {{ $t('common.description') }}:
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
        <div class="btns">
          <el-button
            type="primary"
            plain
            @click="handleEdit(item)"
          >
            {{ $t('common.modifyApp') }}
          </el-button>
          <el-button
            type="primary"
            plain
            @click="handleDelete(item)"
          >
            {{ $t('common.delete') }}
          </el-button>
        </div>
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
  }
}
</script>

<style lang='less' scoped>
.no-display {
  display: none;
}
p{
  margin: 0;
}
.app-grid {
  display: flex;
  justify-content:flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 3.04%;
  .application:hover .intr{
        transform: translateY(0px);
        cursor: pointer;
        overflow: visible;
        height: 280px;
        z-index: 100;
        padding-top: 30px;
  }
    .application:hover .img-box{
        display: none;
  }
    .application {
     border-radius: 8px ;
      height: 280px;
      width: 22.2%;
      margin-top: 40px;
      border: 1px solid #e6e6e6;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      background: #fafafa;
      margin-right: 2.5%;
      .img-box{
        height: 170px;
        width: 100%;
        img{
          width: 51%;
          height:75px;
          margin: 50px  24.5%;
        }
      }
      .intr{
        width: 100%;
        padding: 0 30px;
        overflow:hidden;
        background-color: #fff;
        .type-size{
          display: flex;
          .type{
            font-size: 14px;
            font-weight: 300;
            color: #380879;
            line-height: 35px;
            margin-right: 20px;
            min-width: 70px;
          }
          .size{
            font-size: 16px;
            font-weight: bolder;
            color: #380879;
            line-height: 35px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .btns {
        width: 100%;
        display: flex;
        justify-content:center;
        margin-top: 20px;
        .el-button {
          width: 31%;
          height: 30px;
          border: 1px solid #e6e6e6;
          padding: 0;
        }
        .el-button.is-plain:focus {
          color: #688ef3!important;
        }
      }
    }
    .application:hover{
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      background-color: #fff;

    }
  }

@media screen and (max-width:1890px) {
  .content{
    width: calc(33.33% - 30px)!important;
  }
}
@media screen and (max-width:1417px) {
  .content{
    width: calc(50% - 30px)!important;
  }
}
</style>
