

### Image目录
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
