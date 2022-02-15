## Interface list

### /mec/appstore/v2/apps/action/query
###  POST

Get app list.

### Request
#### Request parameters
| Parameter     | Description               | Position |Type            | Required or not |
| ------------ | -------------------------- | -------- | --------------- | -------- |
| types        | application types          | requestBody | List<String>    | no       |
| showType     | application show types     | requestBody | List<String>    | no       |
| affinity     | application architectures  | requestBody | List<String>    | no       |
| industry     | application industries     | requestBody | List<String>    | no       |
| workloadType | application workload types | requestBody | List<String>    | no       |
| userId       | user id                    | requestBody | String          | no       |
| queryCtrl    | query condition            | requestBody | QueryAppCtrlDto | yes      |

QueryAppCtrlDto

| Name     | Definition                               | Type         | Required |
| -------- | ---------------------------------------- | ------------ | -------- |
| limit    | number of queries per page, [1,500]      | int          | yes      |
| offset   | pagination start page, starting from 0 | int          | yes      |
| sortItem | the field to query and sort               | String       | no       |
| sortType | method to sort a query, ASC/DESC           | String       | no       |
| status   | application status                       | List<String> | no       |
| appName  | application name                         | String       | no       |

#### Example request
```
{
    "queryCtrl":
    {
        "limit": 10,
        "offset": 0,
        "sortType": "",
        "sortItem": "",
        "status": [""],
        "appName": ""
    },
    "types": [""],
    "showType": [""],
    "affinity": [""],
    "industry": [""],
    "workloadType": [""],
    "userId": ""
}
```

### Response
#### Response parameters
|Return Code  |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |

|Back to Field   |Description|
|-----|-----|
|appId | Application id |
|packageId | Application package id |
|name | Name |
|provider | Provider |
|iconUrl | Icon Url |
|version | Version |
|affinity | Affinity |
|shortDesc | Description |
|industry | Industry |
|type | Application Type |
|showType | Show Type |
|createTime | Creation time |
|details | Details |
|downloadCount | App download Counts |
|contact | Contact |
|score | Score |
|userId | User Id |
|userName | User Name |
|status | Status |
|deployMode | Workload Type |
|hotApp | Application is poplular or not |
|exprienceAble | Application can be experienced online or not |

#### Example response
```
{
    "results": [
        {
            "appId": "string",
            "packageId": "string",
            "iconUrl": "string",
            "name": "string",
            "provider": "string",
            "type": "string",
            "shortDesc": "string",
            "showType": "string",
            "createTime": "string",
            "details": "string",
            "downloadCount": int,
            "affinity": "string",
            "industry": "string",
            "contact": "string",
            "score": 5.0,
            "userId": "string",
            "userName": "string",
            "status": "string",
            "deployMode": "string",
            "hotApp": false,
            "exprienceAble": false
        }
    ],
    "limit": 10,
    "offset": 0,
    "total": 1
}
```
