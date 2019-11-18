<template>
    <div id="div-loading">
        <h1 id="h1-loading">Re:cipe</h1>
    </div>
</template>

<script>
export default {
    name: 'Loading',
    data() {
        return {
            height: 0
        }
    },
    mounted() {
        setTimeout(() => {
           this.$router.push('/Login');
        }, 3000)
        this.height = window.innerHeight
        document.getElementById("div-loading").style.height = this.height + 'px'
        document.getElementById("h1-loading").style.height = this.height + 'px'
        document.getElementById("h1-loading").style.lineHeight  = this.height + 'px'
    },
}
</script>

<style scoped>
div {
    position: relative;
    background: url(Loading_img.jpg);
    background-size: cover;
}
h1 {
    position: absolute;
    margin: 0;
    width: 100%;
    font-size: 50px;
    color: white;
}
</style>