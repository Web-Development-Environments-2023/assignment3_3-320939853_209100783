<template>
  <div id="searchcont" class="container">
    <h1 class="title">Search Page</h1>
    <SearchBox @clicked="onSearchClicked"></SearchBox>
    <SortItems @sortItemsBy="handleSorting"></SortItems>
    <RecipePreviewList 
      id="searchList" 
      title="Searched Recipes" 
      :endpoint="ednpointSearch"
      purpose="SIMPLE"
      :data="data"
      :sortBy="sortBy"
      v-if="ednpointSearch"
    >
    </RecipePreviewList>
    <LastVisitedVue :data="data"></LastVisitedVue>
    
  </div>
</template>

<script>
import SearchBox from "../components/SearchBox.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import SortItems from "../components/SortItems.vue"
import LastVisitedVue from './LastVisited.vue';
export default {
  
  name:"SearchPage",
  components:{
    SearchBox,
    RecipePreviewList,
    SortItems,
    LastVisitedVue,
    

  },
  data() {
    return {
      ednpointSearch: "",
      flag: true,
      sortBy:"time"
    };
  },
 
  methods: {
    handleSorting(atterBy){
      this.sortBy = atterBy;
    },
    onSearchClicked(value){
        this.ednpointSearch = value;
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