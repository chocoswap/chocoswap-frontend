<template>
  <span v-if="isLocked">
    {{isLocked ? "Locked" : ''}}
  </span>
  <ICountUp v-else
    :delay="delay"
    :endVal="_endVal"
    :options="options"
    @ready="onReady"
  />
</template>
<script>
import ICountUp from "vue-countup-v2";
import BigNumber from "bignumber.js";

export default {
  components: {
    ICountUp
  },
  name: 'CountUp',
  props: ["endVal", "lock"],
  data() {
    return {
      delay: 0,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
        decimalPlaces: 4,
        duration: 1
      },
      instance: null
    };
  },
  methods: {
    onReady: function(instance, CountUp) {
      this.instance = instance;
    }
  },
  computed: {
    _endVal() {
      if (typeof this.endVal === "number") {
        return Number(BigNumber(this.endVal).toFixed(4, 1))
      } else if (
        typeof this.endVal === "string" &&
        !isNaN(Number(this.endVal))
      ) {
        return Number(BigNumber(1*this.endVal).toFixed(4, 1))
      } else {
        return 0;
      }
    },
    isLocked() {
      return this.lock && !this.$store.state.wallet.address;
    }
  },
  watch: {
    isLocked: {
      handler: function(connected) {
        this.instance && this.instance.start();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
