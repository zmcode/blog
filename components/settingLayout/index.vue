<template>
    <div class='wrap'>
        <ul class="sideBarWrap">
            <SettingList></SettingList>
        </ul>
        <div class="mainWrap">
            <div class="ContentHeader">
                <p>{{ title }}</p>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import SettingList from '../settingList'
export default {
    
    components: {
        SettingList
    },
    props: {
        title: {
            type: String,
            required: true,
        }
    },
    mounted() {
        console.log(this.activeNow)
    }
}
</script>

<style lang="less" scoped>
    .wrap {
        display: flex;
        min-width: 1200px;
        max-width: 1200px;
        margin: 50px auto 0;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,.03);
        padding: 20px 24px;
        .sideBarWrap {
            width: 160px;
            padding: 10px;
            
        };
        .mainWrap {
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
            .ContentHeader {
                padding: 15px;
                font-size: 20px;
                border-bottom: 0.5px solid @primaryColor
            }
        }
    }
</style>