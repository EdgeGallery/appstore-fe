### TOSCA-Metadata catalog
The TOSCA-Metadata directory contains a fixed file named TOSCA.meta.
The TOSCA.meta file is a text file that describes the information of the entire CSAR file. The content of the file includes TOSCA-Meta-File-Version, CSAR-Version, Created-by, Entry-Definitions, Name and Content-Type. For details, please refer to TOSCA v1.0 Specification,
TOSCA Simple profile YAML v1.1.
Example of TOSCA.meta:

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
