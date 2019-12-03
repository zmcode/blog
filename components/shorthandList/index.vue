<template>
  <div class="pinListView">
    <ul class="pinList">
      <li class="Item" v-for="(item ,index) in source" :key="index">
        <div class="pin">

          <div class="pinHeader">
            <div class="userPopover">
              <nuxt-link :to="`/home/${item.user_info.id}`">
                <img :src="item.user_info.avatar">
              </nuxt-link>
            </div>
            <div class="headerContent">
              <p>{{item.user_info.name}}</p>
              <p>{{ item.created | dateFormat }}</p>
            </div>
          </div>

          <div class="pinContent">
            <p>{{item.content}}</p>
          </div>

          <div class="pinImg">
            <Viewer :images="item.imgData">
              <img v-for="item in item.imgData" :src="item" :key="item.index" height="100">
            </Viewer>
          </div>

          <div class="pinTopic">
            <span class="pinTopicTitle">{{item.topic}}</span>
          </div>

        </div>
      </li>
    </ul>
  </div>  
</template>
<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'
export default {
  props: {
    source: {
      type: Array,
    }
  },
  components: {
    Viewer
  }
}
</script>

<style lang="less" scoped>
.pinListView {
  margin-top: 20px;
  .Item {
    margin-top: 20px;
    .pin {
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      padding:20px;
      .pinHeader {
        display: flex;
        align-items: center;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
        .headerContent {
          font-size: 14px;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
        }
      }
      .pinContent {
          margin: 10px 0 10px 40px;
          color: black;
      }
      .pinImg {
         margin: 10px 0 10px 40px;
         img {
           margin-left: 4px;
         }
      }
      .pinTopic {
          margin: 10px 0 10px 40px;
         .pinTopicTitle {
            font-size: 13px;
            display: inline-block;
            line-height: 22px;
            height: 22px;
            padding: 0 12px;
            border: 1px solid #007fff;
            border-radius: 14px;
            text-align: center;
            color: #007fff;
            user-select: none;
         }
      }
    }
  }
}
</style>