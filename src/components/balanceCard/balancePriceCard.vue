<template>
<div :class="$style['card']">
  <p :class="$style['title']">
    <img src="../../assets/image/VNLA.png">
    {{content.title}}
    <span>
      &nbsp;&nbsp;24h&nbsp;&nbsp;
    </span>
  </p>
  <p :class="$style['number']">
    <span>$<CountUp :endVal="content.number" :lock="content.lock" /></span> 
    <a href="" :class="$style['number-buy']">BUY</a>
  </p>
  <div :class="$style['sub-card']">
    <p :class="$style['sub-number']">
      <!-- <CountUp :endVal="content.subNumber" :lock="content.lock" /> -->
    </p>
  </div>
</div>
</template>

<style lang="scss" module>
@media only screen and (min-width: 768px) {
  .card{
    width: 441px;
    height: 180px;
    background: $color-10;
    border-radius: 24px;
    padding: 25px 24px;
    margin-bottom: 24px;
    .title{
      font-family: $font-1;
      color: $color-text-grey-1;
      img{
        width: 16px;
      }
      span{
        border-radius: 8px;
        background-color: #0E0E1A;
        padding: 0 6px;
      }
    }
    .number{
      font-size: 44px;
      font-family: $font-num;
      color: $color-text-blue;
      line-height: 72px;
      border-bottom: 1px solid $color-20;
      display: flex;
      justify-content: space-between; 
      align-items: center;
      .number-buy{
        display: inline-block;
        width: 76px;
        height: 34px;
        border-radius: 8px;
        border: 1px solid $color-text-blue;
        font-size: 16px;
        font-family: $font-1;
        color: $color-text-blue;
        text-align: center;
        line-height: 34px;
      }
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
        font-family: $font-num;
        color: $color-text-blue;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
    .card{
    width: 441px;
    max-width: 100%;
    height: 180px;
    background: $color-10;
    border-radius: 24px;
    padding: 25px 24px;
    margin-bottom: 24px;
    .title{
      font-family: $font-1;
      color: $color-text-grey-1;
      img{
        width: 16px;
      }
      span{
        border-radius: 8px;
        background-color: #0E0E1A;
        padding: 0 6px;
      }
    }
    .number{
      font-size: 44px;
      font-family: $font-num;
      color: $color-text-blue;
      line-height: 72px;
      border-bottom: 1px solid $color-20;
      display: flex;
      justify-content: space-between; 
      align-items: center;
      .number-buy{
        display: inline-block;
        width: 76px;
        height: 34px;
        border-radius: 8px;
        border: 1px solid $color-text-blue;
        font-size: 16px;
        font-family: $font-1;
        color: $color-text-blue;
        text-align: center;
        line-height: 34px;
      }
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
        font-family: $font-num;
        color: $color-text-blue;
      }
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
    type: String,
  },
  components: {
    CountUp
  },
};
</script>