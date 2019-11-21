<template>
    <div class="">
        <TitleTip title="基础表格"></TitleTip>
        <Form ref="searchInfo" :model="searchInfo" inline class="mt20">
            <FormItem label="登记用户：" prop="recordUserName" :label-width="80">
                <Input v-model.trim="searchInfo.recordUserName" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="登记日期：" prop="payDate" :label-width="80">
                <el-date-picker
                        class="input-class"
                        v-model="searchInfo.payDate"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="queryPayInfos()">搜索</Button>
                <Button type="primary" @click="openAddPayInfo()">新建账单</Button>
            </FormItem>
        </Form>

        <el-dialog title="添加账单" :visible.sync="isAdd" @close='resetForm' center :append-to-body='true' :lock-scroll="false" width="40%">
            <div class="" style="margin-left: 50px;">
                <Form ref="payInfo" :model="payInfo"  class="mt20" align="left" style="width:400px;">
                    <FormItem>
                        <label>金额：</label>
                        <Input v-model.trim="payInfo.amt" placeholder="请输入金额" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem>
                        <label>日期：</label>
                        <el-date-picker
                                class="input-class1"
                                v-model="payInfo.payDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </FormItem>
                    <FormItem>
                        <label>备注：</label>
                        <Input v-model.trim="payInfo.remake" placeholder="请输入备注" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem align="center">
                        <label v-for="(item,index) in radioData" :key="index">
                            <input type="checkbox" :value="index" v-model="userIds">{{item}}
                        </label>
                    </FormItem>
                    <FormItem>
                        <div style="margin-left: 40px;">
                            <Button type="primary" @click="addPayInfo()">添加</Button>
                            <Button type="primary" @click="resetForm()" style="margin-left: 8px">重置</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        </el-dialog>

        <Card class="tableCard" :dis-hover="true">
            <TableComponent
                    :columns.sync="columns1"
                    :data.sync="data1"
                    :config.sync="config"
                    @chooseTr="chooseTr"
                    @remove="remove"
                    class="mt20">
            </TableComponent>
            <div class="th_page mt20 pd10">
                <PageComponent
                        :config.sync="config"
                        :current.sync="currentPage"
                        :pageTotal.sync="pageTotal"
                        :pageSize.sync="pageSize"
                        @changePageNum="changePageNum"
                        @changePageSize="changePageSize"
                />
            </div>
        </Card>
    </div>
</template>
<script>
    export default {
        name: "AccountList",
        data() {
            return {
                //账单
                isAdd:false,
                userIds:[],
                payInfo: {
                    amt: "",
                    payDate: "",
                    remake:"",
                    involveUserId:"",
                },
                radioData: {
                },

                //表格
                searchInfo: {
                    recordUserName: "",
                    payDate: ""
                },
                selectTr: null,
                pageSize: 10,
                currentPage: 1,
                pageTotal: null,
                columns1: [
                    {
                        title: '登记用户',
                        key: 'recordUserName',
                        align: 'center',
                        minwidth: 100,
                        fixed: 'left'
                    },
                    {
                        title: '金额',
                        align: 'center',
                        key: 'amt'
                    },
                    {
                        title: '涉及人员',
                        align: 'center',
                        minwidth: 180,
                        key: 'involveUserName',
                    },
                    {
                        title: '支付日期',
                        align: 'center',
                        key: 'payDate'
                    },
                    {
                        title: '备注',
                        width: 250,
                        align: 'center',
                        key: 'remake'
                    }
                ],
                data1: [],
                config: {
                    stripe:true,
                    showElevator: true,
                    loading: false,
                    size: "small"
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
        methods: {
            // 搜索
            queryPayInfos() {
                this.currentPage = 1;
                this.pageSize = 10;
                this.getData()
            },
            openAddPayInfo(){
                this.queryUserName();
                this.isAdd = true;
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
            addPayInfo: function() {
                this.payInfo.involveUserId = this.userIds.join(',');
                ajax.nlPost('http://localhost:9001/jtds/addPayInfo', {
                    ...this.payInfo
                }).then(res => {
                    if(res.code == 200) {
                        this.isAdd = false;
                        this.getData();
                    }else{
                        alert(res.msg);
                    }
                }).catch(err => {
                    throw new Error(err)
                })
            },
            // 重置表单
            resetForm() {
                this.payInfo.amt = "";
                this.payInfo.remake = "";
                this.payInfo.payDate = "";
                this.userIds = [];
            },
            // 简单表格
            getData: function () {
                let data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    ...this.searchInfo
                };
                this.config.loading = true;
                ajax.get('http://localhost:9001/jtds/queryPayInfo', {
                    ...data
                }).then(res => {
                    if (res.code = 200) {
                        this.data1 = res.content ? res.content : [];
                        this.pageTotal = res.total ? res.total : 0;
                    }
                    setTimeout(() => {
                        this.config.loading = false;
                    }, 500)
                }).catch(res => {

                });
            },
            changePageNum(num) {
                this.currentPage = num;
                this.getData();
            },

            changePageSize(pageSize) {
                this.pageSize = pageSize;
                this.getData();
            },
            init() {
                this.getData()
            },
            showInfo() {
                console.log(this.selectTr)
            },
            // 表格高亮操作
            chooseTr(currentRow, oldCurrentRow) {
                // console.log(currentRow, oldCurrentRow)
                this.selectTr = currentRow
            },
            remove(obj, index) {
                this.data1.splice(index, 1);
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang="scss">
    .tableCard {
        &.ivu-card {
            border: none;
            background: rgb(245, 247, 249);
        }
    }
    .input-class{
        .el-input__inner{
            width: 162px;
            height: 32px;
            font-size: 10px;
        }
    }
</style>
