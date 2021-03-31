##接口清单

### /{platformId}/pullable
###  GET
根据仓库ID获取该仓库可拉取的应用列表
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|platformId | path |Y| String | 应用仓库Id |

#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|400 | bad request |