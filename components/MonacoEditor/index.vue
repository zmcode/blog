
<template>
   <div id="monaco" class="monaco"></div>
</template>
<script>

const monaco = process.browser ? require('monaco-editor/esm/vs/editor/editor.api.js') : undefined
process.browser ? require('../../plugins/nuxt-codemirror-plugin') : undefined
export default {
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    // 创建模型
    const model = monaco.editor.createModel('','javascript')
    // 创建编译器实例,以model为列
    const monacoInstance = monaco.editor.create(document.getElementById('monaco'),{
       model:model
    })
    model.onDidChangeContent(() => {
      const newValue = monacoInstance.getValue()
      this.content = newValue
       this.$emit('click', this.content)
    })
  }
}
</script>

<style lang="less">
.monaco {
  width: 1000px;
  height: 100%;
  min-height: 500px;
}
</style>