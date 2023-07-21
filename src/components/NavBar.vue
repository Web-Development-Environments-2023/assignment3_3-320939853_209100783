  <template>
  <div id="nav">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      class="bg-dark font-weight-bold"
    >
      <b-navbar-brand tag="h1" class="mx-4 my-auto">
        <router-link :to="{ name: 'main' }">Home</router-link>
      </b-navbar-brand>

      <b-navbar-nav class="mx-4 my-auto">
        <b-nav-text>
          <router-link :to="{ name: 'search' }" class="text-success"
            >Search</router-link
          >
        </b-nav-text>
      </b-navbar-nav>

      <b-collapse v-if="!$root.store.username" is-nav>
        <b-navbar-nav class="ml-auto my-auto mr-4">
          <b-nav-text> Guest </b-nav-text>
        </b-navbar-nav>

        <b-navbar-nav class="mx-4 my-auto">
          <b-nav-text>
            <router-link :to="{ name: 'register' }" class="text-success"
              >Register</router-link
            >
          </b-nav-text>
        </b-navbar-nav>

        <b-navbar-nav class="mx-4 my-auto">
          <b-nav-text>
            <router-link :to="{ name: 'login' }" class="text-success"
              >Login</router-link
            >
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>

      <b-collapse v-else is-nav>
        <b-navbar-nav class="ml-auto my-auto">
          <b-nav-text class="text-success">
            Hello {{ $root.store.username }}
          </b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-button @click="openModal">New Recipe</b-button>
          <b-modal
            id="RecipeModal"
            ok-only
            ok-title="Submit"
            @ok.prevent="CreateRecipe"
            @mouseout="Reset"
            v-model="modalShow"
          >
            <h2>Create New Recipe !</h2>

            <b-form-group
              id="recipename-group"
              label-cols-sm="3"
              label="Recipe Name:"
            >
              <b-form-input
                id="recipe_name"
                type="text"
                v-model="form.recipe_name"
                :state="validateState('recipe_name')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.recipe_name.required"
                >Recipe Name is required</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              id="recipeimage-group"
              label-cols-sm="3"
              label="Recipe Image:"
            >
              <b-form-file
                id="recipe_image"
                v-model="form.image"
                :state="Boolean(form.image)"
                placeholder="Choose a file or drop it here..."
              ></b-form-file>
              <!-- <b-form-invalid-feedback v-if="!$v.form.recipe_name.required">Recipe Name is required</b-form-invalid-feedback> -->
            </b-form-group>

            <b-form-group
              id="time-group"
              label-cols-sm="3"
              label="Preparation Time:(In Minutes)"
            >
              <b-form-input
                id="time"
                type="number"
                min="0"
                v-model="form.time"
                :state="validateState('time')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.time.required"
                >Preperation Time is required</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              id="portions_input"
              label="Portions:"
              label-cols-sm="3"
            >
              <b-form-input
                id="portions"
                type="number"
                min="0"
                max="10"
                v-model="form.portions"
                :state="validateState('portions')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.portions.required"
                >Portions is required</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Vegetarian:" label-cols-sm="3">
              <b-form-select
                id="veget_select"
                v-model="form.isVeget"
                :options="options"
                :state="validateState('isVeget')"
              ></b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.isVeget.required"
                >isVeget is required</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Vegan:" label-cols-sm="3">
              <b-form-select
                id="vegan_select"
                v-model="form.isVegan"
                :options="options"
                :state="validateState('isVegan')"
              ></b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.isVegan.required"
                >isVegan is required</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Gluten Free:" label-cols-sm="3">
              <b-form-select
                id="gluten_select"
                v-model="form.isGfree"
                :options="options"
                :state="validateState('isGfree')"
              ></b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.isGfree.required"
                >isGfree is required</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              id="likes_input"
              label="Likes:"
              label-cols-sm="3"
              :state="validateState('Likes')"
            >
              <b-form-input
                id="time"
                type="number"
                min="0"
                v-model="form.Likes"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="cuisine_input" label="Cuisine:" label-cols-sm="3">
              <b-form-select
                id="cuisine_selection"
                v-model="form.cuisine"
                :options="cuisine_options"
                :state="validateState('cuisine')"
              ></b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.cuisine.required"
                >cuisine is required</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              id="intolerances_input"
              label="Intolerance:"
              label-cols-sm="3"
            >
              <b-form-select
                id="Intolerances_selection"
                v-model="form.intolerance"
                :options="intolerances_options"
                :state="validateState('intolerance')"
              ></b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.intolerance.required"
                >intolerance is required</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              id="Ingredients_input"
              label="Ingredients:"
              label-cols-sm="3"
            >
              <b-form-input
                placeholder="ingredient name"
                id="ingredient-name"
                v-model="ingredientName"
              ></b-form-input>
              <b-form-input
                placeholder="ingredient amount"
                type="number"
                min="0"
                id="ingredient-amount"
                v-model="ingredientAmount"
              ></b-form-input>
              <b-form-input
                placeholder="amount type"
                id="ingredient-amount-type"
                v-model="ingredientType"
              ></b-form-input>
              <b-button @click="addIngredient">Add Ingredient</b-button>
            </b-form-group>

            <ul v-if="getIngridientsLength">
              <h4>Current Ingredients:</h4>
              <li v-for="(ingredient, index) in form.ingredients" :key="index">
                <div>
                  {{
                    ingredient.name +
                    "," +
                    ingredient.amount +
                    "" +
                    ingredient.type
                  }}
                  <b-button
                    @click="DeleteIngredient(index)"
                    size="sm"
                    class="ml-2"
                    >X</b-button
                  >
                </div>
              </li>
            </ul>
            <b-form-group id="Steps_input" label="Steps:" label-cols-sm="3">
              <b-form-input
                placeholder="Step Number"
                type="number"
                min="0"
                max="10"
                id="step_num"
                v-model="stepNumber"
              ></b-form-input>
              <b-form-input
                placeholder="Step Description"
                id="stepDesc"
                v-model="stepDesc"
              ></b-form-input>
              <b-button @click="addStep">Add Step</b-button>
            </b-form-group>
            <ul v-if="getStepsLength">
              <h4>Steps:</h4>
              <li v-for="(step, index) in form.steps" :key="index">
                <div>
                  {{ step.stepNumber + ":" + step.stepDesc }}
                  <b-button @click="DeleteStep(index)" size="sm" class="ml-2"
                    >X</b-button
                  >
                </div>
              </li>
            </ul>
          </b-modal>
        </b-navbar-nav>

        <b-navbar-nav class="mx-4 my-auto">
          <b-nav-text>
            <router-link :to="{ name: 'favorites' }" class="text-success"
              >Favorites</router-link
            >
          </b-nav-text>
        </b-navbar-nav>

        <b-navbar-nav class="mx-4 my-auto">
          <b-nav-text>
            <b-button variant="success" @click="Logout">Logout</b-button>
          </b-nav-text>
        </b-navbar-nav>

        <b-dropdown id="dropdown-1" text="Personal Area" class="m-md-2">
          <b-dropdown-item :to="{ name: 'favorites' }" class="text-success"
            >Favorite Recipes</b-dropdown-item
          >
          <b-dropdown-item :to="{ name: 'family' }" class="text-success"
            >Family Recipes</b-dropdown-item
          >
          <b-dropdown-item :to="{ name: 'personal' }" class="text-success"
            >Personal Recipes</b-dropdown-item
          >
        </b-dropdown>
      </b-collapse>
    </b-navbar>
  </div>
