<template>
  <div :class="$.menu">
    <Title :title="type" :img="harvestimg"/>
    <Space height="45"/>
    <div :class="$.content">

      <div :class="$.title">
        <SubTitle :subTitle="`${$t('20')} ${type} LP ${$t('30')} `"/>
        <Space height="36"/>
        <p>{{$t('40')}}</p>
        <Space height="36"/>
        <p>{{`${type} LP ${$t('50')}`}}</p>
      </div>

      <Space width="32"/>

      <div :class="$.card">
        <Space height="15"/>
        <img :class="$['card-img']" :src="harvestimg" />
        <Space height="15"/>
        <p :class="$['card-title']">{{rewardsLp}}</p>
        <Space height="4"/>
        <p :class="$['card-sub-title']">VNLA {{$t('60')}}</p>
        <Space height="22"/>
        <el-button
          @click="harvest"
          :loading="harvesting"
        >{{$t('70')}}</el-button>
      </div>

      <Space width="32"/>

      <div :class="$.card">
        <Space height="15"/>
        <img :class="$['card-img']" :src="stakingimg" />
        <Space height="15"/>
        <p :class="$['card-title']">{{formatDisplay(stakedLp)}}</p>
        <Space height="4"/>
        <p :class="$['card-sub-title']">{{type}} FLP {{$t('80')}}</p>
        <Space height="22"/>
        <div :class="$['btn-box']">
          <el-button
            v-show="isApprove"
            @click="approve"
            :loading="approving"
          >{{$t('90')}} {{type}} LP</el-button>
          <el-button
            v-if="!isApprove"
            class="btn" 
            @click="unstake"
            :loading="unstaking"
          >{{$t('100')}}</el-button>
          <el-button
            v-if="!isApprove"
            class="btn" 
            @click="stake"
            :loading="deposit.pending"
          >+</el-button>
          </div>
      </div>

    </div>
    <Deposit 
      :dialogVisible="deposit.dialogVisible"
      :available="deposit.available"
      :onCancel="deposit.onCancel"
      :onDeposit="deposit.onDeposit"
      :pending="deposit.pending"
      :type="type"
    />
    <Deposit 
      :dialogVisible="unstakeContent.dialogVisible"
      :available="unstakeContent.available"
      :onCancel="unstakeContent.onCancel"
      :onDeposit="unstakeContent.onDeposit"
      :pending="unstakeContent.pending"
      :type="type"
      :unstake="true"
    />
  </div>
</template>
<style src="./menuDetail.scss" lang="scss" module="$"></style>
<script src="./menuDetail.js"></script>