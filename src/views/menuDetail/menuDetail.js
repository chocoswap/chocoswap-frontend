import Vue from "vue";
import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import Space from '../../components/space/space.vue'
import MenuCard from '../../components/menuCard/menuCard.vue'
import Deposit from '../../components/deposit/deposit.vue'

import { mapState } from "vuex";
import { pairs, MAX_NUMBER } from '../../config/constant'
import {
  putApprove,
  getRewardLP,
  putDeposit,
  putWithdrawAll
} from '../../choco/index'
import { menuDetailRequestsInBatch } from '../../choco/batch'
import { getDisplayBalance, getDisplayLP, getFullDisplayBalance } from "../../utils/format";

export default {
  name: 'MenuDetail',
  i18n: { messages },
  components: {
    Title,
    SubTitle,
    Space,
    MenuCard,
    Deposit
  },
  data() {
    return {
      type: "",
      harvesting: false,
      approving: false,
      unstaking: false,
      rewardsLp: "0.0000",
      stakedLp: "0.0000",
      deposit: {
        dialogVisible: false,
        available: 0,
        onCancel: this.onCancel,
        onDeposit: this.onDeposit,
        pending: false
      },
      unstakeContent: {
        dialogVisible: false,
        available: 0,
        onCancel: this.onCancelUnstake,
        onDeposit: this.onUnstake,
        pending: false
      },
      allowanceAmount: 0,
    }
  },
  mounted() {
    this.type = this.$route.params.type;
    Vue.nextTick(() => {
      this.getPresonInfo();
    });
  },
  computed: {
    ...mapState({
      address: state => state.wallet.address,
    }),
    hash() {
      return pairs[this.type] && pairs[this.type].hash;
    },
    pid() {
      return pairs[this.type] && pairs[this.type].id;
    },
    harvestimg() {
      return this.type && require(`../../assets/image/${this.type.split('-')[0]}.png`);
    },
    stakingimg() {
      return this.type && require(`../../assets/image/${this.type.split('-')[1]}.png`);
    },
    isUnlock() {
      return !!this.address;
    },
    isApprove() {
      return this.allowanceAmount - 2 ** 32 <= 0;
    }
  },
  watch: {
    address(address, oldAddress) {
      if (!oldAddress && address) {
        this.getPresonInfo();
      }
    }
  },
  methods: {
    getPresonInfo() {
      if (!this.$store.state.wallet.address) {
        return
      }

      menuDetailRequestsInBatch(pairs[this.type], [
        (err, result) => {
          this.deposit.available = getFullDisplayBalance(result);
        },
        (err, result) => {
          this.stakedLp = result.amount;
          this.unstakeContent.available = getFullDisplayBalance(result.amount);
        },
        (err, result) => {
          this.rewardsLp = getDisplayBalance(result);
        },
        (err, result) => {
          this.allowanceAmount = result
        },
      ])
    },
    harvest() {
      this.harvesting = true;
      putWithdrawAll(pairs[this.type].id, 0, (err, tx) => {
        if (!err) {
          this.transferBoxVisible = true;
          this.coinCode = this.type + ' FLP';
          this.coinAmount = this.stakedLp;
          this.tx = tx;
        }
      })
        .then(res => {
          this.harvesting = false;
          getRewardLP(pairs[this.type].id).then(res => {
            this.rewardsLp = getDisplayBalance(res);
          });
        });
    },
    approve() {
      this.approving = true;
      putApprove(pairs[this.type].hash, (err, tx) => {
        if (!err) {
          this.transferBoxVisible = true;
          this.coinCode = '';
          this.coinAmount = '';
          this.tx = tx;
        }
      })
        .then(res => {
          this.approving = false;
          this.allowanceAmount = MAX_NUMBER;
        }).catch(err => {
          this.approving = false;
        });
    },
    unstake() {
      this.unstakeContent.dialogVisible = true;
    },
    onUnstake(amount) {
      this.unstakeContent.pending = true;
      putWithdrawAll(pairs[this.type].id, amount, (err, tx) => {
        if (!err) {
          this.transferBoxVisible = true;
          this.coinCode = this.type + ' FLP';
          this.coinAmount = amount;
          this.tx = tx;
        }
      })
        .then(res => {
          this.unstakeContent.pending = false;
          this.unstakeContent.dialogVisible = false;

          this.getPresonInfo()
        });
    },
    onCancelUnstake() {
      this.unstakeContent.dialogVisible = false;
    },
    stake() {
      this.deposit.dialogVisible = true;
    },
    onDeposit(amount) {
      this.deposit.pending = true;
      putDeposit(pairs[this.type].id, amount, (err, tx) => {
        if (!err) {
          setTimeout(() => {
            this.transferBoxVisible = true;
            this.tx = tx;
            this.coinCode = this.type + ' FLP';
            this.coinAmount = amount;
          }, 600)
        }
      })
        .then(res => {
          this.deposit.pending = false;
          this.deposit.dialogVisible = false;

          this.getPresonInfo()
        }
        );
    },
    onCancel() {
      this.deposit.dialogVisible = false;
    },
    formatDisplay(num) {
      return getDisplayLP(num)
    },
  }
}