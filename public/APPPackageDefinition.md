# 概述
  APP包采用TOSCA规范的CSAR文件定义。TOSCA规范定义CASR文件为zip格式的压缩文件，该规范支持包含TOSCA-Metadata目录的CSAR格式，该格式要求CSAR包中必须包含一个以TOSCA-Metadata命名的文件夹，
且该文件夹包含一个以TOSCA.meta命名的metadata文件，该文件是键值对的格式，用以描述该CSAR包的元数据，以及提供处理整个CSAR文件的入口信息，具体参考TOSCA 1.0 Specification。  
APP包中包含五个部分，即TOSCA-Metadata目录，APPD目录，Image目录，Artifacts目录，manifest文件。  
APP包内文件名称及APP包名称不能重名。  
APP包结构如下(以社区样例应用为例)：

    | monitoring_service.mf
    |
    |--APPD
    |  |--monitoring-service.zip
    |     | TOSCA_VNFS.meta
    |     |--Definition
    |        | nfv_vnfd_types_v1_0.yaml
    |        | MainServiceTemplate.yaml
    |--Artifacts
    |  | ChangeLog.txt
    |  |--Deployment
    |  |  |--Charts
    |  |     | monitoringservice.tgz
    |  |--Docs
    |     | monitoringservice.md
    |--Image
    |  | SwImageDesc.json
    |  |--monitoring_service_image.zip
    |     |--monitoring_service_mage
    |        | monitoring_service_fe.tar
    |        | monitoring_service_be.tar
    |        | monitoring_service_proxy.tar
    |--TOSCA-Metadata
    |  | TOSCA.meta

## TOSCA-Metadata目录
TOSCA-Metadata目录下包含一个固定名为TOSCA.meta的文件。  
TOSCA.meta文件是一个文本文件，该文件用以描述整个CSAR文件的信息。文件内容包括TOSCA-Meta-File-Version,CSAR-Version,Created-by,Entry-Definitions,Name和Content-Type,具体可以参见TOSCA v1.0 Specification,
TOSCA Simple profile YAML v1.1。  
TOSCA.meta样例：  

    TOSCA-Meta-File-Version: 1.0
    CSAR-Version: 1.1
    Created-By: EdgeGallery
    Entry-Definitions: APPD/monitoring-service.zip

    Name: APPD/monitoring-service.zip
    Content-Type: appd

    Name: Image/monitoring_service_image.zip
    Content-Type: Image

    Name: Image/SwImageDesc.json
    Content-Type: SwImageDesc

## APPD目录
APPD目录包含APPD的压缩文件。  
目前EdgeGallery的APPD文件格式包含如下内容： 
* 根目录下包含一个metadata文件。
* Definition目录下包含一个APPD文件以及一个定义文件。其中APPD文件要与metadata文件中定义的Entry-Definitions文件路径和文件名一致。  

