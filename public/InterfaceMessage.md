## 接口清单

### /mec/appstore/v2/messages
###  POST
添加消息
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|dto | path |Y| Object | MessageReqDto |

#### 样例数据
##### 请求数据
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
##### 响应数据
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


#### 请求参数 MessageReqDto
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|BasicMessageInfo | path |Y| Object | 基本信息 |
|sourceAppStore | path |Y| String | 源 app store |
|targetAppStore | path |Y| String | 目标 app store |
|atpTestStatus | path |Y| String | atp测试状态 |
|atpTestTaskId | path |Y| String | atp测试任务id |
|atpTestReportUrl | path |Y| String | atp测试路径 |
|packageDownloadUrl | path |Y| String | 应用包下载路径 |
|iconDownloadUrl | path |Y| String | 图标下载路径 |

#### 请求参数 BasicMessageInfo
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|name | path |Y| String | 属性 |
|provider | path |Y| String | 名称 |
|version | path |Y| String | 版本 |
|affinity | path |Y| String | 亲和性 |
|shortDesc | path |Y| String | 描述 |
|industry | path |Y| String | 行业 |
|type | path |Y| String | 类型 |


#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|500 | Resource grant error |