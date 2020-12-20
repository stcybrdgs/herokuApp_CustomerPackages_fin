<template id="">
  <div class="col-12 col-md-10 col-lg-8">
    <div class="ml-1 d-flex justify-content-between">
      <div class="">

        <!-- Radio buttons: the items per page -->
        <span class="text-info" style="position:absolute; top:-1px;">
          Items per page:
        </span>

        <div class="text-info" style="margin-left: 120px;">
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
          <span class="mr-3">Pages:</span>

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
          <!-- selectedPage=i, active -->

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default{
    props: ['packages'],
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
        console.log(document.getElementById(this.selectedPage).innerHTML);
      }
    },
    computed: {
      getNumberOfPages: function(){
        console.log(23%20);
        var pl = this.packages.length;
        var r = this.getRadioValue();

        // calculate how many pages are needed to render the number of packages
        // based on the user-selected items per page
        var numPgs =  pl == r ?
                      1 :
                      pl % r == 0 ?
                      pl / r :
                      pl % r < 5 ?
                      Math.round(pl / r) + 1 :
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
</style>
