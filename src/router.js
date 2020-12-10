/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '',
      component: () => import('./components/layout/Index.vue'),
      children: [
        {
          path: 'index',
          name: 'appstorename',
          component: () => import('./pages/home/Index.vue'),
          meta: {
            id: '2.0'
          }
        },
        {
          path: 'detail',
          name: 'appstordetail',
          component: () => import('./pages/home/AppDetail.vue'),
          meta: {
            id: '2.0.1',
            breadcrumb: [{ nameEn: 'Detail', nameCn: '详情' }]
          }
        },
        {
          path: 'docs',
          name: 'appstordocs',
          component: () => import('./pages/docs/Index.vue'),
          meta: {
            id: '2.2',
            breadcrumb: [{ nameEn: 'Docs', nameCn: '文档' }]
          }
        },
        {
          path: 'discourse',
          name: 'appstordiscourse',
          component: () => import('./components/common/Developing.vue'),
          meta: {
            id: '2.3',
            breadcrumb: [{ nameEn: 'Discourse', nameCn: '社区' }]
          }
        },
        {
          path: 'myapp',
          name: 'appstoremyapp',
          component: () => import('./pages/myApp/Index.vue'),
          meta: {
            id: '2.4',
            breadcrumb: [{ nameEn: 'Myapp', nameCn: '我的应用' }]
          }
        },
        {
          path: 'myappdetail',
          name: 'myappdetail',
          component: () => import('./pages/myApp/PackageDetail.vue'),
          meta: {
            id: '2.4.1',
            breadcrumb: [
              { nameEn: 'Myapp', path: '/myapp', nameCn: '我的应用' },
              { nameEn: 'Detail', nameCn: '详情' }
            ]
          }
        },
        {
          path: 'app/test/task',
          name: 'atptask',
          component: () => import('./pages/myApp/ATPTask.vue'),
          meta: {
            id: '2.4.1',
            breadcrumb: [
              { nameEn: 'Myapp', path: '/myapp', nameCn: '我的应用' },
              { nameEn: 'Test Task', nameCn: '测试任务' }
            ]
          }
        },
        {
          path: 'atpreport',
          name: 'atpreport',
          component: () => import('./pages/myApp/ATPReport.vue'),
          meta: {
            id: '2.4.1',
            breadcrumb: [
              { nameEn: 'Myapp', path: '/myapp', nameCn: '我的应用' },
              { nameEn: 'Test Task', path: 'app/test/task', nameCn: '测试任务' },
              { nameEn: 'ATPReport', nameCn: '测试报告' }
            ]
          }
        },
        {
          path: 'atpprocess',
          name: 'atpprocess',
          component: () => import('./pages/myApp/ATPProcess.vue'),
          meta: {
            id: '2.4.1',
            breadcrumb: [
              { nameEn: 'Myapp', path: '/myapp', nameCn: '我的应用' },
              { nameEn: 'Test Task', path: 'app/test/task', nameCn: '测试任务' },
              { nameEn: 'ATPProcess', nameCn: '测试进展' }
            ]
          }
        },
        {
          path: 'atptestcase',
          name: 'atptestcase',
          component: () => import('./pages/myApp/ATPTestCase.vue'),
          meta: {
            id: '2.4.1',
            breadcrumb: [
              { nameEn: 'Myapp', path: '/myapp', nameCn: '我的应用' },
              // { nameEn: 'Test Task', path: 'app/test/task', nameCn: '测试任务' },
              { nameEn: 'ATPTest', nameCn: '测试' }
            ]
          }
        }
      ]
    }
  ]
})
