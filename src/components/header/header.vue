<template>
  <div :class="$.head">
    <img src="@/assets/image/logo.png" />
    <div :class="$.menu">
      <router-link :style="{color: isHome ? '#6BB5FF': ''}" to="/">{{$t('10')}}</router-link>
      <router-link :style="{color: isMenu ? '#6BB5FF': ''}" to="/menu">{{$t('20')}}</router-link>
      <!-- <router-link to="/staking">{{$t('30')}}</router-link> -->
      <a style="cursor: pointer" @click="goAbout">{{$t('40')}}</a>
    </div>
    <div :class="$.wallet">
      <UnLockWallet />
      <el-dropdown @command="handleCommandLang" placement="bottom">
        <span class="el-dropdown-link">
          {{lang}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="EN">EN</el-dropdown-item>
          <el-dropdown-item command="ZH">ZH</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<style src="./header.scss" lang="scss" module="$"></style>
<script src="./header.js"></script>