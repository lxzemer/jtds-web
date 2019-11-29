<template>
    <div class="layout">
        <Layout>
            <Sider ref="sideRoute" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="menuSider" v-show="!isCollapsed">
                <MenuSider :menuitemClasses.sync="menuitemClasses" class="th_Menu" :isCollapsed.sync="isCollapsed"/>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                   <div class="flex-betwwen pd10">
                       <div>
                           <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                           <span class="font14">{{title.title}}</span>
                       </div>
                       <div style="margin-right: 30px;">
                           <div v-show="!this.isLogin">
                               <a @click="loginClick()">登陆</a> | <a @click="registerClick()">注册</a>
                               <el-dialog title="景田大厦1007" :visible.sync="loginOff" @close='closeDialog' center :append-to-body='true' :lock-scroll="false" width="30%">
                                   <div class="">
                                       <Form ref="loginInfo" :model="loginInfo" :label-width="60">
                                           <FormItem label="账号：" prop="username">
                                               <Input type="text" v-model="loginInfo.userName"></Input>
                                           </FormItem>
                                           <FormItem label="密码：" prop="password">
                                               <Input type="password" v-model="loginInfo.password"></Input>
                                           </FormItem>
                                           <FormItem>
                                               <Button type="primary"  @click="login()">登 录</Button>
                                           </FormItem>
                                       </Form>
                                   </div>
                               </el-dialog>
                               <el-dialog title="景田大厦1007" :visible.sync="registerOff" @close='closeDialog' center :append-to-body='true' :lock-scroll="false" width="30%">
                                   <div class="">
                                       <Form ref="loginInfo" :model="loginInfo" :label-width="80">
                                           <FormItem label="账号：" prop="username">
                                               <Input type="text"  v-model="loginInfo.userName"></Input>
                                           </FormItem>
                                           <FormItem label="密码：" prop="password">
                                               <Input type="password"  v-model="loginInfo.password"></Input>
                                           </FormItem>
                                           <FormItem label="确认密码：" prop="password_2">
                                               <Input type="password"  v-model="password_2"></Input>
                                           </FormItem>
                                           <FormItem>
                                               <Button type="primary"  @click="register()">注 册</Button>
                                           </FormItem>
                                       </Form>
                                   </div>
                               </el-dialog>
                           </div>
                           <div v-show="this.isLogin">
                               <a>{{this.loginInfo.userName}}</a> | <a @click="logout()">退出</a>
                           </div>
                       </div>
                   </div>

                </Header>
                <!-- 标题   -->
                <Page />
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import MenuSider from './components/MenuSider'
    import Page from './components/Page'
    import LoginSte from "../../canvas/modules/login";

    export default {
        name: "TLayout",
        components: { MenuSider, Page },
        data() {
            return {
                themeBg: 'rgba(25, 190,107, .5)',
                isCollapsed: false,
                title: this.$store.getters.headTitle,
                isLogin: LoginSte.isLogin,
                loginInfo : LoginSte.loginInfo,
                password_2:"",
                loginOff: false,
                registerOff: false,
            }
        },
        methods: {
            //mutations
            ADD_LOGIN_USER(loginInfo) {  //登入，保存状态
                sessionStorage.setItem("id", loginInfo.id);  //添加到sessionStorage
                sessionStorage.setItem("userName",loginInfo.userName);
                sessionStorage.setItem("isLogin",true);
            },
            SIGN_OUT() {   //退出，删除状态
                sessionStorage.removeItem("id");  //移除sessionStorage
                sessionStorage.removeItem("userName");
                sessionStorage.removeItem("isLogin");
            },
            RE_FLASH() {   //退出，删除状态
                this.loginInfo.id = sessionStorage.getItem("id");
                this.loginInfo.userName = sessionStorage.getItem("userName");
                this.isLogin = sessionStorage.getItem("isLogin");
            },
            // 得到取色器的颜色
            changeThemeColor(theme) {
                this.$store.dispatch('changeThemeColor', theme)
            },
            collapsedSider () {
                this.$refs['sideRoute'].toggleCollapse();
            },
            login(){
                ajax.post('http://localhost:9001/jtds/login', {
                    ...this.loginInfo
                }).then(res => {
                    if(res.code = 200) {
                        this.loginInfo.id = res.content.id;
                        this.loginInfo.userName = res.content.userName;
                        this.loginOff= false;
                        this.isLogin = true;
                        this.ADD_LOGIN_USER(this.loginInfo);
                    } else{
                        alert(res.msg);
                    }
                }).catch(err => {
                    throw new Error(err)
                })
            },
            register(){
                if (this.loginInfo.password !== this.password_2) {
                    alert("密码不一致");
                    return;
                }
                ajax.post('http://localhost:9001/jtds/register', {
                    ...this.loginInfo
                }).then(res => {
                    if(res.code==200 && res.content) {
                        this.loginInfo.id = res.content.id;
                        this.loginInfo.userName = res.content.userName;
                        this.isLogin = true;
                        this.registerOff= false;
                    }else{
                        alert(res.msg);
                    }
                }).catch(err => {
                    throw new Error(err)
                })
            },
            logout(){
                ajax.post('http://localhost:9001/jtds/logout', {
                    ...this.loginInfo
                }).then(res => {
                    if(res.code = 200) {
                        this.clearLoginInfo()
                    }else{
                        alert(res.msg);
                    }
                }).catch(err => {
                    throw new Error(err)
                })
            },
            clearLoginInfo(){
                this.isLogin = false;
                this.loginInfo.id="";
                this.loginInfo.userName="";
                this.SIGN_OUT();
                closeDialog();
            },
            loginClick(){
                this.loginOff=true;//默认页面不显示为false,点击按钮将这个属性变成true
            },
            registerClick(){
                this.registerOff=true;//默认页面不显示为false,点击按钮将这个属性变成true
            },
            closeDialog(){
                this.loginInfo.password = "";
                this.password_2 = "";
                if(!this.isLogin){
                    this.loginInfo.userName = "";
                }
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        created() {
            this.RE_FLASH();
        },
        watch: {

        }
    }
</script>

<style lang="scss">
    .headerImg {
        margin: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
           width: 80px;
           height: 80px;
           border-radius: 100%;
        }
    }
    .th_Menu {
        overflow: hidden;
        .ivu-menu {

        }
    }
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        .menuSider {
            font-size: 1rem!important;
        }
    }
    .layout-header-bar{
        background: #fff!important;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu .ivu-menu-submenu-title-icon {
        display: none;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .layout {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .ivu-layout-has-sider {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    .btnGroup {
        padding: 0 20px;
    }
</style>
