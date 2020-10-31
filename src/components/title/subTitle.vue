<template>
<p :class="$style['sub-title']" :style="{'width': `${width}px`}">{{subTitle}}</p>
</template>

<style lang="scss" module>
  .sub-title{
    font-size: 16px;
    font-family: $font-1;
    font-weight: normal;
    color: $color-text;
    line-height: 24px;
  }
</style>

<script>
export default {
  name: 'SubTitle',
  props: {
    subTitle: String,
    width: String
  }
};
</script>