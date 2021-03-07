<template>
<div :class="$style['title']" :style="{'width': `${width}px`}">
  <img v-show="img" :src="img" />
  <div v-html="title"></div>
  <img src="@/assets/image/title_decorate.png" alt="">
</div>
</template>

<style lang="scss" module>
@media only screen and (min-width: 768px) {
  .title{
    position: relative;
    font-size: 48px;
    font-family: Inter-ExtraBold, Inter;
    font-weight: 800;
    color: $color-text;
    line-height: 62px;
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
}
@media only screen and (max-width: 768px) {
  .title{
    position: relative;
    font-size: 36px;
    font-family: Inter-ExtraBold, Inter;
    font-weight: 800;
    color: $color-text;
    line-height: 42px;
    display: flex;
    align-items: center;
    max-width: 100%;
    img:nth-child(1){
      z-index: 1;
      position: relative;
      height: 65px;
    }
    div{
      width: 300px;
      z-index: 1;
      position: relative;
    }
    img:nth-child(3){
      position: absolute;
      height: 35px;
      left: -15px;
      bottom: 0px;
    }
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