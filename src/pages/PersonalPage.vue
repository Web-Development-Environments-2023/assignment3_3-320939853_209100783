<template>
    <div id="personal">
       <RecipePreviewList
          id="PersonalList" 
          title="Personal Recipes" 
          :endpoint="ednpointSearch"
          purpose="FAM"
          :data="data"
       ></RecipePreviewList>
   </div>
 </template>

 <script>
 import RecipePreviewList from "../components/RecipePreviewList.vue";
 
 export default {
   
    name:"PersonalPage",
    components:{
        RecipePreviewList,
    },
 
    data() {
     return {
       ednpointSearch: "users/personalRecipes",
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