<template>
    <div class="">
        <TitleTip title="基础表格"></TitleTip>
        <Form ref="searchInfo" :model="searchInfo" inline class="mt20">
            <FormItem label="登记用户：" prop="signCode" :label-width="80">
                <Input v-model.trim="searchInfo.signCode" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="登记日期：" prop="createDate" :label-width="80">
                <Input v-model.trim="searchInfo.createDate" placeholder="请输入登记日期"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submitForm()">搜索</Button>
            </FormItem>
        </Form>
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
                searchInfo: {
                    signCode: "",
                    createDate: ""
                },
                selectTr: null,
                // 简单表格
                pageSize: 10,
                currentPage: 1,
                pageTotal: null,
                columns1: [
                    {
                        title: '登记用户',
                        key: 'name',
                        align: 'center',
                        minwidth: 100,
                        fixed: 'left'
                    },
                    {
                        title: '金额',
                        align: 'center',
                        key: 'age'
                    },
                    {
                        title: '涉案人员',
                        align: 'center',
                        minwidth: 180,
                        key: 'className',
                        render:(h, params) => {
                            return h('div', [
                                h('p', {
                                }, "三年" + params.row.className + "班"),
                            ])
                        }
                    },
                    {
                        title: '登记日期',
                        align: 'center',
                        key: 'date'
                    },
                    {
                        title: '备注',
                        width: 250,
                        align: 'center',
                        key: 'date'
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
        methods: {
            // 搜索
            submitForm() {
                this.currentPage = 1;
                this.pageSize = 10;
                this.getData()
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 简单表格
            getData() {
                let data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    ...this.searchInfo
                };
                this.config.loading = true;
                ajax.get('/jtds/queryPayInfos', {
                    ...data
                }).then(res => {
                    if(res.success) {
                        this.data1 = res.content;
                        this.pageTotal = res.result && res.result.total ? res.result.total : 0
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
</style>
