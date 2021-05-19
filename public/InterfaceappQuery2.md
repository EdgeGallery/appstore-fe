## 接口清单

### /{packageId}/action/pull
###  GET
获取本仓库所有可拉取的应用列表
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|name | path |N| String | App name |
|provider | path |N| String | app provider |
|type | path |N| String | app type |
|affinity | path |N| String | app affinity |
|userId | path |N| String | userId|

#### 样例数据
##### 请求数据
    {
    "limit": 10,
    "offset": 0,
    "appName": "String",
    "sortType": "desc",
    "sortItem": "createTime"
    }
##### 响应数据
        {
        "data": {
        	"results": [{
        		"appId": "String",
        		"packageId": "String",
        		"name": "String",
        		"provider": "PROVIDER",
        		"version": "version",
        		"atpTestStatus": "success",
        		"atpTestTaskId": "String",
        		"atpTestReportUrl": "String",
        		"latestPushTime": null,
        		"pushTimes": 0,
        		"sourcePlatform": null,
        		"targetPlatform": null,
        		"affinity": "affinity",
        		"shortDesc": "shortdesc",
        		"industry": "industry",
        		"type": "game",
        		"createTime": "2021-04-29 19:56:44",
        		"deployMode": "container"
        	}],
        	"limit": 10,
        	"offset": 0,
        	"total": 1
        },
    	"resCode": int,
    	"params": string[],
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

|返回字段  |描述|
|-----|-----|
|PushablePackageDto | 返回实体类 |
|appId | 应用 id |
|packageId | 应用包 id  |
|name | 名称 |
|provider | 提供者 |
|version | 版本 |
|atpTestStatus | atp测试状态 |
|atpTestTaskId | atp测试任务id |
|atpTestReportUrl | atp测试url |
|latestPushTime | 最后推送时间 |
|pushTimes | 推送时间 |
|sourcePlatform | 源平台 |
|targetPlatform | 目标平台 |
|affinity | 亲和性 |
|shortDesc | 描述 |
|industry | 行业 |
|type | 应用类型 |
|createTime | 创建时间 |