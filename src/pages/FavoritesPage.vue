<template>
   <div id="favorites">
      <h1>Hello Favorites</h1>
      <RecipePreviewList></RecipePreviewList>
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
      ednpointSearch: "",
      };
   },
   mounted() {
      this.getFavorites();
   },
   methods: {
    getFavorites(){
      
    }
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