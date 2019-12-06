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
            setTimeout(() => {
                this.$router.push('/');
            }, 1000)
            localStorage.clear();
        },
    }
}
</script>

<style lang="scss" scoped>
</style>