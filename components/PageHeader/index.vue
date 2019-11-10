<template>
        <div class="FixWrap">
            <div class="ContentWrap container">
                <div class="PageTitle" >
                    <a class='logo-title' href="http://www.yjdzm.com">
                        <h1>
                            遥近
                        </h1>
                        <span>做不一样的博客平台</span>
                    </a>
                </div>
                <div class="Content">
                    <PageMenu/>
                    <div class="actionWrap">
                        <div class="Search">
                            <Input v-model="searchValue" icon="md-search" placeholder="搜索文章" style="width: 200px" />
                        </div>
                        <!-- <nuxt-link to="/login" class="LoginBtn">登录</nuxt-link> -->
                        <div class="User">
                            <div class="UserHeader" @click.stop="handleList">
                                <img src="../../assets/img/myhead.jpg" alt="">
                            </div>
                            <DropList :source='userDropData' :splitLine='true' :size="14" v-if="showList" class="Special"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import PageMenu from '../PageMenu/index'
import DropList from '../../components/dropList/index'
export default {
    data () {
        return {
            searchValue: '',
            showList: false,
            userDropData: [
                 {
                    path: '/write',
                    icon: "ios-brush",
                    name: '写文章',
                    id: 'article',
                },
                {
                    path: '/draft',
                    icon: "ios-paper",
                    name: '草稿',
                    id: 'ios-paper',
                    line: true,
                },
                  {
                    path: '/myHome',
                    icon: "md-person",
                    name: '我的主页',
                    id: 'article',
                },
                {
                    path: '/myPraise',
                    icon: "md-thumbs-up",
                    name: '我赞过的',
                    id: 'article',
                    line: true,
                },
                 {
                    path: '/setting',
                    icon: "ios-settings",
                    name: '设置',
                    id: 'setting',
                },
                {
                    path: '/login',
                    icon: "md-walk",
                    name: '登出',
                    id: 'login',
                }
            ],
        }
    },
    components: {
        PageMenu,
        DropList
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
    z-index: 99999;
    height: 64px;
    background-color: #fff;
    left:0;
    top: 0;
    right: 0;
    position: fixed;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
    .ContentWrap {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 100%;
        max-width: 1200px;
        padding: 0 20px;
        .PageTitle {
            height: 100%;
            .logo {
                height: 64px;
                padding-right: 10px;
                img {
                    height: 100%;
                }
            }
            .logo-title {
                height: 64px;
                text-align: center;
                color: black;
                line-height: normal;
                h1 {
                    margin: 4px 0 5px 0;
                    font-size: 22px;
                }
                span {
                    user-select: none;
                    font-size: 13px;
                }
            }
        }
        .Content {
            height: 100%;
            display: flex;
            align-items: center;
            flex: auto;
            justify-content: space-evenly;
            .actionWrap {
                display: flex;
                justify-content: center;
                align-self: center;
                height: 100%;
                .Search {
                    height: 100%;
                    flex: 0.5;
                    justify-content: flex-end;
                    cursor: auto;
                    display: flex;
                    align-items: center;
                    .ivu-input-wrapper {
                        /deep/ .ivu-input {
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

                        /deep/ .ivu-icon {
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
                    line-height: 40px;
                    text-align: center;
                    border: 1.5px solid #e2e6ea;
                    border-radius: 20px;
                    color: rgba(0, 0, 0, .65);
                    font-family: 'hotFont';
                    &:hover {
                        background-color: #e2e6ea;
                    }
                }
                .User {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-self: center;
                    cursor: pointer;
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
                    .Special {
                        width: 100px;
                    }
                }
            }
        }
    }
}
</style>
