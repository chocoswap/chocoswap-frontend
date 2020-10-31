<template>
  <div :class="$['not-found']">
    <img src="./404.svg" alt="">
    <el-button>
      <router-link to="/">
        {{ $t('10') }}
      </router-link>
    </el-button>
  </div>
</template>
<style src="./404.scss" lang="scss" module="$"></style>
<script src="./404.js"></script>