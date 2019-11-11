<template>
      <ul class="NavWrap">
          <li v-for="navItem in NavData" class="NavItem" :key='navItem.id'>
              <nuxt-link
                  :key='navItem.id'
                  :to="navItem.path"
                  class="NavLink"
                  exact
              >
                  <Icon :type="navItem.icon" class="NavIcon" size='20' color='black'/>
                  <span class="NavText">{{navItem.name}}</span>
              </nuxt-link>
              <DropList v-if="navItem.children" :source="navItem.children" class="DropList"/>
          </li>
      </ul>
</template>

<script>
import DropList from '../dropList/index'
export default {
    data () {
        return {
            // 头部数据
            NavData: [
                { path: '/', icon: 'md-home', name: '首页', id: 'home' },
                {
                     path: '/learn',
                     icon: "md-school",
                     name: '学习',
                     id: 'article',
                     children: [
                            {
                                path: '/learn/article',
                                icon: "md-book",
                                name: '文章',
                                id: 'article',
                            },
                            {
                                path: '/learn/record',
                                icon: "md-clipboard",
                                name: '速记',
                                id: 'record',
                            },
                            {
                                path: '/learn/exercise',
                                icon: 'logo-html5',
                                name: '知识练习',
                                id: 'exercise'
                            },
                     ]
                },
                {
                    path: '/share',
                    icon: "ios-paper-plane",
                    name: '分享',
                    id: 'share',
                    children: [
                        {
                            path: '/essay',
                            icon: "md-code",
                            name: '代码分享',
                            id: 'essay'
                        },
                        {
                            path: '/plugin',
                            icon: 'md-pricetags',
                            name: '插件分享',
                            id: 'plugin'
                        }
                    ]
                },
                { path: '/question', icon: "md-help-circle", name: '提问', id: 'question'},
                { path: '/ranking', icon: "ios-podium", name: '排行', id: 'ranking'},
            ]
        }
    },
    components: {
        DropList
    }
}
</script>

<style lang="less" scoped>
.NavWrap{
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: start;
    .NavItem {
        position: relative;
        list-style: none;
        box-sizing: border-box;
        line-height: normal;
        padding: 10px 20px;
        border-radius: 10px;
        &:hover {
            background: #e2e6ea;
            .DropList {
                display: block;
            }
        }
        .NavLink {
            user-select: none;
            text-align: center;
            width: 100%;
            height: 100%;
            display: inline-block;
            .NavIcon {
                margin: 0 5px;
            }
            .NavText {
                font-size: 16px;
                color: black;
                font-family: 'hotFont';
            }
        }
        .DropList {
            display: none;
        }
    }
}
</style>
