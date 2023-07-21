<template>
    <b-form >
      <b-form-group
        id="input-group-DishNameid"
        label-cols-sm="3"
        label="Dish Name:"
        label-for="DishNameid"
      >
        <b-form-input
          id="DishNameid"
          v-model="dish_choocie"
          type="text"
          placeholder="Enter Dish Name"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-cuisine"
        label-cols-sm="3"
        label="Cuisine:"
        label-for="cuisine">
        <b-form-select
          id="cuisine"
          :options="cousinines"
          v-model="cusinies_chooice">
        </b-form-select>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>
 
      <b-form-group
        id="input-group-diet"
        label-cols-sm="3"
        label="diet:"
        label-for="diet">
        <b-form-select
          id="diet"
          :options="diets"
          v-model="diet_chooice"
        >
        </b-form-select>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-intolerances"
        label-cols-sm="3"
        label="intolerances:"
        label-for="intolerances">
        <b-form-select
          id="intolerances"
          :options="intolerancess"
          v-model="intolerancess_choocie"
        >
        </b-form-select>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group> 

      <b-form-group
        id="input-group-numbersOptions"
        label-cols-sm="3"
        label="numbersOptions:"
        label-for="numbersOptions">
        <b-form-select
          id="numbersOptions"
          :options="numbersOptions.options"
          v-model="numbersOptionsSelected"
        >
        </b-form-select>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group> 
      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        @click="searchRecipe"
        >Search</b-button>
      
    </b-form>
</template>

<script>
import {couisine,diet,intolerances} from "../assets/consts.js"
export default {
   name: "SeachBox",
   data() {
      return {
        cousinines: couisine,
        cusinies_chooice: "",
        diets: diet,
        diet_chooice: "",
        intolerancess: intolerances,
        intolerancess_choocie: "",
        dish:"",
        dish_choocie: "",
        numbersOptionsSelected: 5,
        numbersOptions:{
          default:5,
          options:[{text:5,value:5},{text:10,value:10},{text:15,value:15}],
        }
      
      
    }
   },
   created() {
    if (localStorage.getItem("username")){
      let local = JSON.parse(sessionStorage.getItem('lastSearch')); 
      if (local){
        this.cusinies_chooice = local['cusinies_chooice']
        this.diet_chooice = local['diet_chooice']
        this.intolerancess_choocie = local['intolerancess_choocie']
        this.numbersOptionsSelected = local['numbersOptionsSelected']
        this.dish_choocie = local['dish_choocie']
      }
    }
   },
   methods: {
      async searchRecipe(){
         try {
            const url =  `recipes/searchrecipe/${this.dish_choocie}?cuisine=${this.cusinies_chooice}&diet=${this.diet_chooice}&intolerance=${this.intolerancess_choocie}&number=${this.numbersOptionsSelected}`;
            this.$emit('clicked', url);
            if (localStorage.getItem("username")){
              sessionStorage.setItem('lastSearch', JSON.stringify({
                                                  cusinies_chooice:this.cusinies_chooice,
                                                  diet_chooice:this.diet_chooice,
                                                  intolerancess_choocie:this.intolerancess_choocie,
                                                  dish_choocie:this.dish_choocie,
                                                  numbersOptionsSelected:this.numbersOptionsSelected
                                                  }))
              }
         } catch (error) {
            console.log(error);
         }
      }
      
   },

}
</script>

<style>

</style>