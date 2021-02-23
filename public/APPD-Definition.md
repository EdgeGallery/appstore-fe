# 概述
TOSCA(Topology and Orchestration Specificatioon for Cloud Applications)是一种描述云应用组件以及组件之间关系的建模语言，Tosca采用业务模板(service templates)的概念来描述云应用的组件。  
EdgeGallery采用TOSCA概念来描述APPD信息模型，基于TOSCA-Simple-Profile-yamle v1.2，参考ETSI NFV SOL001相关规范定义了对APPD的相关描述。  
APPD信息模型单元和TOCSA类型定义的映射关系如下：

| APPD 信息模型单元 | TOSCA 类型定义 |
|------------------|--------------------------------|
| APP             | tosca.nodes.nfv.VNF |
| VDU（容器场景时为Pod） | tosca.nodes.nfv.Vducp <br> tosca.nodes.nfv.Vdu.Compute <br> tosca.nodes.nfv.Vdu.VirtualStorage|
| Cpd | tosca.nodes.nfv.Cp |
| VduCpd(internal connection point) | tosca.nodes.nfv.VduCp | 
| Virtual Link | tosca.nodes.nfv.VnfVirtualLink |
| VirtualStorageDesc | tosca.nodes.nfv.Vdu.VirtualStorage | 
| VirtualComputeDesc | tosca.nodes.nfv.Vdu.Compute | 
| SwImageDesc | tosca.artifacts.nfv.SwImage |
|SecurityGroupRule | tosca.policies.nfv.SecurityGroupRule |

一个APPD文件包含最基本的信息，metadata，inputs参数，节点类型，数据类型，文件类型，分组类型和策略类型等。  

## 基本信息
APPD最开始需要包含最基本的信息，包含tosca_definition_version,  description, imports。  
样例如下：

```
tosca_definitions_version: tosca_simple_profile_yaml_1_2
description: EdgeGallery APPD definition
imports:
  - nfv_vnfd_types_v1_0.yaml
```

## Metadata定义
Metadata为APPD的元数据。  
具体参数如下：

| 名称 | 是否必选 |数据类型 | 取值范围 | 描述 |
|------|---------|--------|---------|------|
|template_name | 是 | string | - | 模板名称 |
|template_author |是 | string | - |模板作者 | 
|template_version | 是 |string | - | 模板版本 |
|vnfm_type | 是 | string | MEPM | 该参数用于表明APPD使用的平台，目前取值MEPM |
|vnfd_id | 是 | string | -  |该APPD对象的标识，全局唯一 |
|vnfd_version |是 | string |- | APPD版本号 | 
|vnfd_name | 是 |string | -| APPD名称 |
|vnfd_description |是 |string |- | APPD描述 |


Metadata的样例如下： 

```
metadata:
  template_name: EdgeGallery-Template
  template_author: EdgeGallery
  template_version: 1.0.0
  vnfm_type: MEPM
  vnfd_id: EdgeGallery-monitoring-service
  vnfd_version: v1.0
  vnfd_name: EdgeGallery_MEC_Sample_APPD
  vnfd_description: EdgeGallery MEC sample for APP
```

## Inputs参数
Inputs参数格式参见TOSCA Simple Profile in YAML Version 1.1。以下列出APPD涉及到的定义部分。

```
<parameter_name>:
  type: <parameter_type> #参数类型，支持String，Integer，Boolean
  description: <parameter_descriptioon> #参数描述信息
  required: <parameter_required> #定义该参数是否为必选参数
  default: <parameter_default_value> #定义该参数的默认取值
  constraints: #定义该参数的取值范围
  -<parameter_constraints> 
```

Inputs样例如下：

```
inputs:
    INTERNAL_IP_VERSION:
      type: string
      default: IPV4
      description: INTERNAL_IP_VERSION
    cpuNumber:
      type: integer
      description: Number of CPUs
      required: true
      default: 2
      constraints:
      -valid_values:[1,2,4,8]
```

## 节点类型定义
本章节此处只描述目前已经用到的部分节点类型。EdgeGallery节点类型基于ETSI NFV SOL001相关规范定义，具体可以参考ETSI NFV SOL001相关规范。
###  APP(tosca.nodes.nfv.VNF)
APP在APPD描述文件中对应tosca.nodes.nfv.VNF节点，参数定义如下：

|名称                   | 是否必选   | 数据类型  | 取值范围   |描述                 |
|-----------------------|-----------|----------|-----------|---------------------|
|vnfd_id                | 是        | string   | -         | app描述id            |
|vnfd_version           | 是        | string   | -         | app描述的版本         |
|provider               | 是        | string   | -         | app的提供方            |
|product_name           | 是        | string   | -         | 用来标识app产品的产品类型 |
|software_version       | 是        | string   | -         | app的软件版本          |
|product_info_name      | 是        | string   | -         | app的可读名称          |
|product_info_description| 否        | string   | -        | app的可读描述          |
|flavour_id             | 是        | string   | -         | 部署的flavour，当前app只支持单一flavour    |
|flavour_descripotion   | 是        | string   | -         | flavour的描述        |

