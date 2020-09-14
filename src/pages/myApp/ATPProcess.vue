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
  <div class="report padding56">
    <el-tabs
      :tab-position="tabPosition"
      style="height: 500px;width: 1500px;"
    >
      <el-tab-pane label="测试任务">
        <div
          class="title"
          style="line-height: 20px; margin-top: 70px;"
        >
          测试进展
        </div>
        <div>
          <el-steps
            :active="3"
            align-center
            finish-status="success"
            style="width: 1200px; margin-bottom: 80px; margin-left: 120px; margin-top: 50px;"
          >
            <el-step
              title="Step 1"
              :description="$t('atp.step1')"
            />
            <el-step
              title="Step 2"
              :description="$t('atp.step2')"
            />
            <el-step
              title="Step 3"
              :description="$t('atp.step3')"
            />
            <el-step
              title="Step 4"
              :description="$t('atp.step4')"
            />
          </el-steps>
        </div>
        <div style="display: flex; margin-left: 200px;">
          <div
            class="block"
            style="width: 300px;"
          >
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities1"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
          <div
            class="block"
            style="width: 300px;"
          >
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities2"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
          <div
            class="block"
            style="width: 300px;"
          >
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities3"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
          <div
            class="block"
            style="width: 300px;"
          >
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities4"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div
      style="margin-top: 50px;"
    >
      <el-button
        id="myapp_checktest"
        type="primary"
        @click="jumpTo"
      >
        测试详情
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabPosition: 'left',
      activities1: [{
        content: 'Custom icon',
        size: 'large',
        type: 'primary'
      }, {
        content: 'Custom color',
        color: '#0bbd87'
      }, {
        content: 'Custom size',
        size: 'large'
      }, {
        content: 'Default node'
      }],
      activities2: [{
        content: 'Custom icon',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: 'Custom color',
        color: '#0bbd87'
      }, {
        content: 'Custom size',
        size: 'large'
      }, {
        content: 'Default node'
      }],
      activities3: [{
        content: 'Custom icon',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: 'Custom color',
        color: '#0bbd87'
      }, {
        content: 'Custom size',
        size: 'large'
      }, {
        content: 'Default node'
      }],
      activities4: [{
        content: 'Custom icon',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: 'Custom color',
        color: '#0bbd87'
      }, {
        content: 'Custom size',
        size: 'large'
      }, {
        content: 'Default node'
      }]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
