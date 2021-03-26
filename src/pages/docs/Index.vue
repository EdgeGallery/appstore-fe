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
  <div class="works">
    <div class="banner-image">
      <img
        :src="language === 'cn'?howworks:howworksEN"
        class="imgMsgStyle"
        alt=""
      >
    </div>
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
                :src="language === 'cn'? worksIcon1 : worksIconen1"
                alt
              >
            </div>
            <div class="step">
              <img
                :src="language === 'cn'? worksIcon2 : worksIconen2"
                alt
              >
            </div>
            <div class="step">
              <img
                :src="language === 'cn'? worksIcon3 : worksIconen3"
                alt
              >
            </div>
            <div class="step">
              <img
                :src="language === 'cn'? worksIcon4 : worksIconen4"
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
import Docs from './Docs.vue'
import DocsAPPD from './DocsAPPD.vue'
import worksIcon1 from '@/assets/images/how_it_works_icon1.png'
import worksIconen1 from '@/assets/images/how_it_works_icon-en1.png'
import worksIcon2 from '@/assets/images/how_it_works_icon2.png'
import worksIconen2 from '@/assets/images/how_it_works_icon-en2.png'
import worksIcon3 from '@/assets/images/how_it_works_icon3.png'
import worksIconen3 from '@/assets/images/how_it_works_icon-en3.png'
import worksIcon4 from '@/assets/images/how_it_works_icon4.png'
import worksIconen4 from '@/assets/images/how_it_works_icon-en4.png'
import howworks from '@/assets/images/how_it_works.png'
import howworksEN from '@/assets/images/how_it_worksEN.png'
export default {
  components: {
    Docs, DocsAPPD
  },
  computed: {
    ...mapState(['language'])
  },
  data () {
    return {
      howworks: howworks,
      howworksEN: howworksEN,
      worksIcon1: worksIcon1,
      worksIconen1: worksIconen1,
      worksIcon2: worksIcon2,
      worksIconen2: worksIconen2,
      worksIcon3: worksIcon3,
      worksIconen3: worksIconen3,
      worksIcon4: worksIcon4,
      worksIconen4: worksIconen4

    }
  }
}
</script>
<style lang='less'>
body, html{
  width: 100%;
  height: 100%;
}
.works {
  margin-top: 65px;
  .banner-image {
  width: 100%;
  position: relative;
  overflow: hidden;
  .word {
    color: white;
    position: absolute;
    top: 110px;
    left: 145px;
    p:nth-child(1){
      font-size: 40px;
      margin-bottom: 30px;
    }
    p:nth-child(2){
      width: 500px;
      font-size: 20px;
      line-height: 40px;
    }
  }
}
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
    padding: 35px 200px;
    box-sizing: border-box;
    background: #eee;
    .oprefile{
        padding: 30px;
        background-color: #fff;
        text-align: center;
      }
    .summary{
            margin-top: 30px;
            width: 100%;
            font-size: 18px;
            font-weight: 450;
            height: 30px;
            padding: 30px;
            background: #fff;
            text-align: left

          }
    .steps {
      background: white;
      padding: 40px 30px 0px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      .step img{
        width: 100%;
      }

      .step :hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        background-color: #fff;
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
