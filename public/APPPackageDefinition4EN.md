### Image directory
This directory contains one or more image attachment files and one description file. The image file is placed in the Image directory in the form of a compressed package.
For applications deployed on virtual machines, the image files are using qcow2 image format. For applications deployed on containers, the images files are tar archive exported from containers.
The Image directory contains a SwImageDesc.json file to describe the image information. The definition of SwImageDesc.json file is shown in the following table. For details, please refer to ETSI ISG NFV IFA011.



| Parameter name | Parameter type | Description | Is it required |
|---------|---------|----------|----------|
|id | Identifier| Image file ID, which is used as a serial number and is unique in an APP package. If you use file names to distinguish app packages, you don’t need to use this parameter | O |
|name | String | Image name. For apps deployed on VM, the name can be the one used when VIM is registered. For apps deployed on containers, the name should written in the format of "container image name: version". | M |
|version | String | Image file version number | M |
|checksum | String | Image file check code | O |
|architecture | String | In the ARM scenario, the architecture is "aarch64". In the X86 scenario, no need for this parameter. | O |
|containerFormat | String | Software container image format | M |
|diskFormat | String | Software Disk Format | M |
|minDisk | Number | Minimum disk space required for mirroring, unit: GB| M|
|minRam | Number | Minimum RAM required for mirroring, unit: MB | M |
|size |Number | Image file size, unit: MB | O |
|swImage | Indentifier(Reference to a SwImage) | Image file address, which is the path relative to the App package root directory. | M |
|operatingSystem |String| Operating system used by the image| O|
|supportedVirtualisationEnvironment |String | Image virtualization environment | O |

Example of SwImageDesc.json file:

```
[
    {
        "id":"1",
        "name":"monitoring-service-fe:1.0",
        "version":"1.0",
        "checksum":"1",
        "containerFormat":"dockerImage",
        "diskFormat":"dockerImage",
        "minDisk":3,
        "minRam":6,
        "size":326546,
        "swImage":"Image/monitirong_service_image.zip/monitoring_service_image/monitoring_service_fe.tar",
        "operatingSystem":"ubuntu",
        "supportedVirtualisationEnvironment":"linux"
    }
    {
        "id":"2",
        "name":"monitoring-service-be:1.0",
        "version":"1.0",
        "checksum":"1",
        "containerFormat":"dockerImage",
        "diskFormat":"dockerImage",
        "minDisk":3,
        "minRam":6,
        "size":326546,
        "swImage":"swr.ap-southeast-1.myhuaweicloud.com/edgegallery/monitoring-be-service:1.0",
        "operatingSystem":"ubuntu",
        "supportedVirtualisationEnvironment":"linux"
    }
]
