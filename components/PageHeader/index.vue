<template>
    <div class="FixWrap">
        <div class="PageTitle" >
            <a class='logo-title' href="http://www.yjdzm.com">
                <h1>
                    遥近
                </h1>
                <span>做不一样的博客平台</span>
            </a>
        </div>
        <div class="Nav_tab">
            <PageMenu/> 
        </div>
        <div class="Search">
            <Input v-model="searchValue" icon="md-search" placeholder="搜索文章" style="width: 200px" />
        </div>
        <!-- <nuxt-link to="/login" class="LoginBtn">登录</nuxt-link> -->
        <div class="User">
            <div class="UserHeader" @click.stop="handleList">
                <img src="../../assets/img/myhead.jpg" alt="">
            </div>
            <ul class="UserList" v-if="showList">
                <div class="ListWrap">
                    <li class="ListItem">写文章</li>
                </div>
                <div class="ListWrap">
                    <li class="ListItem">我的主页</li>
                    <li class="ListItem">我赞过的</li>
                </div>
                <div class="ListWrap">
                    <li class="ListItem">设置</li>
                    <li class="ListItem">退出</li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import PageMenu from '../PageMenu/index'
export default {
    data () {
        return {
            searchValue: '',
            showList: false,
        }
    },
    components: {
        PageMenu,
    },
    methods: {
        handleList () {
            this.showList = !this.showList
        },
        hiddenList () {
            this.showList = false
        }
    }
}
</script>

<style lang="less" scoped>
.FixWrap {
        min-width: 1200px;
        z-index: 99999;
        width: 100%;
        height: 64px;
        background-color: #fff;
        line-height: 64px;
        padding: 0 40px;
        display: flex;
        justify-content: center;
        align-items: center; 
        left:0;
         width: 100%;
         position: fixed;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
        .PageTitle, .Nav_tab {
            float: left;
        }
        .PageTitle {
            float: left;
            .logo {
                float: left;
               height: 64px;
               padding-right: 10px;
                img {
                    height: 100%;
                }
            }
            .logo-title {
                height: 64px;
                float: left;
                text-align: center;
                color: black;
                line-height: normal;;
                h1 {
                    margin: 4px 0px 5px 0px;
                    font-size: 22px;
                }
                span {
                    user-select: none;
                    font-size: 13px;
                }
            }
        }
        .Nav_tab {
            margin-left: 100px;
        }

        .Search {
            float: left;
            margin-left: 20px;
            .ivu-input-wrapper {
                /deep/.ivu-input {
                    height: 40px;
                    line-height: 40px;
                    font-family: 'hotFont';
                    font-size: 14px;
                    color: black;
                    border: 1.5px solid #e2e6ea;
                    &:focus {
                        border-color: #e2e6ea;
                        box-shadow: 0 0 0 2px #e2e6ea;
                    }
                    &:hover {
                        border-color: #e2e6ea;
                    }
                }
                /deep/.ivu-icon {
                    height: 40px;
                    width: 40px;
                    line-height: 40px;
                    font-size: 20px;
                    cursor: pointer;
                }
            } 
        }
        .LoginBtn {
            display: block;
            margin-left: 20px;
            height: 40px;
            width: 80px;
            // margin-top: 13px;
            line-height: 40px;
            text-align: center;
            border: 1.5px solid #e2e6ea;
            border-radius: 20px;
            color: rgba(0,0,0,.65);
            font-family: 'hotFont';
            &:hover {
                background-color: #e2e6ea;
            }
        }
        .User {
            cursor: pointer;
            float: left;
            .UserHeader {
                margin-left: 20px;
                width: 40px;
                height: 40px;
                img {
                    border-radius: 50%;
                    height: 100%;
                    width: 100%;
                }
            }
            .UserList {
                left: auto;
                text-align: center;
                width: 100px;
                font-size: 12px;
                font-family: 'hotFont';
                border-radius: 4px;
                box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
                border: 1px solid rgba(177,180,185,.45);
                background-color: #fff;
                list-style: none;
                position:absolute;
                top: 100%;
                .ListWrap {
                    
                    border-bottom: 1px solid rgba(0,0,0,.04);
                    padding: 8px 0;
                    .ListItem {
                        line-height: 35px;
                        height: 35px;
                        &:hover {
                           background-color: hsla(0,0%,94.9%,.5);
                        }
                    }
                }
            }
        }
    }
</style>