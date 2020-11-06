<template>
    <div class="manage-content">
        <!-- <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
            <el-tab-pane :label="$t('management.dataDictionary')" name="dataDictionaryPageShow">
                <manage-data-dictionary :dataDictionaryPageShow="pageShowStatusList.dataDictionaryPageShow">
                </manage-data-dictionary>
            </el-tab-pane>
            <el-tab-pane :label="$t('management.WhiteListConfiguration')" name="whiteListPageShow" v-if="whiteButShow">
                <manage-white-list :whiteListPageShow="pageShowStatusList.whiteListPageShow"></manage-white-list>
            </el-tab-pane>
            <el-tab-pane label="资源分类" name="resourceTypePageShow" v-if="whiteButShow">
                <manage-resource-type :resourceTypePageShow="pageShowStatusList.resourceTypePageShow">
                </manage-resource-type>
            </el-tab-pane>
        </el-tabs> -->
        <tab-pages-container :customDisplayRule='customDisplayRule'></tab-pages-container>
    </div>
</template>

<script>
    // import ManageDataDictionary from "components/manageDataDictionary/ManageDataDictionary";
    // import ManageWhiteList from "components/manageWhiteList/ManageWhiteList";
    // import ManageResourceType from "components/manageResourceType/ManageResourceType"
    import TabPagesContainer from "pages/TabPagesContainer/TabPagesContainer"

    export default {
        name: "ManageBasicConfiguration",
        components: {
            TabPagesContainer
        },
        data() {
            return {
            };
        },
        methods: {
            tabClick() {
                for (var i in this.pageShowStatusList) {
                    this.pageShowStatusList[i] = false;
                }
                this.pageShowStatusList[this.activeName] = true;
            },
            customDisplayRule(val) {
                if (this.$store.getters.userInfo.loginName == "root") {
                    return val;
                } else {
                    var jurisdiction = [];
                    val.forEach(item => {
                        // 
                        if (item.name != 'manageResourceType' && item.name != 'manageWhiteList' && item.name != 'manageCustomerManagement') {
                            jurisdiction.push(item);
                        }
                    })
                    return jurisdiction;
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
    

    .manage-content {
        /deep/ .el-tabs__header {
            margin-bottom: 10px;
        }

        min-height: 700px;

        /deep/.el-tabs--card>.el-tabs__header {
            @include manage-tab-border($types: ("bottom"));
        }

        /deep/.el-tabs--card>.el-tabs__header .el-tabs__nav {
            @include manage-tab-border($types: ("top", "right", "left"));
        }

        /deep/.el-tabs--card>.el-tabs__header .el-tabs__item {
            @include base-color();
        }

        /deep/.el-tabs--card>.el-tabs__header .el-tabs__item:not(:first-child) {
            @include manage-tab-border($types: ("left"));
        }

        /deep/.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
            @include base-active-color();
            border-bottom: 1px solid #fff;
        }
    }
</style>