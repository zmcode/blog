<template>
<!-- 包裹 -->
  <div class="container">
      <!-- 头部区域 -->
      <div class="HeaderWrap">
        <PageHeader/>
      </div>
      <!-- 内容区域 -->
      <div class="contentWrap">
        <nuxt/>
      </div>
      <!--底部区域 -->
      <!-- <div class="footerWrap">
          <PageFooter/>
      </div> -->
      <div class="goTop" @click="goTop" v-if="showTopIcon">
          <Icon type="md-arrow-up" size="28"/>
      </div>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader/index'
export default {
    components: {
        PageHeader,
    },
    mounted() {
        let that = this
        // 解决固定定位后拖动,左右滚动导航栏不会跟随的问题
        window.onscroll = function(){
            // 设备高度
            let scrollTop = document.documentElement.scrollTop
            if(scrollTop > 80) {
                that.showTopIcon = true
            } else {
                that.showTopIcon = false
            }
            var sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)
            document.getElementsByClassName('FixWrap')[0].style.left = sl + 'px'
        }
    },
    methods: {
        goTop() {
            if(this.isClick) return
            this.isClick = true
            // let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
            document.documentElement.scrollTop = 0
            this.isClick = false
        }
    },
    data() {
        return {
            isClick: false,
            showTopIcon: false,
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
        margin: auto;
        // overflow: hidden;
    }
    .goTop {
        position: fixed;
        right: 100px;
        bottom: 30px;
        cursor: pointer;
        width: 46px;
        height: 48px;
        background-color: #fff;
        background-position: -648px -72px;
        background-repeat: no-repeat;
        border: 1px solid #fff;
        overflow: hidden;
        border-radius: 4px;
        line-height: 48px;
        text-align: center;
        &:hover {
            background-color: #eee;
            border-color: #eee;
        }
    }
</style>
