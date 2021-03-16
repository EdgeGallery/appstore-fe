### 概述
  The APP package adopts the TOSCA standard CSAR file definition. The TOSCA specification defines CASR files as compressed files in zip format. The specification supports the CSAR format containing the TOSCA-Metadata directory. The format requires that the CSAR package must contain a folder named after TOSCA-Metadata.
And the folder contains a metadata file named TOSCA.meta, which is a key-value pair format used to describe the metadata of the CSAR package and provide entry information for processing the entire CSAR file. For details, refer to the TOSCA 1.0 Specification.
The APP package contains five parts, namely TOSCA-Metadata directory, APPD directory, Image directory, Artifacts directory, manifest file.
The file name in the APP package and the APP package name cannot be the same.
The APP package structure is as follows (take the community sample application as an example):

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

