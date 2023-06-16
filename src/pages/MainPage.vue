<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" endpoint="recipes/randomrecipes?number=3"/>
    <router-link v-if="!$root.store.username" to="/login">You need to Login to vue this</router-link>
    <!-- <RecipePreviewList v-if="$root.store.username"
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
      endpoint="users/visitedRecipes?limit=3"
    ></RecipePreviewList> -->


    
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
// div#randomrecipes{
//   width: 10%;
//   height: 15%;
// }
</style>
