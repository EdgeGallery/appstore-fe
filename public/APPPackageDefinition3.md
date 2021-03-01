### APPD目录
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
