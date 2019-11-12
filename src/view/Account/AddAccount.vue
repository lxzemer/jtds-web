<template>
    <div class="" align="center">
        <TitleTip title="提交表单" ></TitleTip>
        <Form ref="info" :model="payInfo"  class="mt20" align="left" style="width:400px;">
            <FormItem>
                <label>金额：</label>
                <Input v-model.trim="payInfo.amt" placeholder="请输入金额" style="width: 300px"></Input>
            </FormItem>
            <FormItem>
                <label>日期：</label>
                <el-date-picker
                        class="input-class1"
                        v-model="payInfo.createDate"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </FormItem>
            <FormItem>
                <label>备注：</label>
                <Input v-model.trim="payInfo.remake" placeholder="请输入备注" style="width: 300px"></Input>
            </FormItem>
            <FormItem align="center">
                <label v-for="(item,index) in radioData" :key="index">
                    <input type="checkbox" :value="index" v-model="payInfo.involveUserId">{{item}}
                </label>
            </FormItem>
            <FormItem>
                <div style="margin-left: 40px;">
                    <Button type="primary" @click="submit()">添加</Button>
                    <Button type="primary" @click="resetForm('payInfo')" style="margin-left: 8px">重置</Button>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import ajax from "../../http/apis";

    export default {
        name: "AddAccount",
        data() {
            return {
                payInfo: {
                    amt: "",
                    createDate: "",
                    remake:"",
                    involveUserId:[]
                },
                radioData: {
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        created:function(){
            this.queryUserName();
        },
        methods: {
            submit: function() {
                ajax.
                ajax.post('http://localhost:9001/jtds/addPayInfo', {
                    ...this.payInfo
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
            queryUserName: function() {
                let self = this;
                ajax.get('http://localhost:9001/jtds/queryUserName', {
                }).then(res => {
                    if (res.code = 200) {
                        let array = res.content;
                        array.forEach(function (val) {
                            self.$set(self.radioData, val.id, val.userName);
                        })
                    }
                }).catch(err => {
                    throw new Error(err);
                })
            },
        },
    }
</script>

<style lang="scss">
    .input-class1{
        .el-input__inner{
            width: 300px;
            height: 32px;
            font-size: 10px;
        }
    }
</style>