同时对于APP对象，在虚机场景下，EdgeGallery将app的helm部署脚本作为其artifact。  
APP节点的样例如下：

```
  node_templates:
    Simple_VNF:
      type: tosca.nodes.nfv.VNF
      properties:
        vnfd_id: EdgeGallery-positioning-service
        vnfd_version: v1.0
        provider: EdgeGallery
        product_name: MEC
        software_version: v1.0.0
        product_info_name: vMEC_APP
        product_info_description: EdgeGallery MEC APP
        flavour_id: default
        flavour_description: default flavor
      artifacts:
        app_deployment:
          file: /artifacts/Deployments/charts/monitoring_service.zip # app的helm chart部署包
          type: tosca.artifacts.Deployment
```

### Pod/VM(tosca.nodes.nfv.Compute)
对于容器场景下的Pod，以及虚机场景下的VM，采用tosca.nodes.nfv.Vdu.Compute节点，参数定义如下：

|名称                   | 是否必选   | 数据类型  | 取值范围   |描述                 |
|-----------------------|-----------|----------|-----------|---------------------|
|name                   | 是        | string   | -         | VDU的名称            |
|descriptioon           | 是        | string   | -         | VDU的描述            |
|boot_order             | 否        | map      | -         | 镜像盘的启动顺序          |
|nfvi_constraints       | 否        | string   | -         | 计算AZ ID，确定该VDU实例的创建位置|
|bootdata               | 否        | tosca.data.types.nfv.bootdata   | -         | 注入配置信息          |
|vdu_profile            | 是        | tosca.data.types.nfv.VduProfile   | -         | 定义VDU相关的其他实例化数据          |
|sw_image_data          | 否        | tosca.data.types.nfv.SwImageData   | -        | 镜像信息，对应名称在SwImageDesc.json中的描述，对于虚机为虚机镜像，对于容器为容器镜像且可能为列表，此时采用逗号分隔          |

tosca.nodes.nfv.Compute节点提供的能力如下所示：

| 名称                  |  数据类型                             | 取值范围             |描述                  |
|-----------------------|------------------------------------|----------------------|----------------------|
|virtual_compute | tosca.capabilities.nfv.virtualCompute     | -                    | 虚机计算资源          |
|virtual_binding | tosca.capabilities.nfv.VirtualBindable    | -                    | 定义连接绑定的能力     |

Pod/VM节点的定义样例如下：

```
   logic0:
      type: tosca.nodes.nfv.Vdu.Compute
      properties:
        name: logic0
        description: node logic template
        sw_image_data:
          name: mep-agent:1.0,monitoring-service-be:1.0 #定义Pod的镜像列表，名称取自SwImageDesc.json
        vdu_profile:
          min_number_of_instances: 1
          max_number_of_instances: 2
          initial_number_of_instances: 1
          flavor_extra_specs:
            X86_HA: true
      capabilities:
        virtual_compute:
          properties:
            virtual_memory:
              virtual_mem_size: 4096
            virtual_cpu:
              num_virtual_cpu: 4
            virtual_local_storage:
              size_of_storage: 20
```
### 网口（tosca.nodes.nfv.VduCp）
对于Pod/VM的网口，采用tosca.nodes.nfv.VduCp节点进行定义，参数定义如下：

|名称                   | 是否必选   | 数据类型  | 取值范围   |描述                 |
|-----------------------|-----------|----------|-----------|---------------------|
|vnic_type              | 是        | string   | normal,direct        | 网口类型            |
|order                  | 是        | integer   | greater_or_equal:0         | 网口的顺序           |
|vnic_name              | 否        | string      | -         | 网口的名字          |
|description              | 否        | string      | -         | 网口的描述        |
Cp节点定义了需求如下:
| 名称                  |是否必选  |  类型                             | 取值范围             |描述                  |
|-----------------------|---------|---------------------------|----------------------|----------------------|
|virtual_binding |是      | tosca.capabilities.nfv.VirtualBindable    | -                    | 绑定到的VDU的需求     |
|virtual_link   | 否      |tosca.capabilities.nfv.VirtualLinkable     | -                    | 连接到虚拟网络的需求     |

网口节点的定义样例如下：

```
    MEC_APP_CP0:
      type: tosca.nodes.nfv.VduCp
      properties:
        description: network definition
        vnic_name: eth0
        order: 0
        vnic_type: normal
      requirements:
      - virtual_binding: logic0
      - virtual_link: MEC_APP_VL0
```

### 网络（tosca.nodes.nfv.VnfVirtualLink）
对于Pod/VM的网络，采用tosca.nodes.nfv.VnfVirtualLink节点进行定义，参数定义如下：

|名称                   | 是否必选   | 数据类型  | 取值范围   |描述                 |
|-----------------------|-----------|----------|-----------|---------------------|
|vl_profile             | 是        | tosca.datatypes.nfv.VlProfile   | -       | 定义网络的信息，名称，子网等            |
|description            | 否        | string   | -            | VL的描述           |

