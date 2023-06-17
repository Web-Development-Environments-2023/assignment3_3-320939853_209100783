<template>
  <div id="searchcont" class="container">
    <h1 class="title">Search Page</h1>
    <SearchBox @clicked="onSearchClicked"></SearchBox>
    <RecipePreviewList 
      id="searchList" 
      title="Searched Recipes" 
      :endpoint="ednpointSearch"
      purpose="SIMPLE"
      :data="data"
      v-if="ednpointSearch"
      ></RecipePreviewList>
    
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
        // this.ednpointSearch = "";
        this.ednpointSearch = value
    },
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
#searchList{
  widows: 100%;
  height: 100%;
  margin: auto;
}
#searchcont{
  width: 100%;
  height: 100%;
}
</style>