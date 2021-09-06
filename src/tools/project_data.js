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

const Industry = [
  {
    value: 'Smart Park',
    label: ['智慧园区', 'Smart Park']
  }, {
    value: 'Smart Supermarket',
    label: ['智慧商城', 'Smart Supermarket']
  }, {
    value: 'Industrial Manufacturing',
    label: ['工业制造', 'Industrial Manufacturing']
  }, {
    value: 'Transportation Logistics',
    label: ['交通物流', 'Transportation Logistics']
  }, {
    value: 'Water Conservancy',
    label: ['水利', 'Water Conservancy']
  }, {
    value: 'Game Competition',
    label: ['游戏竞技', 'Game Competition']
  }, {
    value: 'Open Source',
    label: ['开源', 'Open Source']
  }, {
    value: 'Other',
    label: ['其他', 'Other']
  }
]

const Type = [
  {
    value: 'Video Application',
    label: ['视频应用', 'Video Application']
  }, {
    value: 'Game',
    label: ['游戏', 'Game']
  }, {
    value: 'Video Surveillance',
    label: ['视频监控', 'Video Surveillance']
  }, {
    value: 'Safety',
    label: ['安全', 'Safety']
  }, {
    value: 'Blockchain',
    label: ['区块链', 'Blockchain']
  }, {
    value: 'Smart Device',
    label: ['智能设备', 'Smart Device']
  }, {
    value: 'Internet of Things',
    label: ['物联网', 'Internet of Things']
  }, {
    value: 'Big Data',
    label: ['大数据', 'Big Data']
  }, {
    value: 'AR/VR',
    label: ['AR/VR', 'AR/VR']
  }, {
    value: 'API',
    label: ['API', 'API']
  }, {
    value: 'SDK',
    label: ['SDK', 'SDK']
  }, {
    value: 'MEP',
    label: ['MEP', 'MEP']
  }, {
    value: 'Other',
    label: ['其他', 'Other']
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

const Capability = [
  {
    value: 'Platform basic services',
    label: ['平台基础服务', 'Platform basic services']
  }, {
    value: 'Service governance',
    label: ['服务治理', 'Service governance']
  }, {
    value: 'Telecom network capabilities',
    label: ['电信网络能力', 'Telecom network capabilities']
  }, {
    value: 'Bandwidth management',
    label: ['带宽管理', 'Bandwidth management']
  }, {
    value: 'Location service',
    label: ['位置服务', 'Location service']
  }, {
    value: 'UE identity',
    label: ['UE标识', 'UE identity']
  }, {
    value: 'Traffic Rule',
    label: ['流量规则', 'Traffic Rule']
  }, {
    value: 'AI capabilities',
    label: ['AI功能', 'AI capabilities']
  }, {
    value: 'Face Recognition',
    label: ['人脸识别', 'Face Recognition']
  }, {
    value: 'Card recognition',
    label: ['卡证识别', 'Card recognition']
  }, {
    value: 'Gesture recognition',
    label: ['姿态识别', 'Gesture recognition']
  }, {
    value: 'face and body recognition',
    label: ['人脸和人体识别', 'Face and body recognition']
  }, {
    value: 'Picture text recognition',
    label: ['图片和文字识别', 'Picture text recognition']
  }, {
    value: 'Knowledge Graph',
    label: ['知识图谱', 'knowledge Graph']
  }, {
    value: 'Natural language processing',
    label: ['自然语言处理', 'Natural language processing']
  }, {
    value: 'Video Surveillance',
    label: ['视频监控', 'Video Surveillance']
  }, {
    value: 'Video processing',
    label: ['视频处理', 'Video processing']
  }, {
    value: 'Encoding decoding',
    label: ['编解码', 'Encoding decoding']
  }, {
    value: 'DateBase',
    label: ['数据库', 'DateBase']
  }, {
    value: 'Data management',
    label: ['数据管理', 'Data management']
  }, {
    value: 'Public framework',
    label: ['公共框架', 'Public framework']
  }, {
    value: 'Message bus',
    label: ['消息总线', 'Message bus']
  }, {
    value: 'Gateway',
    label: ['统一网关', 'Gateway']
  }, {
    value: 'Multi-cloud capabilities',
    label: ['多云功能', 'Multi-cloud capabilities']
  }, {
    value: 'Traffic',
    label: ['流量', 'Traffic']
  }, {
    value: 'Service Discovery',
    label: ['服务发现', 'Service Discovery']
  }, {
    value: 'Location',
    label: ['位置', 'Location']
  }, {
    value: 'Bandwidth',
    label: ['带宽', 'Bandwidth']
  }, {
    value: 'Face Recognition',
    label: ['人脸识别', 'Face Recognition']
  }
]

const ApiInfo = [
  {
    value: 'Service',
    label: ['服务介绍', 'Service Introduction']
  },
  {
    value: 'List',
    label: ['服务列表', 'Service List']
  }
]

export {
  Industry,
  Type,
  Architecture,
  Capability,
  ApiInfo
}
