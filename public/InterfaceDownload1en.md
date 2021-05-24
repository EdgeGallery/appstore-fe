## Interface list

### /mec/appstore/v1/apps/{appId}/packages/{packageId}/action/download
### GET
Download application package by application ID and application package ID
### Request
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appId | path |Y| String | app id |
|packageId | path |Y| String | package Id |

#### Example request
```
{
    "packageId": "String"
}
```

### Response
#### Response parameters
|Return Code |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity |
|500 | Resource grant error |

#### Example response
```
    200 OK
    binary output
```

### /mec/appstore/v1/packages/{packageId}/action/download-package
### GET
Download application package by application package ID
### Request
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|packageId | path |Y| String | package Id |
|targetAppstore | path |Y| String | target Appstore |

#### 请求示例
```
    {
    	"packageId": "String",
    	"targetAppstore": "String"
    }
```

### Response
#### Response parameters
|Return Code |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity |
|500 | Resource grant error |

#### Example response
```
    200 OK
    binary output
```