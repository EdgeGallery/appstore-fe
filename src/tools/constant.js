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

const INDUSTRY = [
  {
    label: ['智慧园区', 'Smart Park'],
    value: 'Smart Park',
    selected: false,
    type: 'industry'
  },
  {
    label: ['智慧商超', 'Smart Supermarket'],
    value: 'Smart Supermarket',
    selected: false,
    type: 'industry'
  },
  {
    label: ['工业制造', 'Industrial Manufacturing'],
    value: 'Industrial Manufacturing',
    selected: false,
    type: 'industry'
  },
  {
    label: ['交通物流', 'Transportation Logistics'],
    value: 'Transportation Logistics',
    selected: false,
    type: 'industry'
  },
  {
    label: ['水利', 'Water Conservancy'],
    value: 'Water Conservancy',
    selected: false,
    type: 'industry'
  },
  {
    label: ['游戏竞技', 'Game Competition'],
    value: 'Game Competition',
    selected: false,
    type: 'industry'
  },
  {
    label: ['开源', 'Open Source'],
    value: 'Open Source',
    selected: false,
    type: 'industry'
  },
  {
    label: ['其他', 'Other'],
    value: 'Other',
    selected: false,
    type: 'industry'
  }
]

const TYPES = [
  {
    label: ['视频应用', 'Video Application'],
    value: 'Video Application',
    selected: false,
    type: 'types'
  },
  {
    label: ['游戏', 'Game'],
    value: 'Game',
    selected: false,
    type: 'types'
  },
  {
    label: ['视频监控', 'Video Surveillance'],
    value: 'Video Surveillance',
    selected: false,
    type: 'types'
  },
  {
    label: ['安全', 'Safety'],
    value: 'Safety',
    selected: false,
    type: 'types'
  },
  {
    label: ['区块链', 'Blockchain'],
    value: 'Blockchain',
    selected: false,
    type: 'types'
  },
  {
    label: ['智能设备', 'Smart Device'],
    value: 'Smart Device',
    selected: false,
    type: 'types'
  },
  {
    label: ['物联网', 'Internet of Things'],
    value: 'Internet of Things',
    selected: false,
    type: 'types'
  },
  {
    label: ['大数据', 'BigData'],
    value: 'BigData',
    selected: false,
    type: 'types'
  },
  {
    label: ['AR/VR', 'AR/VR'],
    value: 'AR/VR',
    selected: false,
    type: 'types'
  },
  {
    label: ['API', 'API'],
    value: 'API',
    selected: false,
    type: 'types'
  },
  {
    label: ['SDK', 'SDK'],
    value: 'SDK',
    selected: false,
    type: 'types'
  },
  {
    label: ['MEP', 'MEP'],
    value: 'MEP',
    selected: false,
    type: 'types'
  }
]

const TTYPES = [
  {
    label: ['转换器1', 'EdgeGallery_APPD_1.0 -> 联通_APPD_1.0'],
    value: 'EdgeGallery_APPD_1.0 -> 联通_APPD_1.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['转换器2', 'EdgeGallery_APPD_1.0 -> 移动_APPD_1.0'],
    value: 'EdgeGallery_APPD_1.0 -> 移动_APPD_1.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['转换器3', 'EdgeGallery_APPD_1.0 -> 电信_APPD_1.0'],
    value: 'EdgeGallery_APPD_1.0 -> 电信_APPD_1.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['转换器4', '联通_APPD_1.0 -> EdgeGallery_APPD_1.0'],
    value: '联通_APPD_1.0 -> EdgeGallery_APPD_1.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['转换器5', '移动_APPD_1.0 -> EdgeGallery_APPD_1.0'],
    value: '移动_APPD_1.0 -> EdgeGallery_APPD_1.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['转换器6', '电信_APPD_1.0 -> EdgeGallery_APPD_1.0'],
    value: '电信_APPD_1.0 -> EdgeGallery_APPD_1.0',
    selected: false,
    type: 'types'
  }
]

const AFFINITY = [
  {
    label: 'x86',
    value: 'x86',
    selected: false,
    type: 'affinity'
  },
  {
    label: 'ARM64',
    value: 'ARM64',
    selected: false,
    type: 'affinity'
  },
  {
    label: 'ARM32',
    value: 'ARM32',
    selected: false,
    type: 'affinity'
  }
  // {
  //   label: 'GPU',
  //   value: 'GPU',
  //   selected: false,
  //   type: 'affinity'
  // },
  // {
  //   label: 'NPU',
  //   value: 'NPU',
  //   selected: false,
  //   type: 'affinity'
  // }
]

const SORT_BY = [
  {
    label: ['下载量', 'Most'],
    value: 'Most',
    selected: false,
    type: 'sortBy'
  },
  {
    label: ['名称', 'Name'],
    value: 'Name',
    selected: false,
    type: 'sortBy'
  },
  {
    label: ['评分', 'Score'],
    value: 'Score',
    selected: false,
    type: 'sortBy'
  }
]

export {
  TYPES, AFFINITY, SORT_BY, INDUSTRY, TTYPES
}
