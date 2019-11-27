<template>
  <settingLayout title='个人资料'>
       <ul class="Wrap"> 
           <li class="Item">
               <span class="ItemText">头像</span>
               <Avatar  size='large' class="Avatar" :src="avatar"/>
               <div class='UploadWrap'>
                    <p style='margin-bottom: 5px'>支持 jpg、png、jpeg、gif 格式大小 2M 以内的图片</p>
                    <Upload 
                        :action="`${baseUrl}/upload`"
                        :data="{ dir: 'avatar/'}"
                        :show-upload-list='false'
                        :before-upload='checkFile'
                        :on-success='upLoadsuccess'
                        :disabled='loading'
                        :headers='header'
                        :accept="`${uploadType.join(',')}`"
                    >
                        <myButton type='success' :loading='loading'>上传头像</myButton>
                    </Upload>
               </div>
           </li>
           <li class="Item" v-for="(item, index) in EditUserInfo" :key='index'>
               <span class="ItemText">{{ showEditTitle(index)}}</span>
               <EditInput
                    :placeholder="`请输入${showEditTitle(index)}`"
                    :name='index'
               />
           </li>
           <li class="Item">
               <span class="ItemText">注册时间</span>
               <p class="TimeInfo">{{ UserTimeInfo.created | dateFormat }}</p>
           </li>
           <li class="Item">
               <span class="ItemText">最后登录时间</span>
               <p class="TimeInfo">{{ UserTimeInfo.last_login | dateFormat }}</p>
           </li>
       </ul>
  </settingLayout>
</template>

<script>
import { mapState } from 'vuex'
import { UserInfoUpdata, UserInfo } from '../../../axios/api/common.js'
import EditInput from '../../../components/editInput'
import myButton from '../../../components/Button'
import settingLayout from '../../../components/settingLayout'

export default {
    layout: 'blog',
    data() {
        return {
            baseUrl: process.env.VUE_APP_API,
            loading: false, // 是否显示loading
            userInfoTitle: [], // 编辑的左侧title
            EditUserInfo: {}, // 可以编辑的用户数据
            avatar: '', // 用户头像(因为头像不同,单独存放一个)
            uploadType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
            UserTimeInfo: {}
        }
    },
    components: {
        myButton,
        settingLayout,
        EditInput
    },
    methods: {
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
        upLoadsuccess(response) {
            this.loading = false
            if(response.code === 200) {
                // 更新用户数据
                UserInfoUpdata({ field: 'avatar', value:response.data.url})
                    .then(res => {
                        this.$store.commit('login/changeUserInfo', {userInfo: res.data})
                        this.avatar = res.data.avatar
                        this.$Message.success('头像更改成功')
                    })
            }     
        },
        showEditTitle(name) {
            switch(name) {
                case 'name':
                    return '名称'
                   
                case 'summary':
                    return '简介'
                 
                case 'last_login':
                    return '最后更新时间'
                 
                default:
                
            }
        },
    },
    computed: {
        ...mapState({
            UserToken: state => state.login.UserToken
        }),
        header(){
            return {
                'Authorization': 'Bearer' + ' ' + this.UserToken
            }
        }
    },
    mounted () {
        UserInfo()
            .then(res => {
                // 过滤对象
                this.EditUserInfo = (({ name, summary }) => ({ name, summary }))(res.data)
                this.UserTimeInfo = (({ created, last_login }) => ({ created, last_login }))(res.data)
                this.avatar = res.data.avatar
                for (var item in this.EditUserInfo) {
                    this.userInfoTitle.push(item)
                }
            })
            .catch(err => {
                this.$Message.error(err)
            })
    }
}
</script>

<style lang="less" scoped>
    .Wrap {
        .Item {
            padding: 20px;
            display: flex;
            align-items: center;
            border-bottom: 0.5px solid @primaryColor;
            .ItemText {
                min-width: 120px;
            }
            .TimeInfo {
                color:black;
                user-select: none;
            }
            .UploadWrap {
                padding-left: 10px;
                flex-direction: column;
                display: flex
            }
            .Avatar {
                width: 64px;
                height: 64px;
                line-height: 64px;
                font-size: 32px;
            }
        }
    }
</style>