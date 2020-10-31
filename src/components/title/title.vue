<template>
<div :class="$style['title']" :style="{'width': `${width}px`}">
  <img v-show="img" :src="img" />
  <div v-html="title"></div>
  <img src="@/assets/image/title_decorate.png" alt="">
</div>
</template>

<style lang="scss" module>
  .title{
    position: relative;
    font-size: 64px;
    font-family: Inter-ExtraBold, Inter;
    font-weight: 800;
    color: $color-text;
    line-height: 77px;
    display: flex;
    align-items: center;
    img:nth-child(1){
      z-index: 1;
      position: relative;
      height: 65px;
    }
    div{
      z-index: 1;
      position: relative;
    }
    img:nth-child(3){
      position: absolute;
      height: 75px;
      top: -30px;
      left: -60px;
    }
  }
</style>

<script>
export default {
  name: 'Title',
  props: [
    'title',
    'width',
    'img'
  ]
};
</script>