<template id="">
  <div class="col-12 col-md-10 col-lg-8">
    <div class="textcenter mt-3">

      <!-- form-panel toggle button -->
      <div
        id="addPkgtBtn"
        class="card-header border-0 bg-info text-white"
        @click="toggle">
        <font-awesome-icon icon="plus" class="mr-3"/>Add a Package
      </div>

      <!--  Accordion wrapper for sliding form panel
            node module: vue-slide-up-down
      -->
      <slide-up-down
        class="AccordionWrapper"
        :active="active"
        :use-hidden="this.useHidden"
        :class="this.timing"
        :duration="this.duration"
        >
        <div class="Accordion">

          <!-- warning message -->
          <alert-message
            :alertActive="alertActive"
            :alertMessage="alertMessage"
            @toggleAlert="toggleAlertActive"
          ></alert-message>

          <!-- form-panel -->
          <div id="form-panel" class="card-body border bg-light">
            <form
              id="pkgForm"
              @submit.prevent="requestAdd">

              <div class="row">
                <!-- Customer -->
                <div class="form-group form-row col">
                  <!-- label -->
                  <label for="#customer" class="text-muted">Customer</label>
                  <span class="form-asterisk" v-if="!formData.customer">
                    <font-awesome-icon icon="asterisk" class="ml-2"/>
                  </span>
                  <span class="form-asterisk text-info" v-if="formData.customer">
                    <font-awesome-icon icon="check" class="ml-2"/>
                  </span>

                  <!-- select menu -->
                  <select
                    id="customer"
                    class="form-control form-control-sm "
                    type="text" name="customer"
                    v-model="formData.customer">
                    <option
                      v-for="(item, index) in dropMenus.customers"
                      :key = "'cust-' + index"
                      :value="item">{{ item }}</option>
                  </select>
                </div>

                <!-- widget -->
                <div class="form-group form-row col">
                  <!-- label -->
                  <label for="#widget" class="text-muted">Widget</label>
                  <span class="form-asterisk" v-if="!formData.widget">
                    <font-awesome-icon icon="asterisk" class="ml-2"/>
                  </span>
                  <span class="form-asterisk text-info" v-if="formData.widget">
                    <font-awesome-icon icon="check" class="ml-2"/>
                  </span>

                  <!-- select menu -->
                  <select
                    id="widget" class="form-control form-control-sm "
                    type="text" name="widget"
                    v-model="formData.widget">
                    <option
                      v-for="(item, index) in dropMenus.widgets"
                      :key = "'cust-' + index"
                      :value="item">{{ item }}</option>
                  </select>
                </div>
              </div><!-- end row -->

              <div class="row">
                <!-- packaging -->
                <div class="form-group form-row col">
                  <!-- label -->
                  <label for="#packaging" class="text-muted">Packaging</label>
                  <span class="form-asterisk" v-if="!formData.packaging">
                    <font-awesome-icon icon="asterisk" class="ml-2"/>
                  </span>
                  <span class="form-asterisk text-info" v-if="formData.packaging">
                    <font-awesome-icon icon="check" class="ml-2"/>
                  </span>

                  <!-- select menu -->
                  <select
                    id="packaging" class="form-control form-control-sm "
                    type="text" name="packaging"
                    v-model="formData.packaging">
                    <option
                      v-for="(item, index) in dropMenus.packaging"
                      :key = "'cust-' + index"
                      :value="item">{{ item }}</option>
                  </select>
                </div>

                <!-- qtyInPkg -->
                <div class="form-group form-row col">

                  <!-- label -->
                  <div class="d-flex justify-content-between">
                    <label for="#qtyInPkg" class="text-muted">Qty in Pkg</label>
                    <span class="form-asterisk" v-if="!formData.qtyInPkg">
                      <font-awesome-icon icon="asterisk" class="ml-2" />
                    </span>
                    <span class="form-asterisk text-muted" v-if="formData.qtyInPkg">
                      <font-awesome-icon icon="hashtag" class="ml-2"/>
                    </span>
                    <div>
                      <span
                        v-show="showQtyTooltip"
                        class="form-tooltip bg-info rounded text-light p-2">
                        {{ qtyTooltipMsg }}
                      </span>
                      <font-awesome-icon
                      id="qty-tooltip"
                      @mouseover="showQtyTooltip=!showQtyTooltip"
                      @mouseout="showQtyTooltip=!showQtyTooltip"
                      icon="info-circle"
                      class="text-info mt-2 form-field-info" />
                    </div>
                  </div>

                  <!-- input -->
                  <input
                    id="qtyInPkg" class="form-control form-control-sm "
                    type="text" name="qtyInPkg" placeholder="0"
                    v-model="formData.qtyInPkg">
                </div>
              </div><!-- end row -->

                <!-- Price -->
                <div class="row">
                  <div class="form-group form-row col">
                    <!-- label -->
                    <div class="d-flex justify-content-between">
                      <label for="#price" class="text-muted">Price</label>
                      <span class="form-asterisk" v-if="!formData.price">
                        <font-awesome-icon icon="asterisk" class="ml-2"/>
                      </span>
                      <span class="form-asterisk text-muted" v-if="formData.price">
                        <font-awesome-icon icon="dollar-sign" class="ml-2"/>
                      </span>
                      <div>
                        <span
                          v-show="showPriceTooltip"
                          class="form-tooltip bg-info rounded text-light p-2">
                          {{ priceTooltipMsg }}
                        </span>
                        <font-awesome-icon icon="info-circle"
                          id="price-tooltip"
                          @mouseover="showPriceTooltip=!showPriceTooltip"
                          @mouseout="showPriceTooltip=!showPriceTooltip"
                          class="text-info mt-2 form-field-info"/>
                      </div>
                    </div>

                    <!-- input -->
                    <div
                      class="input-group">
                      <span id="dollar-pill" class="input-group-text form-control-sm">$</span>
                      <input
                        id="price"
                        type="text"
                        class="form-control form-control-sm"
                        name="price"
                        placeholder="0"
                        v-model="formData.price">

                    </div>
                  </div>

                  <div class="col">
                    <div class="text-right">
                      <button
                        id="submit"
                        type="submit"
                        value="Add Package"
                        class="btn btn-sm btn-info form-button mr-1">
                        <font-awesome-icon icon="plus" class="mr-2"/>
                          Add
                      </button>
                      <button
                        type="button"
                        name="button"
                        class="btn btn-sm btn-dark form-button"
                        @click="toggle">
                        <font-awesome-icon icon="times" class="mr-2"/>
                          Close
                      </button>
                    </div>
                  </div>

                </div><!-- end row -->

            </form>
          </div> <!-- end form panel -->

        </div>
      </slide-up-down>

    </div>
  </div>
