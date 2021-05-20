## Interface list

### /apps/{appId}/icon
### GET
Download the app icon based on the app ID
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appId | path |Y| String | app id |

#### Sample data
##### Request date
    {"packageId": "String"}
    
##### Response date
    {
    "data": "string",
	"resCode": int,
	"params": [string],
	"errMsg": "string",
	"messge": "string"
    }

#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity |
|500 | Resource grant error |



### /{packageId}/action/download-icon
### GET
Download application icons by application package ID
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|packageId | path |Y| String | package Id |

#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|400 | bad request |