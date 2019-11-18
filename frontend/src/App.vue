<template>
  <div id="app" v-if="ismobile()">
    <Navbar v-show="!['Loading', 'Login', 'Ref', 'SignUp'].includes($route.name)" />
    <vue-page-transition v-if="!data" name="fade-in-right">
      <router-view />
    </vue-page-transition>
    <vue-page-transition v-else>
      <router-view />
    </vue-page-transition>
  </div>
  <div v-else>
    <!-- <h1 style="text-align:center">모바일로 접속해주시기 바랍니다.</h1> -->
    <Navbar v-show="!['Loading', 'Login', 'Ref', 'SignUp'].includes($route.name)" />
    <vue-page-transition v-if="!data" name="fade-in-right">
      <router-view />
    </vue-page-transition>
    <vue-page-transition v-else>
      <router-view />
    </vue-page-transition>
  </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar";

export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    ismobile() {
      if (
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.data = JSON.parse(sessionStorage.getItem("userinfo"));
  }
};
</script>

<style>
html {
  min-height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}
body {
  margin: 0;
  min-height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
