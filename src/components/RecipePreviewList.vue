<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-card-group columns class="columns">
        <b-card column style="flex: 0 0 70%;" v-for="r in recipes" :key="r.id">
          <RecipePreview :recipe="r" :data="data" />
        </b-card>
    </b-card-group>
    <b-button variant="outline-primary"
        style="width:100px;"
        class="mx-auto w-100"
        @click="updateRecipes"
        v-if="purpose === 'RANDOM'">Refresh Random Recipes</b-button>
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
    
  },
  data() {
    return {
      recipes: [],
    };
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
      console.log(recipe);
      // console.log(recipe.id);
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
    async updateRecipes() {
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
              this.recipes.push(elem)
            });
          } catch (error) {
            console.log(error);
        }
      }
      if(this.purpose == 'SIMPLE' || this.purpose == 'RANDOM'){
        try {
          const response = await this.axios.get(
            this.$root.store.store_state.server_domain + this.endpoint,
          );

          const recipes = response.data;
          this.recipes = [];
          recipes.forEach((elem) => {
            elem = this.addSourceToRecipe(elem,"API");
            elem = this.checkIfInFav(elem);
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
            + `${element}?src=Server`,);
            let dataElement = response.data;
            dataElement.isFav = true;
            dataElement = this.addSourceToRecipe(dataElement,"Server");
            respoces.push(dataElement);
          }

          for (let index = 0; index < apiIds.length; index++) {
            const element = apiIds[index];
            const response = await this.axios.get(
            this.$root.store.store_state.server_domain + this.endpoint
            + `${element}?src=API`,);
            let dataElement = response.data;
            dataElement.isFav = true;
            dataElement = this.addSourceToRecipe(dataElement,"API");
            respoces.push(dataElement);
          }

          this.recipes = respoces;

        } catch (error) {
          console.log(error);
        }

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
