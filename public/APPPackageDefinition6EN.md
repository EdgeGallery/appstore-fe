### Artifacts catalog
The Artifacts directory stores APP package related attachments, and the ChangeLog.txt under root directory describes the change records.
For the container scenario, EdgeGallery utilizes helm chart as the way for deployment, and the archive package of deployment file is placed in the Artifacts/Deployment/Charts/ directory.
The /Artifacts/Docs directory contains application-related detailed document information.

    |--Artifacts
    |  | ChangeLog.txt
    |  |--Deployment
    |  |  |--Charts
    |  |     | monitoringservice.tgz
    |  |--Docs
    |     | monitoringservice.md