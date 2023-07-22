<template>
  <div class="main-page">
    <div class="left-column">
      <div class="recipe-list">
        <RecipePreviewList
          title="Random Recipes"
          class="RandomRecipes center"
          endpoint="recipes/randomrecipes?number=3"
          purpose="RANDOM"
          :data="data"
        ></RecipePreviewList>
      </div>
    </div>
    <div class="right-column">
      <div v-if="!$root.store.username">
        <LoginPage :data="data"></LoginPage>
      </div>
      <div v-else>
        <LastVisitedVue :data="data"></LastVisitedVue>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";
import LastVisitedVue from "./LastVisited.vue";
export default {
  components: {
    RecipePreviewList,
    LoginPage,
    LastVisitedVue,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
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
.main-page {
  display: flex;
  padding: 0 20px;
  /* Add padding to the sides */
}

.left-column {
  flex: 1;
  margin-right: 20px;
}

.right-column {
  flex: 1;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
