import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { login: true },
    component: () => import("../views/Home.vue")
  },
  {
    path: "/user/login",
    name: "login",
    meta: { guess: true },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/user/signup",
    name: "signup",
    meta: { guess: true },
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/reservation",
    name: "reservation",
    meta: { login: true },
    component: () => import("../views/Reservation.vue")
  },
  {
    path: "/profile",
    name: "profile",
    meta: { login: true },
    component: () => import("../views/Profile.vue")
  },
  {
    path: "/promotion",
    name: "promotion",
    meta: { login: true },
    component: () => import("../views/Promotion.vue")
  },
  {
    path: "/promotionAdmin",
    name: "adminpromotion",
    meta: { login: true },
    component: () => import("../views/AdminPromotion.vue")
  },
  {
    path: "/menuAdmin",
    name: "adminmenu",
    meta: { login: true },
    component: () => import("../views/AdminMenu.vue")
  },
  {
    path: "/menuAdmin/addCourse",
    name: "addcourse",
    meta: { login: true },
    component: () => import("../views/AddCourse.vue")
  },
  {
    path: "/homeAdmin",
    name: "adminhome",
    meta: { login: true },
    component: () => import("../views/AdminHome.vue")
  },  
  {
    path: "/reservestatus",
    name: "reservestatus",
    meta: { login: true },
    component: () => import("../views/ReserveStatus.vue")
  },
  {
    path: "/detailrestaurant/:id",
    name: "detailrestaurant",
    meta: { login: true },
    component: () => import("../views/DetailRestaurant.vue")
  },
];
const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("email") != null && localStorage.getItem("password") != null;

  if (to.meta.login && !isLoggedIn) {
    console.log(!isLoggedIn)
    alert("Please login first!");
    next({ path: "/user/login" });
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in");
    next({ path: "/" });
  }

  next();
});

export default router;
