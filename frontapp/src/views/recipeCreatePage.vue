<template>
  <div class="recipe-create">
    <h2>NEW RE:CIPE</h2>
    {{ userid }}
    <div>
      <input v-model="name" type="text" placeholder="요리 이름을 입력해주세요."/>
      <input v-model="ingredients" type="text" placeholder="요리 재료를 입력해주세요." style="margin-top: 15px;"/>
      <div class="select">
        <select v-model="category" @change="onChange($event)">
          <option>나라</option>
          <option>재료</option>
          <option>자취생</option>
        </select>
        <div class="select__arrow"></div>
      </div>
      <div class="select" v-if="category == '나라'">
        <select v-model="kinds">
          <option v-for="country in countrys" :key="country">{{ country }}</option>
        </select>
        <div class="select__arrow"></div>
      </div>
      <div class="select" v-if="category == '재료'">
        <select v-model="kinds">
          <option v-for="material in materials" :key="material">{{ material }}</option>
        </select>
        <div class="select__arrow"></div>
      </div>
      <div class="select" v-if="category == '자취생'">
        <select v-model="kinds">
          <option v-for="alone in aloner" :key="alone">{{ alone }}</option>
        </select>
        <div class="select__arrow"></div>
      </div>
    </div>
    <br />
    <div v-for="(info, index) in infos" v-bind:key="index">
      <div class="inputForm">
        <label for="fileInput"><b>STEP {{ index + 1 }}</b></label>
        <i class="fas fa-times-circle" @click="deleteInfo(index)"></i>
        <hr />
        <div class="imageBox">
          <label v-bind:for="index">
            <img v-bind:src="info.file" alt />
          </label>
          <input type="file" v-bind:id="index" accept="image/*" @change="imageChange(index, $event)" />
        </div>
        <textarea v-model="info.content" placeholder="조리 과정에 관한 설명을 적어주세요." />
      </div>
      <i class="fas fa-plus-circle" @click="addNewInfo(index)"></i>
    </div>
    <button class="btn-submit" @click="newSubmit()">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "recipeCreatePage",
  data() {
    return {
      name: "",
      userid: JSON.parse(sessionStorage.getItem("userinfo")),
      step: 0, 
      ingredients: [],
      infos: [
        {
          content: "",
          file: require("@/assets/uploadImage.png")
        }
      ],
      picture: "",
      summary: "",
      nation: "",
      level: "",
      category: "나라",
      cal: "",
      qnt: "",
      kinds: "한식",
      countrys: ['한식', '중식', '일식', '이탈리아식', '서양식', '퓨전'],
      materials: ['육류', '해산물', '채소', '과일'],
      aloner: ['자취초급생', '초스피드', '간단재료', '혼밥', '야식'],
    };
  },
  methods: {
    async newSubmit() {
      await axios
        .post("http://localhost:3000/api/recipe/create", {
          name: this.name,
          userid: this.userid,
          ingredients: this.ingredients,
          info: this.infos,
          picture: this.picture,
          summary: this.summary,
          nation: this.nation,
          level: this.level,
          category: this.category,
          cal: this.cal,
          qnt: this.qnt
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
      });
    },
    addNewInfo(index) {
      this.infos.splice(index + 1, 0, {
        content: "",
        file: require("@/assets/uploadImage.png")
      });

      this.step = this.step + 1
    },
    deleteInfo(index) {
      this.infos.splice(index, 1);
      if (this.infos.length == 0) {
        this.infos.push({
          content: "",
          file: require("@/assets/uploadImage.png")
        });
        this.step = 0
      }
      else {
        this.step = this.step - 1
      }
    },
    imageChange(index, event) {
      var img = event.target;
      var imgInfo = this.infos

      var reader = new FileReader();
      reader.onload = async function(){
        var dataURL = await reader.result;
        imgInfo[index].file = dataURL
      };

      reader.readAsDataURL(img.files[0]);
    },
    onChange(event) {
      if (event.target.value === '나라'){
        this.kinds = this.countrys[0]
      } else if (event.target.value === '재료'){
        this.kinds = this.materials[0]
      } else {
        this.kinds = this.aloner[0]
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scopped>
html {
  overflow: scroll;
}

.recipe-create {
  margin-top: 70px;
  margin-bottom: 81px;
  .inputForm {
    margin: 3px 9px;
    border: solid 1px #7b7b7b;
    border-radius: 10px;
    label {
      font-size: 18px;
      color: #de3d80;
    }
    i {
      float: right;
    }
  }
  h2 {
    color: #797979;
  }
  i:active {
    color: #ed2894;
  }
  input{
    width: 90%;
    height: 25px;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding-left: 16px;
  }
  input:focus {
    outline:none;
  }
  textarea {
    width: 90%;
    height: 50px;
  }
  .hi {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
  }
  .imageBox {
    label {
      img {
        width: 300px;
        // height: 200px;
      }
    }
    input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
  .select {
    position: relative;
    display: inline-block;
    margin-top: 15px;
    width: 49%;
  }
  .select select {
    display: inline-block;
    width: 93%;
    cursor: pointer;
    padding: 8px 15px;
    outline: 0;
    border: 0;
    border-radius: 15px;
    background: #eee;
    color: #7b7b7b;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  .select select::-ms-expand {
    display: none;
  }
  .select select:hover,
  .select select:focus {
    color: #000;
    background: #ccc;
  }
  .select select:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  .select__arrow {
    position: absolute;
    top: 11px;
    right: 15px;
    width: 0;
    height: 0;
    pointer-events: none;
    border-style: solid;
    border-width: 8px 5px 0 5px;
    border-color: #7b7b7b transparent transparent transparent;
  }
  .select select:hover ~ .select__arrow,
  .select select:focus ~ .select__arrow {
    border-top-color: #000;
  }
  .select select:disabled ~ .select__arrow {
    border-top-color: #ccc;
  }
  .btn-submit {
    background-color: #f29eae;
    color: white;
    cursor: pointer;
    height: 40px;
    width: 85px;
    font-size: 18px;
    border: 1px solid #f29eae;
    border-radius: 12px;
    font-weight: 600;
    margin-top: 23px;
  }
}
</style>
