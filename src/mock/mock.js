/**
 * Editor by duya
 * Date by 2019/1/8
 */
// 配置 Mock 路径
const Mock = require('mockjs');
const Random = Mock.Random

// 截取 ? 之后的内容
const subParam = (param) => {
    const pattern = /(\w+)=(\w+)/ig;
    let paramObj = {}
    param ? param.url.replace(pattern, (a, b, c) => {
        paramObj[b] = c;
    }) : {...param};
    return paramObj
};

// 模拟登录
const getLoginUser = (params) => {
    params = subParam(params)
    // 模拟返回值
    let result = {

    };
    // 是否查到 账号
    let isShowAccount = false;
    // 判断当前用户是否等于数据库中的数据
    const db = [
        {
            userId: 1,
            username: 'Duya',
            account: 'admin',
            password: '123456',
            userType: 0
        }, {
            userId: 2,
            username: '毒牙君',
            account: '20142344098',
            password: '123456',
            userType: 1
        }
    ];
    // 从db中查询账户信息
    db.forEach(item => {
        if(isShowAccount) {
            return result;
        }
        if(item.account === params.username) {
            isShowAccount = true;
        }

        item.account === params.username ? item.password === params.password ? result = {
            code: '200',
            success: true,
            msg: '请求成功',
            result: {
                userId: item.userId,
                username: item.username,
                userType: item.userType
            }
        } : result = {
            code: '500',
            success: false,
            msg: '密码错误',
            result: null
        } : result = {
            code: '500',
            success: false,
            msg: '账号有误',
            result: null
        };
    });
    return result;
};

// 菜单list
const MenuList = () => {
    return {
        code: '200',
        success: true,
        msg: '请求成功',
        result: [
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
                    menuUrl: 'AccountList',
                    title: '账单列表',
                    icon: 'ios-speedometer-outline',
                    hasChild: false,
                    parentId: '1002'
                }, {
                    id: '10022',
                    menuUrl: 'PayInfoAccount',
                    title: '账单汇总',
                    icon: 'ios-speedometer-outline',
                    hasChild: false,
                    parentId: '1002'
                }]
            }
            /*,  {
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
            }*/
        ]
    }
};

// 模拟普通表格数据
const getUserList = (param) => {
    let params = subParam(param);
    let data = {};
    let dataList = [];
    let page = {};
    let paramsObj = params.name && params.className ? {
        name: params.name,
        // age: Random.number()
        className: params.className,
        'age|1-122': 122,
        date: Random.date()
    } : params.name && !params.className ? {
        name: params.name,
        // age: Random.number()
        'className|1-10': 10,
        'age|1-122': 122,
        date: Random.date()
    } : !params.name && params.className ? {
        name: params.name,
        // age: Random.number()
        className: params.className,
        'age|1-122': 122,
        date: Random.date()
    } : {
        name: Random.cname(),
        // age: Random.number()
        'className|1-10': 10,
        'age|1-122': 122,
        date: Random.date()
    };
    for(let index = 0; index < params.pageSize; index ++) {
        dataList.push(Mock.mock(paramsObj))
    }
    page = Mock.mock({
        'total|1-10000': 10,
        totaPage: 1,
        currentPage: params.pageNum,
        pageSize: params.pageSize
    });
    data = {
        ...page,
        dataList: dataList
    };
    return {
        code: "200",
        success: true,
        msg: '请求成功',
        result: data
    }
};


// 登录接口
Mock.mock(RegExp('/sso/login'), 'post', (options) => {
    return getLoginUser(options)
});
// 菜单接口
Mock.mock('/home/getMenuList', 'get', MenuList);
// 用户列表接口
Mock.mock(RegExp('/user/getUserList' + '*'), 'get', (options) => {
    return getUserList(options)
});
