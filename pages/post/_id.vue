<template>
  <div class="ArticleWrap">
    <div class="ArticleDetail"> 
      <h1 style='color: black; textAlign: center'>{{ detail.title }}</h1>
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
  </div>
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
.ArticleWrap {
  padding: 20px;
  background: #fff;
  margin: 40px auto;
  .authorInfo {
    display: flex;
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .otherInfo {
      text-align: left;
      margin-left: 10px;
      flex-direction: column;
      display: flex;
      align-items: flex-start;
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
</style>