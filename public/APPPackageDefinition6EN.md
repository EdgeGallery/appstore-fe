### Artifacts catalog
The Artifacts directory stores APP package related attachments, and the ChangeLog.txt in the root directory describes the change records.
For the container scenario, EdgeGallery adopts the helm chart deployment method, and the deployment file compression package is placed in the Artifacts/Deployment/Charts/ directory.
The /Artifacts/Docs directory stores application-related detailed document information.

    |--Artifacts
    |  | ChangeLog.txt
    |  |--Deployment
    |  |  |--Charts
    |  |     | monitoringservice.tgz
    |  |--Docs
    |     | monitoringservice.md