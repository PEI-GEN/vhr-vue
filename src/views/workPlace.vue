<template>
    <div id="container">
        <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
            欢迎来到昆山农商银行！
        </div>
    </div>
</template>

<script>
    export default {
        name: "workpalce"
    };
</script>

<style scoped>

</style>
