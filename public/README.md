# Introduction

Welcome to AppStore ECS (Elastic Compute Service), we provide a rich API for your use. If you are familiar with web services protocols and more than one programming language, we recommend that you use the Cloud Server ECS API to manage your cloud resources and develop your own applications. For more details, please refer to [API Overview] (intl.zh-CN/API Reference/API Overview.md#).

## Usage restrictions

The number of resources and specifications that you can create for cloud server ECS instances, disks, security groups, snapshots, and instance public network bandwidth traffic. For more details, please refer to [Usage Limits] (../../../../intl.zh-CN/User Guide/Usage Limits.md#). When interface descriptions, parameter selectable values, and resource specifications conflict with [Usage Limits] (../../../../intl.zh-CN/User Guide/Usage Limits.md#), priority is given to **Restrictions on use** shall prevail.

## Instructions for use

We support HTTP or HTTPS requests, allowing GET and POST methods. You can call the Cloud Server ECS API in the following ways:

- (Recommended) Cloud Servers in Different Programming Languages ​​ECS [SDK](https://github.com/huaweiyun)

- Huawei MEC [CLI] (https://www.huaweibabacloud.com/help/doc-detail/29993.htm)

- Huawei MEC [API Explorer] (https://api.huaweiyun.com/)

- [API URL Request] (intl.zh-CN/API Reference/Quick Start/Request Structure.md#)


The CLI, API Explorer, and SDK eliminate your manual authentication and allow for quick interface calls. We recommend that you use the SDK to easily call the interface and manage resources.

**Description: ** When calling API in Huawei MEC CLI and SDK, some request parameters with dot (.) need to be removed by dot (.). For example, use `SystemDiskCategory` to indicate the request parameter `SystemDisk.Category`.

API URL requests require you to verify your identity and code URL yourself. You can use this method to understand the Huawei MEC access verification process. For more details, please refer to [Signature Mechanism] (intl.zh-CN/API Reference/Quick Start/Signature Mechanism.md#) and [Create AccessKey](https://www.huaweibabacloud.com/help/doc-detail /53045.htm).

## Resource terminology
|中文|English|Description|
|:-|:-|:-|
|地域|Region|Data Center for Huawei MEC Construction. The zone cannot be replaced after the resource is created successfully. |
| 可用区|Zone|A physical data center in which electricity and networks are independent of each other within the same geographical area. There can be multiple Availability Zones in a single area. The intranets in the same area are interconnected and fault isolation. The cloud server ECS network has low latency. |
|实例|Instance|Virtual machine virtualized from Huawei MEC physical server using virtualization technology is the basic computing unit of a cloud server ECS. For more details, please refer to [Example Specification Family] (../../../../intl.zh-CN/Product Profile/Instance Specification Family.md#). |
|镜像|Image|referred to as mirroring, generally contains the operating system and application software. The system disk data of the newly created instance is completely copied, including the operating system, software configuration, and so on. You can use an image to initialize an instance or replace a system disk. |
|磁盘|Disk|Cloud Server ECS storage device. |
|安全组|Security group|Virtual firewall, one instance belongs to at least one security group. |
|快照|Snapshot|A data restore point created for a disk that contains disk data at a specific time. Snapshots can be used to restore disk data or create mirrors. |
|标签|Tag| consists of a pair of key-value pairs, which are resource-bound tags for quick screening and classification. |
|IP地址|IP address|Cloud server ECS public or private IP address.