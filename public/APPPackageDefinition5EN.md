  ### manifest file
The manifest file MEAO is parsed to verify the integrity of the APP package. The file extension is .mf.
The manifest file format is in the form of key-value pairs. It mainly defines the metadata information and integrity protection related information of the APP package. For specific definitions, refer to the relevant specifications of ETSI NFV SOL004.
The metadata mainly contains the following parameters:

| Parameter name | Parameter value | Is it required |
|---------|---------|--------|
|app_provider_id | The app provider, the value should be consistent with the Provider of the VNF node in the APPD description file | Yes |
|app_product_name | app name | yes|
|app_release_data_time | app release time | yes |
|app_package_version | A string separated by ".", the value must be consistent with the vnfd_version under metadata in the APPD description file |Yes |
|app_type | App type, the value should be consistent with vnfd_id under the metadata of the UEFA Champions League in the APPD description file | No|
|app_package_description| APP description information | No |

Integrity protection mainly includes 3 parameters. For specific definitions, please refer to ETSI NFV SOL004.
* Source: the identification of the file to be protected, the directory address of the file in the CSAR
* Algorithm: hash calculation method, uniformly use SHA-256
* Hash: hash value

Example of manifest file:

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
