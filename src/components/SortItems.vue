<template>
  <div id="sorter">
   <b-form-group label="Using options array:">
      <b-form-radio-group
        id="checkbox-group-1"
        v-model="selected"
        :options="options"
        name="flavour-1"
        @change="handleInput"
      >
      </b-form-radio-group>
   </b-form-group>
  </div>
</template>

<script>
import { emit } from 'process'
export default {
   data() {
      return {
         selected: 'time', // Must be an array reference!
         options: [
          { text: 'Time', value: 'time'},
          { text: 'Popularity', value: 'popularity'},
         ]
      }
   },
   methods: {
      handleInput(check){
         this.$emit("sortItemsBy",check);
      },
   },

}
</script>

<style>

</style>