<template>
  <settingLayout title='修改密码'>
      <ul class="Wrap"> 
            <li class="Item" v-for="(item, index) in EditUserInfo" :key='index'>
               <span class="ItemText">{{ showEditTitle(item.name)}}</span>
                <EditInput
                    :placeholder="`请输入${showEditTitle(item.name)}`"
                    :name='item.name'
                    :noButton='true'
                    type='password'
                    v-model="item.value"
                />
           </li>
           <div class="affirm">
               <myButton type='success' @click="show">确认修改</myButton>
           </div>
       </ul>
  </settingLayout>
</template>

<script>
import md5 from 'md5'
import { Reset } from '../../../axios/api/user'
import myButton from '../../../components/Button'
import EditInput from '../../../components/editInput'
import settingLayout from '../../../components/settingLayout'
export default {
    data() {
        return {
            EditUserInfo: [
                {
                    name: 'former',
                    value: '',
                },
                {
                    name: 'newPassword',
                    value: '',
                },
                {
                    name: 'confirmPassword',
                    value: '',
                }
            ],
        }
    },
    components: {
        settingLayout,
        EditInput,
        myButton
    },
    layout: 'blog',
    methods: {
        showEditTitle(name) {
            switch(name) {
                case 'former':
                    return '旧密码'
                case 'newPassword':
                    return '新密码'
                case 'confirmPassword':
                    return '确认密码'
                default:
                    break
            }
        },
        show () {
           Reset({
               oldPassword: md5(this.EditUserInfo[0].value),
               newPassword: md5(this.EditUserInfo[1].value),
           })
            .then(res => {
                if(res.code === 200) {
                    this.$Message.success('修改成功')
                    this.$store.dispatch('login/handleClearLoginOut')
                    this.$router.replace('/login')
                } else  {
                    this.$Message.error(res.msg)
                }
            })
            
        }
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
        .affirm {
            text-align: right;
            margin-top: 20px;

        }
    }
</style>