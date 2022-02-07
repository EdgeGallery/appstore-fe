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

const PROXY_PREFIX_CURRENTSERVER = window.location.pathname.slice(0, window.location.pathname.length - 1)
const PORT_CURRENTSERVER = '30091'
const DOMAIN_CURRENTSERVER = 'appstore'

const PLATFORMNAME_DEVELOPER = 'DEVELOPER'
const PLATFORMNAME_MECM = 'MECM'
const PLATFORMNAME_ATP = 'ATP'
const PLATFORMNAME_EG = 'EG'
const PLATFORMNAME_APPD = 'APPD'

const PLATFORM_LIST = [
  {
    name: PLATFORMNAME_DEVELOPER,
    port: '30092',
    domain: 'developer',
    proxyPrefix: '/edgegallery/developer'
  },
  {
    name: PLATFORMNAME_MECM,
    port: '30093',
    domain: 'mecm',
    proxyPrefix: '/edgegallery/mecm'
  },
  {
    name: PLATFORMNAME_ATP,
    port: '30094',
    domain: 'atp',
    proxyPrefix: '/edgegallery/atp'
  },
  {
    name: PLATFORMNAME_EG,
    port: '30095',
    domain: 'edgegallery',
    proxyPrefix: '/edgegallery/web'
  },
  {
    name: PLATFORMNAME_APPD,
    port: '30087',
    domain: 'appd',
    proxyPrefix: '/edgegallery/appd'
  }
]

const INDUSTRY = [
  {
    labelcn: '智慧城市',
    labelen: 'Smart City',
    value: 'Smart City',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '智慧园区',
    labelen: 'Smart Park',
    value: 'Smart Park',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '智慧农业',
    labelen: 'Smart Agriculture',
    value: 'Smart Agriculture',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '工业互联网',
    labelen: 'Industrial Internet',
    value: 'Industrial Internet',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '交通物流',
    labelen: 'Transportation Logistics',
    value: 'Transportation Logistics',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '能源',
    labelen: 'Energy',
    value: 'Energy',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '金融',
    labelen: 'Finance',
    value: 'Finance',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '教育',
    labelen: 'Education',
    value: 'Education',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '文化旅游',
    labelen: 'Cultural Tourism',
    value: 'Cultural Tourism',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '医疗健康',
    labelen: 'Medical Health',
    value: 'Medical Health',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '数字政府',
    labelen: 'Digital Government',
    value: 'Digital Government',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '生态环境',
    labelen: 'Ecosystem',
    value: 'Ecosystem',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '游戏竞技',
    labelen: 'Game Competition',
    value: 'Game Competition',
    selected: false,
    type: 'industry'
  },
  {
    labelcn: '其他',
    labelen: 'Others',
    value: 'Others',
    selected: false,
    type: 'industry'
  }
]

const TYPES = [
  {
    labelcn: '视频应用',
    labelen: 'Video Application',
    value: 'Video Application',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '安全',
    labelen: 'Safety',
    value: 'Safety',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '区块链',
    labelen: 'Blockchain',
    value: 'Blockchain',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '物联网',
    labelen: 'Internet of Things',
    value: 'Internet of Things',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '大数据',
    labelen: 'Big Data',
    value: 'Big Data',
    selected: false,
    type: 'types'
  },
  {
    labelcn: 'AR/VR',
    labelen: 'AR/VR',
    value: 'AR/VR',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '游戏',
    labelen: 'Game',
    value: 'Game',
    selected: false,
    type: 'types'
  },
  {
    labelcn: '其他',
    labelen: 'Others',
    value: 'Others',
    selected: false,
    type: 'types'
  }
]

const TTYPES = [
  {
    label: ['联通_APPD_2.0', 'Unicom_APPD_2.0'],
    value: '联通_APPD_2.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['移动_APPD_2.0', 'Mobile_APPD_2.0'],
    value: '移动_APPD_2.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['电信_APPD_2.0', 'Telecom_APPD_2.0'],
    value: '电信_APPD_2.0',
    selected: false,
    type: 'types'
  },
  {
    label: ['社区_APPD_2.0', 'Community_APPD_2.0'],
    value: '社区_APPD_2.0',
    selected: false,
    type: 'types'
  }
]

