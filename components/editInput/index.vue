<template>
  <div class="EditWrap">
    <input
      :type="type"
      ref="editInput"
      :placeholder="placeholder"
      v-model="inputVal"
      @focus="bindFoucs"
      @blur="bindBlur"
      class="EditInput"
      autocomplete="new-password"
      @input="handleInput"
    />
    <div class="handleEditWrap" v-if="!noButton">
      <div v-if="isEdit">
        <myButton size="small" class="EditButton" @click="save">保存</myButton>
        <myButton size="small" class="EditButton" @click="recoverValue"
          >取消</myButton
        >
      </div>
      <div v-if="!isEdit">
        <myButton size="small" class="EditButton" @click="bindEdit"
          >编辑</myButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { UserInfoUpdata, UserInfo } from '../../axios/api/common.js'
import myButton from '../Button'
export default {
  data() {
    return {
      isEdit: false,
      inputVal: ''
    }
  },
  components: {
    myButton
  },
  methods: {
    bindFoucs() {
      this.isEdit = true
      this.$refs.editInput.removeAttribute('readonly')
    },
    bindBlur(e) {
      const { value } = e.target
      if (value === this.userInfo[this.name]) {
        this.isEdit = false
      }
    },
    bindEdit() {
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs.editInput.focus()
      })
    },
    recoverValue() {
      this.inputVal = this.userInfo[this.name]
      this.isEdit = false
    },
    save() {
      if(this.inputVal.length > 20) {
        this.$Message.error('名称要在20个字符以内')
        return
      }
      UserInfoUpdata({
        field: this.name,
        value: this.inputVal
      }).then(res => {
        if (res.code === 200) {
          this.isEdit = false
          this.$store.commit('login/changeUserInfo', { userInfo: res.data })
          UserInfo()
        } else {
          this.$Message.error('该名称已存在')
        }
      })
    },
    handleInput(e) {
      let value = e.target.value
      this.$emit('input', value)
    }
  },
  props: {
    placeholder: {
      type: String
    },
    name: {
      type: String
    },
    noButton: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  mounted() {
    this.inputVal = this.userInfo[this.name]
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  }
}
</script>

<style lang="less" scoped>
.EditWrap {
  display: flex;
  align-items: center;
  flex: 2;
  .EditInput {
    border-width: 0;
    outline: 0;
    flex: 1;
    display: inline-block;
    border: none;
    outline: none;
    color: black;
    font-size: 16px;
    &:active {
      outline: 0;
    }
  }
  .handleEditWrap {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
}
</style>
