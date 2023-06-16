<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <SearchBox @clicked="onSearchClicked">

    </SearchBox>
    <RecipePreviewList title="Searched Recipes" :endpoint="ednpointSearch" v-if="ednpointSearch"></RecipePreviewList>
    
  </div>
</template>

<script>
import SearchBox from "../components/SearchBox.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  
  name:"SearchPage",
  components:{
    SearchBox,
    RecipePreviewList,
    

  },
  data() {
    return {
      ednpointSearch: "",
    };
  },
  methods: {
    onSearchClicked(value){
        
        this.ednpointSearch = value
    },
  },


}
</script>

<style>

</style>