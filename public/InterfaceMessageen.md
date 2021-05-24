## Interface list

### /mec/appstore/v2/messages
### POST
Add message
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|dto | path |Y| String | MessageReqDto |

#### Sample data
##### Request date
    {
    	"BasicMessageInfo": {
    		"name": "string",
    		"provider": "string",
    		"version": "string",
    		"affinity": "string",
    		"shortDesc": "string",
    		"industry": "string",
    		"type": "string"
    	},
    	"sourceAppStore": "string",
    	"targetAppStore": "string",
    	"atpTestStatus": "string",
    	"atpTestTaskId": "string",
    	"atpTestReportUrl": "string",
    	"packageDownloadUrl": "string",
    	"iconDownloadUrl": "string"
    }
##### Response date
    {
    	"data": {
    		"results": [{
    			"messageId": "string",
    			"basicInfo": {
    				"name": "test_zhang",
    				"provider": "Huawei",
    				"version": "1.0",
    				"affinity": "X86",
    				"shortDesc": "tttest",
    				"industry": "Smart Park",
    				"type": "Video Application"
    			},
    			"messageType": "NOTICE",
    			"sourceAppStore": "EdgeGallery AppStore",
    			"targetAppStore": "string",
    			"time": "2021-04-19 16:39:43",
    			"description": "string.",
    			"atpTestStatus": "success",
    			"atpTestTaskId": "string",
    			"atpTestReportUrl": "string",
    			"iconDownloadUrl": "string",
    			"readed": true
    		}],
    		"limit": 100,
    		"offset": 0,
    		"total": 1
    	},
    	"retCode": int,
    	"params": [string],
    	"message": "string"
    }


#### Request parameter MessageReqDto
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|BasicMessageInfo | path |Y| Object | Basic Information |
|sourceAppStore | path |Y| String | source app store |
|targetAppStore | path |Y| String | Target app store |
|atpTestStatus | path |Y| String | atp test status |
|atpTestTaskId | path |Y| String | atp test task id |
|atpTestReportUrl | path |Y| String | atp test path |
|packageDownloadUrl | path |Y| String | Application package download path |
|iconDownloadUrl | path |Y| String | Icon download path |

#### Request parameter BasicMessageInfo
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|name | path |Y| String | Attribute |
|provider | path |Y| String | Name |
|version | path |Y| String | Version |
|affinity | path |Y| String | Affinity |
|shortDesc | path |Y| String | Description |
|industry | path |Y| String | Industry |
|type | path |Y| String | Type |

#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|500 | Resource grant error |