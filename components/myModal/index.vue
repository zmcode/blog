/* 

    对话框组件    
    @parmas title [String] 弹窗的标题
    @parmas mask [Boolean] 是否显示遮罩层
    @parmas visible [Boolean] 是否显示弹窗
    @parmas okText [String] 确认的文本
    @parms cancleText [String] 取消的文本
    @parmas width [Number] 弹窗的宽度
    @parmas line [Boolean] 是否显示分割
    @parmas onOk [Function] 点击确定的事件
    @parmas onCancle [Function] 点击取消的事件
 */
<template>
    <div>
        <!-- 遮罩层 -->
        <div class="ModalMask" v-show='visible && mask'></div>
        <div class="ModalWrap" v-show='visible'>
            <div class="ModalDialogWrap">
                <div class="ModalDialog" :style='mainStyles' :class='{ show: visible }' >
                    <!-- 头部区域 -->
                    <div class="ModalHeader" :class='{ line: line && showHeader }'>
                        <Icon type="md-close" class="ModalIcon" size='20' @click='$emit("onCancle")'/>
                        <slot name="header" v-if="showHeader">
                            <p class="HeaderTitle">{{ title }}</p>
                        </slot>
                    </div>

                    <!-- 内容区域 -->
                    <div class="ModalContent" :class='{ line }'>
                        <slot></slot>
                    </div>

                    <!-- 底部区域 -->
                    <div class="ModalFooter">
                        <slot name="footer">
                            <myButton @click='$emit("onOk")'>{{ okText }}</myButton>
                            <myButton @click='$emit("onCancle")'>{{ cancleText }}</myButton>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import myButton from '../Button/index'
export default {
    /*eslint-disable  no-dupe-keys */
    name: 'myModal',
    data() {
        return {
            showHeader: true,
        }
    },
    props: {
        width: {
            type: Number,
            default: 520,
        },
        okText: {
            type: String,
            default: '确定',
        },
        cancleText: {
            type: String,
            default: '取消'
        },
        mask: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
        },
        line: {
            default: false,
        },
        visible: {
            type: Boolean,
            type: false,
        }
    },
    mounted() {
        let showHeader = true
        if (!this.title && this.$slots.header === undefined) {
            showHeader = false
        }
        this.showHeader = showHeader
    },
    computed: {
        mainStyles() {

            let style = {}
            const width = parseInt(this.width)

            let styleWidth = {width: `${width}px`}
            
            // 取得自定义的style
            let customStyles = this.styles ? this.styles : {}

            // 改变styles
            Object.assign(style, styleWidth, customStyles)
            return style
        }
    },
    components: {
        myButton
    },
}
</script>

<style lang="less" scoped>
.ModalWrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    .ModalDialogWrap {
        position: relative;
        top: 100px;
        margin: 0 auto;
        width: 520px;
        .ModalDialog {
            position: relative;
            width: auto; 
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
            border-radius: 6px;
            background-clip: padding-box;
            margin: 0 auto;
            background: #fff;
            &.show {
                animation: show 0.2s;
            };
            .ModalHeader {
                padding: 14px 16px;
                position: relative;
                line-height: 1;
                border-radius: 4px;
            };
            .ModalIcon {
                position: absolute;
                z-index: 1;
                right: 8px;
                top: 8px;
                overflow: hidden;
                cursor: pointer;
                &:active {
                    transform: scale(0.9)
                }
            };
            .ModalContent {
                padding: 10px;
            };
            .ModalFooter {
                padding: 5px 10px;
                text-align: right;
            };
        }
    }
    
}
.ModalMask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(55,55,55,.6);
};
.line {
    border-bottom: 1px solid #e8eaec;
}

@keyframes show {
    0%{
        opacity: 0;
        transform: @smallScall
    };
    100% {
        opacity: 1;
    }
}

@keyframes hidden {
    0%{
        opacity: 1;
    };
    100% {
        opacity: 0;
       transform: @smallScall
    }
}
</style>