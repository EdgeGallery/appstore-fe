## 接口清单

### /apps/{appId}/icon
###  GET
根据应用ID下载应用图标
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|appId | path |Y| String | app id |

#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |



### /{packageId}/action/download-icon
###  GET
通过应用包ID下载应用图标
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|packageId | path |Y| String | package Id |

#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|400 | bad request |