<template>
  <div id="main-app" class="container">
    <main>

      <div class="row mt-4 justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="d-flex justify-content-between">
            <h2 class="text-left text-muted">{{ title }}</h2>

            <menu-links
              :customerPackagesAPI="links.customerPackagesAPI"
              @showRows="toggleShowRows"/>

          </div>
        </div>

        <search-packages
          :currFilterKey="filterKey"
          :currFilterDir="filterDir"
          @searchRecords="searchPackages"
          @requestKey="changeKey"
          @requestDir="changeDir" />

        <paginate-options
          :numPgs="numPgs"
          :packages="filteredPkgs"
          @changeNumPgs="changeNumPgs"
          @changeItemsPerPage="changeItemsPerPage"
          @changeSelectedPage="changeSelectedPage" />

        <add-packages
          :numPkgsFiltered='filteredPkgs.length'
          :numPkgs='packages.length'
          :itemsPerPage='itemsPerPage'
          :dropMenus="dropMenus"
          @add="addPackage"
          @changeItemsPerPage="changeItemsPerPage"/>

        <packages-list
          :showRows='showRows'
          :itemsPerPage='itemsPerPage'
          :numPgs='numPgs'
          :selectedPage='selectedPage'
          :packages="filteredPkgs"
          @removePackage="removePackage"
          @edit="editItem" />

      </div>
    </main>

    <footer-component />

  </div>
</template>

<script>
  import axios from "axios";
  import "bootstrap";
  import _ from "lodash";
  import PackagesList from "./components/PackagesList";
  import SearchPackages from "./components/SearchPackages";
  import AddPackages from "./components/AddPackages";
  import PaginateOptions from "./components/PaginateOptions";
  import FooterComponent from "./components/FooterComponent.vue";
  import MenuLinks from "./components/MenuLinks.vue"

  export default {
    data: function() {
      return{
        title: 'Customer Packages',
        message: 'testing the tooltip',
        apiJson: {},
        packages:[],
        searchTerms: '',
        filterKey: 'pkg',
        filterDir: 'asc',
        itemsPerPage: '',
        selectedPage: '',
        numPgs: '',
        showRows: false,
        dropMenus:{
          "customers": [],
          "widgets": [],
          "packaging": []
        },
        links: {
          customerPackagesAPI: "https://ayyq6hjxu1.execute-api.us-east-2.amazonaws.com/beta/customerpackagesapiclone"
        },
        testID: ''
      }
    },
    components: {
      AddPackages,
      SearchPackages,
      PackagesList,
      PaginateOptions,
      FooterComponent,
      MenuLinks
    },

    computed: {
      searchedPkgs: function(){
        // filter the displayed list of packages whenever the searchTerms change
        // rem: packages[ { "pkgId":"", "pkg":"", "price":"" } ]
        return this.packages.filter(item => {
          return(
            item.pkgId.toString().toLowerCase().match(this.searchTerms.toLowerCase()) ||
            item.pkg.toLowerCase().match(this.searchTerms.toLowerCase()) ||
            item.price.toString().toLowerCase().match(this.searchTerms.toLowerCase())
          );
        });
      },

      filteredPkgs: function() {
        // use sort feature per lodash library
        return _.orderBy(
          this.searchedPkgs,
          item => {
            return item[this.filterKey];
          }, this.filterDir
        );
      }
    },

    methods: {
      addPackage: function(packagesObject){
        // POST the new customer package to the PostGreSQL db on ElephantSQL
        var url = this.links.customerPackagesAPI;
        var httpPostData = packagesObject.httpPostData;
        var frontEndData = packagesObject.frontEndData;

        axios.post( url, httpPostData )
          .then( (res) => {
            // get new customer_pkg_id from database and add it to the new package object
            var newPackage = frontEndData;
            var pkgId = res.data.pkgId;
            newPackage.pkgId = pkgId

            // push new package obj to packages[] in Vue data layer so it shows in gui
            this.packages.push(newPackage);

            // toast the user
            this.showToast( 'info', 'Pkg #'.concat(pkgId).concat(' was added') );
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      removePackage: function(pkgId){
        var url = this.links.customerPackagesAPI;
        const params = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {'pkgId': pkgId} )
        }

        // call api to delete pkgId
        fetch(url, params)
          .then( res => res.json() )
          .then( data => console.log(data) )

        // remove package from packages[] in Vue data layer
        let obj = this.packages.find(x => x.pkgId == pkgId);
        let index = this.packages.indexOf(obj);
        this.packages.splice(index,1);

        this.showToast( 'info', 'Pkg #'.concat(pkgId).concat(' was deleted') );
      },

      searchPackages: function(terms){
        this.searchTerms = terms;
      },

      editItem: function(id, field, text){
        const pkgIndex = _.findIndex(this.packages, { pkgId: id });  // using lodash
        this.packages[pkgIndex][field] = text;
      },

      changeKey: function(value){
        this.filterKey = value;
      },

      changeDir: function(value){
        this.filterDir = value;
      },

      changeItemsPerPage: function(value){
        this.itemsPerPage = value;
      },

      changeNumPgs: function(value){
        this.numPgs = value;
      },

      changeSelectedPage: function(value){
        this.selectedPage = value;
      },

      toggleShowRows: function(value){
        this.showRows = value;
      },

      showToast: function( type, msg ) {
        this.$toast.open({
          message: msg,
          type: type,
          position: 'top-right',
          duration: 2000,
          dismissible: true
        })
      },
    },

    mounted() {
      // on mount, query the db for data to populate packages and drop menus
      var url = this.links.customerPackagesAPI
      axios.get( url )
        .then( (res) => {
          // print the full data set returned by the GET method
          this.apiJson = JSON.stringify(res.data);

          // parse response data into the Vue data layer
          this.dropMenus.customers = res.data.customers;
          this.dropMenus.widgets = res.data.widgets;
          this.dropMenus.packaging = res.data.packaging;

          // parse fields into vars that can be joined into a customer_package string
          const cpHeaders = res.data.customerPackagesHeaders;
          const cpRows = res.data.customerPackagesRows;

          for( let row of cpRows ){
            let pkgId = row[ cpHeaders.indexOf( 'customer_pkg_id' ) ];
            let customer = row[ cpHeaders.indexOf( 'customer_id' ) ];
            let widget = row[ cpHeaders.indexOf( 'widget_id' ) ];
            let packaging = row[ cpHeaders.indexOf( 'packaging_id' ) ];
            let qty = row[ cpHeaders.indexOf( 'qty_in_pkg' ) ];
            let price = row[ cpHeaders.indexOf( 'price' ) ];

            // join vars into customer_package string
            let tempPkg = customer.concat(' : ').concat(widget);
            tempPkg = tempPkg.concat(', ').concat(packaging);
            tempPkg = tempPkg.concat(' of ').concat(qty);

            // create customer_package object
            let tempRow = {
              "pkgId": pkgId,
              "pkg": tempPkg,
              "price": price,
            }

            // push customer_package object into packages[] in Vue data layer
            this.packages.push(tempRow)
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
</script>

<style>
  html{
    position: relative;
  }
  body{
    overflow-y: scroll;
  }
  main{
    /* a wrapper to enable sticky footer*/
    //border: 1px solid red;
    min-height:78vh;
    margin-bottom: 60px;
  }
</style>
