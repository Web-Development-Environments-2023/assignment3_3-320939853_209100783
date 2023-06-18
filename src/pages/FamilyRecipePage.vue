<template>
    <div id="family">
       <h1>Welcome to Family Recipes</h1>
       <RecipePreviewList
          id="FamilyList" 
          title="Family Recipes" 
          :endpoint="ednpointSearch"
          purpose="FAM"
          :data="data"
       ></RecipePreviewList>
   </div>
 </template>

 <script>
 import RecipePreviewList from "../components/RecipePreviewList.vue";
 
 export default {
   
    name:"FamilyRecipePage",
    components:{
        RecipePreviewList,
    },
 
    data() {
     return {
       ednpointSearch: "users/familyRecipes",
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