其中APPD的的格式要求将在 [APPD Definition](https://gitee.com/edgegallery/docs/blob/master/models/APPD%20Definition.md)中详细说明。  
metadata文件样例如下：  

    VNFD-Meta-File-Version: 1.0
    CSAR-Version: 1.1
    Created-by: EdgeGallery
    Entry-Definitions: Definition/MainServiceTemplate.yaml

    Name: Definition/MainServiceTemplate.yaml
    Content-Type: VNFD

    Name: Definition/nfv-vnfd-type-v1_0.yaml
    Content-Type: VNFD

## Image目录
该目录下包含一个或者多个Image镜像文件和一个镜像描述文件。  
Image镜像文件采用压缩包的方式放置于Image目录下。对于虚机应用，镜像文件为qcow2镜像，对于容器用用，镜像为容器导出的镜像tar文件。
Image目录下包含一个SwImageDesc.json文件用来描述镜像信息。SwImageDesc.json文件定义如下表所示。具体可以参考ETSI ISG NFV IFA011。

| 参数名称 | 参数类型 |  描述                              | 是否必选 |
|---------|---------|------------------------------------|----------|
|id       | Identifier| 镜像文件ID，作为序号使用，APP包内唯一,如果使用name区分，可以不使用该参数 | O |
|name     | String    | 镜像名，像VIM注册时采用这个名字，用以区分不同的镜像。当为容器场景时，此处命名为"容器镜像名:版本"命名 | M |
|version  | String    | 镜像文件版本号 | M |
|checksum | String    | 镜像文件校验码 | O |
|architecture | String | ARM 场景下取值aarch64，X86场景下无需该参数 | O |
|containerFormat | String | 软件镜像容器格式 | M |
|diskFormat | String | 软件磁盘格式 | M | 
|minDisk | Number | 镜像所需的最小磁盘空间，单位：GB| M|
|minRam | Number | 镜像所需的最小RAM，单位：MB | M |
|size |Number | 镜像文件大小，单位：MB | O |
|swImage | Indentifier(Reference to a SwImage) | 镜像文件地址，为镜像文件相对APP包的根目录地址|  M |  
|operatingSystem |String| 镜像使用的操作系统| O|  
|supportedVirtualisationEnvironment |String | 镜像的虚拟化环境|  O |  

SwImageDesc.json文件样例：

```
[
    //镜像在APP包内
    {
        "id":"1",
        "name":"monitoring-service-fe:1.0",
        "version":"1.0",
        "checksum":"1",
        "containerFormat":"dockerImage",
        "diskFormat":"dockerImage",
        "minDisk":3,
        "minRam":6,
        "size":326546,
        "swImage":"Image/monitirong_service_image.zip/monitoring_service_image/monitoring_service_fe.tar",
        "operatingSystem":"ubuntu",
        "supportedVirtualisationEnvironment":"linux"
    }
    //镜像不在APP包内
    {
        "id":"2",
        "name":"monitoring-service-be:1.0",
        "version":"1.0",
        "checksum":"1",
        "containerFormat":"dockerImage",
        "diskFormat":"dockerImage",
        "minDisk":3,
        "minRam":6,
        "size":326546,
        "swImage":"swr.ap-southeast-1.myhuaweicloud.com/edgegallery/monitoring-be-service:1.0",
        "operatingSystem":"ubuntu",
        "supportedVirtualisationEnvironment":"linux"
    }    
]
```    

## manifest文件
manifest文件MEAO进行解析，用以进行APP包的完整性校验。文件扩展名为.mf。  
manifest文件格式是键值对的形式，主要定义APP包的metadata信息和完整性保护相关信息，具体定义参考ETSI NFV SOL004相关规范。  
metadata中主要包含以下参数：

| 参数名称 |  参数取值 | 是否必选 |
|---------|---------|--------|
|app_provider_id | app供应商，该取值要和APPD描述文件中VNF节点的Provider保持一致| 是 |
|app_product_name | app名称 | 是|
|app_release_data_time | app发布时间 | 是 |
|app_package_version | 用"."分隔的字符串，取值要和APPD描述文件中的metadata下的vnfd_version保持一致 |是 |
|app_type | app类型，取值要和APPD描述文件中欧冠的metadata下的vnfd_id一致| 否|
|app_package_description| APP描述信息 | 否 |

完整性保护上主要包含3个参数，具体定义参考ETSI NFV SOL004。  
* Source:需要保护的文件标识，该文件在CSAR中的目录地址 
* Algorithm： hash计算方法，统一用SHA-256
* Hash：hash值

manifest文件的示例：

```
metadata:
app_product_name: MonitoringService
app_provider_id: EdgeGallery
app_package_version: 1.0
app_release_data_time: 1611217260210
app_type: monitoring_service
app_package_description: EdgeGallery Demo application

Source: APPD/monitoring_service.zip
Algorithm: SHA-256
Hash: 8e4b39bee03efb7c8db8c2408cbfce2bdc96b20b0206c2314a2070e813b62a4b

Source: Artifacts/Deployment/Charts/monitoringservice.tgz
Algorithm: SHA-256
Hash: c21317143c6c2618e61afc8e1e599b32a470705cdcc979c9c9b69f5f00017930

Source: Image/monitoring_service_image.zip
Algorithm: SHA-256
Hash: 7695c564a8a99aa01d3419c525ccb5cbdc615f2559f78c016fc1999d3f62d316

Source: Image/SwImageDesc.json
Algorithm: SHA-256
Hash: d1bc5ad4e5f1f309ad5fe2edb5a2de17be36766d8f8ed397555ac1fbb1a9e2e5
```

## Artifacts目录
Artifacts目录存储APP包相关附件，根目录下的ChangeLog.txt描述了变更记录。  
对于容器场景，EdgeGallery采用helm chart部署方式，部署文件压缩包放置在Artifacts/Deployment/Charts/目录下。  
/Artifacts/Docs目录下存放应用相关的详细文档信息。

    |--Artifacts
    |  | ChangeLog.txt
    |  |--Deployment
    |  |  |--Charts
    |  |     | monitoringservice.tgz
    |  |--Docs
    |     | monitoringservice.md