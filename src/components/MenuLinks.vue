<template>
  <div class="mt-3">
    <a
      href="#"
      class="api-link pl-2 text-muted"
      title="Toggle Row #s"
      @click="showRows=!showRows">
      <font-awesome-icon
        icon="eye-slash"
        v-if="showRows"/>
        <font-awesome-icon
          icon="eye"
          v-if="!showRows"/>
        Rows
    </a>
    <a
      :href="customerPackagesAPI"
      target="_blank"
      class="api-link pl-2 pr-2 text-muted"
      title="Visit the API on AWS">
      <font-awesome-icon
        class=""
        icon="link" />
        API
    </a>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  export default {
    name: 'menu-links',
    props: ['customerPackagesAPI'],
    data: function() {
      return {
        showRows: false
      }
    },
    watch: {
      showRows: function(){
        this.$emit('showRows', this.showRows);
      }
    },
    components: {
      FontAwesomeIcon
    }
  }
</script>

<style>
  .api-link{
    background: white;
    border: 2px solid transparent;
    transition: border .2s
  }
  .api-link:hover{
    text-decoration: none;
    border-bottom: 2px solid rgb(91,172,202);
    background: rgb(248,248,248);
    opacity: .9;
  }
</style>
