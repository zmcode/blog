/* 
    按钮组件
    @parmas loading [Boolean] 是否显示loading
    @parmas type [String] 按钮的类型,不同类型不同样式(success、error、default)
    @parmas shape [String] 按钮的形状(circle)
    @parmas disabled [String] 是否禁用
    @parmas to [String] 跳转的链接
    @parmas size [String] 按钮的大小(small、default、large)
    @parmas active [Boolean] 是否显示active样式
 */
<template>
    <component 
        :is="tagName" 
        :class="classes"
        @click="handleClickLink" 
        :disabled='loading || disabled'
        :to='to'
    >
        <Icon type="ios-loading" class="loadingIcon" v-if="loading"/>
        <span class="icon"><slot></slot></span>
    </component>
</template>
<script>
 import { oneOf } from '../../assets/untils/assist'
 // 创建默认前缀
 const prefixCls = 'my-btn'
 export default {
    props: {
        loading: {
            type: Boolean,
        },
        type: {
            validator(value) {
                return oneOf(value, ['success', 'error', 'default'])
            },
            default:'default'
        },
        shape: {
            validator(value) {
                return oneOf(value, ['circle'])
            }
        },
        size: {
            validator(value) {
                return oneOf(value, ['small', 'default', 'large'])
            },
            default: 'default'
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: false,
        },
        to: {
            tupe: String,
        }
    },
    computed: {
        tagName() {
            return this.to ? 'nuxt-link' : 'button'
        },
        classes() {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.type}`,
                {
                    [`${prefixCls}-${this.size}`]: this.size !== 'default',
                    [`${prefixCls}-${this.shape}`]: this.shape !== '',
                    [`${prefixCls}-active`]: this.active === true
                },
            ]
        }
    },
    methods: {
        handleClickLink(event) {
            this.$emit('click', event)
        }
    },
    mounted() {
        console.log(this.to)
    }
 }
 </script>

<style lang="less" scoped>
.my-btn {
    .btn;
    .btn-default;
    &-success {
        .controlBtn(@successColor)
    };
    &-error {
        .controlBtn(@errorColor)
    };
    &.disabled,
    &[disabled] {
        color: #c5c8ce;
        background-color: #f7f7f7;
        border-color: #dcdee2;
        cursor: not-allowed;

    }
    .loadingIcon {
        animation: loadingCircle 1s infinite linear;
    };
}
 @keyframes loadingCircle {
    100% {
        transform: rotate(360deg);
    }
}
</style>