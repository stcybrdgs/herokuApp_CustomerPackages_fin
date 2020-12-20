<template id="">
  <div class="p-0">
    <slide-up-down
      class="AccordionWrapper"
      :active="alertActive"
      :use-hidden="this.useHidden"
      :class="this.timing"
      :duration="this.duration">
      <div class="Accordion">
        <div
          class="alert alert-danger m-0 p-1 border-bottom-0 rounded-0 text-center"
          role="alert"
          @click="$emit('toggleAlert')"
          @mouseover="showAlertClose = true"
          @mouseout="showAlertClose = false">
          <span class="h6 text-danger">
            {{ this.alertMessage }}</span>
          <span
            class="alert-danger alert-close"
            v-show="showAlertClose">
            <font-awesome-icon icon="times"></font-awesome-icon>
          </span>
        </div>
      </div>
    </slide-up-down>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default{
  name: 'slide-component',

  data: function(){
    return {
      useHidden: true,
      timing: "",
      duration: 200,
      showOptions: false,
      showAlertClose: false
    }
  },
  components: {
    FontAwesomeIcon
  },
  props: ['alertActive', 'alertMessage'],
  methods: {}
}

</script>

<style>
  .alert,
  .alert-close{
    opacity: 0.6;
  }
  .alert:hover{
    cursor: pointer;
  }
  .alert-close{
    position: absolute;
    right: 14px;
  }
</style>
