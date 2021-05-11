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

#### Request code

    AppStore appStore = appStoreRepository.queryAppStoreById(sourceStoreId);
        if (appStore == null) {
            LOGGER.error("appstrore is not exist, appstoreId is {}", sourceStoreId);
            return false;
        }
        String baseUrl = appStore.getUrl();
        String packageDownloadUrl = baseUrl + String.format(DOWNLOAD_PACKAGE_API, packageId);
        String iconDownloadUrl = baseUrl + String.format(DOWNLOAD_ICON_API, packageId);
        LOGGER.info("pullPackage packageDownloadUrl {}, iconDownloadUrl {}", packageDownloadUrl, iconDownloadUrl);

        try {
            String parentPath = dir + File.separator + UUID.randomUUID().toString().replace("-", "");
            String targetAppstore = context.platformName;
            File tempPackage = fileService.downloadFile(packageDownloadUrl, parentPath, targetAppstore);
            File tempIcon = fileService.downloadFile(iconDownloadUrl, parentPath, targetAppstore);
            AFile apackage = new AFile(tempPackage.getName(), tempPackage.getCanonicalPath());
            AFile icon = new AFile(tempIcon.getName(), tempIcon.getCanonicalPath());
            apackage.setFileSize(tempPackage.length());
            String appClass = appUtil.getAppClass(apackage.getStorageAddress());
            AppParam appParam = new AppParam(packagePo.getType(), packagePo.getShortDesc(),
                packagePo.getAffinity(), packagePo.getIndustry());
            Release release = new Release(apackage, icon, null, user, appParam, appClass);
            // the package pulled from third appstore need to be tested by local appstore's atp
            release.setStatus(EnumPackageStatus.Upload);
            appService.registerApp(release);

            addPullMessage(packagePo);
        } catch (IOException e) {
            LOGGER.error("IOException: {}", e.getMessage());
            throw new DomainException("pull package exception");
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