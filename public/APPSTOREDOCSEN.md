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

# Introduction

The Application Store provides a platform for general developers to publish applications developed by themselves, and provides an APP Package to obtain interfaces to provide basic operating resources for MECM. There are two types of resources, APP and Package. An APP corresponds to multiple packages. Users can directly download the latest version of the APP package or download a specified version of the package.

## Architecture design

1. appstore-fe: front-end framework for developer platforms, developed using VUE.
2. appstore-be: Developer platform background framework, developed using SpringBoot + ServiceComb. (For ServiceComb please refer here:[https://servicecomb.apache.org/cn/](https://servicecomb.apache.org/cn/))
3. appstore DB: The background depends on the Postgres database.

## Deployment view

Deployment view is designed according to K8S deployment. In the actual deployment process, you can start the respective services directly in the virtual machine or docker container. There are a few points to note during the deployment process:

* Appstore-fe, appstore-be, and DB Service all need to be registered in ServiceCenter. For how to use ServiceCenter, please refer to: 
  [https://servicecomb.apache.org/cn/](https://servicecomb.apache.org/cn/)

* Recommended Chrome browser

