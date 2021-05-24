## Interface list

### /mec/appstore/v2/packages/{packageId}/pullable
### GET
Get a list of all available applications in this warehouse
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appName | path |N| String | app name |
|limit | path |Y| int | data limit |
|offset | path |Y| int | data offset |
|sortType | path |Y| String | app sortType |
|sortItem | path |Y| String | app sortItem|

#### Sample data

##### Request data
    {
    	"limit": 10,
    	"offset": 0,
    	"appName": "String",
    	"sortType": "desc",
    	"sortItem": "createTime"
    }

##### Response data
{
	"results": [{
		"appId": "String",
		"packageId": "String",
		"name": "String",
		"provider": "PROVIDER",
		"version": "version",
		"atpTestStatus": "success",
		"atpTestTaskId": "String",
		"atpTestReportUrl": "String",
		"latestPushTime": null,
		"pushTimes": 0,
		"sourcePlatform": null,
		"targetPlatform": null,
		"affinity": "affinity",
		"shortDesc": "shortdesc",
		"industry": "industry",
		"type": "game",
		"createTime": "2021-04-29 19:56:44",
		"deployMode": "container"
	}],
	"limit": 10,
	"offset": 0,
	"total": 1
}

#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity |
|500 | Resource grant error |

|Back to Field |Description|
|-----|-----|
|PushablePackageDto | Return to entity class |
|appId | Application id |
|packageId | Application package id |
|name | Name |
|provider | Provider |
|version | Version |
|atpTestStatus | atp test status |
|atpTestTaskId | atp test task id |
|atpTestReportUrl | atp test url |
|latestPushTime | Last push time |
|pushTimes | Push Time |
|sourcePlatform | Original platform |
|targetPlatform | Target Platform |
|affinity | Affinity |
|shortDesc | Description |
|industry | Industry |
|type | Application Type |
|createTime | Creation time |
|resCode | response code |
|params | response parameter |
|errMsg | response error message |
|messge | response message |