const AFFINITY = [
  {
    label: 'X86',
    value: 'X86',
    selected: false,
    type: 'affinity'
  },
  {
    label: 'ARM64',
    value: 'ARM64',
    selected: false,
    type: 'affinity'
  },
  {
    label: 'ARM32',
    value: 'ARM32',
    selected: false,
    type: 'affinity'
  }
]

const DEPLOYMODE = [
  {
    labelcn: '容器',
    labelen: 'container',
    value: 'container',
    selected: false,
    type: 'workloadType'
  },
  {
    labelcn: '虚拟机',
    labelen: 'vm',
    value: 'vm',
    selected: false,
    type: 'workloadType'
  }
]

const SORTITEM = [
  {
    labelcn: '下载量',
    labelen: 'DownloadCount',
    value: 'DownloadCount',
    selected: false,
    type: 'sortItem'
  },
  {
    labelcn: '名称',
    labelen: 'AppName',
    value: 'AppName',
    selected: false,
    type: 'sortItem'
  },
  {
    labelcn: '评分',
    labelen: 'Score',
    value: 'Score',
    selected: false,
    type: 'sortItem'
  },
  {
    labelcn: '上传时间',
    labelen: 'CreateTime',
    value: 'CreateTime',
    selected: false,
    type: 'sortItem'
  }
]

const MEAO = [
  {
    labelcn: '华为 MEAO',
    labelen: 'Huawei MEAO',
    value: ''
  },
  {
    labelcn: '九州云 MEAO',
    labelen: 'JiuzhouCloud MEAO',
    value: ''
  }
]

const Architecture = [
  {
    value: 'X86',
    label: 'X86'
  }, {
    value: 'ARM64',
    label: 'ARM64'
  }, {
    value: 'ARM32',
    label: 'ARM32'
  }
]

