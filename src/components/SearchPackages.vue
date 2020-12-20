<template id="">
  <div class="col-12 col-md-10 col-lg-8">
    <div class="input-group my-3">

      <!-- Search bar -->
      <input
        id="searchPkgs"
        placeholder="Search Packages"
        type="text"
        class="form-control"
        aria-label="Search for Packages"
        v-model="searchTerm">

      <!-- Filter buttons -->
      <div class="input-group-append">
        <!-- Clear button -->
        <button
          type="button"
          class="btn btn-outline-info"
          aria-haspopup="true"
          aria-expanded="false"
          @click="clearFilter">
          Clear
        </button>

        <!-- Sort by button -->
        <button
          type="button"
          class="btn btn-outline-info ropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          Sort by
          <span class="caret"></span>
        </button>

        <!-- Filter drop menu -->
        <div class="dropdown-menu dropdown-menu-right">
          <!-- Filter by Pkg -->
          <a
            href="#"
            id="pkg-id"
            class="dropdown-item d-flex justify-content-between"
            @click="$emit('requestKey', 'pkgId')">
            Id
            <font-awesome-icon
              class="text-info"
              icon="check"
              v-if="currFilterKey==='pkgId'" />
          </a>

          <!-- Filter by Price -->
          <a
            href="#"
            id="pkg"
            class="dropdown-item d-flex justify-content-between"
            @click="$emit('requestKey', 'pkg')">
            Customer
            <font-awesome-icon
              class="text-info"
              icon="check"
              v-if="currFilterKey==='pkg'" />
          </a>

          <!-- Filter by Price -->
          <a
            href="#"
            id="price"
            class="dropdown-item d-flex justify-content-between"
            @click="$emit('requestKey', 'price')">
            Price
            <font-awesome-icon
              class="text-info"
              icon="check"
              v-if="currFilterKey==='price'" />
          </a>

          <div class="dropdown-divider" role="separator"></div>

          <!-- Filter Ascending -->
          <a
            href="#"
            id="asc"
            class="dropdown-item d-flex justify-content-between"
            @click="$emit('requestDir', 'asc')">
            Asc
            <font-awesome-icon
              class="text-info"
              icon="check"
              v-if="currFilterDir==='asc'" />
          </a>

          <!-- Filter Descending -->
          <a
            href="#"
            id="desc"
            class="dropdown-item d-flex justify-content-between"
            @click="$emit('requestDir', 'desc')">
            Desc
            <font-awesome-icon
              class="text-info"
              icon="check"
              v-if="currFilterDir==='desc'" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  export default{
    name: 'search-packages',
    props: [
      'currFilterKey',
      'currFilterDir'
    ],
    data: function(){
      return {
        searchTerm: ''
      };
    },
    components: {
      FontAwesomeIcon
    },
    watch: {
      searchTerm: function(){
        this.$emit('searchRecords', this.searchTerm);
      }
    },
    methods: {
      clearFilter: function(){
        this.searchTerm = '';
      }
    }
  }
</script>

<style>
  .dropdown-menu a{
    font-size: .92em;
  }
</style>
