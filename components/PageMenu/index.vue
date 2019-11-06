<template>
  <div>
    <nuxt-link
        v-for="navItem in NavData"
        :key='navItem.id'
        :to="navItem.path"
        class="navItem"
        exact
    >
        <Icon :type="navItem.icon" class="NavIcon" size='20' color='black'/>
        <span class="NavText">{{navItem.name}}</span>
    </nuxt-link>
</div>
</template>

<script>
export default {
    data () { 
        return {
            // 头部数据
            NavData: [
                { path: '/', icon: 'md-home', name: '首页', id: 'home'},
                { path: '/article', icon: 'md-bookmarks', name: '文章', id: 'article'},
                { path: '/essay', icon: 'ios-brush', name: '随记', id: 'essay'},
                { path: '/plugin', icon: 'md-pricetags', name: '插件分享', id: 'plugin'},
                { path: '/exercise', icon: 'logo-html5', name: '知识练习', id: 'exercise'},
                { path: '/ranking', icon: "ios-podium", name: '排行', id: 'ranking'},
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.navItem {
    user-select: none;
    padding: 10px;
    box-sizing:border-box;
    text-align: center;
    border-radius: 10px;
    .NavIcon {  
        margin: 0 5px;
    }
    .NavText {
        font-size: 16px;
        color: black;
        font-family: 'hotFont';
    }
     &:hover {
        background: #e2e6ea;
        // .NavText {
        //     color: red;
        // }
    }
}
@media (max-width: 1350px) {
     .NavIcon {  
        display: none;
    }
}
</style>