## 接口清单

### /apps/{appId}/action/download
###  GET
根据应用ID下载其最新版本的应用包
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|appId | path |Y| String | app id |

#### 样例数据
##### 请求数据
    {"packageId": "String"}
##### 响应数据
    {
    "data": "string",
	"resCode": int,
	"params": [string],
	"errMsg": "string",
	"messge": "string"
    }

#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |


### /apps/{appId}/packages/{packageId}/action/download
###  GET
通过应用ID和应用包ID下载应用包
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|appId | path |Y| String | app id |
|packageId | path |Y| String | package Id |

#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |


### /apps/{appId}
###  GET
通过应用ID获取应用详细信息
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|appeId | path |Y| String | app Id |

#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |