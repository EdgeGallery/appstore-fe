## 接口清单

### /{packageId}/action/pull
###  GET
获取本仓库所有可拉取的应用列表
#### 请求参数
|参数 |位置 | 是否必选 | 类型 |说明|
|-----|-----|----|------|-----|
|name | path |N| String | App name |
|provider | path |N| String | app provider |
|type | path |N| String | app type |
|affinity | path |N| String | app affinity |
|userId | path |N| String | userId|

#### 请求代码

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

#### 返回数据
|返回码  |描述|
|-----|-----|
|200 | Success |
|404 | Microservice not found |
|415 | Unprocessable MicroServiceInfo Entity  |
|500 | Resource grant error |

|返回字段  |描述|
|-----|-----|
|PushablePackageDto | 返回实体类 |
|appId | 应用 id |
|packageId | 应用包 id  |
|name | 名称 |
|provider | 提供者 |
|version | 版本 |
|atpTestStatus | atp测试状态 |
|atpTestTaskId | atp测试任务id |
|atpTestReportUrl | atp测试url |
|latestPushTime | 最后推送时间 |
|pushTimes | 推送时间 |
|sourcePlatform | 源平台 |
|targetPlatform | 目标平台 |
|affinity | 亲和性 |
|shortDesc | 描述 |
|industry | 行业 |
|type | 应用类型 |
|createTime | 创建时间 |