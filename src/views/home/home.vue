<template>
  <div :class="$.home">
    <Title :title="$t('10')" width="538"/>
    <Space height="29"/>
    <SubTitle :subTitle="$t('20')" width="660"/>
    <Space height="84"/>
    <div :class="$['balance-cards']">
      <BalanceCard :content="balanceContent" />
      <BalanceCard :content="totalSupplyContent" />
      <!-- <BalanceCard :content="totalValue" type="$"/> -->
      <!-- <BalancePriceCard :content="vnlaPrice"/> -->
    </div>
    <p :class="$['mdex']">
      {{$t('100')}}
       <a href="https://mdex.com/#/"  target="view_window">MDEX</a> 
      {{$t('110')}}
    </p>
    <el-dialog width="400px" :title="$t('80')" :visible="visible" :append-to-body="true" :before-close="handleClose">
      <div :class="$['tips']">
        {{$t('90')}}
      </div>
    </el-dialog>
  </div>
</template>
<style src="./home.scss" lang="scss" module="$"></style>
<script src="./home.js"></script>