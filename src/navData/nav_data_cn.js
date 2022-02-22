
/*
 *  Copyright 2022 Huawei Technologies Co., Ltd.
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

const mecAppstore = [
  {
    id: '2.1',
    name: '首页',
    path: '/home',
    display: true,
    index: '4'
  },
  {
    id: '2.2',
    name: '应用仓库',
    path: '/index',
    display: true,
    index: '1'
  },
  {
    id: '2.3',
    name: '个人中心',
    path: '/myapp',
    display: true,
    index: '3',
    authority: ['ROLE_APPSTORE_ADMIN', 'ROLE_APPSTORE_TENANT'],
    children: [
      {
        id: '2.3.1',
        name: '我的应用',
        path: '/myapp',
        display: true,
        index: '3.1'
      },
      {
        id: '2.3.2',
        name: '订单管理',
        path: '/orders',
        display: true,
        index: '3.2'
      }
    ]
  },
  {
    id: '2.4',
    name: '应用共享',
    path: '/appShare',
    display: true,
    index: '5',
    children: [
      {
        id: '2.4.1',
        name: '外部应用仓库管理',
        path: '/apppromote',
        display: true,
        index: '5.1'
      },
      {
        id: '2.4.2',
        name: '应用推送',
        path: '/apppromotion',
        display: true,
        index: '5.2'
      },
      {
        id: '2.4.3',
        name: '应用拉取',
        path: '/appPull',
        display: true,
        index: '5.3'
      },
      {
        id: '2.4.4',
        name: '消息中心',
        path: '/msgCenter',
        display: true,
        index: '5.4'
      },
      {
        id: '2.4.5',
        name: '操作分析',
        path: '/operationAnalyse',
        display: true,
        index: '5.5'
      }
    ]
  },
  {
    id: '2.5',
    name: '系统',
    display: true,
    path: '/appManager',
    index: '6',
    children: [
      {
        id: '2.5.1',
        name: '应用管理',
        path: '/appManager',
        display: true,
        index: '6.1'
      },
      {
        id: '2.5.2',
        name: '沙箱管理',
        path: '/systemHost',
        display: true,
        index: '6.2'
        // authority: ['ROLE_DEVELOPER_ADMIN']
      }
    ]
  },
  {
    id: '2.6',
    name: '文档',
    path: '/docs',
    display: true,
    index: '7'
  }
]

export default {
  mecAppstore
}
