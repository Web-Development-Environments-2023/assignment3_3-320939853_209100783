<template>
  <div id="fullRecpie">
   <h1>{{this.recipe.name}}</h1>
  </div>
</template>

<script>
export default {
   name: "SeachRecipeList",
   components:{
      
   },
   data() {
      return {
  
      }
   },
   props:{
      recipe: {
         type: Object,
         required: true,
      }

   }

}
</script>

<style>

</style>