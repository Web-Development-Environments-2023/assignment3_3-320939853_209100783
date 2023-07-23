<template>
   <div id="favorites">
      <RecipePreviewList
         id="favoritesList" 
         title="Favorites Recipes" 
         :endpoint="ednpointSearch"
         purpose="FAV"
         :data="data"
      ></RecipePreviewList>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  
   name:"FavoritesPage",
   components:{
       RecipePreviewList,
    
   },

   data() {
    return {
      ednpointSearch: "recipes/getrecipe/",
      };
   },
   methods: {
   
   },
   props:{
      data: {
         type: Object,
         required: true
      },
   }


}
</script>

<style>

</style>