VnfVirtualLink节点定义了能力如下:
| 名称                  |  类型                             | 取值范围             |描述                  |
|----------------------|---------------------------|----------------------|----------------------|
|virtual_linkable      |tosca.capabilities.nfv.VirtualLinkable     | -                    | 描述虚拟网络连接网口的能力     |

VnfVirtualLink节点的定义样例如下：

```
    MEC_APP_VL0:
      type: tosca.nodes.nfv.VnfVirtualLink
      properties:
        vl_profile:
          network_name: network_n6
          network_type: vlan
          physical_network: network_physnet
          provider_segmentation_id: 1001
```
### APP配置 (tosca.nodes.nfv.app.configuration)--待修订
对于APP相关配置，如服务发布，服务依赖，以及应用认证信息，分流规则配置等。通过APP配置节点进行配置。相关定义参考了ETSI MEC011 ，参数定义如下：

|名称                   | 是否必选   | 数据类型  | 取值范围   |描述                 |
|-----------------------|-----------|----------|-----------|---------------------|
|appServiceRequired     | 否        | tosca.datatypes.nfv.app.ServiceDependency  | -       | app依赖的服务信息           |
|appServiceOptional     | 否        | tosca.datatypes.nfv.app.ServiceDependency   | -            | app的可选依赖服务信息           |
|appServiceProduced     | 否        | tosca.datatypes.nfv.app.ServiceDescriptor   | -            | app的服务发布信息           |
|appFeatureRequired     | 否        | tosca.datatypes.nfv.app.FeatureDependency  | -       | app正常运行必须的特性信息           |
|appFeatureOptional     | 否        | tosca.datatypes.nfv.app.FeatureDependency   | -            | app正常运行可能会用到的特性信息           |
|transportDependencies |  否        | tosca.datatypes.nfv.app.TransportDependency                           | -            | 应用实例提供服务需要平台提供的传输能力    |
|appSupportMp1     | 是        | boolean  | -            | app是否支持Mp1接口           |
|appName     | 是        | string  | -            | 应用名称           |
|appTrafficRule     | 是        | tosca.datatypes.nfv.app.TrafficRuleDescriptor  | -            | 应用分流规则信息          |
|appDNSRule     | 是        | tosca.datatypes.nfv.app.DNSRuleDescriptor  | -            | 应用DNS分流规则信息          |

定义样例如下：
```
    app_configuration:
      type: tosca.nodes.nfv.app.configuration
      properties:
        certification_info:
          access_key_id: {get_input: ak}
          secret_key: {get_input: sk}
        appServiceRequired:
          - serName: appService1
            serCategory: qos
            version: 2.0
            serTransportDependencies:
              - transport:
                  type: REST_HTTP
                  protocol: HTTP
                  version: 2.0
                  security:
                serializers:
                  - JSON
                labels:
                  - test
            requestedPermissions: true
        appServiceOptional:
          - serName: appService2
            serCategory: qos
            version: 3.0
            serTransportDependencies:
              - transport:
                  type: REST_HTTP
                  protocol: HTTP
                  version: 2.0
                  security:
                serializers:
                  - JSON
                labels:
                  - test
            requestedPermissions: true
        appServiceProduced:
          - serName: appService3
            serCategory: video encoding
            version: 2.0
            transportsSupported:
              - transport:
                  type: REST_HTTP
                  protocol: HTTP
                  version: 2.0
                  security: string
                serializers:
                  - JSON
            dnsRuleIdList:
              - dnsRule1
            trafficRuleIdList:
              - trafficRule1
        appFeatureRequired:
          - featureName: UserApps
            version: 3.0
        appFeatureOptional:
          - featureName: UserApps
            version: 3.0
        transportDependencies:
          - transport:
              type: REST_HTTP
              protocol: HTTP
              version: 2.0
              security:
            serializers:
              - JSON
            labels:
              - test
        appSupportMp1: true
        appName: filter01
        appTrafficRule:
          - trafficRuleId: trafficRule1
            filterType: FLOW
            priority: 1
            trafficFilter:
              - srcAddress:
                  - 0.0.0.0/0
                dstAddress:
                  - 172.30.2.0/28
                srcPort:
                  - 8080
                dstPort:
                  - 8080
                protocol:
                  - ANY
                tag:
                  - 1234
                srcTunnelAddress:
                  - 10.10.10.10
                tgtTunnelAddress:
                  - 10.10.10.10
                srcTunnelPort:
                  - 8080
                dstTunnelPort:
                  - 8080
                qCI: 1
                dSCP: 0
                tC: 1
            action: PASSTHROUGH
            dstInterface:
              interfaceType: TUNNEL
              tunnelInfo:
                tunnelType: GTP_U
                tunnelDstAddress: 10.10.10.10
                tunnelSrcAddress: 11.11.11.11
              srcMacAddress: 02-00-00-00-00-00
              dstMacAddress: 02-00-00-00-00-00
              dstIpAddress: 192.0.2.0
        appDNSRule:
          - dnsRuleId: dnsRule1
            domainName: mec.huawei.com
            ipAddressType: IP_V4
            ipAddress: 172.30.2.17
            ttl: 100
```