<template>
<div class="PageWrap">
  <div class="acticle-panel">
    <div class="like panel-btn"></div>
    <div class="comment panel-btn"></div>
  </div>
  <div class="ArticleWrap">
    <div class="ArticleDetail"> 
      <h1 style='color: black; text-align: center'>{{ detail.title }}</h1>
      <div class="authorInfo"> 
        <nuxt-link :to="`/home/${detail.user_info.id}`">
          <img :src="detail.user_info.avatar" >
        </nuxt-link>
        <div class="otherInfo">
          <p class="name">{{detail.user_info.name}}</p>
          <div class="time">
            <span>{{detail.created | dateFormat}}</span>
            <span style="margin-left: 5px">阅读: {{ detail.review }}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <no-ssr>
            <mavon-editor  
                v-model="detail.source"
                ref=md
                :toolbarsFlag='false'
                :subfield='false'
                defaultOpen="preview"
                :boxShadow='false'
                previewBackground='#fff'
                class="mavonEditor"
            >
            </mavon-editor>
          </no-ssr>
      </div>
    </div>
  </div>
  <div class="title-panel">
    点赞、分享、评论即将发布
  </div>
</div>
  <!-- <div class="ArticleWrap">
    <div class="ArticleDetail"> 
      <h1 style='color: black; text-align: center'>{{ detail.title }}</h1>
      <div class="authorInfo"> 
        <nuxt-link :to="`/home/${detail.user_info.id}`">
          <img :src="detail.user_info.avatar" >
        </nuxt-link>
        <div class="otherInfo">
          <p>{{detail.user_info.name}}</p>
          <span>{{detail.created | dateFormat}}</span>
        </div>
      </div>
      <div class="content">
        <no-ssr>
            <mavon-editor  
                v-model="detail.source"
                ref=md
                :toolbarsFlag='false'
                :subfield='false'
                defaultOpen="preview"
                :boxShadow='false'
                previewBackground='#fff'
                class="mavonEditor"
            >
            </mavon-editor>
          </no-ssr>
      </div>
    </div>
  </div> -->
</template>

<script>
import { articleDetail } from '../../axios/api/article'
export default {
  layout: 'blog',
  async asyncData ({ params, error }) {
    try {
      const { data } = await articleDetail({id: params.id})
        return {
          detail: data
        } 
    } catch (e){
     error({ statusCode: 404, message: '文章不存在' })
    }
  },
}
</script>

<style lang="less" scoped>
// .ArticleWrap {
//   padding: 20px;
//   background: #fff;
//   margin: 40px auto;
//   .authorInfo {
//     display: flex;
//     img{
//       width: 50px;
//       height: 50px;
//       border-radius: 50%;
//     }
//     .otherInfo {
//       text-align: left;
//       margin-left: 10px;
//       flex-direction: column;
//       display: flex;
//       align-items: flex-start;
//     }
//   }
//   .content {
//     margin-top: 20px;
//     .markdown-body {
//       z-index: 0;
//       border: none;
//     }
//   }
// }
.PageWrap {
  position: relative;
  margin: 40px;
  .acticle-panel {
    position: fixed;
    top: 130px;
    margin-left: 40px;
    .like {
      background-image: url(https://img.yjdzm.com/zan.b4bb964.svg);
      background-position: 53% 46%;
      animation: tada_4891 3.6s linear infinite;
      &:hover {
        background-image: url( https://img.yjdzm.com/zan-hover.91657d6.svg);
      }
    }
    .comment {
      background-image: url(https://img.yjdzm.com/comment.7fc22c2.svg);
      background-position: 50% 55%;
      &:hover {
        background-image: url(https://img.yjdzm.com/comment-hover.1074e67.svg);
      }
    }
    .panel-btn {
      position: relative;
      margin-bottom: .7rem;
      width: 40px;
      height: 40px;
      background-color: #fff;
      background-repeat: no-repeat;
      border-radius: 50%;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.04);
      cursor: pointer;
    }
  }
  .ArticleWrap {
    max-width: 750px;
    padding: 20px;
    background: #fff;
    margin: 40px 50px 0 120px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    border-radius: 12px;
    .authorInfo {
      display: flex;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .otherInfo {
        text-align: left;
        margin-left: 10px;
        flex-direction: column;
        display: flex;
        align-items: flex-start;
        color: #909090;
        font-size: 13px;
        .name {
          font-size: 15px;
          color: #333;
          font-weight: bold
        }
        .time {
          font-size: 13px;
          display: flex;
        }
      }
    }
    .content {
      margin-top: 20px;
      .markdown-body {
        z-index: 0;
        border: none;
      }
    }
  }
  .title-panel {
    position: absolute;
    top: 0;
    right: 0; 
    max-width: 230px;
  }
}
@keyframes tada_4891 {
  0% { transform: scale(1) }
  5.55556% { transform:scale(.9) rotate(-8deg) }
  11.11111% { transform:scale(.9) rotate(-8deg) }
  16.66667% { transform:scale(1.3) rotate(8deg) }
  22.22222% { transform:scale(1.3) rotate(-8deg) }
  27.77778% { transform:scale(1.3) rotate(8deg) }
  33.33333% { transform:scale(1.3) rotate(-8deg) }
  38.88889% { transform:scale(1.3) rotate(8deg) }
  44.44444% { transform:scale(1) rotate(0) }
  100% { transform:scale(1) rotate(0) }
}
</style>