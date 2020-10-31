<i18n>
{
  "en": {
    "10": "Select"
  },
  "zh": {
    "10": "选择"
  }
}
</i18n>
<template>
<div :class="$style['card']">
  <Space height="24"/>
  <img :class="$style['img']" :src="require(`../../assets/image/${content.title}.png`)"/>
  <Space height="10"/>
  <p :class="$style['title']">{{content.title}}</p>
  <Space height="4"/>
  <p :class="$style['sub-title']" v-html="content.subTitle"></p>
  <Space height="19"/>
  <p :class="$style['btn']" @click="content.onTab(content)">{{$t('10')}}</p>
  <Space height="15"/>
  <!-- <p :class="$style['gap']"></p> -->
  <!-- <Space height="6"/>
  <div :class="$style['apy']">
    <span>APY</span>
    <span>{{content.apy}} %</span>
  </div> -->
</div>
</template>

<script>
import Space from '../../components/space/space.vue'
export default {
  name: 'MenuCard',
  components: {
    Space
  },
  props: {
    content: Object,
  },
};
</script>

<style lang="scss" module>
.card{
  width: 328px;
  height: 310px;
  background: $color-10;
  border-radius: 24px;
  padding: 25px 24px;
  text-align: center;
  margin-bottom: 32px;
  .img{
    width: 65px;
  }
  .title{
    font-family: $font-3;
  }
  .sub-title{
    font-family: $font-3;
    color: $color-text-grey-1;
    line-height: 23px;
  }
  .btn{
    width: 283px;
    height: 44px;
    background: $color-text-blue;
    border-radius: 4px;
    color: $color-text-grey-1;
    line-height: 44px;
    cursor: pointer;
    :hover{
      background: #5eaeff;
    }
  }
  .gap{
    border-bottom: 1px solid $color-20;
  }
  .apy{
    display: flex;
    justify-content: space-between;
    :nth-child(1){
      font-family: $font-3;
      color: $color-text-grey-1;
    }
    :nth-child(2){
      font-family: $font-2;
      color: $color-text-blue;
    }
  }
}
</style>