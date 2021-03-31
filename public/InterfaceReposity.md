## 外部仓库接口
### 功能介绍

外部仓库信息

### 接口清单

### /mec/appstore/v1/appstores
###  GET
查询外部仓库信息
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|appStoreName | path |Y| String | app store name |
|company | path |Y| String | app store company |

#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |