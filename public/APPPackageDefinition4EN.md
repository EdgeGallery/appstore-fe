

### Image directory
This directory contains one or more Image image files and an image description file.
The Image image file is placed in the Image directory in the form of a compressed package. For virtual machine applications, the image file is a qcow2 image, and for container use, the image is an image tar file exported by the container.
The Image directory contains a SwImageDesc.json file to describe the image information. The definition of SwImageDesc.json file is shown in the following table. For details, please refer to ETSI ISG NFV IFA011.

| Parameter name | Parameter type | Description | Is it required |
|---------|---------|----------------------------- -------|----------|
|id | Identifier| Image file ID, used as a serial number, unique in the APP package, if you use the name to distinguish, you don’t need to use this parameter | O |
|name | String | Mirror name, which is used when VIM is registered to distinguish different mirrors. When it is a container scene, it is named "container image name: version" here | M |
|version | String | Mirror file version number | M |
|checksum | String | Image file check code | O |
|architecture | String | Value aarch64 in the ARM scenario, and no need for this parameter in the X86 scenario | O |
|containerFormat | String | Software image container format | M |
|diskFormat | String | Software Disk Format | M |
|minDisk | Number | Minimum disk space required for mirroring, unit: GB| M|
|minRam | Number | Minimum RAM required for mirroring, unit: MB | M |
|size |Number | Image file size, unit: MB | O |
|swImage | Indentifier(Reference to a SwImage) | Image file address, which is the root directory address of the image file relative to the APP package | M |
|operatingSystem |String| Operating system used by the image| O|
|supportedVirtualisationEnvironment |String | Mirrored virtualization environment | O |

Sample of SwImageDesc.json file:

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
