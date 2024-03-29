## 接口清单

### /mec/appstore/v2/apps/{appId}/packages
###  GET
通过应用ID获取应用包列表
### 请求
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|limit | path |Y| String | 应用限制 |
|offset | path |Y| String | 应用 offset |
|userId | path |N| String | 用户 id|
|appId | path |Y| String | 应用 id|
|request | path |N| String | 请求体|

#### 请求示例
```
{
    "limit": 10,
    "offset": 0,
    "appId": "string",
    "userId": "string"
}
```

### 响应
#### 响应参数
|返回码  |描述|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |

|返回字段  |描述|
|-----|-----|
|appId | 应用 id |
|packageId | 应用包id |
|name | 应用名 |
|provider | 提供者 |
|version | 版本 |
|affinity | 架构 |
|shortDesc | 描述 |
|industry | 行业 |
|type | 应用类型 |
|createTime | 创建时间 |
|details | 详情 |
|downloadCount |下载量 |
|contact | 联系方式 |
|testTaskId | 测试任务id |
|userId | 用户id |
|userName | 用户名 |
|status | 状态 |
|demoVideoName | 视频名称 |
|deployMode | 负载类型 |

#### 响应示例
```
{
    "results": [{
        "packageId": "string",
        "userName": "string",
        "status": "string",
        "shortDesc": "string",
        "provider": "string",
        "testTaskId": "string",
        "size": "string",
        "demoVideoName": "string",
        "createTime": "string",
        "name": "string",
        "version": "string",
        "type": "string",
        "details": "string",
        "affinity": "string",
        "industry": "string",
        "contact": "string",
        "appId": "string",
        "userId": "string",
        "deployMode": "string"
    }],
    "limit": 10,
    "offset": 0,
    "total": 1
}
```
