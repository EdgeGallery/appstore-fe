
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
    name: 'Home',
    path: '/home',
    display: true,
    index: '4'
  },
  {
    id: '2.2',
    name: 'App Warehouse',
    path: '/index',
    display: true,
    index: '1'
  },
  {
    id: '2.3',
    name: 'User Center',
    path: '/myapp',
    display: true,
    index: '3',
    authority: ['ROLE_APPSTORE_ADMIN', 'ROLE_APPSTORE_TENANT'],
    children: [
      {
        id: '2.3.1',
        name: 'My App',
        path: '/myapp',
        display: true,
        index: '3.1'
      },
      {
        id: '2.3.2',
        name: 'Order Management',
        path: '/orders',
        display: true,
        index: '3.2'
      }
    ]
  },
  {
    id: '2.4',
    name: 'App Share',
    path: '/appShare',
    display: true,
    authority: ['ROLE_APPSTORE_ADMIN'],
    index: '5',
    children: [
      {
        id: '2.4.1',
        name: 'External AppStore Management',
        path: '/apppromote',
        display: true,
        index: '5.1'
      },
      {
        id: '2.4.2',
        name: 'App Promote',
        path: '/apppromotion',
        display: true,
        index: '5.2'
      },
      {
        id: '2.4.3',
        name: 'App Pull',
        path: '/appPull',
        display: true,
        index: '5.3'
      },
      {
        id: '2.4.4',
        name: 'Message Center',
        path: '/msgCenter',
        display: true,
        index: '5.4'
      },
      {
        id: '2.4.5',
        name: 'Operation Analyse',
        path: '/operationAnalyse',
        display: true,
        index: '5.5'
      }
    ]
  },
  {
    id: '2.5',
    name: 'System',
    display: true,
    path: '/appManager',
    authority: ['ROLE_APPSTORE_ADMIN'],
    index: '6',
    children: [
      {
        id: '2.5.1',
        name: 'APP Management',
        path: '/appManager',
        display: true,
        index: '6.1'
      },
      {
        id: '2.5.2',
        name: 'Host Management',
        path: '/systemHostt',
        display: true,
        index: '6.2'
      }
    ]
  },
  {
    id: '2.6',
    name: 'Docs',
    path: '/docs',
    display: true,
    index: '7'
  }
]

export default {
  mecAppstore
}
