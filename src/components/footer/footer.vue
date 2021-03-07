<template>
  <div :class="$.footer">
    <div :class="$.contactus">
      <span>{{$t('10')}}</span>
      <span>
        <a target="_blank" href="https://medium.com/@chocoswap"><img src="@/assets/image/medium.png" alt=""></a>
        <a target="_blank" href="https://twitter.com/Choco_Swap"><img src="@/assets/image/twitter.png" alt=""></a>
        <a target="_blank" href="https://github.com/chocoswap"><img src="@/assets/image/github.png" alt=""></a>
      </span>
      <span>
        <a target="_blank" href="https://www.facebook.com/Chocoswap-108217491075427"><img src="@/assets/image/facebook.png" alt=""></a>
        <a target="_blank" href="https://www.reddit.com/r/Chocoswap/"><img src="@/assets/image/reddit.png" alt=""></a>
        <a target="_blank" href="https://t.me/chocoswap"><img src="@/assets/image/telegram.png" alt=""></a>
      </span>
    </div>
    <!-- <img :class="$.decorate" src="@/assets/image/footer_decorate.png" alt=""> -->
  </div>
</template>
<style src="./footer.scss" lang="scss" module="$"></style>
<script src="./footer.js"></script>