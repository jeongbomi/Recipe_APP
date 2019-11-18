<template>
  <div class="div-search">
    <button style="margin-top:100px; width: 80%;" class="btn-search" @click="search()">레시피 검색</button>
    <div style="margin: 2%">
      <input
        type="text"
        class="input-search"
        v-on:keyup.enter="Ingredient_add()"
        v-model="ingredient"
      />
      <button class="btn-ingredient" @click="Ingredient_add()">재료 넣기</button>
    </div>
    <div id="type01">
      <img
        v-for="source in ingredients"
        class="imgtag"
        :src="source.url"
        @click="reqdelete(source.name)"
        style="width:86px; height:86px;"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      data: "",
      ingredient: "",
      ingredients: [],
      save: [
        "가지",
        "감자",
        "고등어",
        "고사리",
        "깍두기",
        "깻잎",
        "다시마",
        "두부",
        "마늘",
        "무말랭이",
        "무우",
        "미나리",
        "미역",
        "배추",
        "부추",
        "새우",
        "새우젖",
        "생강",
        "소주",
        "시금치",
        "양배추",
        "양상추",
        "양파",
        "오이소박이",
        "오징어",
        "콩나물",
        "파",
        "파전",
        "간장",
        "갈치",
        "게",
        "게맛살",
        "게살",
        "계란",
        "계피",
        "고구마",
        "고추",
        "고추장",
        "고춧가루",
        "골뱅이",
        "광어",
        "굴",
        "김치",
        "꽁치",
        "꽃게",
        "꿀",
        "낙지",
        "느타리버섯",
        "단무지",
        "닭가슴살",
        "대구",
        "돼지고기",
        "딸기",
        "라면",
        "라이스페이퍼",
        "라임",
        "레몬",
        "머스타드",
        "문어",
        "바질",
        "밥",
        "버섯",
        "버터",
        "베이컨",
        "브로콜리",
        "사과",
        "소고기",
        "소시지",
        "송어",
        "순대",
        "스위트콘",
        "스파게티면",
        "쌀",
        "아보카도",
        "양송이",
        "연어",
        "오렌지",
        "오이",
        "옥수수",
        "와사비",
        "완두콩",
        "우동면",
        "전복",
        "조개",
        "쭈꾸미",
        "참치",
        "체리",
        "치즈",
        "케첩",
        "콩",
        "콩나물",
        "키위",
        "파스타",
        "파슬리",
        "파인애플",
        "파프리카",
        "포도",
        "피클",
        "해삼",
        "햄",
        "홍합",
      ],
      semi_save: []
    };
  },
  created() {
    this.data = JSON.parse(sessionStorage.getItem("userinfo"));
  },
  mounted() {},
  methods: {
    Ingredient_add: function() {
      if (this.ingredients.length < 9) {
        if (this.semi_save.indexOf(this.ingredient) == -1) {
          if (this.save.indexOf(this.ingredient) != -1) {
            this.semi_save.push(this.ingredient);
            let dataurl = require(`../../assets/재료/${this.ingredient}.png`);
            this.ingredients.push({ url: dataurl, name: this.ingredient });
            this.ingredient = "";
          } else {
            alert("없는 재료입니다.");
          }
        } else {
          alert("이미 있는 재료입니다.");
        }
      } else {
        alert("더이상 못넣어")
      }
    },
    reqdelete: function(data) {
      let cnt = 0;
      this.semi_save.some(res => {
        if (res == data) {
          return true;
        } else {
          cnt += 1;
        }
      });
      this.semi_save.splice(cnt, 1);
      this.ingredients.splice(cnt, 1);
      alert("삭제되었습니다.");
    },
    search: function() {
      if (this.ingredients.length > 0) {
        sessionStorage.setItem(
          "recipeinfo",
          JSON.stringify({ recipe: this.semi_save, nation: ""})
        );
        this.$router.push("/recipe/ShowAll");
      } else {
        alert('재료를 입력해주세요!')
      }
    }
  }
};
</script>

<style lang="scss">
.div-search {
  background: url("../../assets/냉장고.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  .input-search {
    width: 50%;
    height: 25px;
    margin: 2%;
  }

  .p-ingredient {
    font-size: 70%;
    margin: 0px;
    color: red;
  }
  .btn-search {
    background-color: #f57694;
    color: white;
    padding: 10px 20px;
    margin-bottom: 2%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-ingredient {
    background-color: #f29eae;
    color: white;
    padding: 10px 20px;
    margin: 2%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}

#type01 {
  display: grid;
  width: 90%;
  margin-left: 20px;
  //   margin-right: 10px;
  grid-template-columns: 1fr 1fr 1fr;
}
.imgtag {
  margin-top: 70px;
  margin-left: 8px;
}
</style>
