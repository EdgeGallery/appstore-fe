/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
  nav: {
    home: 'Home Page',
    store: 'Store',
    docs: 'Docs',
    myApp: 'My App',
    about: 'About',
    logout: 'Logout',
    login: 'Login',
    userAccountCenter: 'Account',
    hsInvalidHintForTimeout: 'You have not operated for a long time, ',
    hsInvalidHintForLogout: 'You have logged in or logged out through other pages, ',
    hsInvalidHintForServerStopped: 'The server has been upgraded, ',
    hsInvalidHint: 'the current session has expired. Please choose to refresh the page or log in again.',
    refresh: 'Refresh',
    reLogin: 'Login',
    appstore: 'APP Warehouse',
    appMgmt: 'appMgmt',
    appShare: 'App Share',
    appPush: 'App Promote',
    appPull: 'App Pull',
    externalAppManagement: 'External AppStore Management',
    msgCenter: 'Message Center',
    operAna: 'Operation Analyse',
    detail: 'Detail',
    testTask: 'Test Task',
    atpReport: 'ATPReport',
    atpProcess: 'ATPProcess',
    atpTest: 'ATPTest',
    appQuery2: 'Application Search',
    appQuery21: 'Get application list',
    appQuery22: 'Get application details',
    appQuery23: 'Get application package list',
    appQuery24: 'Get application package by ID',
    appQuery25: 'Get the list of pull apps',
    appDownload3: 'Application Download',
    appDownload31: 'Download application package',
    appDownload32: 'Download application icons',
    appMessage1: 'Nofications Push',
    systemHost: 'Host Management',
    system: 'system',
    confirm: 'Confirm',
    status: 'Status'
  },
  order: {
    orderMana: 'Order Management',
    orderNum: 'Order Number',
    appName: 'App Name',
    appNameLabel: 'App Name: ',
    nodeIp: 'Node IP',
    orderTime: 'Order Time',
    nodeAddress: 'Node Location',
    status: 'Status',
    orderUserName: 'User Name',
    activation: 'Activate',
    unsubscribe: 'Unsubscribe',
    confirmToActivate: 'Are you sure to activate order: ',
    tip: 'Prompt',
    confirm: 'Confirm',
    cancel: 'Cancel',
    success: 'Operate Successfully!',
    canceled: 'Canceled!',
    confirmToUnsub: 'Are you sure to cancel order: ',
    unsubSuccess: 'Unsubscribe Successfully',
    orderStatus: {
      activating: 'Activating',
      activateFailed: 'Activate Failed',
      activated: 'Activated',
      deactivating: 'Deactivating',
      deactivateFailed: 'Deactivate Failed',
      deactivated: 'Deactivated'
    },
    subscribe: 'Subscribe',
    price: ' Yuan (RMB)/ Hour',
    subPrice: 'Price: ',
    subSuccess: 'Subscribed successfully!',
    chooseArea: 'Please choose location first！',
    noNodes: 'There is no nodes can be used!'
  },
  bill: {
    billMana: 'Billing Management',
    overall: 'Overall income and expenditure',
    yuan: '(Yuan)',
    sales: 'App sales',
    nums: 'Sales volume',
    money: 'Sales Amount',
    appName: 'App Name',
    provider: 'Provider',
    type: 'Type',
    billUserName: 'Bill User Name',
    orderUserName: 'Order User Name',
    billAmount: 'Billing Amount(CNY)',
    billAmountDesc: 'Amount Description',
    operatorFee: 'Operator Fee',
    supplierFee: 'Supplier Fee',
    operatorIncome: 'Operator Income',
    supplierIncome: 'Supplier Income',
    billTime: 'Time',
    count: 'Count',
    amount: 'Amount'
  },
  split: {
    splitMana: 'Split Management',
    default: 'Default split ratio',
    set: 'Set Up',
    add: 'Add',
    modify: 'Modify',
    addSplitSettings: 'Add split configuration',
    splitSettings: 'Split settings',
    moreThanOne: 'Please add at least one piece of data!',
    addSuccess: 'Added successfully!',
    setSuccess: 'Setted successfully!',
    modifySuccess: 'Modified successfully!',
    splitRatio: 'Split Ratio',
    confirmToDelete: 'Are you sure to delete this split config?'
  },
  system: {
    ipErrorInfo: 'Please enter the correct IP address',
    upload: 'Upload',
    error: 'Error',
    success: 'Success',
    name: 'Name',
    addHost: 'Add Host',
    pleaseInput: 'Please input',
    pleaseUpload: 'Please upload',
    address: 'Address',
    username: 'Username',
    char: 'characters',
    correct: 'correct',
    useDetail: 'Log',
    deleteConfirm: 'Are you sure to delete?',
    userId: 'User ID',
    projectId: 'Project ID',
    deployTime: 'Deploy Time',
    deleteTime: 'Delete Time',
    addMep: 'Add Service',
    basicInfo: 'Basic Info',
    registerInfo: 'Register Info',
    capType: 'Type',
    capTypeOPENMEP: 'OPENMEP',
    serviceName: 'Service Name',
    inPort: 'Port',
    version: 'Version',
    provider: 'Provider',
    apiFileId: 'API Document',
    fileExceed: 'Upload a maximum of one file',
    guideFileId: 'Guide',
    guideFileId_zh: 'Guide(chinese)',
    guideFileId_en: 'Guide(english)',
    zh_cn: 'please input chinese',
    en: 'please input english',
    portRange: 'Port Range',
    config_id: 'Config File',
    other: 'Other',
    protocol: 'Protocol',
    status: 'status',
    architecture: 'Architecture',
    operation: 'Operation',
    delete: 'delete',
    saveSuccess: 'Saved successfully!',
    saveFail: 'Save failed!',
    uploadSuccess: 'Upload success!',
    uploadFailed: 'Upload failure!',
    guestPrompt: 'The guest user has no right to operate, please log in first!',
    modify: 'Modify',
    noDataNotice: 'No data available',
    typeError: 'Format error',
    typeConfig: 'Please upload config file',
    networkConfig: 'Network Config',
    log: {
      userName: 'Username',
      projectName: 'Project Name',
      appInstancesId: 'App Instances Id',
      deployTime: 'Deploy Time',
      status: 'Status',
      operation: 'Operation'
    },
    type: 'Type',
    lcmIp: 'lcmIP',
    mecHost: 'mecHost',

    imageMgmt: {
      imgName: 'Image Name',
      imgType: 'Image Type',
      osName: 'Operate System',
      osVersion: 'Version',
      osBit: 'System Bit',
      sysDisk: 'Disk Size',
      userName: 'User',
      createTime: 'Create Time',
      uploadTime: 'Upload Time',
      imgFormat: 'Image Format',
      beginTime: 'Begin Time',
      endTime: 'End Time',
      typeValue: {
        public: 'Public',
        private: 'Private'
      },
      statusValue: {
        uploadWait: 'To be uploaded',
        uploading: 'Uploading',
        uploadSucceeded: 'Upload succeeded',
        uploadFailed: 'Upload failed',
        published: 'Published'
      },
      uploadStatusText: {
        success: 'Upload succeeded',
        error: 'Upload failed',
        uploading: 'Uploading',
        paused: 'Paused',
        waiting: 'Waiting'
      },
      operation: {
        newImg: 'New System Image',
        upload: 'Upload',
        selectImgFile: 'Select File',
        publish: 'Publish'
      },
      tip: {
        newImg: 'New System Image',
        editImg: 'Edit System Image',
        viewImg: 'View System Image Detail',
        versionEmpty: 'System version cannot be empty!',
        systemDiskEmpty: 'System disk size cannot be empty!',
        systemDiskRule: 'Please enter a 2 to 4-digit integer!',
        uploadImg: 'Upload System Image',
        uploadIsoImgPromt: 'Please zip the image file in iso format and upload it.',
        uploadQcow2ImgPromt: 'Please zip the image file in qcow2 format and upload it.',
        sysImageFileType: 'Please upload files in .zip format, and the size does not exceed 5G!',
        onlyOneImageFile: 'You can only upload one file!',
        noFileSelected: 'No file selected',
        confirmDeleteImage: 'Are you sure to delete this system image?',
        confirmPublishImage: 'Are you sure to publish this system image?',
        newImgFailed: 'New system image failed!',
        modifyImgFailed: 'Modify system image failed!',
        deleteImgFailed: 'Delete system image failed!',
        publishImgFailed: 'Publish system image failed!',
        queryImgFailed: 'Query system image failed!',
        uploadingHint: 'The system image is uploading, please wait!'
      }
    }
  },
  common: {
    cancelText: 'OK',
    more: 'More',
    check: 'Check',
    clean: 'Clean',
    sort: 'Sort',
    workloadType: 'Workload Type :',
    address: 'Address',
    type: 'Type',
    video: 'Video',
    game: 'Game',
    VideoSurveilance: 'Video Surveilance',
    AR: 'AR/VR',
    api: 'API',
    sdk: 'SDK',
    MEP: 'MEP',
    Security: 'Security',
    blockchain: 'Blockchain',
    smartDevice: 'SmartDevice',
    IOT: 'Internet of Things',
    bigdata: 'BigData',
    calculate: 'Calculate',
    all: 'All',
    architecture: 'Architecture',
    GPU: 'GPU',
    MEN: 'MEM',
    CPU: 'CPU',
    AI: 'AI',
    industry: 'Industry',
    Smartpark: 'Smart Park',
    supermarket: 'Supermarket',
    industrialManufacturing: 'Industrial Manufacturing',
    logistics: 'Transportation and logistics',
    hydroelectricity: 'Hydroelectricity',
    games: 'Games and competitions',
    openSource: 'Open Source',
    else: 'Else',
    appName: 'App Name',
    version: 'Version',
    size: 'Size',
    provider: 'Provider',
    contact: 'Contact Information',
    operation: 'Operation',
    detail: ' detail',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    detect: 'Detect',
    download: 'Download',
    uploadTime: 'UploadTime',
    applicationName: 'Application Name',
    description: 'Description',
    appDisplay: 'App Display',
    innerPublic: 'Visible in this Appstore',
    public: 'Can be pushed to other Appstore',
    userName: 'Uploder',
    getCaptcha: ' Get Captcha ',
    inputCaptcha: 'Please enter the Captcha code',
    choose: 'Please Choose',
    number: 'number',
    appStoreName: 'AppStore Name',
    appStoreVersion: 'AppStore Version',
    company: 'Company',
    url: 'Url',
    appdTransId: 'APPD Version',
    modifyApp: 'Modify',
    pageTotalNum: 'Total',
    noData: 'No Data',
    displaySwitch: 'display switch',
    appModify: 'Modify',
    experienceable: 'Experienceable',
    getResInfoFailed: 'Failed to get resource information',
    exception400: 'Request error',
    exception401: 'Request is not authorized',
    exception403: 'Request denied access',
    exceptionxxx: 'Request exception, please check',
    exceptionServer: 'Service abnormal, please check',
    loading: 'Loading'
  },
  promptMessage: {
    uninvolved: 'Refer to port from app detail',
    hostErrorInfo: 'Please enter the correct Host address',
    portErrorInfo: 'Port number range 30000-32000',
    guestUser: 'The guest user has no right to operate. please log in first!',
    operationFailed: 'The operation failure!',
    getfail: 'Get Failed!',
    modifySuccess: 'Modify the success!',
    modifyFail: 'Modify the failure',
    fileNotSupport: 'The file format does not support!',
    fileEmpty: 'The file is empty content!',
    deleteSuccess: 'Delete the success!',
    fileNotContent: 'The file format does not support  or empty content!',
    canOnlyUpload: 'Can only upload .',
    files: ' files.',
    uploadPicture: 'Can only upload .jpg and .png files.',
    uploadPackageFile: 'You need to upload package file first!',
    uploadIconFile: 'You need to upload icon file or select icon first!',
    industryEmpty: 'Industry cannot be empty',
    typeEmpty: 'Type cannot be empty',
    architectureEmpty: 'Architecture cannot be empty',
    shortDescEmpty: 'Description cannot be empty',
    completedTest: 'You have completed the test, please click to view the report',
    uploadSuccess: 'Upload success!',
    uploadFailed: 'Upload failure!',
    checkName: 'Authentication Failure, please recheck the User Name or Password.',
    repeatEnter: 'The input information is wrong, please re-enter it.',
    userResistedSuccess: 'User is registered successfully!!',
    userResistedFaile: 'Failed to register user',
    deletePrompt: 'This operation will delete the app permanently. Do you want to continue?',
    prompt: 'Prompt',
    checkUploadProgress: 'Check upload progress immediately?',
    browserAdvise: 'For sure some functions work well, please use Chrome',
    userNameIsExists: 'The user name has been registered, please change a new one.',
    phoneNumIsExists: 'The phone number is registered.',
    subCommentFail: 'Comment submission failed.',
    getCommentFail: 'Failed to get comment.',
    getAppFail: 'Failed to get App data.',
    reLogin: 'Access token expired,please log in again.',
    getTaskListFail: 'Failed to get test task.',
    getMyAppFail: 'Failed to get my App data.',
    verifyNamePhoneFail: 'Failed to verify user name or phone number.',
    registerFail: 'Registration failed.',
    getCaptchaSuccess: 'The verification code has been sent to your mobile phone, please check.',
    getCaptchaFail: 'Failed to obtain captcha.',
    confirmLogout: 'Are you sure to log out?',
    subCommentFailReason: 'Rating and content are required',
    contrastTime: 'The submission time cannot be earlier than the test end time!',
    cannotComment: 'You cannot comment on your application',
    onlyOneFile: 'Only one file is allowed, please remove the file first!',
    publishSuccess: 'Publish Success',
    createtask: 'Whether to create a test task?',
    createFail: 'Test task check failed',
    testFail: 'The test task failed, please go to view the test report!',
    testAgain: 'Test again',
    testSuccess: 'The test task is successful, please go to view the test report!',
    testRunning: 'The test task is running, please go to check the test progress!',
    testWaiting: 'The test task is waiting to run, please go to check the test progress!',
    testCreated: 'The test task has been created, please go to run the test task!',
    deleteAppStore: 'This operation will permanently delete the external warehouse. Do you want to continue?',
    registerHost: 'Please contact the administrator to add a sandbox environment for experience',
    instantiateFailed: 'Failed to instantiate the application',
    getNodePortFailed: 'Failed to obtain service borrowing point information',
    cleanEnvFailed: 'Release resource failed',
    cleanEnvSuccess: 'Release resource Success',
    portRange: 'Range 30000-32000',
    getReleaseDataFail: 'Failed to get experience initialization information',
    getNodePortSuccess: 'Success to obtain service borrowing point information'
  },
  store: {
    appChange: 'Application package conversion tool',
    backAppStore: 'Back App Store',
    backMyApp: 'Back My App',
    selectTestSce: 'Select Test Scenarios',
    type: 'Type',
    industry: 'Industry',
    advancedSearch: 'Advanced Search',
    clearAll: 'Delete',
    screening: 'Screening',
    most: 'Most',
    name: 'Name',
    downloadcount: ' downloads',
    score: 'Score',
    appPackageInfo: 'App Package Basic Information',
    createTime: 'Create Time',
    download: 'Download',
    synchronize: 'Synchronize',
    synchronizedwaiting: 'Uploading package takes a long time.',
    notSupportSynchronized: 'Not support synchronized pacakge',
    comments: 'Comments',
    introduction: 'Application Details',
    demo: 'Video',
    message: 'Message',
    postComment: 'Post a Comment',
    uploadApp: 'Upload',
    uploadLogo: 'Upload Logo',
    uploadVideo: 'Upload Demo Video',
    appstore: 'App Store',
    appShare: 'App Share',
    limitition: 'Please upload a file in .jpg or .png format, or select the default application icon, and the size does not exceed 2M',
    appPackage: 'App Package',
    dragPackage: 'Drag App package files here orclick to upload',
    onlyCsar: 'Can only upload .csar files.',
    packageSizeLimit: 'no more than 10M',
    appIcon: 'App Icon',
    appVideo: 'App Video',
    onlyImg: 'Can only upload .jpg and .png files ,or select the default App icon.',
    onlyVideo: 'Can only upload .mp4 files.',
    iconSizeLimit: 'no more than 2M.',
    videoSizeLimit: 'no more than 10M.',
    userName: 'Commentator',
    time: 'Time',
    toBeAdded: 'To be added',
    commentInfo: 'Write your comment and help me grow!',
    noComment: 'There are no comments yet, please leave your first comment!',
    hasNotVideo: 'There is no demo video for the current application!',
    newUploadApp: 'Recently Popular Apps',
    senceCase: 'Sence Case',
    introduct: 'Introduct:',
    tag: 'Tag',
    reapp: 'Related applications',
    viewMore: 'View More',
    clickViewMore: 'Click to view more >>',
    moreInfo: 'More Information >>',
    speakPeek: '2021 A Sneak Peek',
    reCommendColletion: 'Recommended Collection Specially',
    higherScore: 'High score application',
    addYourApp: 'Realize your application',
    addYourAppTitle: 'Conveniently and quickly receive AppStore, quickly realize application testing and sharing',
    developerPlateform: 'Developer Plateform',
    officialGuide: 'Official Guidance',
    recommendBroswer: 'It is recommended to use Google Chrome and IE9 or higher browsers to browse',
    downloadNum: ' Downloads',
    workloadType: 'Workload Type',
    deployContainer: 'Container',
    deployVM: 'VM',
    downloadImage: 'Application package download',
    downloadImageTip: 'Image download link is included in the package',
    downloadImageTip2: 'Image is included in the package,which may cost longer time to download,please keep patient',
    need: 'App package with image',
    noNeed: 'App package without image',
    showOnline: 'Try it online',
    releaseResource: 'Release resources',
    tryAppTip: 'Need to provide a front-end interface for experience, and add the URL of the interface access in the descriptionn',
    releaseAppResource: 'After the experience is completed, please release the resources in time to avoid resource occupation, otherwise the system will release automatically after 24 hours',
    urlTip: 'Please experience according to the following service information in combination with the interface experience URL in the application description',
    serviceName: 'ServiceName',
    Ip: 'IP',
    port: 'Port',
    assignTestNodes: 'Assign Test Nodes',
    instantiateApplication: 'Instantiate Application...',
    getDeploymentStatus: 'Get Deployment Status',
    experiencePhase: 'Experience phase',
    pleaseInstantiateApp: 'Please instantiate the app',
    waitInstantiatedApp: 'App is being instantiated, please wait patiently',
    StartDeployApp: 'Application start deployment',
    queryDeployStatus: 'Please query the deployment status',
    waitQueryStatus: 'Querying the deployment status, please wait patiently',
    deployFinished: 'Application deployment completed',
    tryAppDes: 'Please experience with the interface experience url in the application description according to the following service information',
    serviceNodeInfo: 'Service Node Info',
    appdConversion: 'Appd Conversion',
    filterApp: 'Filter App',
    taskId: 'Task ID',
    MeaoName: 'MEAO Name',
    MeaoUrl: 'MEAO Url',
    taskCreateTime: 'TaskCreateTime',
    taskStatus: 'TaskStatus',
    taskProgress: 'TaskProgress',
    Startexperience: 'Click the online experience button to experience immediately...',
    Waituploadapp: 'Aploading app, please wait...',
    Waitdistributeapp: 'App is being distributed, please wait patiently...',
    Waitgetistantiatedinfo: 'Getting instantiation information, please wait patiently...',
    synchronizeToMeao: 'Sync APP To MEAO'
  },
  docs: {
    step1: 'Open source MEP platform',
    step1Intr: 'native installation deployment',
    step1Info1: 'Open source personnel access to the MEP platform open source code',
    step1Info2: 'Local installation deployment',
    step1Process: 'Platform select > capability select > toolchain installation/sample code generation',
    step2: 'Development process',
    step2Intr: 'Application development',
    step2Info1: 'Capture platform customization capabilities and integration specifications',
    step2Info2: 'Application development self - test and upload integration test',
    step2Process: 'Develop self - test > application package > integration test',
    step3: 'Open source APP warehouse',
    step3Intr: 'Application of release',
    step3Info1: 'Application release the application can be released to the open source APP repository after the integration test',
    step3Process: 'Application publishing > publishing commercial Store',
    step4: 'MEC management system',
    step4Intr: 'Application deployment',
    step4Info1: 'Applications deployed and put online in the APP warehouse will be released to the shelf of huawei business solutions',
    step4Info2: 'Through the MEC management system, automatically or manually sent to the MEC node',
    step4Process: 'MEC management system',
    updated: 'Updated',
    modify: 'Modify',
    share: 'Share',
    favorite: 'Favorite',
    docs: 'Docs',
    appTest: 'App Test',
    appUpload: 'Upload Application',
    appShare: 'Application Share',
    appPublish: 'Publish Application',
    appView: 'View Application',
    summary: 'Summary',
    beginnerGuides: "Beginner's Guide",
    beginnerGuide: "Beginner's Guide",
    coreFunGuide: 'Core function operation guidance',
    operaContent: 'A picture teaches you to quickly become familiar with the basic functions of the AppStore, from viewing applications to sharing applications is that simple！',
    toscaFolder: 'TOSCA-Metadata Directory',
    APPDFolder: 'APPD Directory',
    imageFolder: 'Image Directory',
    artifactsFolder: 'Artifacts Directory',
    manifestFile: 'Manifest File',
    APPDStandard: 'APP Folder Standard',
    appFolderStar: 'APP Folder Standard',
    interfaceStar: 'Interface Specification',
    characteristic: 'Characteristic',
    moreDetail: 'start more detail...',
    interfaceFile: 'Interface File',
    userGuide: 'Guide',
    summaryContent: 'AppStore is an edge application market where developers release and launch App applications. Edge applications developed by the Developer platform can be directly published to the AppStore application store after ATP testing. Users can also upload edge applications directly in the AppStore, and after ATP testing, they can be published to the AppStore for external display.',

    titleContent: 'Quickly help you familiarize yourself with the core functions of the edgegallery warehouse',
    titleContentAPPD: 'Quickly help you familiarize yourself with how to define an application package',
    titleContentinter: 'Quickly help you realize application sharing between warehouses',
    beginnerPart1: 'Hello, welcome to use Edgegallery application warehouse panorama。',
    beginnerPart2: 'Using this warehouse, you can evaluate and download applications, upload and publish applications, share applications, etc.',
    appPublishdoc: 'Application Publish'
  },
  myApp: {
    checkTest: 'View historical test tasks',
    startTime: 'Starting Time',
    reset: 'Reset',
    inquire: 'Inquire',
    version: 'Version',
    endTime: 'End Time',
    operation: 'Operation',
    taskNumber: 'Task Number',
    checkReport: 'Check Report',
    upload: 'Upload',
    appName: 'Application Name',
    status: 'Status',
    test: 'Test',
    publish: 'Publish',
    addApp: 'Add External Warehouse',
    provider: 'Provider',
    modifyAppStore: 'Edit External Warehouse',
    appModify: 'Modify',
    getStatusFailed: 'failed to get app status',
    more: 'more',
    free: 'Free',
    price: ' Yuan（RMB）/Hour',
    priceTitle: 'Apply pricing settings'
  },
  report: {
    version: 'Version',
    packageName: 'Package Name',
    startTime: 'Starting Time',
    endTime: 'End Time',
    status: 'Status',
    detail: 'Details',
    ticketNumber: 'Mission ticket number',
    baseInfo: 'Basic Information',
    uploadUser: 'Upload User',
    testReport: 'EdgeGallery test certification report',
    downloadReport: 'Download Report',
    reportanalysis: 'Test report analysis',
    failReason: 'Fail Reason',
    rate: 'Pass rate',
    model: 'Certification template',
    reportDetail: 'Test case details'
  },
  atp: {
    step1: 'Virus Scan',
    step2: 'Compliance Test',
    step3: 'Sandbox Test',
    step4: 'Review',
    testCase: 'Test Case',
    startTest: 'Start Test',
    result: 'ATP Result',
    caseName: 'CaseName',
    caseDetail: 'CaseDetail',
    testReport: 'ATP Report',
    detail: 'detail',
    version: 'Version',
    packageName: 'Package Name',
    startTime: 'Starting Time',
    endTime: 'End Time',
    status: 'Status',
    ticketNumber: 'Mission ticket number',
    baseInfo: 'Basic Information',
    uploadUser: 'Upload User',
    success: 'success',
    failed: 'failed',
    dependencyDetail: 'Dependency Details',
    versionDependency: 'Version Dependency',
    testTask: 'Test task description',
    testItems: 'Test Items',
    caseNumber: 'Number of use cases',
    cancel: 'Cancel',
    confirm: 'Confirm',
    returnList: 'Return to task list',
    security: 'security',
    complianceTest: 'Compliance Test',
    sandboxTest: 'Sandbox Test',
    review: 'Review',
    testCaseManagement: 'Test Case Management',
    fileSize: 'File Size',
    applicationName: 'applicationName',
    appPackage: 'appPackage',
    uploadApp: 'uploadApp',
    onlyCsar: 'Can only upload .csar files.',
    packageSizeLimit: 'no more than 10M'
  },
  apppromotion: {
    number: 'number',
    appName: 'App Name',
    provider: 'Provider',
    version: 'Version',
    tesResult: 'ATP Test Result',
    testRepo: 'Test Result',
    lastProTime: 'Last Pro Time',
    proTimes: 'Promote Times',
    batchPro: 'Batch Push',
    messageType: 'Message Type',
    messagePull: 'pull',
    messagePush: 'push',
    messageNotice: 'notice',
    messageBeDownload: 'download',
    messageUnknow: 'unknow',
    sourceAppStore: 'Source AppStore',
    targetAppStore: 'Target AppStore',
    dateTime: 'Time',
    description: 'Description',
    mesOperation: 'Operation',
    checkDetail: 'detail',
    appPromotion: 'APP Promote',
    operationAna: 'Operation Analyse',
    execute: 'Execute',
    closePanel: 'Close',
    accept: 'accept',
    acceptFailed: 'failed to accept message!',
    getNoticeFailed: 'failedto get Notices!',
    getPromInfoFailed: 'failed to get promote information!',
    getOperatorInfoFailed: 'failed to get operator information!',
    promoteFailed: 'failed to promote app!',
    promoteFailedForNoExistStore: 'failed to promote app,please add an external Appstore first',
    msgNum: 'Unread Messages',
    checkAllMsg: 'Check All',
    hotIndustry: '■ Popular edge app industry distribution',
    pushApp: 'PUSH',
    noticeApp: 'NOTICE',
    totalNum: 'total',
    appDownloadTrend: '■ APP pull trend chart',
    appPushStatistic: '■ APP push statistics',
    appNoticeStatistic: '■ Message notice statistics',
    appHotIndustryDesc: 'Download distribution map of popular industry APP',
    appPushStatisticDesc: 'Top5 APP to extrapolate target appStore statistics chart',
    appNoticeStatisticDesc: 'Top5 external appStore push APP statistics chart',
    appPullStatisticDesc: 'Pull APP trend graphs in the past week',
    appPushTargetAppstore: 'target appstore',
    pushChartUnit: 'Unit: Times',
    quarterly1: 'First season',
    quarterly2: 'Second quarter',
    quarterly3: 'Third quarter',
    quarterly4: 'Fourth quarter',
    viewTestRepo: 'view report',
    intentionAppstore: 'Intention platform',
    acceptSuccess: 'App received successfully, please check or publish in "My App"',
    deleteMsgSuccess: 'msg delete success',
    deleteMsgFailed: 'msg delete failed',
    deleteMsgTip: 'click to delete message',
    acceptMsgTip: 'click to accept message',
    targetPaltform: 'select an intended platform',
    selectAll: 'select all',
    nameCheck: 'platform name can not be null',
    versionCheck: 'platform version can not be null',
    companyCheck: 'company can not be null',
    addrCheck: 'URL can not be null',
    appdCheck: 'APPD transducer can not be null',
    descriptionCheck: 'description can not be null',
    haveNoAnaData: 'No operation analyse data!',
    existSameAppstoreName: 'An external appstore with the same name already exists, please edit the name of the external appstore again!'
  },
  messageCenter: {
    acceptMsg: 'accept',
    deleteMsg: 'delete',
    appBasicInfo: 'APP Basic Information',
    appLabel: 'label',
    appStruct: 'struct',
    appProvider: 'provider',
    appAffinity: 'affinity',
    appVersion: 'version',
    appShortDes: 'description',
    appIndustry: 'industry',
    appTestRepo: 'Application test report',
    appTestPlatform: 'test platform',
    atpTestPlatform: 'ATP test platform',
    atpTestStatus: 'test status',
    testRepoDescription: 'report details',
    appType: 'type',
    otherInfo: 'Other Information',
    sourceAppStore: 'source',
    targetAppStore: 'target',
    operationType: 'operation',
    unReadedMsg: 'Unread',
    readedMsg: 'Read',
    allMsg: 'All Messages',
    appStoreName: 'store name',
    testRepoKey: 'test report',
    clickToCheckRepo: 'click to view',
    updateMsgFailed: 'update message status failed',
    returnToList: 'Return to message list',
    msgDetailInfo: 'Message details'
  },
  appPull: {
    name: 'app name',
    provider: 'provider',
    version: 'version',
    testRepo: 'test report',
    appIndustry: 'industry',
    appType: 'type',
    appCreateTime: 'create time',
    operation: 'operation',
    pull: 'pull',
    batchPull: 'Batch Pull',
    closeDlg: 'close',
    pullAppResult: 'Pull Result',
    result: 'result',
    pullException: 'pull exception',
    pullSuccess: 'pull success, please check in my app',
    getAppStoreException: 'get Appstore Exception',
    getPullAppException: 'get pull App Exception',
    viewTestRepo: 'view report',
    haveNoPullData: 'There is no External AppStore to pull apps,Please ',
    addApppromote: 'add an External AppStore first'
  },
  appShare: {
    manager: 'External AppStore Manage',
    lookmore: 'see details',
    appstoreManager: 'Add, modify and delete external warehouses that can be shared.',
    appstorePush: 'Manage and display application push messages in batches, select applications that need to be pushed to operators or third parties, and view application test reports. The operation is simple.',
    appstorePull: 'Batch management of the application list, display the application information that can be pulled, and select the applications that need to be pulled to perform batch operations.',
    appstoreMsg: 'View notification information, you can accept APP information that needs to be pushed from different operators.',
    appstoreOperAna: 'Through multi-dimensional data statistics and comparison, statistics and analysis of applications, and check the application pull, download, push and other types of messages.'
  },
  appManager: {
    reSetting: 'reset',
    appCreateTime: 'create time',
    queryHotAppFailed: 'Failed to get recently popular apps',
    queryAppFailed: 'Failed to get apps',
    hotAppTitle: 'Recently popular apps',
    storeAppTitle: 'Appstore displayed apps',
    pushAppTitle: 'External shareable apps',
    pushSwitch: 'Shareable',
    repoSwitch: 'Displayable',
    hotSwitch: 'Popular'
  },
  about: {
  },
  ...enLocale
}
export default en
