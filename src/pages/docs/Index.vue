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
  <div class="works">
    <bannerImage />
    <div class="how-it-works">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          class="table-pane"
          :label="$t('docs.summary')"
        >
          <Docs class="docs" />
        </el-tab-pane>
        <el-tab-pane
          class="table-pane"
          :label="$t('docs.operateFile')"
        >
          <div class="summary">
            <span />{{ $t('docs.operaContent') }}
          </div>
          <div class="steps">
            <div class="step">
              <img
                src="../../assets/images/how_it_works_icon1.png"
                alt
              >
            </div>
            <div class="step">
              <img
                src="../../assets/images/how_it_works_icon2.png"
                alt
              >
            </div>
            <div class="step">
              <img
                src="../../assets/images/how_it_works_icon3.png"
                alt
              >
            </div>
            <div class="step">
              <img
                src="../../assets/images/how_it_works_icon4.png"
                alt
              >
            </div>
          </div>
          <div class="oprefile">
            <a
              href="http://docs.edgegallery.org/zh_CN/latest/Projects/APPSTORE/AppStore_Contribution.html#id3"
              target="_blank"
              rel="noopener noreferrer"
            >{{ $t('docs.moreDetail') }}</a>
          </div>
        </el-tab-pane>
        <el-tab-pane
          class="table-pane"
          :label="$t('docs.APPDStandard')"
        >
          <DocsAPPD class="docs" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bannerImage from '../../components/common/BannerImage.vue'
import Docs from './Docs.vue'
import DocsAPPD from './DocsAPPD.vue'
export default {
  components: {
    Docs, bannerImage, DocsAPPD
  },
  computed: {
    ...mapState(['language'])
  },
  data () {
    return {

    }
  },
  methods: {},
  mounted () {}
}
</script>
<style lang='less'>
body, html{
  width: 100%;
  height: 100%;
}
.works {
  margin-top: 65px;
  .banner {
    img {
      width: 100%;
      height: 500px;
    }
  }
  .el-tabs__nav-scroll{
    // text-align: center;
    display: flex;
    justify-content: center;
  }
  .el-tabs__nav{
    float: none;
  }
  .el-tabs__item{
    font-size: 19px;
  }

  .how-it-works {
    padding: 35px 55px;
    box-sizing: border-box;
    background: #eee;
    .oprefile{
        padding: 30px;
        background: #fff;
        text-align: center;
      }
    .summary{
            margin-top: 30px;
            width: 100%;
            // border-bottom: solid #194686 1px;
            font-size: 18px;
            font-weight: 450;
            height: 30px;
            padding: 30px;
            background: #fff;
            text-align: center

          }
    .steps {
      // margin-top: 20px;
      background: white;
      padding: 40px 30px 0px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;

      .step :hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        background-color: #fff;

        background: white;
        padding: 20px 30px 0px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
      }

      .step-box:last-child{
        .raw{
          img{
            display: none;
          }
        }
      }
    }
  }
}
</style>
