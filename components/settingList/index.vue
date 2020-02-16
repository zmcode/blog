<template>
  <div>
 
      <li v-for='(item, index) in sideBarData' 
                :key='index'
                class='sideBarItem' 
            >   
                <nuxt-link
                    :key='item.name'
                    :to="item.path"
                >
                    <Icon :type="item.icon" color='black'/>
                    <myButton class="button">{{ item.name }}</myButton>
                </nuxt-link> 
        </li>
  </div>
</template>

<script>
import myButton from '../Button'
export default {
data () {
        return {
            sideBarData: [
                {
                    name: '个人资料',
                    path: '/setting/person',
                    icon: 'ios-card'
                },
                {
                    name: '修改密码',
                    path: '/setting/password',
                    icon: 'md-lock'
                },
                {
                    name: '博客秀',
                    path: '/setting/blogshow',
                    icon: 'ios-body'
                }
            ],
            activeNow: 0,
        }   
    },
     methods: {
        show(name) {
           switch (name) {
               case '个人资料':
                   this.activeNow = 0
                   break
                case '修改密码':
                   this.activeNow = 1
                   break
               default:
                   break
           }
        }
    },
    components: {
        myButton
    }
}
</script>

<style lang="less" scoped>
.sideBarItem {
    text-align: center;
    border-radius: 5px;
    list-style: none;
    cursor: pointer;
    a   {
        display:inline-block;
        height: 100%;
        width: 100%;
        padding: 5px;
        border-radius: 5px;
    }
    .nuxt-link-active {
         background: #f6f7f8;
        .button {
            background: #f6f7f8;
            border-color: #f6f7f8;
        }
    }
}
</style>