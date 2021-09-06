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

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  nav: {
    home: '首页',
    store: '商店',
    works: '运行原理',
    docs: '文档',
    discourse: '社区',
    myApp: '我的应用',
    about: '关于',
    logout: '注销',
    login: '登录',
    userAccountCenter: '帐号',
    hsInvalidHintForTimeout: '您长时间未操作，',
    hsInvalidHintForLogout: '您通过其它页面执行了登录或注销操作，',
    hsInvalidHintForServerStopped: '后台服务升级，',
    hsInvalidHint: '当前会话已失效。请选择刷新页面或重新登录。',
    refresh: '刷新',
    reLogin: '重新登录',
    appstore: '应用仓库',
    appMgmt: '应用管理',
    appShare: '应用共享',
    appPush: '应用推送',
    appPull: '应用拉取',
    externalAppManagement: '外部应用仓库管理',
    msgCenter: '消息中心',
    operAna: '操作分析',
    detail: '详情',
    testTask: '测试任务',
    atpReport: '测试报告',
    atpProcess: '测试进展',
    atpTest: '测试',
    appQuery2: '应用查询',
    appQuery21: '获取应用列表',
    appQuery22: '获取应用详细信息',
    appQuery23: '获取应用包列表',
    appQuery24: '通过ID获取应用包',
    appQuery25: '获取可拉取的应用列表',
    appDownload3: '应用下载',
    appDownload31: '下载应用包',
    appDownload32: '下载应用图标',
    appMessage1: '消息推送',
    systemHost: '沙箱管理',
    system: '系统',
    status: '状态',
    confirm: '确认'

  },
  system: {
    upload: '上传',
    name: '名称',
    addHost: '新增沙箱环境',
    pleaseInput: '请输入',
    pleaseUpload: '请上传',
    error: '失败',
    success: '成功',
    correct: '正确',
    address: '部署区域',
    username: '用户名',
    char: '字符',
    useDetail: '使用详情',
    deleteConfirm: '确定删除吗？',
    userId: '用户ID',
    projectId: '项目ID',
    deployTime: '部署时间',
    deleteTime: '删除时间',
    addMep: '新增服务',
    basicInfo: '基本信息',
    registerInfo: '注册信息',
    capType: '能力分类',
    capTypeOPENMEP: '生态能力',
    serviceName: '服务名称',
    inPort: '端口号',
    version: '版本',
    provider: '提供商',
    apiFileId: 'API定义文件',
    fileExceed: '最多上传一个文件',
    guideFileId: '说明文档',
    guideFileId_zh: '中文说明文档',
    guideFileId_en: '英文说明文档',
    zh_cn: '中文',
    en: '英文',
    portRange: '端口范围',
    config_id: '配置文件',
    other: '其他',
    protocol: '协议',
    status: '状态',
    architecture: '架构',
    operation: '操作',
    delete: '删除',
    saveSuccess: '保存成功！',
    saveFail: '保存失败！',
    uploadSuccess: '上传成功！',
    uploadFailed: '上传失败！',
    guestPrompt: 'Guest用户无权操作，请先登录！',
    modify: '修改',
    noDataNotice: '暂无数据',
    typeError: '格式错误',
    typeConfig: '请上传config文件',
    networkConfig: '网络配置',
    log: {
      userName: '使用者',
      projectName: '项目名',
      appInstancesId: '实例化ID',
      deployTime: '使用时间',
      status: '状态',
      operation: '操作'
    },
    type: '类型',
    lcmIp: 'lcmIP',
    mecHost: 'mecHost',

    imageMgmt: {
      imgName: '镜像名称',
      imgType: '镜像类型',
      osName: '操作系统',
      osVersion: '版本',
      osBit: '位数',
      sysDisk: '磁盘大小',
      userName: '所属用户',
      createTime: '创建时间',
      uploadTime: '上传时间',
      imgFormat: '镜像格式',
      beginTime: '起始时间',
      endTime: '结束时间',
      typeValue: {
        public: '公共',
        private: '私有'
      },
      statusValue: {
        uploadWait: '待上传',
        uploading: '正在上传',
        uploadSucceeded: '上传成功',
        uploadFailed: '上传失败',
        published: '已发布'
      },
      uploadStatusText: {
        success: '上传成功',
        error: '上传失败',
        uploading: '正在上传',
        paused: '暂停',
        waiting: '等待'
      },
      operation: {
        newImg: '新建系统镜像',
        upload: '上传',
        selectImgFile: '选择文件',
        publish: '发布'
      },
      tip: {
        newImg: '新建系统镜像',
        editImg: '修改系统镜像',
        viewImg: '查看系统镜像详情',
        versionEmpty: '系统版本号不能为空！',
        systemDiskEmpty: '系统磁盘大小不能为空！',
        systemDiskRule: '请输入两到四位的整数！',
        uploadImg: '上传系统镜像',
        uploadIsoImgPromt: '请把iso格式的镜像文件压缩为zip后上传。',
        uploadQcow2ImgPromt: '请把qcow2格式的镜像文件压缩为zip后上传。',
        sysImageFileType: '请上传.zip格式的文件，且大小不超过5G！',
        onlyOneImageFile: '只能上传一个文件！',
        noFileSelected: '未选择上传的文件',
        confirmDeleteImage: '确认要删除该系统镜像吗？',
        confirmPublishImage: '确认要发布该系统镜像吗？',
        newImgFailed: '新建系统镜像失败！',
        modifyImgFailed: '修改系统镜像失败！',
        deleteImgFailed: '删除系统镜像失败！',
        publishImgFailed: '发布系统镜像失败！',
        queryImgFailed: '查询系统镜像失败！',
        uploadingHint: '系统镜像正在上传，请等待！'
      }
    }
  },
  common: {
    more: '更多',
    check: '查看',
    clean: '清空',
    sort: '排序',
    workloadType: '负载类型 :',
    address: '地址',
    type: '类型 :',
    video: '视频应用',
    game: '游戏',
    VideoSurveilance: '视频监控',
    AR: 'AR/VR',
    api: 'API',
    sdk: 'SDK',
    MEP: 'MEP',
    Security: '安全',
    blockchain: '区块链',
    smartDevice: '智能设备',
    IOT: '物联网',
    bigdata: '大数据',
    calculate: '计算',
    all: 'All',
    architecture: '架构 :',
    GPU: 'GPU',
    MEN: 'MEM',
    CPU: 'CPU',
    AI: 'AI',
    industry: '行业 :',
    Smartpark: '智慧园区',
    supermarket: '智慧商超',
    industrialManufacturing: '工业制造',
    logistics: '交通物流',
    hydroelectricity: '水利',
    games: '游戏竞技',
    openSource: '开源',
    else: '其他',
    appName: '应用名称',
    version: '版本',
    size: '大小',
    provider: '厂商',
    contact: '联系方式',
    operation: '操作',
    detail: ' 详情',
    delete: '删除',
    cancel: '取消',
    confirm: '确认',
    detect: '检测',
    download: '下载',
    uploadTime: '上传时间',
    applicationName: '应用名称',
    description: '描述',
    appDisplay: '应用展示',
    innerPublic: '本仓库可见',
    public: '可推广到其他仓库',
    userName: '上传人',
    getCaptcha: '获取验证码',
    inputCaptcha: '请输入验证码',
    choose: '请选择',
    number: '序号',
    appStoreName: '平台名称',
    appStoreVersion: '平台版本',
    url: 'URL',
    appdTransId: 'APPD版本',
    modifyApp: '编辑',
    company: '公司',
    pageTotalNum: '总条数',
    noData: '暂无数据',
    displaySwitch: '展示切换',
    appModify: '修改',
    experienceable: '支持体验',
    getResInfoFailed: '获取资源信息失败',
    exception400: '请求错误',
    exception401: '请求未授权',
    exception403: '请求被拒绝访问',
    exceptionxxx: '请求异常，请检查',
    exceptionServer: '服务异常，请检查'
  },
  promptMessage: {
    hostErrorInfo: '请输入正确的Host地址',
    portErrorInfo: '端口号范围30000-32000',
    guestUser: 'guest用户无权操作! 请登录',
    operationFailed: '操作失败!',
    getfail: '获取失败!',
    modifySuccess: '修改成功!',
    modifyFail: '修改失败!',
    fileNotSupport: '文件格式不支持!',
    fileEmpty: '文件内容为空!',
    deleteSuccess: '删除成功!',
    fileNotContent: '文件格式不支持或内容为空!',
    fileNameType: '文件名称不能包含空格！',
    moreThan2: '只能上传不超过2MB的文件！',
    checkFileType: '请上传符合格式的文件',
    canOnlyUpload: '只能上传 .',
    files: ' 类型文件.',
    uploadPicture: '请上传.jpg或.png格式文件.',
    uploadPackageFile: '请添加需要上传的安装包文件!',
    uploadIconFile: '请上传图标文件或者选择图标!',
    industryEmpty: '行业不能为空',
    architectureEmpty: '架构不能为空',
    typeEmpty: '类型不能为空',
    shortDescEmpty: '描述不能为空',
    completedTest: '您已经完成了测试，请点击查看报告',
    uploadSuccess: '上传成功!',
    uploadFailed: '上传失败!',
    checkName: '验证失败，请重新检查用户名或密码.',
    repeatEnter: '输入信息有误，请重新输入。',
    userResistedSuccess: '用户注册成功!!',
    userResistedFaile: '注册用户失败',
    deletePrompt: '该操作将永久删除应用程序。你想继续吗?',
    deleteAppStore: '该操作将永久删除外部仓库。你想继续吗?',
    prompt: '提示',
    checkUploadProgress: '立即检查上传进度?',
    browserAdvise: '为了部分功能正常使用，我们建议使用Chrom浏览器！',
    userNameIsExists: '用户名已注册，请更换新用户名。',
    phoneNumIsExists: '电话号码已经注册了。',
    subCommentFail: '提交评论失败。',
    getCommentFail: '获取评论失败。',
    getAppFail: '获取App数据失败。',
    reLogin: '会话超时,请重新登录.',
    getTaskListFail: '获取测试任务失败。',
    getMyAppFail: '获取我的App数据失败。',
    verifyNamePhoneFail: '验证用户名或手机号失败。',
    registerFail: '注册失败。',
    getCaptchaSuccess: '验证码已发送至您的手机，请查收。',
    getCaptchaFail: '获取验证码失败。',
    confirmLogout: '您确定要退出吗?',
    contrastTime: '提交时间不能早于测试结束时间！',
    subCommentFailReason: '评分和评论内容是必须的',
    cannotComment: '您不能评论自己的应用',
    onlyOneFile: '仅支持一个文件，请先移除已有文件！',
    publishSuccess: '发布成功',
    createtask: '是否创建测试任务？',
    createFail: '测试任务检查失败',
    testFail: '测试任务失败，请前往查看测试报告!',
    testAgain: '再次测试',
    testSuccess: '测试任务成功，请前往查看测试报告!',
    testRunning: '测试任务正在运行，请前往查看测试进展!',
    testWaiting: '测试任务正在等待运行，请前往查看测试进展!',
    testCreated: '测试任务已创建，请前往运行测试任务!',
    appStoreNameEmpty: '平台名称不能为空',
    appStoreVersionEmpty: '平台版本不能为空',
    appdTransIdEmpty: '转换器不能为空',
    normalVerify: '输入的内容格式不正确',
    addAppStoreSuccess: '添加AppStore成功',
    editAppStoreSuccess: '编辑AppStore成功',
    cleanTestEnvFail: '清除测试环境失败。',
    getNodePortFail: '获取体验信息失败。',
    registerHost: '请联系管理员添加可供体验的沙箱环境',
    instantiateFailed: '实例化应用失败',
    getNodePortFailed: '获取服务节点信息失败',
    cleanEnvFailed: '释放资源失败',
    cleanEnvSuccess: '释放资源成功',
    portRange: '范围30000 - 32000',
    getReleaseDataFail: '获取体验初始化信息失败',
    getNodePortSuccess: '获取服务节点信息成功',
    uninvolved: '不涉及'
  },
  store: {
    industry: '行业',
    type: '类型',
    advancedSearch: '高级搜索',
    clearAll: '清空',
    screening: '筛选',
    sortBy: '排序',
    most: '下载量',
    downloadcount: ' 次下载',
    name: '名称',
    score: '评分',
    appPackageInfo: '应用程序基本信息',
    createTime: '创建时间',
    download: '下载',
    synchronize: '同步',
    synchronizedwaiting: '需要一定时间上传应用包',
    comments: '评论',
    introduction: '应用详情',
    demo: '视频',
    message: '消息',
    postComment: '提交评论',
    uploadApp: '上传应用',
    uploadVideo: '上传视频',
    uploadLogo: '上传图标',
    appPackage: '应用程序',
    dragPackage: '拖动应用程序包文件到这里或点击上传',
    onlyCsar: '只能上传.csar;.zip文件.',
    packageSizeLimit: '文件大小不超过10M',
    appIcon: '应用图标',
    appVideo: '应用视频',
    onlyImg: '请上传.jpg或.png格式文件,或者选择默认图标',
    onlyVideo: '只能上传 .mp4 文件.',
    iconSizeLimit: '文件大小不超过2M',
    videoSizeLimit: '文件大小不超过10M.',
    userName: '用户',
    time: '时间',
    toBeAdded: '待补充',
    iconRequired: '请上传图标',
    appstore: '应用仓库',
    appShare: '应用共享',
    limitition: '请上传.jpg或.png格式文件，或选择默认应用图标，且大小不超过2M',
    commentInfo: '写下你的评论，帮助我成长吧！',
    noComment: '暂时没有评论哦，请留下你的第一条评论吧！',
    chooseUploadeWay: '应用大小选择',
    MinFileUpload: '文件大小不超过10M',
    BigFileUpload: '文件大小超过10M',
    hasNotVideo: '当前应用还没有可演示的视频！',
    newUploadApp: '近期热门应用',
    senceCase: '场景案例',
    introduct: '简介',
    tag: '标签',
    reapp: '相关应用',
    viewMore: '查看更多',
    clickViewMore: '点击查看更多 >>',
    moreInfo: '更多信息 >>',
    speakPeek: '2021 先睹为快',
    reCommendColletion: '特别推荐锦集',
    higherScore: '高分应用',
    addYourApp: '实现你的应用',
    addYourAppTitle: '方便快捷的接入AppStore，快速实现应用测试与共享',
    developerPlateform: '开发者平台',
    officialGuide: '官方指导',
    recommendBroswer: '建议使用Google Chrome及IE9以上浏览器浏览',
    downloadNum: '次下载',
    workloadType: '负载类型',
    deployContainer: '容器',
    deployVM: '虚拟机',
    downloadImage: '应用包下载',
    downloadImageTip: ' 应用包内有镜像下载链接',
    downloadImageTip2: ' 镜像在应用包里，镜像文件较大，下载耗时较长，请耐心等待',
    need: '带镜像的应用包',
    noNeed: '不带镜像的应用包',
    showOnline: '在线体验',
    releaseResource: '释放资源',
    tryAppTip: '需要提供可供体验的前台界面，并在描述里面添加界面访问的URL',
    releaseAppResource: '体验完成后请及时释放资源，避免资源占用，否则系统24小时后自动释放',
    serviceName: '服务名称',
    Ip: 'IP',
    port: '端口',
    assignTestNodes: '分配测试节点',
    instantiateApplication: '实例化应用',
    getDeploymentStatus: '获取部署状态',
    step11: '请分配测试节点',
    step12: '正在分配测试节点，请耐心等待点',
    step13: '测试节点已分配完成',
    experiencePhase: '体验阶段',
    pleaseInstantiateApp: '请实例化应用',
    waitInstantiatedApp: '正在实例化应用，请耐心等待',
    StartDeployApp: '应用开始部署',
    queryDeployStatus: '请查询部署状态',
    waitQueryStatus: '正在查询部署状态，请耐心等待',
    deployFinished: '应用部署完成',
    tryAppDes: '请根据如下服务信息，结合应用描述中界面体验url进行体验',
    serviceNodeInfo: '服务节点信息',
    appdConversion: '应用包转换',
    filterApp: '筛选应用'
  },
  docs: {
    // step1: '开源MEP平台',
    step1: '登录首页',
    step1Intr: '本地安装部署',
    step1Info1: '进入网址后，默认为guest用户，可以查看信息，注册账号，注册完成之后，登陆成功后进入商店首页, 之后才可以上传应用',
    step2: '查看应用',
    step2Info1: '点击应用查看应用详情, 下载按钮有权限设置，只能下载自己上传的包, 并可以对AP进行评价',
    step3: '上传应用',
    step3Info1: '上传APP，打开APP Store主界面，点击右侧上传图标，打开上传APP对话框',
    step4: '应用共享',
    step4Intr: '上传共享',
    step4Info1: '添加外部应用仓库，可以进行应用推送，发送消息，操作分析',
    step4Info2: '添加外部应用跟仓库，进行应用拉取，记录消息，操作分析',
    step4Process: 'MEC管理系统',
    updated: '更新时间',
    modify: '修改',
    share: '分享',
    favorite: '喜爱',
    docs: '文档',
    summary: '概述',
    operateFile: '新手指导',
    operaContent: '一张图教你快速熟悉AppStore的基本功能，从查看应用到共享应用就是这么简单！',
    APPDStandard: 'APP包规范',
    toscaFolder: 'TOSCA-Metadata目录',
    APPDFolder: 'APPD目录',
    imageFolder: 'Image目录',
    artifactsFolder: 'artifacts目录',
    manifestFile: 'manifest文件',
    characteristic: '特性',
    appUpload: '应用上传',
    appShare: '应用共享',
    appTest: '应用测试',
    appPublish: '应用发布',
    appDetail: '应用查询',
    appDownload: '应用下载/删除',
    appPromote: '应用推送',
    appPull: '应用拉取',
    messageMgmt: '消息管理',
    moreDetail: '查看更多详情...',
    summaryContent: 'AppStore是开发者发布和上线App应用的边缘应用市场，由Developer平台开发的边缘应用，经过ATP测试后可以直接发布到AppStore应用商店。 用户也可以在AppStore直接上传边缘应用，经过ATP测试后可以发布到AppStore，对外展现。',

    titleContent: '快速帮您熟悉Edgegallery仓库的核心功能',
    titleContentAPPD: '快速帮您熟悉如何定义应用包',
    titleContentinter: '快速帮您实现仓库间应用共享',
    beginnerPart1: '您好，欢迎使用Edgegallery应用仓库全景图。',
    beginnerPart2: '使用本仓库，您可以评价下载应用，上传发布应用，共享应用等。',
    beginnerGuides: '新手指南',
    beginnerGuide: ' 新手指导',
    coreFunGuide: ' 核心功能操作指导',
    interfaceFile: '接口文档',
    externalWarehouse: '应用拉取',
    appPullOrPush: '应用推广',
    appView: '应用查询',
    centerMsg: '消息中心',
    userGuide: '新手指导',
    appFolderStar: '应用包规范',
    interfaceStar: '接口规范',
    apppull: '应用拉取',
    appPush: '应用推广',
    appPublishdoc: '应用发布'

  },
  myApp: {
    checkTest: '查看历史测试任务',
    startTime: '提交时间',
    reset: '重置',
    inquire: '查询',
    version: '版本',
    endTime: '结束时间',
    operation: '操作',
    taskNumber: '任务序号',
    checkReport: '查看报告',
    upload: '上传',
    status: '状态',
    test: '测试',
    publish: '发布',
    addApp: '添加外部仓库',
    modifyAppStore: '编辑外部仓库',
    provider: '供应商',
    appModify: '修改',
    getStatusFailed: '获取应用状态失败',
    more: '更多'
  },
  report: {
    version: '版本',
    packageName: '应用名称',
    startTime: '提交时间',
    endTime: '结束时间',
    status: '状态',
    detail: '详情',
    ticketNumber: '任务号',
    baseInfo: '基础信息',
    uploadUser: '上传人',
    testReport: 'EdgeGallery测试认证报告',
    downloadReport: '下载报告',
    reportanalysis: '测试报告分析',
    failReason: '失败原因',
    rate: '通过率',
    model: '认证模板',
    reportDetail: '测试用例详情'
  },
  atp: {
    step1: '病毒扫描',
    step2: '遵从性测试',
    step3: '沙箱测试',
    step4: '审核',
    testCase: '测试用例',
    startTest: '开始测试',
    result: '测试结果',
    caseName: '用例名称',
    caseDetail: '用例详情',
    testReport: '测试报告分析',
    detail: '详情',
    version: '版本',
    packageName: '应用名称',
    startTime: '提交时间',
    endTime: '结束时间',
    status: '状态',
    ticketNumber: '任务号',
    baseInfo: '基础信息',
    uploadUser: '上传人',
    success: '成功数量',
    failed: '失败数量',
    dependencyDetail: '依赖详情',
    versionDependency: '版本依赖',
    testTask: '测试任务描述',
    testItems: '测试项',
    caseNumber: '用例个数',
    cancel: '取消',
    confirm: '确定',
    returnList: '返回任务列表',
    security: '安全测试',
    complianceTest: '遵从性测试',
    sandboxTest: '沙箱测试',
    review: '审核',
    testCaseManagement: '测试用例管理',
    fileSize: '文件大小',
    applicationName: '应用名称',
    appPackage: '应用包',
    uploadApp: '上传应用',
    onlyCsar: '只能上传.csar;.zip文件.',
    packageSizeLimit: '文件大小不超过10M'
  },
  apppromotion: {
    number: '序号',
    appName: '应用名称',
    provider: '厂商',
    version: '版本',
    tesResult: '认证测试结果',
    testRepo: '认证测试报告',
    lastProTime: '最后推广时间',
    proTimes: '推广次数',
    batchPro: '批量推送',
    messageType: '消息类型',
    messagePull: '拉取',
    messagePush: '推送',
    messageNotice: '通知',
    messageBeDownload: '下载',
    messageUnknow: '未知',
    sourceAppStore: '源应用仓库',
    targetAppStore: '目标应用仓库',
    dateTime: '时间',
    description: '描述',
    mesOperation: '操作',
    checkDetail: '查看',
    appPromotion: '应用推送',
    operationAna: '操作分析',
    execute: '执行',
    closePanel: '关闭',
    accept: '接收',
    acceptFailed: '消息接收失败!',
    getNoticeFailed: '获取消息失败!',
    getPromInfoFailed: '获取推送信息失败!',
    getOperatorInfoFailed: '获取操作信息失败!',
    promoteFailed: '推送app失败!',
    promoteFailedForNoExistStore: '推送app失败,请先添加外部应用仓库',
    viewTestRepo: '查看报告',
    msgNum: '未读消息',
    checkAllMsg: '查看全部',
    hotIndustry: '■ 热门边缘应用行业分布',
    pushApp: '对外推送',
    noticeApp: '收到推送',
    totalNum: '总量',
    appDownloadTrend: '■ APP拉取趋势图',
    appPushStatistic: '■ APP推送统计',
    appNoticeStatistic: '■ 消息通知统计',
    appPushTargetAppstore: '目标仓库',
    appHotIndustryDesc: '热门行业应用下载分布图',
    appPushStatisticDesc: 'Top5应用外推目标仓库统计图',
    appNoticeStatisticDesc: 'Top5外部仓库推送应用统计图',
    appPullStatisticDesc: '近一周拉取应用趋势图',
    pushChartUnit: '单位：次',
    quarterly1: '第一季度',
    quarterly2: '第二季度',
    quarterly3: '第三季度',
    quarterly4: '第四季度',
    intentionAppstore: '意向平台',
    acceptSuccess: '应用接收成功，请到“我的应用”中查看或发布',
    deleteMsgSuccess: '删除消息成功',
    deleteMsgFailed: '删除消息失败',
    deleteMsgTip: '单击删除消息',
    acceptMsgTip: '单击接收消息',
    targetPaltform: '请选择意向平台',
    selectAll: '全选',
    nameCheck: '平台名称不能为空',
    versionCheck: '平台版本不能为空',
    companyCheck: '公司不能为空',
    addrCheck: 'URL不能为空',
    appdCheck: '转换器不能为空',
    descriptionCheck: '描述不能为空',
    haveNoAnaData: '暂无操作分析数据！',
    existSameAppstoreName: '已存在同名外部仓库，请重新编辑外部仓库名称'
  },
  messageCenter: {
    msgToday: '今天',
    msgWeek: '一周内',
    msgMonth: '一月内',
    msgOld: '更早',
    acceptMsg: '接收',
    deleteMsg: '删除',
    appBasicInfo: '应用基本信息',
    appLabel: '应用名称',
    appStruct: '架构',
    appProvider: '厂商',
    appAffinity: '亲和性',
    appVersion: '版本',
    appShortDes: '应用描述',
    appIndustry: '行业',
    appTestRepo: '应用测试报告',
    appTestPlatform: '测试平台',
    atpTestPlatform: 'ATP测试平台',
    atpTestStatus: '测试结果',
    testRepoDescription: '报告详情如下',
    appType: '类型',
    otherInfo: '其他信息',
    sourceAppStore: '源Appstore',
    targetAppStore: '目标Appstore',
    operationType: '操作描述',
    unReadedMsg: '未读',
    readedMsg: '已读',
    allMsg: '全部消息',
    appStoreName: '仓库名称',
    testRepoKey: '测试报告',
    clickToCheckRepo: '点击查看',
    returnToList: '返回消息列表',
    msgDetailInfo: '消息详情',
    updateMsgFailed: '更新消息状态失败'
  },
  appPull: {
    name: '应用名称',
    provider: '厂商',
    version: '版本',
    testRepo: '认证测试报告',
    appIndustry: '行业',
    appType: '类型',
    appCreateTime: '创建时间',
    operation: '操作',
    pull: '拉取',
    batchPull: '批量拉取',
    closeDlg: '关闭',
    pullAppResult: '拉取结果',
    result: '结果',
    pullFailed: '拉取失败',
    pullSuccess: '拉取成功，请在我的应用中查看',
    getAppStoreException: '获取appStore异常',
    getPullAppException: '获取拉取app信息异常',
    viewTestRepo: '查看报告',
    haveNoPullData: '暂无可拉取应用的外部仓库，请先',
    addApppromote: '添加外部仓库'
  },
  appShare: {
    manager: '外部应用仓库管理',
    lookmore: ' 查看详情',
    appstoreManager: '对于可以共享的外部仓库进行操作,添加、修改和删除可以应用共享的外部仓库。',
    appstorePush: '批量管理并展示应用推送消息,选择需要推送给运营商或者第三方的应用,查看应用的测试报告,操作简洁。',
    appstorePull: '批量管理应用列表，展示可拉取的应用信息,选择需要拉取的应用可进行批量操作。',
    appstoreMsg: '查看通知信息，可以接受来自不同运营商推送的APP信息。',
    appstoreOperAna: '通过多维度的数据统计与对比,对应用进行统计与分析,并查 看应用的拉去、下载、推送等类型的消息。'
  },
  appManager: {
    reSetting: '重设',
    appCreateTime: '创建时间',
    hotAppSetTipMsg: '有且只能设置6个热门应用',
    storeAppSetTipMsg: '设置应用为仓库可见',
    pushAppSetTipMsg: '设置应用为可对外推送',
    queryHotAppFailed: '获取热门应用失败',
    queryAppFailed: '获取应用失败',
    hotAppTitle: '近期热门应用管理',
    storeAppTitle: '应用展示仓库应用列表管理',
    pushAppTitle: '可推广应用列表管理',
    pushSwitch: '可推广',
    repoSwitch: '可展示',
    hotSwitch: '热门'
  },
  about: {},
  ...zhLocale
}
export default cn
