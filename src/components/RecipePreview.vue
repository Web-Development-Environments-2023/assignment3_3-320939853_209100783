<template>
  <div id="previewitem">
   
            
        <b-card v-if="!isWached"  
          :title="recipe.name"
          :img-src="recipe.image"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 enlarge-on-hover"
          border-variant="primary">
           <router-link
              :to="{ name: 'recipe', params: { recipeId: recipe.id ,src: recipe.source} }"
              class="recipe-preview">
          <b-card-text>
            <ul class="recipe-overview">
              <li v-if="recipe.creator">{{ recipe.creator }}</li>
              <!-- <li v-else>Unkown Time</li> -->

              <li v-if="recipe.When">{{ recipe.When }}</li>
              <!-- <li v-else>Unkown Time</li> -->

              <!-- LAST ONE - NOT NECESSARY  -->
              <!-- <li v-if="recipe.origin">{{ recipe.origin }}</li> -->
              <!-- <li v-else>Unkown Time</li> -->



              <li v-if="recipe.Time">{{ recipe.Time }} minutes</li>
              <li v-else>Unkown Time</li>

              <li v-if="recipe.portions">{{ recipe.portions }} likes</li>
              <li v-else>Unkown Portions</li>

              <li v-if="recipe.isVegan" class="list-item-with-image">Vegan
                <img src="../assets/Veg-logo.png" alt="Image">
              </li>
              <li v-else class="list-item-with-image">Non Vegan
                  <img src="../assets/non-Vegan-logo.png" alt="Image" >
              </li>

              <li v-if="recipe.isGfree" class="list-item-with-image">Gluten free
                <img src="../assets/G-FREE.jpg" alt="Image" >
              </li>
              <li v-else class="list-item-with-image">Not-Gluten free
                <img src="../assets/NON-G-FREE.jpg" alt="Image" >
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
        <b-card v-else
        :title="recipe.name"
        :img-src="recipe.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 enlarge-on-hover"
        border-variant="dark">
         <router-link
              :to="{ name: 'recipe', params: { recipeId: recipe.id ,src: recipe.source} }"
              class="recipe-preview">
          <b-card-text>
            <ul class="recipe-overview">

              <li v-if="recipe.Time">{{ recipe.Time }} minutes</li>
              <li v-else>Unkown Time</li>

              <li v-if="recipe.portions">{{ recipe.portions }} likes</li>
              <li v-else>Unkown Portions</li>

              <li v-if="recipe.isVegan" class="list-item-with-image">Vegan
                <img src="../assets/Veg-logo.png" alt="Image">
              </li>
              <li v-else class="list-item-with-image">Non Vegan
                  <img src="../assets/non-Vegan-logo.png" alt="Image" >
              </li>

              <li v-if="recipe.isGfree" class="list-item-with-image">Gluten free
                <img src="../assets/G-FREE.jpg" alt="Image" >
              </li>
              <li v-else class="list-item-with-image">Not-Gluten free
                <img src="../assets/NON-G-FREE.jpg" alt="Image" >
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
  mounted() {
    this.isWached = this.getIsWached();
  },
  data() {
    return {
      image_load: false,
      isFav:false,
      isWached:false,
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
    getIsWached(){
      /** @TODO Implement this part */
      return false;
    },
  },
  computed:{
   

  },
    // eitan melech
    // hh

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  
};
</script>

<style scoped>
.enlarge-on-hover {
      transition: transform 0.3s; /* Add smooth transition effect */
}
.enlarge-on-hover:hover {
      transform: scale(1.07); /* Increase the size by 20% */
}
.list-item-with-image {
    list-style-type: none; /* Remove default list item bullet */
    display: flex; /* Use flexbox to align items horizontally */
    align-items: left; /* Center align items vertically */
  }
.list-item-with-image img {
    margin-right: 10px; /* Add some spacing between the image and text */
    margin-left: 10px;
    height: 20px; /* Adjust the height of the image as needed */
  }
/* .recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body  {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
} */
</style>
