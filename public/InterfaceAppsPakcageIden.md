## Interface list

### /mec/appstore/v1/apps/{appId}/packages/{packageId}
###  GET
Get the application package list by application ID.
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appId | path |N| String | appId|
|packageId | path |N| String | packageId|

#### Sample data
##### Request data
    {
    "packageId": "string",
    "userId": "string"
    }
##### Response date
        {
        "data": {
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
			"deployMode":"string"
  				},
        }

#### Return data
|Return Code  |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |

|Back to Field   |Description|
|-----|-----|
|appId | app id |
|packageId | packageid |
|name | appname|
|provider | provider |
|version | version |
|affinity | affinity |
|shortDesc | shortDesc |
|industry | industry |
|type | type |
|createTime | createTime |
|details | details |
|downloadCount |downloadCount |
|contact | contact |
|testTaskId | testTaskId |
|userId | userId |
|userName | userName |
|status | status |
|demoVideoName | demoVideoName |
|deployMode | deployMode |