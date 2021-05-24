## Interface list

### /mec/appstore/v1/apps/{appId}/packages/{packageId}/action/download
### GET
Download application package by application ID and application package ID
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appId | path |Y| String | app id |
|packageId | path |Y| String | package Id |

#### Sample data
##### Request date
    {
    	"packageId": "String"
    }
##### Response Data
    200 OK
    binary output



#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity |
|500 | Resource grant error |


### /apps/{appId}
### GET
Get application details by application ID
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appeId | path |Y| String | app Id |

#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity |
|500 | Resource grant error |