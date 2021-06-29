## Interface list

### /mec/appstore/v2/query/apps
###  POST

get app list

### Request
#### Request parameters

|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appName | requestBody |N| String | App name |
|limit | requestBody |Y| String | app limit |
|offset | requestBody |Y| String | app offset |
|sortType | requestBody |Y| String | app sortType |
|sortItem | requestBody |N| String | app sortItem|
|type | requestBody |N| String | app type|
|affinity | requestBody |N| String | affinity|
|industry | requestBody |N| String | industry|
|createTime | requestBody |N| String | createTime|
|downloadCount | requestBody |N| String | downloadCount|
|score | requestBody |N| String | score|

#### Example request
```
{
    "limit": 10,
    "offset": 0,
    "appName": "String",
    "sortType": "desc",
    "type": "string",
    "affinity": "string",
    "sortItem": "string",
    "industry": "industry",
    "createTime": "string",
    "downloadCount": "string",
    "score": "string"
}
```

### Response
#### Response parameters
|Return Code  |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |

|Back to Field   |Description|
|-----|-----|
|appId | Application id |
|name | Name |
|provider | Provider |
|iconUrl | iconUrl |
|version | Version |
|affinity | Affinity |
|shortDesc | Description |
|industry | Industry |
|type | Application Type |
|showType | show Type |
|createTime | Creation time |
|details | details |
|downloadCount | app download Count |
|contact | contact |
|score | score |
|userId | userId |
|userName | userName |
|status | status |
|deployMode | workloadType |

#### Example response
```
{
    "results": [{
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
    }],
    "limit": 10,
    "offset": 0,
    "total": 1
}
```
