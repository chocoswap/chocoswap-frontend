<i18n>
{
  "en": {
    "text10": "MAX",
    "text11": "CANCEL",
    "text12": "DEPOSIT",
    "text13": "WITHDRAW",
    "text14": "Enter the amount",
    "text15": "Available",
    "text16": "Unstake"
  },
  "zh": {
    "text10": "最大值",
    "text11": "取消",
    "text12": "质押",
    "text13": "解押",
    "text14": "请输入数量",
    "text15": "可用",
    "text16": "解押"
  }
}
</i18n>
<template>
  <el-dialog
    width="600px"
    :title="`${unstake ? $t('text16') : $t('text12')} ${type} Tokens`"
    :visible="dialogVisible"
    :center="true"
    :show-close="false"
    :before-close="onCancel"
  >
    <p :class="$style['available']">{{available}} {{type}} {{$t('text15')}}</p>
    <div :class="$style['input-amount']">
      <el-input v-model="input" :placeholder="$t('text14')"></el-input>
      <p>{{type}}</p>
      <el-button
        @click="setMax"
      >{{$t('text10')}}</el-button>
    </div>
    <div :class="$style['btns']">
      <el-button
        @click="deposit"
        :loading="pending"
      >{{unstake ? $t('text16') : $t('text12')}}</el-button>
      <el-button
        @click="onCancel"
      >{{$t('text11')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: [
    "dialogVisible",
    "available",
    "pending",
    "onCancel",
    "onDeposit",
    "type",
    "unstake",
  ],
  data() {
    return {
      input: "0"
    };
  },
  methods: {
    setMax() {
      this.input = this.available;
    },
    deposit() {
      if(this.input == '') {
        return
      }
      this.onDeposit(this.input);
    }
  },
  watch: {
    dialogVisible() {
      this.input = "";
    }
  }
};
</script>
<style lang="scss" module>
.available {
  text-align: right;
  font-family: $font-3;
  font-weight: 400;
  color: $color-text-grey-1;
  line-height: 23px;
}
.input-amount {
  display: flex;
  align-items: center;
  margin: 20px 0 10px 0;
  padding: 8px; 
  background: $color-20;
  border-radius: 4px;
  div{
    input {
      background: $color-20;
      border: none;
      font-size: 16px;
      font-family: Inter-Medium, Inter;
      font-weight: 500;
      color: $color-text;
    }
  }
  p:nth-child(2) {
    flex-shrink: 0;
    padding: 0 20px 0 0;
  }
  button{
    width: 60px!important;
    padding: 0!important;
    flex-shrink: 0;
  }
}
.btns {
  display: flex;
  padding-top: 10px;
  justify-content: space-between;
  button:nth-child(2) {
    margin-left: 20px;
  }
}
</style>
