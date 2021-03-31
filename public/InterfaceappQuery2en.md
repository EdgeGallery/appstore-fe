## Interface list

### /{packageId}/action/pull
### GET
Get a list of all available applications in this warehouse
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|name | path |N| String | App name |
|provider | path |N| String | app provider |
|type | path |N| String | app type |
|affinity | path |N| String | app affinity |
|userId | path |N| String | userId|

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