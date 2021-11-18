## 接口清单

### /mec/appstore/v2/apps/action/query
###  POST
获取本仓库的应用列表
### 请求
#### 请求参数
| 字段名       | 描述         |位置   | 字段类型        | 必选  |
| ------------ | ------------ | ------------ |--------------- | ---- |
| types        | 应用类型     | requestBody | List<String>    | no   |
| showType     | 应用显示类型 | requestBody | List<String>    | no   |
| affinity     | 应用架构     | requestBody | List<String>    | no   |
| industry     | 应用行业     | requestBody | List<String>    | no   |
| workloadType | 应用负载类型 | requestBody | List<String>    | no   |
| userId       | 用户Id       | requestBody | String          | no   |
| queryCtrl    | 查询条件     | requestBody | QueryAppCtrlDto | yes  |

QueryAppCtrlDto

| 字段名   | 描述                        | 字段类型     | 必选 |
| -------- | --------------------------- | ------------ | ---- |
| limit    | 分页查询每页查询数量[1,500] | int          | yes  |
| offset   | 分页查询起始页，从0开始     | int          | yes  |
| sortItem | 查询排序字段                | String       | no   |
| sortType | 查询排序方式升序/降序       | String       | no   |
| status   | 应用状态                    | List<String> | no   |
| appName  | 应用名称                    | String       | no   |

#### 请求示例
```
{
    "queryCtrl":
    {
        "limit": 10,
        "offset": 0,
        "sortType": "",
        "sortItem": "",
        "status": [""],
        "appName": ""
    },
    "types": [""],
    "showType": [""],
    "affinity": [""],
    "industry": [""],
    "workloadType": [""],
    "userId": ""
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
|packageId | 应用包 id |
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
|hotApp | 是否热门应用 |
|exprienceAble | 是否可以在线体验 |

#### 响应示例
```
{
    "results": [
        {
            "appId": "string",
            "packageId": "string",
            "iconUrl": "string",
            "name": "string",
            "provider": "string",
            "type": "string",
            "shortDesc": "string",
            "showType": "string",
            "createTime": "string",
            "details": "string",
            "downloadCount": int,
            "affinity": "string",
            "industry": "string",
            "contact": "string",
            "score": 5.0,
            "userId": "string",
            "userName": "string",
            "status": "string",
            "deployMode": "string",
            "hotApp": false,
            "exprienceAble": false
        }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
}
```
