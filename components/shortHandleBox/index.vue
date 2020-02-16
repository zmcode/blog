<template>
  <div class="handleBox" v-if='LoginUserId === item.user_info.id' ref="dropDownBox">
    <div class="handleBtn" @click="showHandleBox = !showHandleBox">
      <svg data-v-125febc4="" t="1529034629100" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1948" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" class="icon"><path data-v-125febc4="" d="M804.606221 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C682.449044 619.671255 683.426301 432.282401 804.606221 432.282401z" p-id="1949" fill="#b8c1cc"></path><path data-v-125febc4="" d="M511.428995 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C389.271818 619.671255 390.249075 432.282401 511.428995 432.282401z" p-id="1950" fill="#b8c1cc"></path><path data-v-125febc4="" d="M218.251769 432.282401c120.691803 0 119.469975 187.388854-1.465374 187.388854C96.094592 619.671255 97.071849 432.282401 218.251769 432.282401z" p-id="1951" fill="#b8c1cc"></path></svg>
    </div>
    <div class="dropDownBox" v-if="showHandleBox">
      <div class="dropDownCaret"></div>
      <ul class="dropDownMenu">
        <li class="dropDownMenu-item" @click='showAndget'>编辑</li>
        <li class="dropDownMenu-item" @click="isShow = true">删除</li>
      </ul>
    </div>
    <myModal
      :visible='isShow'
      :mask='true'
      title='删除速记'
      @onOk='deleteSH'
      @onCancle='isShow = false'
    >
      确定要删除这条速记吗?
    </myModal>
  </div>
</template>

<script>
import myModal from '../../components/myModal'
import { deleteShortHand } from '../../axios/api/shorthand'
export default {
  components: { myModal },
  data () {
    return {
      showHandleBox: false,
      isShow: false
    }
  },
  props: {
    LoginUserId: [String],
    item: [Object],
    changeEditVis: [Function],
    changeItemData: [Function],
    getShortHandList:[Function]
  },
  methods:{
    showDropBox (ev) {
      if (this.$refs.dropDownBox && (!this.$refs.dropDownBox.contains(ev.target))) {
        this.showHandleBox = false
      }
    },
    showAndget () {
      this.changeEditVis(true)
      this.changeItemData(this.item)
    },
    deleteSH () {
      let _this = this
      deleteShortHand({id: this.item._id}, {topic: this.item.topic})
        .then(res => {
          if (res.code === 200) {
            this.$Message.success('删除成功')
            // this.getShortHandList(1, '')
            _this.$router.replace('/shorthand')
          }
        })
    }
  },
  mounted () {
    document.documentElement.addEventListener('click', this.showDropBox, false)
  },
  destroyed () {
    document.documentElement.removeEventListener('click', this.showDropBox, false)
  }
}
</script>

<style lang="less" scoped>
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
</style>