<template>
  <div class="recipe-create">
    <h2>레시피 작성</h2>
    <div>
      <input v-model="name" type="text" placeholder="요리 이름" />
    </div>
    <br />
    <div v-for="(info, index) in infos" v-bind:key="index">
      <div class="inputForm">
        <label for="fileInput">STEP {{ index + 1}}</label>
        <i class="fas fa-times-circle" @click="deleteInfo(index)"></i>
        <hr />
        <div class="imageBox">
          <label v-bind:for="index">
            <img v-bind:src="info.file" alt />
          </label>
          <input type="file" v-bind:id="index" accept="image/*" @change="imageChange(info, $event)" />
        </div>
        <textarea v-model="info.content" placeholder="조리 과정에관한 설명을 적어주세요." />
      </div>
      <i class="fas fa-plus-circle" @click="addNewInfo(index)"></i>
    </div>
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
      category: "",
      cal: "",
      qnt: ""
    };
  },
  methods: {
    async submit() {
      await axios
        .post("http://54.180.151.135:3000/api/recipe/create", {
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
    },
    deleteInfo(index) {
      this.infos.splice(index, 1);
      if (this.infos.length == 0) {
        this.infos.push({
          content: "",
          file: require("@/assets/uploadImage.png")
        });
      }
    },
    filecheck() {},
    async imageChange(info, event) {
      var img = event.target.files[0];
      console.log(img);

      // await axios
      //   .post("http://54.180.151.135:3000/api/image/create", image)
      //   .then(response => console.log(response))
      //   .catch(error => console.log(error));
      // info.file = URL.createObjectURL(event.target.files[0]);
      // console.log(info.file);
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
  margin-top: 80px;
  margin-bottom: 81px;
  .inputForm {
    margin: 3px;
    border: solid 1px black;
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
    color: #999;
  }
  i:active {
    color: #ed2894;
  }
  input,
  textarea {
    width: 90%;
  }
  textarea {
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
}
</style>
