<template>
<!-- 包裹 -->
  <div class="container" @click="hideList">
      <!-- 头部区域 -->
      <div class="HeaderWrap">
        <PageHeader ref="HeaderChild"/>
      </div>
      <!-- 内容区域 -->
      <div class="contentWrap">
        <nuxt/>
      </div>
      <!--底部区域 -->
      <div class="footerWrap">
          <PageFooter/>
      </div>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader/index'
import PageFooter from '../components/footer/index'
export default {
    components: {
        PageHeader,
        PageFooter,
    },
    mounted() {
        // 解决固定定位后拖动,左右滚动导航栏不会跟随的问题
        window.onscroll = function(){
            var sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
            console.log(document.getElementsByClassName('HeaderWrap')[0].style.left)
            document.getElementsByClassName('FixWrap')[0].style.left = sl + 'px';
        };
    },
    methods: {
        hideList() {
            if (this.$route.path === '/login') return
            this.$refs.HeaderChild.hiddenList()
        }
    }
}
</script>

<style lang="less" scoped>
    .HeaderWrap {
        position: relative;
        overflow: hidden;
        height: 64px; // 固定定位写死高度
    }
    .contentWrap {
        max-width: 1200px;
        background-color: #f6f7f8;
        height: 1000px;
        margin: auto;
    }
    .footerWrap {
        background-color: #f6f7f8;
        text-align: center;
        width: 100%;
    }
</style>
