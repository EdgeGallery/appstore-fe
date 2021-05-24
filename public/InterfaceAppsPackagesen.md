## Interface list

### /mec/appstore/v2/apps/{appId}/packages
###  GET
Get the application package list by application ID.
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|limit | path |Y| String | app limit |
|offset | path |Y| String | app offset |
|userId | path |N| String | userId|
|appId | path |N| String | appId|
|request | path |N| String | 请求提|

#### Sample data
##### Request data
{
	"limit": 10,
	"offset": 0,
	"appId": "string",
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
    			"deployMode": "string"
    		}],
    		"limit": 10,
    		"offset": 0,
    		"total": 1
    	}
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