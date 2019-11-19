<template>
    <div class="t_Login">
        <div class="t_login_form">
            <div class="dy-title">景田大厦1007</div>
            <h3>自闭中</h3>
            <Form ref="loginInfo" :model="loginInfo" :label-width="60">
                <FormItem label="账号：" prop="username">
                    <Input type="text" size="large" v-model="loginInfo.userName"></Input>
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input type="password" size="large" v-model="loginInfo.password"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="midle" @click="loginSubmit()" long>登 录</Button>
                    <Button type="primary" size="midle" @click="register()" long>注册账号</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import LoginSte from "../../canvas/modules/login";

    export default {
        name: "Login",
        data() {
            return {
               loginInfo: {
                   userName: "",
                   password: ""
               },
                isLogin: LoginSte.isLogin,
                loginInfo : LoginSte.loginInfo,
            }
        },
        methods: {
            // 登录
            loginSubmit() {
                // 测试跳转页面的方法
                ajax.post('http://localhost:9001/jtds/login', {
                    ...this.loginInfo,
                }).then(res => {
                    if(res.code = 200) {
                        this.isLogin = true;
                        this.loginInfo.id = res.content.id;
                        this.loginInfo.name = res.content.userName;
                        this.$router.push({
                            name: 'index'
                        });
                    }
                }).catch(err => {
                    throw new Error(err)
                })
            },
            register(){
                this.$router.push({
                    name: 'register'
                });
            }
        },
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    .t_Login {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        /*background: url("./../../assets/images/login/background.jpg") no-repeat;*/
        background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
        background-attachment: fixed;
        background-size: contain;
        .t_login_form {
            margin-top: -150px;
            margin-left: -60px;
            width: 400px;
            height: auto;
            .dy-title {
                /*padding: 10px;*/
                text-align: center;
                font-size: 30px;
                font-weight: bolder;
                height: 60px;
                padding-left: 60px;
                color: #333;
            }
            h3 {
                margin-bottom: 20px;
                padding: 0 0 0 60px;
                font-size: 12px;
                color: #999;
                text-align: center;
                font-weight: normal;
            }
            .login_title {
                margin-bottom: 20px;
                color: red;
                font-size: 20px;
            }
            .ivu-form .ivu-form-item-label {
                color: #fff;
            }
            .ivu-input-large, .ivu-btn {
                /*width: 240px;*/
            }
            .ivu-input-midle, .ivu-btn {
                width: 168px;
            }
            .ivu-input-large {
                padding: 15px 10px;
            }
            .ivu-input-midle {
                padding: 15px 10px;
            }
        }
    }
</style>
