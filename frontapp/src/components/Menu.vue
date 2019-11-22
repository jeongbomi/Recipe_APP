<template>
    <div style="margin-top:80px;">
        <div class="container">
            <h4 style="margin-bottom:0px;">나라</h4>
            <hr>
            <div class="card-grid">
                <div class="card" @click="totalpage('한식')">한식</div>
                <div class="card" @click="totalpage('중국')">중식</div>
                <div class="card" @click="totalpage('일본')">일식</div>
                <div class="card" @click="totalpage('이탈리아')">이탈리아식</div>
                <div class="card" @click="totalpage('서양')">서양식</div>
                <div class="card" @click="totalpage('퓨전')">퓨전</div>
            </div>
        </div>
        <div class="container">
            <h4 style="margin-bottom:0px;">재료</h4>
            <hr>
            <div class="card-grid">
                <div class="card">육류</div>
                <div class="card">해산물</div>
                <div class="card">채소</div>
                <div class="card">과일</div>
            </div>
        </div>
        <div class="container">
            <h4 style="margin-bottom:0px;">자취생</h4>
            <hr>
            <div class="card-grid">
                <div class="card">자취초급생</div>
                <div class="card">초스피드</div>
                <div class="card">간단재료</div>
                <div class="card">혼밥</div>
                <div class="card">야식</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
        }
    },
    methods: {
        totalpage: function(data) {
            sessionStorage.setItem('recipeinfo', JSON.stringify({ recipe: "", nation: data}))
            this.$router.push('/recipe/ShowAll')
        }
    }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  height: 30px;
  margin: 7px;
}

.container {
    padding: 2px 20px;
}

.card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>
