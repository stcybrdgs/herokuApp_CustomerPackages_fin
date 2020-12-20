<template id="">
  <div class="col-12 col-md-10 col-lg-8">
    <div class="list-group list-group-flush">
      <div class="">
        <!-- list-group -->
        numberOfItems: {{ packages.length }} |
        itemsPerPage: {{ itemsPerPage }} |
        numPgs: {{ numPgs }} |
        selectedPage: {{ selectedPage }}

        <div
          class="list-group-item p-0"
          v-for="(item, index) in packages.slice( pkgListSliceStart, pkgListSliceEnd )"
          :key="item.pkgId + '-' + index">

          <!-- Container - package list items -->
          <div
            class="container p-1">
            <!-- COL - trashcan icon -->
            <div class="col">
              <span style="position:absolute;left:-20px;top:2px;">{{ index }}</span>
              <a
                href="#"
                class="mr-4 text-danger remove-pkg-icon"
                @click="$emit('removePackage', item.pkgId)">
                <font-awesome-icon icon="trash-alt" />
              </a>
            </div>

            <!-- COL - package description -->
            <div class="w-100 pkg-txt-field col">
              <div class="d-flex justify-content-between">

                <!-- id & description text -->
                <div class="d-flex">
                  <span class="text-info ml-2 mr-1 mt-1">#</span>
                  <span class="pkg-id-field align-self-start badge bg-light text-info text-right">{{ item.pkgId }} </span>
                  <span class="h6 mt-1 text-info">{{ item.pkg }}</span>
                </div>

                <!-- price -->
                <div class="price-div">
                  <span class="text-info mt-1">$</span>
                  <span class="price-field h6 badge bg-light text-info text-right">{{ item.price }}</span>
                </div>
              </div>
            </div>

          </div><!-- end container -->
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  export default{
    name: 'packages-list',
    props: ['packages', 'itemsPerPage', 'numPgs', 'selectedPage'],
    components: {
      FontAwesomeIcon
    },
    computed: {
      pkgListSliceStart: function(){
        var start = (this.itemsPerPage * this.selectedPage) - this.itemsPerPage;
        console.log('slice start: ', start);
        return start;
      },
      pkgListSliceEnd: function(){
        var end = this.itemsPerPage * this.selectedPage;
        console.log('slice end: ', end);
        return end;
      }
    }
  }
</script>

<style>
  .pkg-txt-field{
    margin-left: 32px;
  }
  .price-field{
    border: 1px solid rgb(238,238,238);
    width: 68px;
    margin-right: 24px;
    margin-left: 8px;
    margin-top: 6px;
  }
  .price-div{
    white-space: nowrap;
    margin-left: 10px;
  }
  .pkg-id-field{
    border: 1px solid rgb(238,238,238);
    padding-right: 8px;
    padding-left: 8px;
    margin-right: 20px;
    margin-top: 6px;
    width: 50px;
  }
  .remove-pkg-icon{
    position: absolute;
    top: 0px;
    font-size: 1.2em;
    opacity: 0.4;
    transition: opacity 0.4s;
  }
  .remove-pkg-icon:hover{
    opacity: 0.9;
  }
</style>
