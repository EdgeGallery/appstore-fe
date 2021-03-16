### APPD directory
The APPD directory contains compressed files of APPD.
The current APPD file format of EdgeGallery contains the following contents:
* The root directory contains a metadata file.
* The Definition directory contains an APPD file and a definition file. The APPD file must be consistent with the Entry-Definitions file path and file name defined in the metadata file.

The format requirements of APPD will be detailed in [APPD Definition](https://gitee.com/edgegallery/docs/blob/master/models/APPD%20Definition.md).
The metadata file sample is as follows:  

    VNFD-Meta-File-Version: 1.0
    CSAR-Version: 1.1
    Created-by: EdgeGallery
    Entry-Definitions: Definition/MainServiceTemplate.yaml

    Name: Definition/MainServiceTemplate.yaml
    Content-Type: VNFD

    Name: Definition/nfv-vnfd-type-v1_0.yaml
    Content-Type: VNFD
