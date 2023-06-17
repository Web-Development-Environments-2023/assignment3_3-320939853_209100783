<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-card-group deck class="deck">
        <b-card deck v-for="r in recipes" :key="r.id">
          <RecipePreview :recipe="r" />
        </b-card>
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
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.endpoints = this.endpoint;
    this.updateRecipes();
  },
  // updated() {
  //   // this.updateRecipes();
  // },
  methods: {
    async updateRecipes() {
      if(this.purpose == 'SIMPLE'){
        try {
          const response = await this.axios.get(
            this.$root.store.store_state.server_domain + this.endpoint,
          );

          const recipes = response.data;
          this.recipes = [];
          recipes.forEach((elem) => this.recipes.push(elem));
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
            respoces.push(response);
          }

          for (let index = 0; index < apiIds.length; index++) {
            const element = apiIds[index];
            const response = await this.axios.get(
            this.$root.store.store_state.server_domain + this.endpoint
            + `${element}?src=API`,);
            respoces.push(response);
          }

          this.recipes = respoces;

        } catch (error) {
          console.log(error);
        }

      }
    }
  },

};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.deck{
  width: 100%;
  height: 100%;
}
</style>
