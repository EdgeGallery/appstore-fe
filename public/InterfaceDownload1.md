## 接口清单


### /mec/appstore/v1/apps/{appId}/packages/{packageId}/action/download
###  GET
通过应用ID和应用包ID下载应用包
### 请求
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|appId | path |Y| String | app id |
|packageId | path |Y| String | package Id |

#### 请求示例
```
{
    "packageId": "String"
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

#### 响应示例
```
    200 OK
    binary output
```
