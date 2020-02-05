<template>
  <div class="expression-box" ref="expressionBox">
    <Icon type="md-happy" size='20' @click="changeShow(!expressionSelect)"/>
    <div class="expression-select" v-if="expressionSelect">
      <div class="triangle"></div>
      <div class="expression-content">
        <div class="expression-picker">
          <div class="expressions">
            <ul class="category">
              <li class="item" v-for="(item, index) in expressionUrl[imgPathName].alias" :key="index" >
                <img :src="expressionUrl[imgPathName].path + item + expressionUrl[imgPathName].file"  @click.stop='addExpressions'>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="otherPage">
        <li class="pageItem" @click="changeImgList('tieba')" :class="{'active': this.imgPathName === 'tieba'}"></li>
        <li class="pageItem" @click="changeImgList('wendao')" :class="{'active': this.imgPathName === 'wendao'}"></li>
        <li class="pageItem" @click="changeImgList('wendaovip')" :class="{'active': this.imgPathName === 'wendaovip'}"></li>
      </div>
    </div>
  </div>
</template>

<script>
import { expressionUrl } from '../../assets/js/expression'
export default {
  data() {
    return {
      expressionUrl: expressionUrl,
      imgPathName: 'tieba'
    }
  },
  props: {
    expressionSelect: [Boolean],
    isShowAcitonBox: [Boolean],
    changeShow: [Function],
    addExpressions: [Function]
  },
  methods: {
    // 表情选择界面隐藏显示,只要不是点自己的儿子,就隐藏
    HandleshowExpressionsBox (ev) {
      if (!this.$refs.expressionBox) return
      if (!this.$refs.expressionBox.contains(ev.target)) {
        this.changeShow(false)
      }
    },
    changeImgList (name) {
      this.imgPathName = name
    },
  },
  mounted () {
    document.documentElement.addEventListener('click', this.HandleshowExpressionsBox, false)
  },
  destroyed () {
    document.documentElement.removeEventListener('click', this.HandleshowExpressionsBox, false)
  }
}
</script>

<style lang="less" scoped>
        .expression-box {
          position: relative;
          cursor: pointer;
          .expression-select {
            padding: 1rem;
            position: absolute;
            top: 40px;
            left: -30px;
            z-index: 1;
            bottom: 0;
            width: 280px;
            height: 250px;
            border-radius: 2px;
            background-color: #fff;
            box-shadow: 0 5px 18px 0 rgba(0,0,0,.16);
            .triangle {
              position: absolute;
              top: -.7rem;
              left: 15%;
              width: 0;
              height: 0;
              transform: translate(-50%,-50%);
              border: .8rem solid transparent;
              border-bottom-color: #fff;
            }
            .expression-content {
              overflow: auto;
              margin-bottom: 10px;
              .expression-picker {
                .expressions {
                  .category {
                    max-width: 280px;
                    max-height: 225px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: flex-start;
                    .item {
                      font-size: 1.4rem;
                      padding: 5px 4.5px;
                      cursor: pointer;
                      img {
                        width: 22px;
                        height: 22px;
                        display: block;
                        &:hover {
                          transform: scale(1.2)
                        }
                      }
                    }
                  }
                }
              }
            }
            .otherPage {
              width: 100%;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              bottom: 10px;
              left: 50%;
              transform: translate(-50%,-50%);
              .pageItem {
                margin: 0 5px;
                width: 6px;
                height: 6px;
                border-radius: 100%;
                background-color: #f0f0f0;
                cursor: pointer;
                list-style: none;
                &.active {
                  background-color: #d8d8d8;
                }
              }
            }
          }
        }
</style>