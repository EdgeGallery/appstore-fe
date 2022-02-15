## Interface list

### /mec/appstore/v2/apps/{appId}/packages
###  GET
Get the application package list by application ID.
### Request
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|limit | path |Y| String | app limit |
|offset | path |Y| String | app offset |
|userId | path |N| String | user id|
|appId | path |Y| String | app id|
|request | path |N| String | request body|

#### Example request
```
{
    "limit": 10,
    "offset": 0,
    "appId": "string",
    "userId": "string"
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
|appId | App Id |
|packageId | App Package Id |
|name | App Name|
|provider | Provider |
|version | Version |
|affinity | Affinity |
|shortDesc | Short Desc |
|industry | Industry |
|type | Type |
|createTime | Create Time |
|details | Details |
|downloadCount |Download Count |
|contact | Contact |
|testTaskId | Test Task Id |
|userId | User Id |
|userName | User Name |
|status | Status |
|demoVideoName | Demo Video Name |
|deployMode | Deploy Mode |

#### Example response
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
