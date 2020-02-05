<template>
  <div class="listWrap">
    <nuxt-link class="articleLink-img" v-if="item.cover" :to="howTogo">   
        <img :src="item.cover" alt="">
    </nuxt-link>
    <div class="listContent">
        <div>
        <nuxt-link :to="howTogo" class="articleLink">
            <div class="articleLink-content">   
                <h2>{{ item.title }}</h2>
                <div class="summaryWrap">
                    <div class='summary'>{{ item.summary }}</div>
                </div>
            </div>
        </nuxt-link>
        <div class="handleWrap">
            <nuxt-link :to="`/home/${item.user_info.id}`">
                <img :src="item.user_info.avatar" class="userHead">
            </nuxt-link>
            <!-- <img :src="item.user_info.avatar" class="userHead"> -->
            <span style="color: #333">{{ item.user_info.name }}</span>
            <Icon type="ios-book-outline" style="margin-left:12px;"/>
            <span style="margin-left: 5px;">{{item.category}}</span>
            <Icon type="ios-time-outline" style="margin-left: 12px;"/>
            <span style="margin-left: 5px;">{{ item.created | dateFormat('day') }}</span>
            <div class="award">
                <Icon type="ios-thumbs-up-outline" />
                <span>{{ item.praise }}</span>
                <Icon type="ios-chatboxes-outline" />
                <span>{{ item.review }}</span>
            </div>
            <div class="handle" v-if='showHandle'>
                <Icon type="ios-list"/>
                <span>操作</span>
                <dropList class="handleList" @click='handleArticle'>  
                    <dopListItem 
                        :source='handleData'
                        :size="14"
                    ></dopListItem>
                </dropList>
            </div>
            </div>
        </div>
    </div>
      <Modal 
        title='删除文章'
        @onOk='configDelete'
        @onCancle='showModal = false'
        :visible='showModal'
        :mask='true'
      >
        <p>确定要删除文章吗?</p>
      </Modal>
  </div>
</template>

<script>
import Modal from '../../components/myModal'
import { deleteArticle, } from '../../axios/api/article'
import dropList from '../../components/dropList'
import dopListItem from '../../components/dropList/dropListItem'
export default {
    data () {
        return {
            howTogo: '',
            handleData: [
                {
                    name: '编辑',
                    line: true,
                    a: true
                },
                {
                    name: '删除',
                    a: true
                }
            ],
            id: '',
            showModal: false,
            category: '',
            status: ''
        }
    },
    props: {
        item: {
            type: Object,
        },
        paramsId: {
            type: String
        },
        showHandle: {
            type: Boolean
        }
    },
    mounted() {
        this.category = this.item.category
        this.status = this.item.status
        this.id = this.item._id
        this.item.status === 'draft' ? this.howTogo = `/write?draftId=${this.item._id}` : this.howTogo = `/post/${this.item._id}`
    },
    components: {
        dropList,
        dopListItem,
        Modal
    },
    methods: {
        handleArticle(name) {
            name = name.replace(/\s*/g,'')
            if(name === '编辑') {
                this.$router.push(`/write?draftId=${this.id}`)
            } else {
                if (this.status === 'draft') {
                    this.category = null
                }
                this.showModal = true
            }
        },
        configDelete() {
            deleteArticle({id: this.id}, {category: this.category})
                .then(res => {
                    if(res.code === 200)
                    this.$Message.success('成功删除')
                    this.showModal = false
                    if(this.status === 'draft') {
                        this.$emit('getdraftlist')
                    } else {
                        this.$emit('getArticleList')
                    }
                })
        },
    }
}
</script>

<style lang="less" scoped>
.listWrap {
    display: flex;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-bottom: 1px solid rgba(178,186,194,.15);
    border-radius: 6px;
    margin-bottom: 15px;
    align-items: center;
    padding: 20px;
    // &:hover {
    //        background-color: rgba(0, 0, 0, 0.03);
    // }
    .articleLink-img {
        img {
            width: 120px;
            height: 120px;
            line-height: 120px;
        }
        margin-right: 20px;
        flex: 0 0 auto;
    }
    .listContent {
        width: 100%;
        .articleLink {
            display: flex;
            justify-content: space-between;        
            width: 100%;
            height: 100%;
            color: #333;
            &:hover {
                color: #777
            }
            .articleLink-content {
                flex: 1 1 auto;
                h2 {
                    font-size: 18px;
                    margin-bottom: 10px;
                }

                .summaryWrap {
                color: #666;
                font-size: 14px;
                line-height: 22px;
                    .summary {
                        max-height: 44px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-break: break-all;
                    }
                }
            }
        }
        .handleWrap {
            margin-top: 15px;
            color: black;
            display: flex;
            align-items: center;
            span {
                font-size: 12px;
            }
            .userHead {
                height: 25px;
                vertical-align: middle;
                border-radius: 50%;
                width: 25px;
                margin-right: 5px;
            }
            .handle {
                position: relative;
                margin-left: 10px;
                z-index: 100;
                display: inline;
                font-size: 12px;
                color: #515a6e;
                cursor: pointer;
                .handleList {
                    display: none;
                }
                &:hover {
                    .handleList {
                        display: block;
                    }
                }
            }
            .award {
                display: flex;
                align-items: center;
                i {
                    margin-left: 12px;
                }
                span {
                    margin-left: 5px;
                }
            }
        }
    }
}
span {
    color: #999;
}
i {
    color: #999;
}
</style>