### 概述
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

