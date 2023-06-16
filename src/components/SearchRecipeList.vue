<template>
   <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
   name: "SeachRecipeList",
   components:{
      RecipePreview
   },
   data() {
      return {
         title: "Search Results",
         counter: 1,
      }
   },
   props:{
      recipes: {
         type:Array,
         required:true,
      }

   }


}
</script>

<style>

</style>