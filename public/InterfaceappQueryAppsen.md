## Interface list

### /mec/appstore/v2/apps
###  GET

get app list

#### Request parameters

|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appName | path |N| String | App name |
|limit | path |Y| String | app limit |
|offset | path |Y| String | app offset |
|sortType | path |Y| String | app sortType |
|sortItem | path |N| String | app sortItem|
|type | path |N| String | app type|
|affinity | path |N| String | affinity|
|industry | path |N| String | industry|
|createTime | path |N| String | createTime|
|downloadCount | path |N| String | downloadCount|
|score | path |N| String | score|

#### Sample data
##### Request data
    {
    "limit": 10,
    "offset": 0,
    "appName": "String",
    "sortType": "desc",
    "type": "string",
	"affinity": "string",
	"sortItem": "string",
	"industry": "industry",
	"createTime": "string",
	"downloadCount": "string",
	"score": "string"
    }
##### Response date
        {
        "data": {
        	"results": [ {
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
        		"downloadCount": int
        		"contact": "string",
        		"createTime": "2021-04-29 19:56:44",
        		"deployMode": "container",
						"userId":"string",
						"userName":"string",
						"status":"string"
        	}],
        	"limit": 10,
        	"offset": 0,
        	"total": 1
        },
    	"resCode": int,
    	"params": string[],
    	"errMsg": "string",
    	"messge": "string"
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