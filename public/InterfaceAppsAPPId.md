## 接口清单

### /mec/appstore/v2/apps/{appId}
###  GET
获取应用详情
### 请求
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|appId | path |N| String | App id |

#### 请求示例
```
{
    "appId": "string"
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
|name | 应用名 |
|provider | 提供者 |
|iconUrl | icon路径 |
|version | 版本 |
|affinity | 架构 |
|shortDesc | 描述 |
|industry | 行业 |
|type | 应用类型 |
|showType | 展示类型 |
|createTime | 创建时间 |
|details | 详情 |
|downloadCount |下载量 |
|contact | 联系方式 |
|score | 分数 |
|userId | 用户id |
|userName | 用户名 |
|status | 状态 |
|deployMode | 负载类型 |

#### 响应示例
```
{
    "data": {
        "appId": "String",
        "name": "String",
        "provider": "String",
        "iconUrl": "string",
        "version": "string",
        "affinity": "string",
        "shortDesc": "String",
        "industry": "String",
        "type": null,
        "showType": 0,
        "score": int,
        "details": null,
        "affinity": "affinity",
        "shortDesc": "shortdesc",
        "downloadCount": int "contact": "string",
        "createTime": "2021-04-29 19:56:44",
        "deployMode": "container",
        "userId": "string",
        "userName": "string",
        "status": "string"
    },
    "retCode": int,
    "params": string[],
    "message": "string"
}
```
