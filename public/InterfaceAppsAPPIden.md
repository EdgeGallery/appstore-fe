## Interface list

### /mec/appstore/v2/apps/{appId}
###  GET
get app detail
### Request
#### Request parameters

|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appId | path |N| String | App id |

#### Example request
```
{
    "appId": "string"
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
