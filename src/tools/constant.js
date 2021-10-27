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

const INDUSTRY = [
  {
    labelcn: '智慧城市',
    labelen: 'Smart City',
    value: 'Smart City',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '智慧园区',
    labelen: 'Smart Park',
    value: 'Smart Park',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '智慧农业',
    labelen: 'Smart Agriculture',
    value: 'Smart Agriculture',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '工业互联网',
    labelen: 'Industrial Internet',
    value: 'Industrial Internet',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '交通物流',
    labelen: 'Transportation Logistics',
    value: 'Transportation Logistics',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '能源',
    labelen: 'Internet',
    value: 'Internet',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '金融',
    labelen: 'Finance',
    value: 'Finance',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '教育',
    labelen: 'Education',
    value: 'Education',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '文化旅游',
    labelen: 'Cultural Tourism',
    value: 'Cultural Tourism',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '医疗健康',
    labelen: 'Medical Health',
    value: 'Medical Health',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '数字政府',
    labelen: 'Digital Government',
    value: 'Digital Government',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '生态环境',
    labelen: 'Ecosystem',
    value: 'Ecosystem',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '游戏竞技',
    labelen: 'Game Competition',
    value: 'Game Competition',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '其他',
    labelen: 'Others',
    value: 'Others',
    selected: false,
    type: 'industry'
  }
]

const TYPES = [
  {
    labelcn: '视频应用',
    labelen: 'Video Application',
    value: 'Video Application',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '安全',
    labelen: 'Safety',
    value: 'Safety',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '区块链',
    labelen: 'Blockchain',
    value: 'Blockchain',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '物联网',
    labelen: 'Internet of Things',
    value: 'Internet of Things',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '大数据',
    labelen: 'Big Data',
    value: 'Big Data',
    selected: false,
    type: 'types'
  },
  {
    labelcn: 'AR/VR',
    labelen: 'AR/VR',
    value: 'AR/VR',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '游戏',
    labelen: 'Game',
    value: 'Game',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '其他',
    labelen: 'Others',
    value: 'Others',
    selected: false,
    type: 'types'
  }
]

const TTYPES = [
  {
    label: ['联通_APPD_2.0', 'Unicom_APPD_2.0'],
    value: '联通_APPD_2.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['移动_APPD_2.0', 'Mobile_APPD_2.0'],
    value: '移动_APPD_2.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['电信_APPD_2.0', 'Telecom_APPD_2.0'],
    value: '电信_APPD_2.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['社区_APPD_2.0', 'Community_APPD_2.0'],
    value: '社区_APPD_2.0',
    selected: false,
    type: 'types'
  }
]

const AFFINITY = [
  {
    label: 'X86',
    value: 'X86',
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
]

const DEPLOYMODE = [
  {
    labelcn: '容器',
    labelen: 'container',
    value: 'container',
    selected: false,
    type: 'workloadType'
  },
  {
    labelcn: '虚拟机',
    labelen: 'vm',
    value: 'vm',
    selected: false,
    type: 'workloadType'
  }
]

const SORTITEM = [
  {
    labelcn: '下载量',
    labelen: 'DownloadCount',
    value: 'DownloadCount',
    selected: false,
    type: 'sortItem'
  },
  {
    labelcn: '名称',
    labelen: 'AppName',
    value: 'AppName',
    selected: false,
    type: 'sortItem'
  },
  {
    labelcn: '评分',
    labelen: 'Score',
    value: 'Score',
    selected: false,
    type: 'sortItem'
  },
  {
    labelcn: '上传时间',
    labelen: 'CreateTime',
    value: 'CreateTime',
    selected: false,
    type: 'sortItem'
  }
]

const MEAO = [
  {
    labelcn: '华为 MEAO',
    labelen: 'Huawei MEAO',
    value: ''
  },
  {
    labelcn: '九州云 MEAO',
    labelen: 'JiuzhouCloud MEAO',
    value: ''
  }
]

const Architecture = [
  {
    value: 'X86',
    label: 'X86'
  }, {
    value: 'ARM64',
    label: 'ARM64'
  }, {
    value: 'ARM32',
    label: 'ARM32'
  }
]

export {
  TYPES, AFFINITY, SORTITEM, INDUSTRY, TTYPES, DEPLOYMODE, Architecture, MEAO
}
