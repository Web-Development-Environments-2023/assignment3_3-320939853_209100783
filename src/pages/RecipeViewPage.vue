<template>
  <div class="container">
    <div v-if="recipe">
        <b-container  class="imageContainer">
          <b-card>
            <b-card-header class="centeritem" >
              <h1>{{ recipe.name }}</h1>
            </b-card-header>
            <b-card-img :src="recipe.image" class="center" img-alt="Card image" ></b-card-img>
            <b-card-footer class="centeritem">
              Ready in {{ recipe.Time }} minutes<br>
              <ul class="list-unstyled">

              <li v-if="recipe.portions">{{ recipe.portions }} Portions</li>
              <li v-else>Unknown Portions</li>

              <li v-if="recipe.Likes">Likes : {{ recipe.Likes }}</li>
              <li v-else>Unknown Likes</li>
              
              <li v-if="recipe.isVegan" class="list-item-with-image">
                <img src="../assets/Veg-logo.png" alt="Image" style="width: 30px; height: 30px;">
                Vegan
              </li>
              <li v-else class="list-item-with-image">
                <img src="../assets/non-Vegan-logo.png" alt="Image" style="width: 30px; height: 30px;"> Not Vegan
              </li>

              <li v-if="recipe.isVeget" class="list-item-with-image">
                <img src="../assets/veget-logo.png" alt="Image" style="width: 30px; height: 30px;">
                Veget
              </li>
              <li v-else class="list-item-with-image">
                <img src="../assets/non-veget-logo.png" alt="Image" style="width: 30px; height: 30px;">
                Not Veget
              </li>

              <li v-if="recipe.isGfree" class="list-item-with-image">
                <img src="../assets/G-FREE.jpg" alt="Image" style="width: 30px; height: 30px;">
                Gluten free
              </li>
              <li v-else class="list-item-with-image">
                <img src="../assets/NON-G-FREE.jpg" alt="Image" style="width: 30px; height: 30px;">
                Not-Gluten free
              </li>
            </ul>
            </b-card-footer>
          </b-card>
        </b-container>
      <div class="recipe-body">
        <div class="wrapper">
          <b-card class="wrapped">
            Ingredients:
            <b-list-group class="list">
              <b-list-group-item variant="primary" href="#" class="listitem"
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
              {{ r.ingredient }} amount {{ r.amount }} type {{ r.type}}
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <b-card class="wrapped">
            Instructions:
            <b-list-group class="list">
              <b-list-group-item v-for="(s, indexx) in recipe.steps" :key="s.stepNumber" variant="primary" href="#"  class="listitem"> 
                {{indexx+1}}&#41;	&#9;{{ s.stepDesc }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      endpoint:"recipes/getrecipe/",
    };
  },
  async created() {
    try {
      console.log("hello from page ")
      let response;
      // response = this.$route.params.response;
      if (localStorage.getItem('username')){
      let r = await this.axios.post(
          this.$root.store.store_state.server_domain+ "users/visitRecipe/" ,
          {
              recipeId:this.$route.params.recipeId,
              source:this.$route.params.src
          });
        console.log(r.data);
      }
      try {
        response = await this.axios.get(
          this.$root.store.store_state.server_domain+ this.endpoint + 
          `${this.$route.params.recipeId}`+`?src=${this.$route.params.src}`
          
        );
        let _recipe = response.data
        this.recipe = _recipe;

        // console.log("response.status", response.status);
        if (response.status !== 200) 
          this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }



    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
  margin: 2%;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  /* transition: box-shadow 0.3s ease; */
}
.wrapped:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); /* Increased blur radius for the shadow */
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 2%;
}
.list{
  padding: 2%;
}
.listitem:hover{
   transform: scale(1.05);
   background-color: antiquewhite;
}

.listitem{
  transition: transform 0.3s ease;
}
.imageContainer{
  margin: 2%;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  height: 20%;
}
.centeritem{
  text-align: center;
  margin-top: 1% ;
  margin-bottom: 1%;

}
.container{
  width: 90%;
  height: 100%;
}
/* .recipe-header{

} */
</style>
