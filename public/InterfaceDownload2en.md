## Interface list

### /apps/{appId}/icon
### GET
Download the app icon based on the app ID
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|appId | path |Y| String | app id |

#### Request code

    Optional<App> app = appMapper.findByAppId(appId).map(AppPo::toDomainModel);
            if (app.isPresent()) {
                List<Release> releases = packageMapper.findAllByAppId(appId).stream().map(AppReleasePo::toDomainModel)
                    .collect(Collectors.toList());
                app.get().setReleases(releases);
            }

#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity |
|500 | Resource grant error |



### /{packageId}/action/download-icon
### GET
Download application icons by application package ID
#### Request parameters
|Parameter |Position | Required or not | Type |Description|
|-----|-----|----|------|-----|
|packageId | path |Y| String | package Id |

#### Return data
|Return Code |Description|
|-----|-----|
|200 | Success |
|400 | bad request |