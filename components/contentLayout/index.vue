<template>
   <div class="main">
        <Row class="content">
            <Col span="17" style="border-radis: 10px;"><slot name='main'></slot></Col>
            <Col span="6" offset='1'><slot name='side'></slot></Col>
        </Row>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.main {
    max-width: 1200px;
    margin: auto;
    .content {
        padding: 30px 20px;

    }
}
</style>