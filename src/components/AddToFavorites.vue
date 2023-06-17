<template>
   <div id="addtofav">
      <b-button variant="outline-danger" v-if="recipe.isFav" @click="removeFromFavorites()">Remove from Favorites</b-button>
      <b-button variant="outline-success" v-else @click="addToFavorits()">Add to Favorites</b-button>
   </div>
</template>

<script>
export default {
   name: "FavoritesBTN",
   data() {
      return {
      }
   },
   methods: {
      async addToFavorits(){
      
         this.recipe.isFav = true;
         
         console.log("ABBABABABABBABAB\n");
         console.log(this.recipe);
         const response = await this.axios.post(this.$root.store.store_state.server_domain+`users/addFavorite`,
         {
            source: this.recipe.source,
            recipeId: this.recipe.id,
         });
         const responsev = await this.axios.get(
         this.$root.store.store_state.server_domain +`users/favoriterecipes/${this.$root.store.userId}`,);
         this.data.userFavorites = responsev.data;
         this.$forceUpdate();

      },
      async removeFromFavorites(){
         this.recipe.isFav = false;
         
         const response = await this.axios.delete(this.$root.store.store_state.server_domain+`users/removeFavoriteRecipe`,
         {
            data:{
               user_id: this.$root.store.userId,
               recipeId: this.recipe.id,
            }
         });
         const responsev = await this.axios.get(
          this.$root.store.store_state.server_domain +`users/favoriterecipes/${this.$root.store.userId}`,
         );
         this.data.userFavorites = responsev.data;
         this.$forceUpdate();
      },
      isFavorite(){}
   },
   props: {
      recipe: {
         type: Object,
         required: true,
      },
      data: {
         type: Object,
         required: true,
      },

   },

}
</script>

<style>

</style>