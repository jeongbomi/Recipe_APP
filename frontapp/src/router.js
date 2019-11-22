import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Loading",
      component: () => import("./components/Loading/Loading.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import("./components/auth/Login.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/Main",
      name: "MainHomePage",
      component: () => import("./components/MainHomePage.vue"),
      meta: { transition: "fade" }
    },
    {
      path: "/Main/Loading",
      name: "Ref",
      component: () => import("./components/Ref.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: () => import("./components/auth/SignUp.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/Menu",
      name: "Menu",
      component: () => import("./components/Menu.vue"),
      meta: { transition: "fade-in-left" }
    },
    {
      path: "/Profile",
      name: "Profile",
      component: () => import("./components/Profile/Profile.vue"),
      meta: { transition: "fade-in-right" }
    },
    {
      path: "/PasswordChange",
      name: "PasswordChange",
      component: () => import("./components/auth/PWchangePage.vue"),
      meta: { transition: "fade" }
    },
    {
      path: "/recipe/Create",
      name: "RecipeCreate",
      component: () => import("./views/recipeCreatePage.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/recipe/ShowAll",
      name: "RecipeShowAll",
      component: () => import("./components/recipeShowAllPage.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/recipe/:recipe_id",
      name: "RecipeShowOne",
      component: () => import("./components/recipeShowOnePage.vue"),
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (JSON.parse(sessionStorage.getItem("userinfo"))) {
    if (to.name === "SignUp" || to.name === "Login" || to.name === "Loading") {
      return next("/Main");
    } else {
      return next();
    }
  } else {
    if (to.name === "SignUp" || to.name === "Login" || to.name === "Loading") {
      return next();
    } else {
      return next("/");
    }
  }
});

export default router;
