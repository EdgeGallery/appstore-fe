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
  
# 内容简介

Application Store为一般开发者提供一个发布自己所开发应用的平台，通过提供APP Package获取接口，为MECM提供基本运作资源。资源类型有两种，APP和Package，一个APP对应多个Package，使用者可直接下载APP的最新版本Package或者下载指定版本的Package。

## 架构设计

1. appstore-fe：开发者平台前台框架，使用VUE开发。

2. appstore-be：开发者平台后台框架，使用SpringBoot+ServiceComb开发。（有关ServiceComb请参考这里：[https://servicecomb.apache.org/cn/](https://servicecomb.apache.org/cn/)）

3. appstore DB：后台依赖Postgres数据库。

## 部署视图

部署视图是按照K8S部署设计的， 在实际部署过程中，可以直接在虚拟机或者docker容器中启动各自的服务，部署过程中需要有一下几点注意：

* appstore-fe，appstore-be，DB Service都需要注册到ServiceCenter中，有关ServiceCenter的使用方法请参考：
   [https://servicecomb.apache.org/cn/](https://servicecomb.apache.org/cn/)

* 推荐使用Chrome浏览器

