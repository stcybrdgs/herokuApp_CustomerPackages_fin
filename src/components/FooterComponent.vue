<!-- Footer -->
<template id="">
  <footer>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
            <hr>
            <a
              class="btn btn-md btn-outline-info mr-2 shadow-sm"
              title="GitHub"
              :href="links.github"
              target="_blank">
              <font-awesome-icon :icon="['fab', 'github']" class="social" />
            </a>

            <a
              class="btn btn-md btn-outline-info ml-2 shadow-sm"
              title="LinkedIn"
              :href="links.linkedin"
              target="_blank">
              <font-awesome-icon :icon="['fab', 'linkedin']" class="social" />
            </a>

            <p class="text-info copyright mt-2">&copy; 2020 - Stacy Bridges</p>

        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  export default{
    name: 'footer-component',
    components: {
      FontAwesomeIcon
    },
    data: function(){
      return {
        links: {
          github: "https://github.com/stcybrdgs/herokuApp_CustomerPackages_fin",
          linkedin: "https://www.linkedin.com/in/stcybrdgs/"
        }
      }

    },
    watch: {
    },
    computed: {
    },
    methods: {

    }
  }
</script>

<style>
  footer{
    width: 100%;
    text-align: center;
  }
  .social{
    font-size: 1.2em;
  }
</style>
