<template>
  <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="info" class="bg-dark font-weight-bold">

        <b-navbar-brand tag="h1" class="mx-4 my-auto">
          <router-link :to="{ name: 'main' }">Home</router-link>
        </b-navbar-brand>

        <b-navbar-nav class="mx-4 my-auto">
          <b-nav-text>
            <router-link :to="{ name: 'search' }" class="text-success">Search</router-link>
          </b-nav-text>
        </b-navbar-nav>

        <b-collapse v-if="!$root.store.username" is-nav>

          <b-navbar-nav class="ml-auto my-auto mr-4">
            <b-nav-text>
              Guest
            </b-nav-text>
          </b-navbar-nav>

          <b-navbar-nav class="mx-4 my-auto">
            <b-nav-text>
              <router-link :to="{ name: 'register' }" class="text-success">Register</router-link>
            </b-nav-text>
          </b-navbar-nav>

          <b-navbar-nav class="mx-4 my-auto">
            <b-nav-text>
              <router-link :to="{ name: 'login' }" class="text-success">Login</router-link>
            </b-nav-text>
          </b-navbar-nav>
          
        </b-collapse>

       
        <b-collapse v-else is-nav>

          <b-navbar-nav class="ml-auto my-auto">
            <b-nav-text class="text-success">
              Hello {{$root.store.username}}
            </b-nav-text>
          </b-navbar-nav>

          <b-navbar-nav class="mx-4 my-auto">
            <b-nav-text>
              <router-link :to="{ name: 'favorites' }" class="text-success">Favorites</router-link>
            </b-nav-text>
          </b-navbar-nav>

          <b-navbar-nav class="mx-4 my-auto">
            <b-nav-text>
                <b-button variant="success" @click="Logout">Logout</b-button>
            </b-nav-text>
          </b-navbar-nav>

          <b-dropdown id="dropdown-1" text="Personal Area" class="m-md-2">
            <b-dropdown-item :to="{ name: 'favorites' }" class="text-success">Favorite Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'family' }" class="text-success">Family Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'personal' }" class="text-success">Personal Recipes</b-dropdown-item>
          </b-dropdown>
         

        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
export default {
   name: "NavBar",
   data() {
      return {
         
      }
   },
   methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  },
}
</script>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
  

}
</style>