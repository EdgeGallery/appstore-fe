/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
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
    userAccountCenter: '我的帐号',
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
    atpTest: '测试'
  },
  common: {
    bannerTitle: '为开发人员提供一站式服务',
    bannerWord: '为开发人员提供方便的开发插件，帮助开发人员更快地开发和测试应用程序',
    type: '类型',
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
    architecture: '架构',
    GPU: 'GPU',
    MEN: 'MEM',
    CPU: 'CPU',
    AI: 'AI',
    industry: '行业',
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
    detail: '详情',
    delete: '删除',
    cancel: '取消',
    confirm: '确认',
    detect: '检测',
    download: '下载',
    uploadTime: '上传时间',
    applicationName: '应用名称',
    description: '描述',
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
    displaySwitch: '展示切换'
  },
  promptMessage: {
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
    getTaskListFail: '获取测试任务失败。',
    getMyAppFail: '获取我的App数据失败。',
    verifyNamePhoneFail: '验证用户名或手机号失败。',
    registerFail: '注册失败。',
    getCaptchaSuccess: '验证码已发送至您的手机，请查收。',
    getCaptchaFail: '获取验证码失败。',
    confirmLogout: '您确定要退出吗?',
    contrastTime: '提交时间不能早于测试结束时间！',
    subCommentFailReason: '评分和评论内容是必须的',
    cannotComment: '您不能评论两次',
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
    editAppStoreSuccess: '编辑AppStore成功'
  },
  store: {
    advancedSearch: '高级搜索',
    clearAll: '清空',
    screening: '筛选',
    sortBy: '排序',
    most: '下载量',
    name: '名称',
    score: '评分',
    appPackageInfo: '应用程序基本信息',
    createTime: '创建时间',
    download: '下载',
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
    onlyCsar: '只能上传 .csar 文件.',
    packageSizeLimit: '文件大小不超过10M',
    appIcon: '应用图标',
    appVideo: 'App Video',
    onlyImg: '请上传.jpg或.png格式文件,或者选择默认图标',
    onlyVideo: '只能上传 .mp4 文件..',
    iconSizeLimit: '文件大小不超过2M',
    videoSizeLimit: '文件大小不超过10M.',
    userName: '用户',
    time: '时间',
    toBeAdded: '待补充',
    iconRequired: '请上传图标',
    limitition: '请上传.jpg或.png格式文件，或选择默认应用图标，且大小不超过2M',
    commentInfo: '写下你的评论，帮助我成长吧！',
    noComment: '暂时没有评论哦，请留下你的第一条评论吧！',
    chooseUploadeWay: '应用大小选择',
    MinFileUpload: '文件大小不超过10M',
    BigFileUpload: '文件大小超过10M',
    hasNotVideo: '当前应用还没有可演示的视频！'
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
    appTest: '应用测试',
    appPublish: '应用发布',
    appDetail: '应用查询',
    appDownload: '应用下载/删除',
    appPromote: '应用推送',
    appPull: '应用拉取',
    messageMgmt: '消息管理',
    appstoreMgmt: '外部应用仓库管理',
    moreDetail: '查看更多详情...',
    summaryContent: 'AppStore是开发者发布和上线App应用的边缘应用市场，由Developer平台开发的边缘应用，经过ATP测试后可以直接发布到AppStore应用商店。 用户也可以在AppStore直接上传边缘应用，经过ATP测试后可以发布到AppStore，对外展现。',
    summaryContent1: '该平台分为前后台两个部分，提供主要功能接口供前台或其他三方系统调用，并进行界面展示。',
    summaryContent2: 'AppStore FE：AppStore应用仓库平台前台框架，使用VUE开发。',
    summaryContent3: 'AppStore BE：AppStore应用仓库平台后台框架，使用SpringBoot+ServiceComb开发。',
    summaryContent4: 'AppStore DB：后台依赖Postgres数据库。'
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
    provider: '供应商'
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
    onlyCsar: '只能上传 .csar 文件.',
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
    viewTestRepo: '查看报告',
    msgNum: '未读消息',
    checkAllMsg: '查看全部',
    hotIndustry: '热门边缘应用行业分布',
    pushApp: '对外推送',
    noticeApp: '收到推送',
    totalNum: '总量',
    appDownloadTrend: 'APP下载趋势图',
    appPushAndNoticeStatistic: 'APP推送统计',
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
    clickToCheckRepo: '点击查看!',
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
    pullSuccess: '拉取成功',
    getAppStoreException: '获取appStore异常',
    getPullAppException: '获取拉取app信息异常',
    viewTestRepo: '查看报告',
    haveNoPullData: '暂无拉取数据！'
  },
  about: {},
  ...zhLocale
}
export default cn
