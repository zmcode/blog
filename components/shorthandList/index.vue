<template>
  <div class="pinListView">
    <ul class="pinList">
      <li class="Item" v-for="(item ,index) in source" :key="index">
        <div class="pin">
          <div class="pinHeader">
            <div class="userInfo">
              <div class="userPopover">
                <nuxt-link :to="`/home/${item.user_info.id}`">
                  <img :src="!item.user_info.avatar ? `${baseUrl}/default-avatar.e30559a.svg` : item.user_info.avatar">
                </nuxt-link>
              </div>
              <div class="headerContent">
                <p>{{item.user_info.name}}</p>
                <p>{{ item.created | dateFormat }}</p>
              </div>
            </div>
            <!-- <div class="handleBox" v-if='LoginUserId === item.user_info.id' ref="dropDownBox">
              <div class="handleBtn" @click="showHandleBox = !showHandleBox">
                <svg data-v-125febc4="" t="1529034629100" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1948" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" class="icon"><path data-v-125febc4="" d="M804.606221 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C682.449044 619.671255 683.426301 432.282401 804.606221 432.282401z" p-id="1949" fill="#b8c1cc"></path><path data-v-125febc4="" d="M511.428995 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C389.271818 619.671255 390.249075 432.282401 511.428995 432.282401z" p-id="1950" fill="#b8c1cc"></path><path data-v-125febc4="" d="M218.251769 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C96.094592 619.671255 97.071849 432.282401 218.251769 432.282401z" p-id="1951" fill="#b8c1cc"></path></svg>
              </div>
              <div class="dropDownBox" v-if="showHandleBox">
                <div class="dropDownCaret"></div>
                <ul class="dropDownMenu">
                  <li class="dropDownMenu-item">编辑</li>
                  <li class="dropDownMenu-item">删除</li>
                </ul>
              </div>
            </div> -->
            <shortHandleBox
              :LoginUserId="LoginUserId"
              :item="JSON.parse(JSON.stringify(item)) "
              :changeEditVis="changeEditVis"
              :changeItemData="changeItemData"
              :getShortHandList="getShortHandList"
            ></shortHandleBox>
          </div>

          <div class="pinContent">
            <span class="content" v-html="item.content"></span>
          </div>

          <div class="pinImg">
            <Viewer :images="item.imgData">
              <img v-for="item in item.imgData" :src="item" :key="item.index" height="100">
            </Viewer>
          </div>

          <div class="pinTopic">
            <span class="pinTopicTitle">{{item.topic}}</span>
            <!-- <nuxt-link to='/login' class="detail-btn">
              编辑
            </nuxt-link> -->
          </div>
        </div>
      </li>
    </ul>
  </div>  
</template>
<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'
import shortHandleBox from '../../components/shortHandleBox'
export default {
  props: {
    source: {
      type: Array,
    },
    LoginUserId: [String],
    changeEditVis: [Function],
    changeItemData:[Function],
    getShortHandList: [Function]
  },
  components: {
    Viewer,
    shortHandleBox
  },
  data () {
    return {
      showHandleBox: false,
      baseUrl: process.env.VUE_APP_IMG,
    }
  },
  // methods:{
  //   showDropBox (ev) {
  //     console.log(this.$refs.dropDownBox)
  //     if (this.$refs.dropDownBox && (!this.$refs.dropDownBox[0].contains(ev.target))) {
  //       this.showHandleBox = false
  //     }
  //   }
  // },
  // mounted () {
  //   document.documentElement.addEventListener('click', this.showDropBox, false)
  // },
  // destroyed () {
  //   document.documentElement.removeEventListener('click', this.showDropBox, false)
  // }
}
</script>

<style lang="less" scoped>
.pinListView {
  .Item {
    margin-bottom: 20px;
    &:hover {
      .pin {
        .pinHeader {
          .handleBox {
            display: block;
          }
        }
      }
    }
    .pin {
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
      padding:20px;
      .pinHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .userInfo {
          display: flex;
        }
        .handleBox {
          display: none;
          position: relative;
          .handleBtn {
            cursor: pointer;
          }
          .dropDownBox {
              position: absolute;
              /* margin-top: 6px; */
              z-index: 1;
              left: -21px;
              margin-top: -6px;
            .dropDownCaret {
                position: absolute;
                top: -12px;
                left: 28px;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-bottom-color: #ebebeb;
                &:after {
                  content: "";
                  top: -5px;
                  left: -6px;
                  border-bottom-color: #fff;
                  width: 0;
                  height: 0;
                  border: 6px solid transparent;
                  position: absolute
                }
            }
            .dropDownMenu {
              display: block;
              padding: 6px 0;
              border-radius: 3px;
              background-color: #fff;
              border: 1px solid #ebebeb;
              box-shadow: 0 3px 12px 0 rgba(0,0,0,.06);
              .dropDownMenu-item {
                padding: 6px 20px;
                display: block;
                font-size: 13px;
                color: #84878b;
                text-align: center;
                cursor: pointer;
                white-space: nowrap;
                &:hover {
                  color: #64686e;
                  background-color: #f8f8f8;
                }
              }
            }
          }
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .headerContent {
          font-size: 12px;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
        }
      }
      .pinContent {
          margin: 10px 0 10px 40px;
          color: black;
          .content {
            white-space: pre-wrap;
          }
          ::v-deep img {
            max-width: 40px;
          }

      }
      .pinImg {
         margin: 10px 0 10px 40px;
         img {
            margin-left: 4px;
            max-width: 100%;
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
            border: 1px solid #666;
            border-radius: 14px;
            text-align: center;
            color: #666;
            user-select: none;
         }
         .detail-btn {
           font-size:12px;
          //  color: #666;
           &:hover {
             opacity: 0.8;
           }
         }
      }
    }
  }
}
</style>