</template>

<script type="text/javascript">
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import AlertMessage from "./AlertMessage";

  export default{
    name: 'add-packages',
    props: ['dropMenus', 'pkgIndex', 'itemsPerPage'],
    components: {
      FontAwesomeIcon,
      AlertMessage
    },
    data: function(){
      return {
        alertActive: false,  // passes toggle value to AlertMessages component
        alertMessage: '',
        showQtyTooltip: false,
        showPriceTooltip: false,
        qtyTooltipMsg: 'Integer type from 1 to 32,767',
        priceTooltipMsg: 'Whole dollars up to 999,999',

        // form bindings
        formData: {
          customer: '',
          widget: '',
          packaging: '',
          qtyInPkg: '',
          price: ''
        },
        formDataComplete: false,

        // slide-up-down bindings
        active: false,
        useHidden: true,
        timing: "",
        duration: 300,
        show: true,
        showOptions: false,
      }
    },
    watch: {
    },
    computed: {
    },
    methods: {
      toggleAlertActive() {
        this.alertActive = !this.alertActive;  // toggle the AlertMessages component
      },

      toggle: function() {
        // toggle the '+ Add a Package' form opened and closed
        this.active = !this.active;
      },

      requestAdd: function(){
        // check if form is complete
        this.formDataComplete = true;
        for( let key in this.formData ){
          if( key != 'pkg' && this.formData[key] == '' ){
            this.formDataComplete = false;
            break;
          }
        }
        // on click of '+ Add' btn, submit the form if it is complete, else warn user
        if( this.formDataComplete ){
          this.alertMessage = '';  // reset alert message

          // if form is complete and the qty and price values validate, submit form
          if( this.validateQtyInPkg() && this.validatePrice() ){
            // parse form data into vars that will be used to build customer_package string
            var customer = this.formData.customer;
            var widget = this.formData.widget;
            var packaging = this.formData.packaging;
            var qty = this.formData.qtyInPkg;
            var price = this.formData.price;

            // join vars to build customer_package string
            var pkg = customer.concat(' : ').concat(widget);
            pkg = pkg.concat(', ').concat(packaging);
            pkg = pkg.concat(' of ').concat(qty);

            var packagesObject = {
              "httpPostData": {
                'customer': customer,
                'widget': widget,
                'packaging': packaging,
                'qty': qty,
                'price': price
              },
              "frontEndData": {
                "pkgId": '',
                "pkg": pkg,
                "price": price
              }
            }
            this.$emit('add', packagesObject);
            console.log('in requestAdd(): ', parseInt(this.itemsPerPage) + 1);
            this.$emit('changeItemsPerPage', parseInt(this.itemsPerPage) + 1);
            this.resetFormValues();
          } else {
            // if qty or price values do not validate, alert the user
            this.alertActive = true;
          }
        } else {
          // if the form is incomplete, alert the user
          this.alertMessage = 'All fields are required. '
          this.alertActive = true;
        }
      },

      validateQtyInPkg: function(){
        // validate qty field: 1 <= int <= 32,767
        var qtyInt = Number(this.formData.qtyInPkg);
        if(
          !(
            qtyInt % 1 == 0 &&
            Number.isInteger(qtyInt) &&
            qtyInt >= 1 &&
            qtyInt <= 32767
            )
          ){
          this.alertMessage += 'Qty must be an Integer (1 to 32,767). '
          return false;
        } else {
          return true;
        }
      },

      validatePrice: function(){
        // validate price field: 1 <= int <= 99,9999
        var priceInt = Number(this.formData.price);
        if(
          !(
            priceInt % 1 == 0 &&
            Number.isInteger(priceInt) &&
            priceInt >= 1 &&
            priceInt <= 999999
            )
          ){
          this.alertMessage += 'Price must be an Integer (1 to 999,999). '
          return false;
        } else {
          return true;
        }
      },

      resetFormValues: function(){
        this.active = !this.active;  // toggle the form closed
        this.formDataComplete = false;  // reset form completion status
        this.alertActive = false;

        //reset the form values
        this.formData = {
          customer: '',
          widget: '',
          packaging: '',
          qtyInPkg: '',
          price: '',
          pkg: ''
        }
      }
    }
  }
</script>

<style media="screen">
  #addPkgtBtn:hover{
    cursor: pointer;
  }
  #dollar-pill{
    border-radius: 0px;
    border-right: 0px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: .87em;
  }
  #cents-pill{
    border-radius: 0px;
    border-left: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .form-asterisk{
    color: red;
    font-size: .6em;
    vertical-align: super;
    opacity: 0.4;
  }
  label{
    margin-left: 4px;
    font-size: .9em;
  }
  .form-field-info{
    position:absolute;
    z-index: 12;
    right:22px;
  }
  .form-tooltip{
    position:absolute;
    z-index:10;
    opacity:0.75;
    top:-34px;
    right:10px;
    font-size: .9em;
  }
  .form-button{
    position:relative;
    margin-top: 32px;
  }
  #qty-tooltip:hover,
  #price-tooltip:hover{
    cursor: help;
  }
</style>
