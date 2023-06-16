<template>
  <div id="app">
    <HeaderBar id="header"></HeaderBar>
    <router-view></router-view>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import HeaderBar from "../src/components/NavBar.vue";
import FooterBar from "../src/components/FooterBar.vue";

export default {
  name: "App",
  components:{
    HeaderBar,
    FooterBar,
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app{
  width: 100%;
  height: 95%;
  margin: auto;
  padding: 10px;
}

#header a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
  

}
#footer {
  position: fixed;
  bottom: 0;
}
</style>
