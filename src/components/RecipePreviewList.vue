<template>
  <b-container>
    <h3>
      {{ title }}:
      <b-button variant="info"
        @click="updateRecipes"
        v-if="purpose === 'RANDOM'">Refresh Random Recipes</b-button>
      <slot></slot>
    </h3>
    <b-card-group deck class="deck" :key="getRecipesLen">
        
        <div deck v-for="r in sortedArray" :key="r.id" >
          <RecipePreview :recipe="r" :data="data"></RecipePreview>
        </div>
        
        <div v-if="getRecipesLen" :key="getRecipesLen">
           <b-card>
            <b-card-text>
              No Result Has been found yet
            </b-card-text>
            
          </b-card>
        </div>
    </b-card-group>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    endpoint:{
      type: String,
      required: true,
    },
    purpose:{
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required : true,
    },
    sortBy: {
      type: String,
      required: false,
      default: "time"
    }
    
  },
  data() {
    return {
      recipes: [],
    };
  },
  
  computed:{
    sortedArray() {
      if (this.sortBy == "time"){
        return [...this.recipes].sort((a, b) => a.Time - b.Time);
        }
      else
        return [...this.recipes].sort((a, b) => a.Likes - b.Likes);
    },
    getRecipesLen(){
      return this.recipes.length == 0;
    },
  
  },
  methods: {
    addSourceToRecipe(recpie,source){
      recpie.source = source;
      return recpie;
    },
    checkIfInFav(recipe){
      if(!this.$root.store.username){
          let re = recipe;
          re.isFav = false;
          return re;
        }
      let recpiesServer = this.data.userFavorites.Server;
      let recpiesApi = this.data.userFavorites.API;
      recpiesServer.forEach((element)=>{
        
        if (element == recipe.id) {
            recipe.isFav = true;
            return recipe;
        }
      });
      recpiesApi.forEach((element)=>{
        if (element == recipe.id) {
            recipe.isFav = true;
            return recipe;
            
        }
      });
      let re = recipe;
      // re.isFav = false;
      return re;
    },
    checkIfInVisited(visitedList,recipe){
      let flag = false;
      visitedList.forEach((elem)=>{
        if (elem.recipe_id == recipe.id){
          flag  = true;
        }
      });
      return flag;
    },
    async updateRecipes() {
      let visited = await this.axios.get(this.$root.store.store_state.server_domain+"users/visitedRecipes?limit=-1",{ withCredentials: true });
      if(this.purpose == 'FAM')
      {
        try {
            let response = await this.axios.get(this.$root.store.store_state.server_domain + this.endpoint,);
            let recipes = response.data;
            this.data.userFamily = recipes.data;
            this.recipes = [];
            recipes.data.forEach((elem) => {
              elem = this.addSourceToRecipe(elem,"Server");
              elem = this.checkIfInFav(elem);
              elem.isVisited = this.checkIfInVisited(visited.data.visitedRecipes,elem);
              this.recipes.push(elem)
            });
          } catch (error) {
            console.log(error);
        }
      }
      if(this.purpose == 'SIMPLE' || this.purpose == 'RANDOM'){
        // if simple -> search then check if recipes are in the storage @eitag-uni
        
        try {
          const response = await this.axios.get(
            this.$root.store.store_state.server_domain + this.endpoint
          ,{ withCredentials: true });

          const recipes = response.data;
          this.recipes = [];
          recipes.forEach((elem) => {
            elem = this.addSourceToRecipe(elem,"API");
            elem = this.checkIfInFav(elem);
            elem.isVisited = this.checkIfInVisited(visited.data.visitedRecipes,elem);
            this.recipes.push(elem)
          });
         
          
        } catch (error) {
          console.log(error);
        }
      }
      else if(this.purpose == 'FAV'){
        try {
          let respoces = [];
          let serverIds = this.data.userFavorites.Server;
          let apiIds = this.data.userFavorites.API;
          for (let index = 0; index < serverIds.length; index++) {
            const element = serverIds[index];
            const response = await this.axios.get(
                                                    this.$root.store.store_state.server_domain + this.endpoint
                                                    + `${element}?src=Server`,{ withCredentials: true });
            let dataElement = response.data;
            dataElement.isFav = true;
            dataElement = this.addSourceToRecipe(dataElement,"Server");
            dataElement.isVisited = this.checkIfInVisited(visited.data.visitedRecipes,dataElement);
            respoces.push(dataElement);
          }

          for (let index = 0; index < apiIds.length; index++) {
            const element = apiIds[index];
            const response = await this.axios.get(
            this.$root.store.store_state.server_domain + this.endpoint
            + `${element}?src=API`,{ withCredentials: true });
            let dataElement = response.data;
            dataElement.isFav = true;
            dataElement = this.addSourceToRecipe(dataElement,"API");
            dataElement.isVisited = this.checkIfInVisited(visited.data.visitedRecipes,dataElement);

            respoces.push(dataElement);
          }
          
          this.recipes = respoces;
        } catch (error) {
          console.log(error);
        }

      }
      else if(this.purpose == 'LASTVISITED'){
        const response = await this.axios.get(
            this.$root.store.store_state.server_domain + this.endpoint
            + "?limit=3",{ withCredentials: true });
        let lists  = response.data.visitedRecipes
        let responseses  = []
        lists.API.forEach((elem) => {
              elem = this.addSourceToRecipe(elem,"API");
              elem = this.checkIfInFav(elem);
              elem.isVisited = this.checkIfInVisited(visited.data.visitedRecipes,elem);

              responseses.push(elem)
        });
        lists.Server.forEach((elem) => {
              elem = this.addSourceToRecipe(elem,"Server");
              elem = this.checkIfInFav(elem);
              elem.isVisited = this.checkIfInVisited(visited.data.visitedRecipes,elem);

              responseses.push(elem)
        })
        this.recipes = responseses;

      }
    }
  },
  watch: {
    endpoint: {
      immediate: true,
      handler() {
        this.updateRecipes();
      },
    },
    
  },

};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
