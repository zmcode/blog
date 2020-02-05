<template>
    <div class="WriteWrap">
        <div class="ArticeTitle">
            <textarea 
                placeholder="输入标题..." 
                spellcheck="false" 
                maxlength="30" 
                rows="1" 
                class="title-input"
                v-model='title'
            >
            </textarea>
        </div>
        <div class="mavonEditor">
            <client-only>
                <mavon-editor  
                    v-model="source"
                    placeholder='目前仅支持MakeDown语法, 创作完成, 点击右下方按钮发布'
                    ref=md
                    @imgAdd="$imgAdd"
                    :toolbars='toolbars'
                   @change='changeValue'
                />
            </client-only>
        </div>
        <div class="ArticleSet">
            <myButton 
                class="issue"
                size='large'
                type='success'
                @click='setArticleDetail'
            >
                发布文章
            </myButton>
        </div>
        <Modal 
            :visible='isShow'
            :mask='true'
            :line='true'
            title='文章细节选择'
            @onOk='isShow = false'
            @onCancle='isShow = false'
            okText='确定发布'
            cancleText='存草稿'
        >
            <p class="ItemTitle">选择文章分类</p>
             <Select v-model="language" style="width:200px">
                <Option v-for="item in SelectData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <p class="ItemTitle">文章封面</p>
             <Upload 
                        :action="`${baseUrl}/upload`"
                        :data="{ dir: 'cover/'}"
                        :show-upload-list='false'
                        :before-upload='checkFile'
                        :on-success='upLoadsuccess'
                        :disabled='loading'
                        :headers='header'
                        :accept="`${uploadType.join(',')}`"
                    >
                        <div class="upload-img" :style="{'background': 'url(' + coverUrl+ ')'}">   


                        </div>
                    </Upload>
            <template slot="footer">
               <myButton :loading='loading' @click='publish("online")'>确定发布</myButton>
               <myButton :loading='loading'  @click='publish("draft")'>存草稿</myButton>
            </template>
        </Modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { publishArticle, articleDetail, editArticle } from '../../axios/api/article'
import { upload } from '../../axios/api/common.js'
import Modal from '../../components/myModal'
import myButton from '../../components/Button'
export default {
    layout: 'blog',
    data() {
        return {
            baseUrl: process.env.VUE_APP_API,
            uploadType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
            coverUrl: '',
            draftId: '',
            source: '',
            content: '',
            isShow: false,
            language: 'Vue',
            title: '',
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                readmodel: true, // 沉浸式阅读
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            loading: false,
            SelectData: [
                {
                    value: 'Vue',
                    label: 'Vue'
                },
                {
                    value: 'React',
                    label: 'React'
                },
                {
                    value: 'JavaScript',
                    label: 'JavaScript'
                },
                {
                    value: '小程序',
                    label: '小程序'
                },
                {
                    value: '移动端',
                    label: '移动端'
                },
                {
                    value: 'Node',
                    label: 'Node'
                },
                {
                    value: 'TypeScript',
                    label: 'TypeScript'
                },
                {
                    value: 'Flutter',
                    label: 'Flutter'
                },
            ]
        }
    },
    methods: {
        upLoadsuccess(response) {
            this.loading = false
            if(response.code === 200) {
                // 更新用户数据
              this.coverUrl = response.data.url
            }     
        },
        checkFile(event) {
            this.loading = true
            const result = this.uploadType.some(item => {
                return item === event.type && event.size / 1024 / 1024 <= 2
            })
            if (!result) {
                this.$Message.error('文件格式有误或过大')
                this.loading = false
                return false
            }
        },
        // 添加图片函数
         $imgAdd(pos, $file){
           let formdata = new FormData()
           formdata.append('file', $file)
           upload(formdata)
            .then(res => {
                if(res.code === 200) {
                    this.$refs.md.$img2Url(pos, res.data.url)
                }
            })
        },
        // 设置文章细节
        setArticleDetail() {
            if(!this.source || !this.title) {
                this.$Message.error('内容或者标题不能为空')
                return
            }        
            this.isShow = true
        },
        // 发布文章
        publish(status) {
            this.loading = true
            // 取消通过crtl + s 进行保存
            // if(window.event.keyCode === 83) return
            let ArticleInfo = {
                source: this.source,
                content: this.content,
                category: this.language,
                title: this.title,
                status: status,
                cover: this.coverUrl
            }
            if(this.draftId) {
                editArticle({ id: this.draftId }, ArticleInfo)
                    .then(res => {
                        if(res.code === 200)
                        this.loading = false
                        this.isShow = false
                        this.$Message.success('修改成功')
                        this.$router.replace('/learn/article')
                    })
            } else {
                publishArticle(ArticleInfo)
                .then(res => {
                    if(res.code !== 200) return 
                    this.loading = false
                    this.isShow = false
                    this.$Message.success('发布成功')
                    if(status === 'online') {
                        this.$router.replace('/learn/article')
                    } else  {
                        this.$router.replace('/draft')
                    }
                })
            }
            
        },
        changeValue(value, render) {

            this.source = value
            this.content = render
        },
    },
    components: {
        myButton,
        Modal
    },
    computed: {
        ...mapState({
            userInfo: state => state.login.userInfo
        }),
        ...mapState({
            UserToken: state => state.login.UserToken
        }),
        header(){
            return {
                'Authorization': 'Bearer' + ' ' + this.UserToken
            }
        }
    },
    created() {
        // 如果有id,那么就是编辑进来的
        this.draftId = this.$route.query.draftId
        if(this.draftId) {
            articleDetail({id: this.draftId}, { isDraft: 1 })
            .then(res => {
                if(res.code === 200)
                this.source =  res.data.source
                this.title = res.data.title
                this.language = res.data.category
                this.content = res.data.content
                this.status = res.data.status
                this.coverUrl = res.data.cover
            })
        }
        
    },
    mounted() {
        if(!this.UserToken) {
            this.$Message.error('需要登录才可以发布文章')
            this.$router.replace('/login')
        }
    }
}
</script>

<style lang='less' scoped>
.WriteWrap {
    padding-top: 20px;
    .ArticeTitle {
        .title-input {
            margin: 0;
            padding: 0;
            font-size: 32px;
            // font-weight: 700;
            color: #000;
            border: none;
            outline: none;
            resize: none;
            overflow: hidden;
            width: 100%;
            height: 40px;
            background: #f6f7f8;
            text-align: center;
        }
    }
}

.ArticleSet {
    padding: 20px 0;
    text-align: right;
    .issue {
        background: #e2e6ea;
        border-color:#e2e6ea;
        font-size: 16px;
    }
}
.mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(55,55,55,.6);
}

</style>
<style lang="less">
.mavonEditor {
  width: 100%;
  height: 100%;
  padding-top:30px;
  .v-note-wrapper {
      z-index: 0;
      min-height: 500px;
      max-height: 500px;
  }
  ::v-deep.hljs {
      span {
          font-family: SFMono-Regular,Consolas,"Liberation Mono",Menlo,Courier,monospace !important;
      }
  }
}
.upload-img {
    background: #fff;
    border: 1px dashed #dcdee2;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 150px;
    height: 150px;
    line-height: 150px;
    background-repeat: no-repeat !important;
    background-size: cover !important
}
.ItemTitle {
    margin: 10px 0
}
</style>