const SenceCaseData = [
  {
    imgSrc: require('../assets/images/senceCase1.png'),
    nameCn: '智慧园区',
    imgData: [
      require('../assets/images/sencePark1.png'),
      require('../assets/images/sencePark2.png'),
      require('../assets/images/sencePark3.png')
    ],
    nameEn: 'Smart Park',
    type: 'park',
    describtionCn: '智慧园区搭载人工智能、大数据、AR、VR等技术，依托数字平台，实现园区整体智慧化，集中管理、分别控制，降低人力成本，使能业务创新，提高运营效率，减少能源消耗，引领至简体验。',
    describtionEn: 'The smart park is equipped with artificial intelligence, big data, AR, VR and other technologies, relying on digital platforms to realize the overall intelligence of the park, centralized management and separate control, reduce labor costs, enable business innovation, improve operational efficiency, and reduce energy consumption, leading to simple and user-friendly experience.',
    appSenceCn: ['1、园区安全监管：如监控监测、预警预报、隐患排查、综合应急联动等方面。', '2、园区环保监管：如园区有组织、无组织排放监控监测，能源监测、大气污染、水污染监控监测等。', '3、园区安防管理：如园区封闭式管理、园区内部及周界监控报警管理、园区危化品车辆管理、园区危化品停车场及物流管理等。', '4、园区能源管理：如企业水、电、燃气、蒸汽等数据进行物联网远程采集分析，对园区能源调度及响应政府节能降耗指标起到决策支撑作用。'],
    appSenceEn: ['1. Park safety supervision: such as monitoring, warning and risk forecasting, hidden danger investigation, comprehensive emergency response, etc.', '2. Environmental supervision of the park: such as the monitoring of organized and unorganized emissions in the park, energy monitoring, air pollution, and water pollution monitoring.', '3. Park security management: such as park closed management, park internal and perimeter monitoring and alarm management, park hazardous chemicals vehicle management, park hazardous chemicals parking lot and logistics management, etc.', '4. Energy management in the park: For example, data such as enterprise water, electricity, gas, and steam are collected and analyzed remotely by the Internet of Things, which plays a decision-making support role in the energy dispatch of the park and in response to the governments energy conservation and consumption reduction indicators.']
  },
  {
    imgSrc: require('../assets/images/senceCase2.png'),
    imgData: [
      require('../assets/images/senceInternet1.png'),
      require('../assets/images/senceInternet2.png'),
      require('../assets/images/senceInternet3.png')
    ],
    nameCn: '工业互联网',
    nameEn: 'Industrial Internet',
    type: 'internet',
    describtionCn: '工业互联网以5G网络为基础、平台为中枢、数据为要素、安全为保障，通过对人、机、物、系统等的全面连接，构建起覆盖全产业链、全价值链的全新制造和服务体系，既是工业数字化、网络化、智能化转型的基础设施，也是互联网、大数据、人工智能与实体经济深度融合的应用模式，同时也是一种新业态、新产业，将重塑企业形态、供应链和产业链。',
    describtionEn: 'The Industrial Internet is based on the 5G network, the platform is the center, the data is the key element, and the security is the guarantee. Through the comprehensive connection of people, machines, objects, and systems, a new manufacturing and service system covering the entire industrial chain and the entire value chain is built. It is not only the infrastructure for industrial digitalization, networking, and intelligent transformation, but also an application model for the deep integration of the Internet, big data, artificial intelligence, the real economy and industrial chain.',
    appSenceCn: ['1、平台化设计：汇聚人员、算法、模型、任务等设计资源，实现高水平高效率的轻量化设计、并行设计、敏捷设计、交互设计和基于模型的设计，变革传统设计方式，提升研发质量和效率。', '2、智能化制造：实现材料、设备、产品等生产要素与用户之间的在线连接和实时交互，逐步实现机器代替人生产，智能化代表制造业未来发展的趋势。', '3、网络化协同：通过跨部门、跨层级、跨企业的数据互通和业务互联，推动供应链上的企业和合作伙伴共享客户、订单、设计、生产、经营等各类信息资源，实现网络化的协同设计、协同生产、协同服务，进而促进资源共享、能力交易以及业务优化配置', '4、个性化定制：面向消费者个性化需求，通过客户需求准确获取和分析、敏捷产品开发设计、柔性智能生产、精准交付服务等，实现用户在产品全生命周期中的深度参与，是以低成本、高质量和高效率的大批量生产实现产品个性化设计、生产、销售及服务的一种制造服务模式。', '5、服务化延伸：企业从原有制造业务向价值链两端高附加值环节延伸，从以加工组装为主向“制造+服务”转型，从单纯出售产品向出售“产品+服务”转变，具体包括设备健康管理、产品远程运维、设备融资租赁、分享制造、互联网金融等。', '6、数字化管理：企业通过打通核心数据链，贯通生产制造全场景、全过程，基于数据的广泛汇聚、集成优化和价值挖掘，优化、创新乃至重塑企业战略决策、产品研发、生产制造、经营管理、市场服务等业务活动，构建数据驱动的高效运营管理新模式。'],
    appSenceEn: ['1. Platform-based design: Gather design resources such as personnel, algorithms, models, and tasks to achieve high-level and efficient lightweight design, concurrent design, agile design, interaction design, and model-based design, transform traditional design methods, and improve R&D quality and efficiency.', '2. Intelligent manufacturing: realize online connection and real-time interaction between production elements such as materials, equipment, and products and users, and gradually realize the replacement of human production by machines. Intelligence represents the future development trend of the manufacturing industry.', '3. Networked collaboration: Through cross-department, cross-level, and cross-enterprise data exchange and business interconnection, enterprises and partners in the supply chain are encouraged to share various information resources such as customers, orders, design, production, and operation, and realize networked collaborative design, collaborative production, and collaborative services, thereby promoting resource sharing, capacity trading, and business optimization.', '4. Personalized customization: Facing the personalized needs of consumers, through accurate acquisition and analysis of customer needs, agile product development and design, flexible intelligent production, and precise delivery services to realize the deep participation of users in the whole life cycle of the product, which is low Cost, high-quality and high-efficiency mass production is a manufacturing service model that realizes individual product design, production, sales and service.', '5. Service-oriented extension: The enterprise extends from the original manufacturing business to the high value-added links at both ends of the value chain, from processing and assembling mainly to "manufacturing + service", and from simply selling products to selling "product + service", Specifically, it includes equipment health management, remote product operation and maintenance, equipment financial leasing, shared manufacturing, and Internet finance.', '6. Digital management: Enterprises can optimize, innovate and even reshape corporate strategic decision-making, product development, manufacturing, and operation by opening up the core data chain, connecting the entire production and manufacturing process, and the extensive aggregation, integrated optimization and value mining of data. Management, market services and other business activities, and build a new data-driven efficient operation management model.']
  },
  {
    imgSrc: require('../assets/images/senceCase3.png'),
    imgData: [
      require('../assets/images/senceLogistics1.png'),
      require('../assets/images/senceLogistics2.png'),
      require('../assets/images/senceLogistics3.png')
    ],
    nameCn: '交通物流',
    nameEn: 'Transportation Logistics',
    type: 'logistics',
    describtionCn: '交通物流以5G网络为基础，充分运用物联网、云计算、互联网等技术，通过高新技术进行目标与环境识别、汇集交通信息，使交通系统在区域、城市范围具备感知、互联、分析、预测、控制等能力，提升交通系统运行效率和管理服务水平。',
    describtionEn: 'Based on the 5G network, transportation and logistics make full use of technologies such as the Internet of Things, cloud computing, and the Internet to identify targets and environments through high-tech, and collect traffic information, so that the transportation system can perceive, interconnect, analyze, predict, and Control and other capabilities to improve the operational efficiency of the transportation system and the level of management services.',
    appSenceCn: ['1、车联网与自动驾驶：车载信息、车辆环境感知、V2X网联驾驶、远程驾驶、自动驾驶、智慧交通。', '2、智慧公交：公交车、出租车和城轨的调度，公交车、城轨及其车站的安防监控。', '3、智慧铁路：列车与集装箱监控、调度和管理，铁路线路、列车车站和客流监控管理。', '4、智慧机场：地面交通与空中交通的调度与监控管理，候机大厅、行李和客流的监控管理。', '5、智慧港口：龙门吊远程监控、船联网数据回传、港口园区交通管理、安全监控和优化规划。', '6、智慧公路：卡口车流和服务器客流监测、全景视频监控、桥梁结构健康监测、隧道运行管理和应急救援调度等。', '7、智慧物流：物流园区、仓库安全监控与管理、设备远程操控、货车及驾驶员的调度与管理。'],
    appSenceEn: ['1. Vehicle networking and autonomous driving: vehicle information, vehicle environment perception, V2X connected driving, remote driving, autonomous driving, and smart transportation.', '2. Smart public transport: scheduling of buses, taxis and urban rails, and security monitoring of buses, urban rails and their stations.', '3. Smart railway: monitoring, dispatching and management of trains and containers, monitoring and management of railway lines, train stations and passenger flow.', '4. Smart airport: scheduling and monitoring management of ground traffic and air traffic, monitoring and management of waiting halls, luggage and passenger flow.', '4. Smart airport: scheduling and monitoring management of ground traffic and air traffic, monitoring and management of waiting halls, luggage and passenger flow.', '6. Smart highway: checkpoint traffic flow and server passenger flow monitoring, panoramic video monitoring, bridge structural health monitoring, tunnel operation management and emergency rescue scheduling, etc.', '7. Smart logistics: security monitoring and management of logistics parks and warehouses, remote control of equipment, scheduling and management of trucks and drivers.']
  },
  {
    imgSrc: require('../assets/images/senceCase4.png'),
    imgData: [
      require('../assets/images/senceEnergy1.png'),
      require('../assets/images/senceEnergy2.png'),
      require('../assets/images/senceEnergy3.png')
    ],
    nameCn: '智慧能源',
    nameEn: 'Smart Energy',
    type: 'energy',
    describtionCn: '智慧能源基于5G网络，综合利用物联网、大数据、人工智能、云计算、边缘计算等技术，实现设备状态智能监测与感知、设备状态智能评价、设备故障智能诊断及预警、AR辅助检修及远程专家支持等功能。有效提升能源数字化、网络化、智能化发展水平，为构建清洁低碳、安全高效的能源体系提供有力支撑。',
    describtionEn: 'Smart Energy is based on 5G network and comprehensively utilizes the Internet of Things, big data, artificial intelligence, cloud computing, edge computing and other technologies to realize intelligent monitoring and perception of equipment status, intelligent evaluation of equipment status, intelligent diagnosis and early warning of equipment faults, AR-assisted maintenance and remote control, expert support and so on. Effectively improve the level of energy digitalization, networking, and intelligent development, and provide strong support for the construction of a clean, low-carbon, safe and efficient energy system.',
    appSenceCn: ['1、智能电厂：生产控制、智能巡检、运行维护、安全应急。', '2、智能电网：输变配电运行监视、配网保护与控制、新能源及储能并网、电网协同调度及稳定控制。', '3、智能煤矿：井下巡检和安防、无人驾驶等系统建设和应用，探索智能采掘及生产控制、环境监测与安全防护、虚拟交互。', '4、智能油气：油田单井、管线、电力线、加油站等关键生产单元的高清视频监控、无人机巡检、机器人巡检、工业AR。', '5、综合能源：能流仿真与生产控制、分布式能源管理、虚拟电厂、智能巡检与运维。', '6、智能制造与建造：能源装备智能制造、施工现场信息采集、工地作业、远程监造、工地安全。'],
    appSenceEn: ['1. Intelligent power plant: production control, intelligent inspection, operation and maintenance, safety emergency.', '2. Smart grid: power transmission, transformation and distribution operation monitoring, distribution network protection and control, new energy and energy storage grid connection, grid coordination scheduling and stability control.', '3. Intelligent coal mine: construction and application of underground inspection and security, unmanned driving and other systems, exploration of intelligent mining and production control, environmental monitoring and safety protection, and virtual interaction.', '4. Intelligent oil and gas: high-definition video surveillance, drone inspection, robot inspection, and industrial AR for key production units such as oilfield single wells, pipelines, power lines, and gas stations.', '5. Integrated energy: energy flow simulation and production control, distributed energy management, virtual power plant, intelligent inspection and operation and maintenance.', '6. Intelligent manufacturing and construction: intelligent manufacturing of energy equipment, information collection on construction sites, site operations, remote manufacturing supervision, and site safety.']
  },
  {
    imgSrc: require('../assets/images/senceCase5.png'),
    imgData: [
      require('../assets/images/senceMedical1.png'),
      require('../assets/images/senceMedical2.png'),
      require('../assets/images/senceMedical3.png')
    ],
    nameCn: '智慧医疗',
    nameEn: 'Smart Medical',
    type: 'medical',
    describtionCn: '智慧医疗基于5G网络，结合物联网、大数据、人工智能、云计算、VR/AR等信息技术手段，充分应用于各类诊疗过程，助力医疗卫生信息化建设，加速行业数字化转型，打破地域限制，促进跨地域，跨机构信息共享，促进医疗资源纵向流动，降低医疗开支，提高医疗水平，提升优质医疗资源可及性和医疗服务整体效率。',
    describtionEn: 'Smart healthcare is based on 5G network, combined with Internet of Things, big data, artificial intelligence, cloud computing, VR/AR and other information technology means, and is fully applied to various diagnosis and treatment processes, assisting the construction of medical and health informatization, accelerating the digital transformation of the industry, and breaking geographical restrictions , promote cross-regional, cross-institutional information sharing, promote the vertical flow of medical resources, reduce medical expenses, improve medical standards, improve the accessibility of high-quality medical resources and the overall efficiency of medical services.',
    appSenceCn: ['1、远程医疗：远程会诊、远程超声、远程手术、应急急救、远程示教、远程监护。', '2、智慧导诊：采用“云-网-机”结合的5G智慧导诊机器人，利用5G边缘计算能力，提供基于自然语义分析的人工智能导诊服务。', '3、移动医护：影像数据和体征数据的移动号采集和高速传输、移动高清会诊，控制医疗辅助机器人移动到指定病床，进行远程护理服务。', '4、智慧院区管理：患者体征实时监测、院内人员安全管理、医疗设备生命周期管理。', '5、AI辅助诊疗：以PACS影像数据为依托，通过大数据+人工智能技术方案，构建AI辅助诊疗应用，对影像医学数据进行建模分析，对病情、病灶进行分析，为医生提供决策支撑。'],
    appSenceEn: ['1. Telemedicine: remote consultation, remote ultrasound, remote surgery, emergency first aid, remote teaching, and remote monitoring.', '2. Smart consultation: The 5G intelligent consultation robot that combines "cloud-network-machine" and 5G edge computing power is used to provide artificial intelligence consultation services based on natural semantic analysis.', '3. Mobile medical care: mobile number collection and high-speed transmission of image data and sign data, mobile high-definition consultation, and control of medical assistant robots to move to designated beds for remote nursing services.', '4. Smart hospital management: real-time monitoring of patient signs, safety management of hospital personnel, and life cycle management of medical equipment.', '5. AI-assisted diagnosis and treatment: Relying on PACS image data, through big data + artificial intelligence technology solutions, AI-assisted diagnosis and treatment applications are built to model and analyze medical imaging data, analyze conditions and lesions, and provide decision support for doctors.']
  },
  {
    imgSrc: require('../assets/images/senceCase6.png'),
    imgData: [
      require('../assets/images/senceAgriculture1.png'),
      require('../assets/images/senceAgriculture2.png'),
      require('../assets/images/senceAgriculture3.png')
    ],
    nameCn: '智慧农业',
    nameEn: 'Smart Agriculture',
    type: 'agriculture',
    describtionCn: '智慧农业是集新兴的互联网、移动互联网、云计算和物联网技术为一体，依托部署在农业生产现场的各种传感节点（环境温湿度、土壤水分、二氧化碳、图像等）和无线通信网络实现农业生产环境的智能感知、智能预警、智能决策、智能分析、专家在线指导，为农业生产提供精准化种植、可视化管理、智能化决策。',
    describtionEn: 'Smart agriculture is a collection of emerging Internet, mobile Internet, cloud computing and Internet of Things technologies. It relies on various sensing nodes (environmental temperature and humidity, soil moisture, carbon dioxide, images, etc.) deployed in agricultural production sites and wireless communication networks. Intelligent perception, intelligent early warning, intelligent decision-making, intelligent analysis, and expert online guidance of agricultural production environments provide precise planting, visual management, and intelligent decision-making for agricultural production.',
    appSenceCn: ['1、农业生产环境监控：对农业生产环境的智能感知、智能预警、智能分析、智能控制。', '2、食品安全：建设农产品溯源系统，通过对农产品的高效可靠识别和对生产、加工环境的监测，实现农产品追踪、清查功能，进行有效的全程质量监控，确保农产品安全。', '3、农业生产管理：智能农业大棚、农机定位、仓储管理。'],
    appSenceEn: ['1. Agricultural production environment monitoring: intelligent perception, intelligent early warning, intelligent analysis and intelligent control of agricultural production environment.', '2. Food safety: Build a traceability system for agricultural products. Through efficient and reliable identification of agricultural products and monitoring of production and processing environments, the functions of tracking and checking agricultural products can be realized, and effective whole-process quality monitoring can be carried out to ensure the safety of agricultural products.', '3. Agricultural production management: intelligent agricultural greenhouses, agricultural machinery positioning, and storage management.']
  }
]
export {
  TYPES, AFFINITY, SORTITEM, INDUSTRY, TTYPES, DEPLOYMODE, Architecture, MEAO, SenceCaseData,
  PROXY_PREFIX_CURRENTSERVER,
  PORT_CURRENTSERVER,
  DOMAIN_CURRENTSERVER,
  PLATFORMNAME_DEVELOPER,
  PLATFORMNAME_MECM,
  PLATFORMNAME_ATP,
  PLATFORMNAME_EG,
  PLATFORMNAME_APPD,
  PLATFORM_LIST
}
