<template>
    <div class="t_Login">
        <!--<canvas id="triangle-lost-in-space" resize="true"></canvas>-->
        <!--        <neon-effect :options="options"></neon-effect>-->
        <div class="t_login_form">
            <Form ref="loginInfo" :model="loginInfo" :label-width="80">
                <FormItem label="账号：" prop="username">
                    <Input type="text" size="large" v-model="loginInfo.username"></Input>
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input type="password" size="large" v-model="loginInfo.password"></Input>
                </FormItem>
                <FormItem label="重输密码：" prop="password">
                    <Input type="password" size="large" v-model="loginInfo.password_2"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" @click="doregister()" style="width: 158px;">注 册</Button>
                    <Button type="primary" size="large" @click="tologin()" style="width: 158px;">返回登陆</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            var validatePass2;
            return {
                loginInfo: {
                    username: "",
                    password: "",
                    password_2:[
                        { required: true, validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // 登录
            doregister() {
                if (password != password_2) {
                    alert("密码不一致");
                    return;
                }
                // 测试跳转页面的方法
                ajax.post('http://localhost:9001/jtds/register', {
                    ...this.loginInfo
                }).then(res => {
                    if(res) {
                        this.$router.push({
                            name: 'index'
                        });
                    }
                }).catch(err => {
                    throw new Error(err)
                })
            },
            tologin(){
                this.$router.push({
                    name: 'login'
                });
            },
        },
        created() {

        }
    }
</script>

<style lang="scss">
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
                color: rgba(15, 15, 15, 0.99);
            }
            .ivu-input-large, .ivu-btn {
                /*width: 240px;*/
            }
            .ivu-input-large {
                padding: 15px 10px;
            }
        }
    }
</style>
