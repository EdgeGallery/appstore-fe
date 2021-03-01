### TOSCA-Metadata目录
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
