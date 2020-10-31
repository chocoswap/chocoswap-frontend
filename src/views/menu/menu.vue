<template>
  <div :class="$.menu">
    <div :class="$.title">
      <Title :title="$t('10')" width="346"/>
      <Space height="20"/>
      <SubTitle :subTitle="$t('20')" width="346"/>
    </div>
    <Space width="32"/>
    <div :class="$.content">
      <div v-for="(item, index) in items" :key="index">
        <MenuCard :content="item"/>
      </div>
    </div>
  </div>
</template>
<style src="./menu.scss" lang="scss" module="$"></style>
<script src="./menu.js"></script>