</template>

  <script>
import { couisine } from "../assets/consts.js";
import { intolerances } from "../assets/consts.js";
import { BButton, BModal } from "bootstrap-vue";
import { required } from "vuelidate/lib/validators";
const FormData = require("form-data");
export default {
  name: "NavBar",
  components: {
    BButton,
    BModal,
  },
  data() {
    return {
      modalShow: false,
      form: {
        recipe_name: "",
        time: "",
        Likes: 0,
        isVeget: "",
        isVegan: "",
        isGfree: "",
        portions: 0,
        image: "",
        intolerance: "",
        cuisine: "",
        ingredients: [],
        steps: [],
        submitError: undefined,
      },
      errors: [],
      options: [
        { value: "True", text: "Yes" },
        { value: "False", text: "No" },
      ],
      cuisine_options: couisine,
      intolerances_options: intolerances,
      ingredientName: "",
      ingredientAmount: "",
      ingredientType: "",
      stepNumber: "",
      stepDesc: "",
    };
  },
  validations: {
    form: {
      recipe_name: {
        required,
      },
      time: {
        required,
      },
      Likes: {
        required,
      },
      isVeget: {
        required,
      },
      isVegan: {
        required,
      },
      isGfree: {
        required,
      },
      portions: {
        required,
      },
      intolerance: {
        required,
      },
      cuisine: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    openModal() {
      this.Reset();
      this.modalShow = !this.modalShow;
    },
    addIngredient() {
      let Ingredient = {
        name: this.ingredientName,
        amount: this.ingredientAmount,
        type: this.ingredientType,
      };
      this.form.ingredients.push(Ingredient);
      this.ingredientName = "";
      this.ingredientAmount = "";
      this.ingredientType = "";
    },
    DeleteIngredient(index) {
      this.form.ingredients.splice(index, 1);
    },
    addStep() {
      let step = { stepNumber: this.stepNumber, stepDesc: this.stepDesc };
      this.form.steps.push(step);
      this.stepNumber = "";
      this.stepDesc = "";
    },
    DeleteStep(index) {
      this.form.steps.splice(index, 1);
    },
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    async CreateRecipe() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("HUY");
      try {
        const form = new FormData();
        form.append("image", this.form.image, "stickers.jpg");
        const image = await this.axios.post(
          this.$root.store.store_state.server_domain + "users/createRecipe/uploadimage",
          form
        );
        let imageName = image.data.imagePath
        const response = await this.axios.post(
          this.$root.store.store_state.server_domain + "users/createrecipe",
          {
            name: this.form.recipe_name,
            Time: this.form.time,
            Likes: this.form.Likes,
            isVegan: this.form.isVegan,
            isVeget: this.form.isVeget,
            isGfree: this.form.isGfree,
            portions: this.form.portions,
            intolerances: this.form.intolerance,
            cuisine: this.form.cuisine,
            ingredients: this.form.ingredients,
            steps: this.form.steps,
            image: imageName,
            endpoint: this.$root.store.store_state.server_domain,
          }
          //Move to recipe page
        );
        this.Reset();
        let recipeId = response.data.recipeid;
        this.$router.push({
          name: "recipe",
          params: { recipeId: recipeId, src: "Server" },
        });
        // this.$bvModal.hide('RecipeModal');
      } catch (err) {
        console.log(err);
        this.form.submitError = err.response.data.message;
      }
    },
    Reset() {
      this.form = {
        recipe_name: "",
        time: "",
        Likes: 0,
        isVeget: "",
        isVegan: "",
        isGfree: "",
        portions: "",
        image: "",
        intolerance: "",
        cuisine: "",
        ingredients: [],
        steps: [],
      };
      this.ingredientName = "";
      this.ingredientAmount = "";
      this.ingredientType = "";
      this.stepNumber = "";
      this.stepDesc = "";
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
  computed: {
    getStepsLength() {
      return this.form.steps.length > 0;
    },
    getIngridientsLength() {
      return this.form.ingredients.length > 0;
    },
  },
};
</script>

  <style>
#nav a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
  padding: 100%;
}
</style>