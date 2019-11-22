<template>
    <p @click="Logout()">로그아웃</p>
</template>

<script>
export default {
    name: 'Logout',
    data() {
        return {
        }
    },

    methods: {
        Logout: function() {
            sessionStorage.removeItem("userinfo");
            window.location.href = '/';
        },
    }
}
</script>

<style lang="scss" scoped>
</style>