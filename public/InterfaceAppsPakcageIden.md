## Interface list

### /mec/appstore/v2/apps/{appId}/packages/{packageId}
###  GET
Get the application package list by application Id and application package Id.
### Request
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appId | path |N| String | App Id|
|packageId | path |N| String | Package Id|

#### Example request
```
{
    "packageId": "string",
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
|packageId | Package Id |
|name | App Name|
|provider | Provider |
|version | Version |
|affinity | Affinity |
|shortDesc | Short Desc |
|industry | Industry |
|type | Type |
|createTime | Create Time |
|details | Details |
|downloadCount |Download Counts |
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
