  ### manifest文件
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
