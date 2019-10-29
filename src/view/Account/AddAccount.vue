<template>
    <div class="">
        <TitleTip title="提交表单"></TitleTip>
        <Form ref="info" :model="payInfo"  class="mt20" align="center">
            <FormItem>
                <label>金额：</label>
                <Input v-model.trim="payInfo.amt" placeholder="请输入金额" style="width: 300px"></Input>
            </FormItem>
            <FormItem>
                <label>日期：</label>
                <Input v-model.trim="payInfo.date" placeholder="请输入日期" style="width: 300px"></Input>
            </FormItem>
            <FormItem>
                <label>备注：</label>
                <Input v-model.trim="payInfo.remake" placeholder="请输入备注" style="width: 300px"></Input>
            </FormItem>
            <FormItem>
                <label v-for="(item,index) in radioData" :key="index">
                    <input type="checkbox" :value="index">{{item}}
                </label>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="queryPersonName()">添加</Button>
                <Button @click="resetForm('payInfo')" style="margin-left: 8px">重置</Button>
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
                    date: "",
                   remake:""
                },
                radioData: {
                }
            }
        },
        created:function(){
            this.queryPersonName();
        },
        methods: {
            submit: function() {
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
            queryPersonName: function() {
                let self = this;
                ajax.get('http://localhost:9001/jtds/queryPersonName', {
                }).then(res => {
                    if (res.code = 200) {
                        let array = res.content;
                        array.forEach(function (val) {
                            self.$set(self.radioData, val.id, val.name);
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
</style>
