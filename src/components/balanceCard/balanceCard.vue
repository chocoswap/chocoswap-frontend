<template>
<div :class="$style['card']">
  <p :class="$style['title']">{{content.title}}</p>
  <p :class="$style['number']">
    <CountUp :endVal="content.number" :lock="content.lock" />
  </p>
  <div :class="$style['sub-card']">
    <p :class="$style['sub-title']">{{content.subTitle}}</p>
    <p :class="$style['sub-number']">
      <CountUp :endVal="content.subNumber" :lock="content.lock" /> VNLA</p>
  </div>
</div>
</template>

<style lang="scss" module>
.card{
  width: 441px;
  height: 180px;
  background: $color-10;
  border-radius: 24px;
  padding: 25px 24px;
  .title{
    font-family: $font-1;
    color: $color-text-grey-1;
  }
  .number{
    font-size: 44px;
    font-family: $font-2;
    color: $color-text-blue;
    line-height: 72px;
    border-bottom: 1px solid $color-20;
  }
  .sub-card{
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    .sub-title{
      font-family: $font-1;
      color: $color-text-grey-1;
    }
    .sub-number{
      font-family: $font-2;
      color: $color-text-blue;
    }
  }
}
</style>

<script>
import CountUp from '../countup/countUp'
export default {
  name: 'BalanceCard',
  props: {
    content: Object,
  },
  components: {
    CountUp
  },
};
</script>