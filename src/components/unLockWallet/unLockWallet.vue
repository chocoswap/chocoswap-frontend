<template>
  <div :class="$['unlock-wallet']">
    <el-button
      :class="$['btn']"
      @click="unlockWallet"
    >{{loginText}}</el-button>


    <el-dialog
      width="400px"
      :title="$t('80')"
      :visible.sync="metamaskDialogVisible"
      :append-to-body="true"
    >
      <p style="font-size: 18px; line-height: 32px;">
        {{$t('90')}}
        <strong>MetaMask</strong>
        {{$t('100')}}
        <el-button
          type="text"
          @click="onRefesh"
          style="font-size: 18px;"
        >{{$t('110')}}</el-button>.
      </p>
      <a href="https://metamask.io/" target="_blank" style="display: block; margin-top: 24px;">
        <el-button :round="true" style="width: 100%;">{{$t('120')}}</el-button>
      </a>
    </el-dialog>

    <el-dialog width="400px" :title="$t('30')" :visible.sync="dialogVisible" :append-to-body="true">
      <div :class="$['my-wallet']">
        <img :class="$['img']" :src="require(`../../assets/image/VNLA.png`)"/>
        <p>{{funsBalance}}</p>
        <p>{{$t('40')}}</p>
        <el-button
          @click="goEtherscan"
        >{{$t('50')}}</el-button>
        <el-button
          @click="signOut"
        >{{$t('60')}}</el-button>
        <el-button
          @click="cancel"
        >{{$t('70')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style src="./unLockWallet.scss" lang="scss" module="$"></style>
<script src="./unLockWallet.js"></script>


