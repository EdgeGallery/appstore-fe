### APPD directory
The APPD directory contains compressed files of APPD.
The current EdgeGallery APPD directory should contain the following contents:
* A metadata file, eg TOSCA_VNFS.meta.
* A Definition directory, which contains an APPD file and a definition file. The APPD file must be consistent with the file path and file name of Entry-Definitions defined in the metadata file.

More APPD format requirements can be found in [APPD Definition](https://gitee.com/edgegallery/docs/blob/master/models/APPD%20Definition.md).
The metadata file sample is given as follows:  

    VNFD-Meta-File-Version: 1.0
    CSAR-Version: 1.1
    Created-by: EdgeGallery
    Entry-Definitions: Definition/MainServiceTemplate.yaml

    Name: Definition/MainServiceTemplate.yaml
    Content-Type: VNFD

    Name: Definition/nfv-vnfd-type-v1_0.yaml
    Content-Type: VNFD
