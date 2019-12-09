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
            menuUrl: 'AddAccount',
            title: '添加纪录',
            icon: 'ios-speedometer-outline',
            hasChild: false,
            parentId: '1002'
        }, {
            id: '10022',
            menuUrl: 'AccountList',
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
    }
]
export default routers;
