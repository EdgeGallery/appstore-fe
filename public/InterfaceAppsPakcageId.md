## 接口清单

### /mec/appstore/v2/apps/{appId}/packages/{packageId}
###  GET
通过应用ID和应用包ID获取应用包
### 请求
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|appId | path |N| String | 应用 id|
|packageId | path |N| String | 应用包 id|

#### 请求示例
```
{
    "appId": "string",
    "packageId": "string"
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
    "data": {
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
    }
    "retCode": int,
    "params": string[],
    "message": "string"
}
```
