### Artifacts目录
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