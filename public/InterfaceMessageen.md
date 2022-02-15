## Interface list

### /mec/appstore/v2/messages
### POST
Add message
### Request
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|dto | path |Y| String | MessageReqDto |

##### MessageReqDto
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|BasicMessageInfo | path |Y| Object | Basic Information |
|sourceAppStore | path |Y| String | Source app store |
|targetAppStore | path |Y| String | Target app store |
|atpTestStatus | path |Y| String | Atp test status |
|atpTestTaskId | path |Y| String | Atp test task id |
|atpTestReportUrl | path |Y| String | Atp test path |
|packageDownloadUrl | path |Y| String | Application package download path |
|iconDownloadUrl | path |Y| String | Icon download path |

##### BasicMessageInfo
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|name | path |Y| String | Attribute |
|provider | path |Y| String | Name |
|version | path |Y| String | Version |
|affinity | path |Y| String | Affinity |
|shortDesc | path |Y| String | Description |
|industry | path |Y| String | Industry |
|type | path |Y| String | Type |

#### Request Example
```
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
```

### Response
#### Response parameters
|Return Code |Description|
|-----|-----|
|200 | Success |
|500 | Resource grant error |

#### Response Example
```
{
    "data": "string",
    "retCode": int,
    "params": [string],
    "messge": "string"
}
```