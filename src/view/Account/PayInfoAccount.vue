<template>
    <div class="">
        <TitleTip title="未结算汇总"></TitleTip>
        <!--<Form ref="searchInfo" :model="searchInfo" inline class="mt20">
            <FormItem label="登记用户：" prop="userName" :label-width="80">
                <Input v-model.trim="searchInfo.userName" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="账单序号：" prop="accountNo" :label-width="80">
                <Input v-model.trim="searchInfo.accountNo" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="queryPayAccount()">查询</Button>
            </FormItem>
        </Form>-->

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
        <div style="width: 90%;" align="center">
            <Button type="primary" style="width: 100px;" @click="sudoPayAccount()">结&nbsp;&nbsp;&nbsp;&nbsp;算</Button>
        </div>

    </div>
</template>

<script>
    import background from '@/assets/images/login/background.jpg'
    export default {
        name: "PayInfoAccount",
        data() {
            return {
                searchInfo: {
                    userName: "",
                    accountNo: ""
                },
                selectTr: null,
                pageSize: 10,
                currentPage: 1,
                pageTotal: null,
                columns1: [
                    {
                        title: '用户',
                        key: 'userName',
                        align: 'center',
                        minwidth: 150,
                        fixed: 'left'
                    },
                    {
                        title: '已支出',
                        align: 'center',
                        minwidth: 150,
                        key: 'hasPay'
                    },
                    {
                        title: '收/付',
                        align: 'center',
                        minwidth: 150,
                        key: 'shouldPay',
                    },
                    {
                        title: '状态',
                        minwidth: 150,
                        align: 'center',
                        key: 'isAccount'
                    }
                ],
                data1: [],
                config: {
                    stripe:true,
                    showElevator: true,
                    loading: false,
                    size: "small"
                },
            }
        },
        methods:{
           /* queryPayAccount(){
                this.currentPage = 1;
                this.pageSize = 10;
                this.getData()
            },*/
            getData: function () {
                let data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    ...this.searchInfo
                };
                this.config.loading = true;
                ajax.get(this.$global.transType+this.$global.host+'/jtds/queryPayAccount', {
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
            },
            sudoPayAccount(){
                ajax.get(this.$global.transType+this.$global.host+'/jtds/sudoPayAccount', {
                }).then(res => {
                    if (res.code = 200) {
                       this.getData();
                    }
                }).catch(err => {
                    throw new Error(err);
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang="scss" scoped>
</style>
