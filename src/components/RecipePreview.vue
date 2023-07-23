<template>
  <div id="previewitem">
    <b-card
      v-if="!checkIfViewd"
      :title="recipe.name"
      :img-src="recipe.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2 enlarge-on-hover"
      border-variant="primary"
    >
      <router-link
        :to="{
          name: 'recipe',
          params: { recipeId: recipe.id, src: recipe.source },
        }"
        class="recipe-preview"
      >
        <b-card-text>
          <ul class="recipe-overview">
            <li v-if="recipe.Time">Ready In {{ recipe.Time }} minutes</li>
            <li v-else>Unkown Time</li>

            <li v-if="recipe.Likes">{{ recipe.Likes }} likes</li>
            <li v-else>Unkown Likes</li>

            <li v-if="recipe.portions">{{ recipe.portions }} Portions</li>
            <li v-else>Unkown Portions</li>

            <li v-if="recipe.isVegan" class="list-item-with-image">
              Vegan
              <img src="../assets/Veg-logo.png" alt="Image" />
            </li>
            <li v-else class="list-item-with-image">
              Non Vegan
              <img src="../assets/non-Vegan-logo.png" alt="Image" />
            </li>

            <li v-if="recipe.isVeget" class="list-item-with-image">
              Veget
              <img src="../assets/veget-logo.png" alt="Image" />
            </li>
            <li v-else class="list-item-with-image">
              Non Veget
              <img src="../assets/non-veget-logo.png" alt="Image" />
            </li>

            <li v-if="recipe.isGfree" class="list-item-with-image">
              Gluten free
              <img src="../assets/G-FREE.jpg" alt="Image" />
            </li>
            <li v-else class="list-item-with-image">
              Not-Gluten free
              <img src="../assets/NON-G-FREE.jpg" alt="Image" />
            </li>
          </ul>
        </b-card-text>
      </router-link>
      <AddToFavoritesBtn
        :recipe="recipe"
        :data="data"
        v-if="this.$root.store.username"
      ></AddToFavoritesBtn>
    </b-card>
    <b-card
      v-else
      :title="recipe.name"
      :img-src="recipe.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem; color: rgb(139, 22, 139);"
      class="mb-2 enlarge-on-hover"
      border-variant="dark"
    >
      <router-link
        :to="{
          name: 'recipe',
          params: { recipeId: recipe.id, src: recipe.source },
        }"
        class="recipe-preview"
      >
        <b-card-text>
          <ul class="recipe-overview">
            <li v-if="recipe.Time">{{ recipe.Time }} minutes</li>
            <li v-else>Unkown Time</li>

            <li v-if="recipe.portions">{{ recipe.portions }} Portions</li>
            <li v-else>Unkown Portions</li>

            <li v-if="recipe.isVegan" class="list-item-with-image">
              Vegan
              <img src="../assets/Veg-logo.png" alt="Image" />
            </li>
            <li v-else class="list-item-with-image">
              Non Vegan
              <img src="../assets/non-Vegan-logo.png" alt="Image" />
            </li>

            <li v-if="recipe.isVeget" class="list-item-with-image">
              Veget
              <img src="../assets/veget-logo.png" alt="Image" />
            </li>
            <li v-else class="list-item-with-image">
              Non Veget
              <img src="../assets/non-veget-logo.png" alt="Image" />
            </li>

            <li v-if="recipe.isGfree" class="list-item-with-image">
              Gluten free
              <img src="../assets/G-FREE.jpg" alt="Image" />
            </li>
            <li v-else class="list-item-with-image">
              Not-Gluten free
              <img src="../assets/NON-G-FREE.jpg" alt="Image" />
            </li>
          </ul>
        </b-card-text>
        <AddToFavoritesBtn
          :recipe="recipe"
          :data="data"
          v-if="this.$root.store.username"
        ></AddToFavoritesBtn>
      </router-link>
    </b-card>
  </div>
</template>

<script>
import AddToFavoritesBtn from "./AddToFavorites.vue";

export default {
  components:{
    AddToFavoritesBtn,
  },
  data() {
    return {
      image_load: false,
      isFav:false,
      lastvisited: [],
    };
  },
 
  props: {
    recipe: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToFavorits(){
      /**@TODO Implement this part */
    },
    getIsFavorits(){
      /**@TODO Implement this part */
      return false;
    },
    
  },

  computed:{
     checkIfViewd(){
      if(localStorage.getItem('username')){
            return this.recipe.isVisited
      }
        return false;


    },
  }
}
</script>

<style scoped>
.enlarge-on-hover {
  transition: transform 0.3s; /* Add smooth transition effect */
}
.enlarge-on-hover:hover {
  transform: scale(1.07); /* Increase the size by 20% */
}
.list-item-with-image {
  align-items: left; /* Center align items vertically */
}
.list-item-with-image img {
  margin-right: 10px; /* Add some spacing between the image and text */
  margin-left: 10px;
  height: 20px; /* Adjust the height of the image as needed */
}
</style>
