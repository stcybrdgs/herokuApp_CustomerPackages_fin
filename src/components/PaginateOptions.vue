<template id="">
  <div class="col-12 col-md-10 col-lg-8">
    <div class="ml-1 mt-1 d-flex justify-content-between">
      <div class="">

        <!-- Radio buttons: the items per page -->
        <span class="text-info items-per-page">
          Show:
        </span>

        <div class="text-info radio-buttons" style="margin-left: 54px;">
          <div class="form-check form-check-inline">
            <input
              id="radio-10" value="10"
              class="form-check-input"
              type="radio"
              name="radioOptions"
              v-model="selectedRadio"
              checked>
            <label class="form-check-label" for="radio-10">10</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="radio-20"
              class="form-check-input"
              type="radio"
              name="radioOptions"
              value="20"
              v-model="selectedRadio">
            <label class="form-check-label" for="radio-20">20</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="radio-all"
              class="form-check-input"
              type="radio"
              name="radioOptions"
              value="All"
              v-model="selectedRadio">
            <label class="form-check-label" for="radio-all">All</label>
          </div>
        </div>
      </div>

      <!-- Buttons: the pagination pages -->
      <div class="mr-0 text-info">
        <div class="btn-group">
          <span class="mr-3">
            Pages:
          </span>

            <!-- notify user if there are no search results -->
            <span class="page-button-span">
              <button
                v-if="numPgs == 0"
                class="btn btn-sm btn-outline-warning text-warning rounded"
                disabled>
                No results !
              </button>

              <!-- Pagination buttons -->
              <button
                class="btn btn-sm btn-outline-info rounded-0"
                :class="{ active: i === activePgBtn }"
                type="button"
                name="button"
                v-for="i in getNumberOfPages"
                :key="i"
                :value="i"
                :id="i"
                @click="selectedPage=i, activePgBtn=i">
                {{i}}
              </button>
            </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['packages', 'numPgs'],
    data: function(){
      return{
        title: 'paginate-options',
        selectedRadio: '10',
        selectedPage: '1',
        activePgBtn: null
      }
    },
    watch: {
      selectedRadio: function(){
        this.$emit('changeItemsPerPage', this.getRadioValue());

        // when itemsPerPage changes, the number of Pages will also change,
        // so reset the selected page to 1 to avoid an out-of-range condition
        this.selectedPage = 1;
        this.activePgBtn = 1;
      },
      selectedPage: function(){
        this.$emit('changeSelectedPage', this.selectedPage);
      },
      numPgs: function(){
        if( this.selectedPage > this.numPgs ){
          this.selectedPage = 1;
          this.activePgBtn = 1;
        }
      }
    },
    computed: {
      getNumberOfPages: function(){
        var pl = this.packages.length;
        var r = this.getRadioValue();

        // calculate how many pages are needed to render the number of packages
        // based on the user-selected items per page
        var numPgs =  pl == 0 ? 0:
                      pl == r ? 1 :
                      pl % r == 0 ? pl / r :
                      pl % r < r/2 ? Math.round(pl / r) + 1 :
                      Math.round(pl / r ) == 0 && pl > 0 ? 1:
                      Math.round(pl / r );
        this.$emit('changeNumPgs', numPgs)
        return numPgs;
      }
    },
    methods: {
      getRadioValue: function(){
        return  this.selectedRadio == 'All' ?
                this.packages.length :
                this.selectedRadio;
      }
    },
    mounted() {
      this.$emit('changeItemsPerPage', this.selectedRadio);
      this.$emit('changeSelectedPage', this.selectedPage);
      this.activePgBtn = 1;
    }
  }

</script>

<style>
.items-per-page{
  position:absolute;
  top: 4px;
}
.radio-buttons{
  margin-top: 2px;
}
.page-button-span{
  margin-top:-3px;
}
.page-button-span button{
  margin-left:-1px;
}
</style>
