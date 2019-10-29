/*This is a place that some routers*/
const routers = [
    {
        id: '1001',
        parentsId: ['1001'],
        menuUrl: 'home',
        title: '首页',
        icon: 'ios-cafe-outline',
        hasChild: false
    },   {
        id: '1002',
        parentsId: ['1002'],
        menuUrl: '',
        title: '记账服务',
        icon: 'ios-easel',
        hasChild: true,
        child: [{
            id: '10021',
            menuUrl: 'addAccount',
            title: '添加纪录',
            icon: 'ios-speedometer-outline',
            hasChild: false,
            parentId: '1002'
        }, {
            id: '10022',
            menuUrl: 'addAccount',
            title: '账单列表',
            icon: 'ios-speedometer-outline',
            hasChild: false,
            parentId: '1002'
        }, {
            id: '10023',
            menuUrl: '',
            title: '账单汇总',
            icon: 'ios-speedometer-outline',
            hasChild: false,
            parentId: '1002'
        }]
    },  {
        id: '1003',
        parentsId: ['1003'],
        menuUrl: '',
        title: '控制台',
        icon: 'ios-easel',
        hasChild: true,
        child: [{
            id: '10031',
            menuUrl: 'console',
            title: '控制台',
            icon: 'ios-speedometer-outline',
            hasChild: false,
            parentId: '1003'
        }, {
            id: '10032',
            menuUrl: 'dashbroad',
            title: 'dashbroad',
            icon: 'ios-speedometer-outline',
            hasChild: false,
            parentId: '1003'
        }]
    }, {
        id: '1004',
        parentsId: ['1004'],
        menuUrl: '',
        title: '基础信息',
        icon: 'ios-person-outline',
        hasChild: true,
        child: [{
            id: '10041',
            menuUrl: 'basicInfo',
            title: '个人信息',
            icon: 'ios-person-outline',
            hasChild: false,
            parentId: '1004'
        }, {
            id: '10042',
            menuUrl: 'video',
            title: '视频空间',
            icon: 'ios-videocam-outline',
            hasChild: false,
            parentId: '1004'
        }]
    }, {
        id: '1005',
        parentsId: ['1005'],
        menuUrl: '',
        title: '表格',
        icon: 'md-grid',
        hasChild: true,
        child: [{
            id: '10051',
            menuUrl: 'commonTable',
            title: '基础表格',
            icon: 'ios-grid-outline',
            hasChild: false,
            parentId: '1005'
        }]
    }, {
        id: '1006',
        parentsId: ['1006'],
        menuUrl: '',
        title: '编辑器',
        icon: 'md-grid',
        hasChild: true,
        child: [{
            id: '10061',
            menuUrl: 'markdomEditor',
            title: 'Markdom',
            icon: 'ios-grid-outline',
            hasChild: false,
            parentId: '1006'
        }, {
            id: '10062',
            menuUrl: 'editor',
            title: '富文本编辑器',
            icon: 'ios-grid-outline',
            hasChild: false,
            parentId: '1006'
        }]
    }, {
        id: '1007',
        parentsId: ['1007'],
        menuUrl: '',
        title: '微信',
        icon: 'ios-chatbubbles',
        hasChild: true,
        child: [{
            id: '10071',
            menuUrl: 'weixin',
            title: '微信',
            icon: 'ios-chatbubbles',
            hasChild: false,
            parentId: '1007'
        }]
    },
    {
        id: '1008',
        parentsId: ['1008'],
        menuUrl: 'github',
        title: 'github',
        icon: 'logo-github',
        hasChild: false
    }
]
export default routers;
