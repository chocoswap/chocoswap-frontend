<template>
  <div class="app">
    <div :class="$['app-header']">
      <Header />
    </div>
    <div :class="$['app-body']">
      <router-view />
    </div>
    <div :class="$['app-footer']">
      <Footer />
    </div>
  </div>
</template>
<style lang="scss" module="$">
:global(.app) {
  position: relative;
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
}
.app-header {
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100%;
  height: $height-header;
}
.app-body {
  padding-top: $height-header + $height-between-header-and-container;
  padding-bottom: $height-footer;
}
.app-footer {
  position: absolute;
  bottom: 0;
  z-index: 99;
  width: 100%;
  height: $height-footer;
}
</style>
<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import { init, connect } from "./choco/index";

export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    init().then((res) => {
      // const { netVersion } = this.$store.state.wallet
      // const localNetVersion = localStorage.getItem('netVersion')
      // if(localNetVersion === null && netVersion !== '1'){
      //   localStorage.setItem('netVersion', netVersion)
      //   location.reload();
      // }
    });
  },
  watch: {
    "$store.state.wallet.netVersion"(newVersion, oldVersion) {
      if (newVersion && oldVersion && newVersion != oldVersion) {
        localStorage.setItem("netVersion", newVersion);
        location.reload();
      }
    },
  },
};
</script>