/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
import en from './locales/en.js'
import cn from './locales/cn.js'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

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
      redirect: '/home'
    },
    {
      path: '',
      component: () => import('./components/layout/Index.vue'),
      children: [
        {
          path: 'home',
          name: 'appstorhome',
          component: () => import('./pages/index/Index.vue'),
          meta: {
            id: '2.1'
          }
        },
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
            breadcrumb: [{
              nameEn: en.nav.home,
              path: '/',
              nameCn: cn.nav.home
            }, {
              nameEn: en.nav.detail,
              nameCn: cn.nav.detail
            }]
          }
        },
        {
          path: 'docs',
          name: 'appstordocs',
          component: () => import('./pages/docs/Index.vue'),
          meta: {
            id: '2.2'
          }
        },
        {
          path: 'docsBeginnerGuide',
          name: 'docsBeginnerGuide',
          component: () => import('./pages/docs/Docs.vue'),
          meta: {
            id: '2.2.1'
          }
        },
        {
          path: 'docsAPPD',
          name: 'docsAPPD',
          component: () => import('./pages/docs/DocsAPPD.vue'),
          meta: {
            id: '2.2.3'
          }
        },
        {
          path: 'docsInterface',
          name: 'docsInterface',
          component: () => import('./pages/docs/DocsInterface.vue'),
          meta: {
            id: '2.2.4'
          }
        },
        {
          path: 'myapp',
          name: 'appstoremyapp',
          component: () => import('./pages/myApp/Index.vue'),
          meta: {
            id: '2.4'
          }
        },
        {
          path: 'myappdetail',
          name: 'myappdetail',
          component: () => import('./pages/myApp/PackageDetail.vue'),
          meta: {
            id: '2.4.1',
            breadcrumb: [{
              nameEn: en.nav.home,
              path: '/',
              nameCn: cn.nav.home
            }, {
              nameEn: en.nav.myApp,
              path: '/myapp',
              nameCn: cn.nav.myApp
            }, {
              nameEn: en.nav.detail,
              nameCn: cn.nav.detail
            }]
          }
        },
        {
          path: 'app/test/task',
          name: 'atptask',
          component: () => import('./pages/myApp/ATPTask.vue'),
          meta: {
            id: '2.4.2',
            breadcrumb: [{
              nameEn: en.nav.home,
              path: '/',
              nameCn: cn.nav.home
            }, {
              nameEn: en.nav.myApp,
              path: '/myapp',
              nameCn: cn.nav.myApp
            }, {
              nameEn: en.nav.testTask,
              nameCn: cn.nav.testTask
            }]
          }
        },
        {
          path: 'atpreport',
          name: 'atpreport',
          component: () => import('./pages/myApp/ATPReport.vue'),
          meta: {
            id: '2.4.3',
            breadcrumb: [{
              nameEn: en.nav.home,
              path: '/',
              nameCn: cn.nav.home
            }, {
              nameEn: en.nav.myApp,
              path: '/myapp',
              nameCn: cn.nav.myApp
            }, {
              nameEn: en.nav.testTask,
              path: 'app/test/task',
              nameCn: cn.nav.testTask
            }, {
              nameEn: en.nav.atpReport,
              nameCn: cn.nav.atpReport
            }]
          }
        },
        {
          path: 'atpprocess',
          name: 'atpprocess',
          component: () => import('./pages/myApp/ATPProcess.vue'),
          meta: {
            id: '2.4.4',
            breadcrumb: [{
              nameEn: en.nav.home,
              path: '/',
              nameCn: cn.nav.home
            }, {
              nameEn: en.nav.myApp,
              path: '/myapp',
              nameCn: cn.nav.myApp
            }, {
              nameEn: en.nav.testTask,
              path: 'app/test/task',
              nameCn: cn.nav.testTask
            }, {
              nameEn: en.nav.atpProcess,
              nameCn: cn.nav.atpProcess
            }]
          }
        },
        {
          path: 'selectscene',
          name: 'selectscene',
          component: () => import('./pages/myApp/TestScenarios.vue'),
          meta: {
            id: '2.4.5',
            breadcrumb: [{
              nameEn: en.nav.home,
              path: '/',
              nameCn: cn.nav.home
            }, {
              nameEn: en.nav.myApp,
              path: '/myapp',
              nameCn: cn.nav.myApp
            }, {
              nameEn: en.nav.atpTest,
              nameCn: cn.nav.atpTest
            }]
          }
        },
        {
          path: 'apppromote',
          name: 'apppromote',
          component: () => import('./pages/appPromote/Index.vue'),
          meta: {
            id: '2.5'
          }
        },
        {
          path: 'apppromotion',
          name: 'apppromotion',
          component: () => import('./pages/appPromotion/AppList.vue'),
          meta: {
            id: '2.8',
            breadcrumb: [
              {
                nameEn: en.nav.home,
                path: '/',
                nameCn: cn.nav.home
              }, {
                nameEn: en.nav.appShare,
                nameCn: cn.nav.appShare,
                path: '/appShare'
              }, {
                nameEn: en.nav.appPush,
                path: '/apppromotion',
                nameCn: cn.nav.appPush
              }
            ]
          }
        },
        {
          path: 'appPull',
          name: 'appPull',
          component: () => import('./pages/appPromotion/AppPull.vue'),
          meta: {
            id: '2.7',
            breadcrumb: [
              {
                nameEn: en.nav.home,
                path: '/',
                nameCn: cn.nav.home
              }, {
                nameEn: en.nav.appShare,
                nameCn: cn.nav.appShare,
                path: '/appShare'
              }, {
                nameEn: en.nav.appPull,
                path: '/appPull',
                nameCn: cn.nav.appPull
              }
            ]
          }
        },
        {
          path: 'operationAnalyse',
          name: 'operationAnalyse',
          component: () => import('./pages/appPromotion/OperationAna.vue'),
          meta: {
            id: '2.9',
            breadcrumb: [
              {
                nameEn: en.nav.home,
                path: '/',
                nameCn: cn.nav.home
              }, {
                nameEn: en.nav.appShare,
                nameCn: cn.nav.appShare,
                path: '/appShare'
              }, {
                nameEn: en.nav.operAna,
                path: '/operationAnalyse',
                nameCn: cn.nav.operAna
              }
            ]
          }
        },
        {
          path: 'app/prom/task',
          name: 'promTask',
          component: () => import('./pages/appPromotion/PromTask.vue'),
          meta: {
            id: '2.8.1',
            breadcrumb: [
              { nameEn: 'appProm', path: '/appProm', nameCn: '应用推送' },
              { nameEn: 'Batch Promot', nameCn: '推送' }
            ]
          }
        },
        {
          path: 'msgCenter',
          name: 'msgCenter',
          component: () => import('./pages/msgCenter/Msg_template.vue'),
          meta: {
            id: '2.6',
            breadcrumb: [
              {
                nameEn: en.nav.home,
                path: '/',
                nameCn: cn.nav.home
              }, {
                nameEn: en.nav.appShare,
                nameCn: cn.nav.appShare,
                path: '/appShare'
              }, {
                nameEn: en.nav.msgCenter,
                path: '/msgCenter',
                nameCn: cn.nav.msgCenter
              }
            ]
          },
          children: [
            {
              path: '/right_panel',
              name: 'right_panel',
              component: () => import('./pages/msgCenter/Right_template.vue'),
              meta: {
                id: '2.6.1'
              }
            }
          ]
        },
        {
          path: 'refresh',
          name: 'refresh',
          component: () => import('./pages/appPromotion/Refresh.vue'),
          meta: {
            id: '2.7'
          }
        },
        {
          path: 'appShare',
          name: 'appShare',
          component: () => import('./pages/appPromotion/appShareIndex.vue'),
          meta: {
            id: '2.10'
          }
        },
        {
          path: 'appManager',
          name: 'appManager',
          component: () => import('./pages/appManager/Index.vue'),
          meta: {
            id: '2.11'
          }
        }
      ]
    }
  ]
})
