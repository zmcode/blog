<template>
  <div class="listWrap">
      <div class="listContent">
          <div>
            <nuxt-link :to="howTogo" class="articleLink">
                <h2>{{ item.title }}</h2>
                <div class="summaryWrap">
                    <div class='summary'>{{ item.summary }}</div>
                </div>
            </nuxt-link>
            <div class="handleWrap">
                <img :src="item.user_info.avatar" class="userHead">
                <span>{{ item.user_info.name }}</span>
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
                <div class="award">
                    <Icon type="md-thumbs-up"/> <span>{{ item.praise }}</span>
                    <Icon type="ios-chatboxes-outline" /> <span>{{ item.review }}</span>
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
        console.log(this.item._id)
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
                this.showModal = true
            }
        },
        configDelete() {
            console.log(this.id)
            deleteArticle({id: this.id})
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
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    margin-top: 20px;
    border-radius: 10px;
    .listContent {
        padding: 1.25rem;
        .articleLink {
            display: inline-block;
            width: 100%;
            height: 100%;
            h2 {
                color: black;
            }
            .summaryWrap {
                color: rgba(0,0,0,.45);
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
        .handleWrap {
            color: black;
            .userHead {
                height: 35px;
                vertical-align: middle;
                border-radius: 50%;
                width: 35px;
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
                float: right;
                align-items: center;
                i {
                    padding: 10px;
                }
            }
        }
    }
}
</style>