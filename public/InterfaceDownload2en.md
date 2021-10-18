## Interface list

###  /mec/appstore/v1/packages/{packageId}/action/download-icon
### GET
Download application icons by application package ID
### Request
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
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
|400 | bad request |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |

#### Example response
```
    200 OK
    binary output
```
