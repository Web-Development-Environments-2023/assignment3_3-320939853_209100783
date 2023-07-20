<template>
  <div id="lastvisited">
   <RecipeViewList
      id="LastVisited" 
      title="LastVisited" 
      :endpoint="endpoint"
      purpose="LASTVISITED"
      :data="data"
   ></RecipeViewList>
  </div>
</template>

<script>
import RecipeViewList from '../components/RecipePreviewList.vue'
export default {
      name:"LastVisited",
      components:{
         RecipeViewList,

   },
   data() {
      return {
         endpoint: "users/visitedRecipes"
      }
   },
   props: {
      data: {
      type: Object,
      required : true,
      },
   },
}
</script>

<style>

</style>