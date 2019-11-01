<template>
    <div class="regi_top">
        <div class="regi_form">
            <Form ref="info" :model="loginInfo"  class="mt20" align="right">
                <FormItem>
                    <label>账号：</label>
                    <Input v-model.trim="loginInfo.signCode" placeholder="请输入账户" style="width: 300px"></Input>
                </FormItem>
                <FormItem>
                    <label>密码：</label>
                    <Input v-model.trim="loginInfo.password" placeholder="请输入密码" style="width: 300px"></Input>
                </FormItem>
                <FormItem>
                    <label>重输密码：</label>
                    <Input v-model.trim="loginInfo.password_2" placeholder="请重新输入密码" style="width: 300px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="register()">注册</Button>
                    <Button type="primary" @click="tologin()" style="margin-left: 8px">返回登陆</Button>
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
                    signCode: "",
                    password: "",
                    password_2:""
                }
            }
        },
        methods: {
            // 登录
            register() {
                if (this.loginInfo.password !== this.loginInfo.password_2) {
                    alert("密码不一致");
                    return;
                }
                // 测试跳转页面的方法
                ajax.post('http://localhost:9001/jtds/register', {
                    ...this.loginInfo
                }).then(res => {
                    if(res.code===1) {
                        this.$router.push({
                            name: 'login'
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

<style lang="scss" scoped>
    .regi_top{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-image: url("/src/assets/images/github/register.jpg");
        background-attachment: fixed;
        background-size: contain;
    }
    .regi_form{
        margin-right: -800px;
        margin-top: -350px;
        width: 400px;
        height: auto;
        .ivu-btn{
            width:145px;
        }
    }
</style>
