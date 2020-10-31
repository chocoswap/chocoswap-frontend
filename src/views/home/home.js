import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import BalanceCard from '../../components/balanceCard/balanceCard.vue'
import Space from '../../components/space/space.vue'
import { homeRequestsInBatch } from '../../choco/batch'
import { getBalanceNumber } from "../../utils/format";

export default {
  name: 'Home',
  i18n: { messages },
  components: {
    Title,
    SubTitle,
    BalanceCard,
    Space,
  },
  data() {
    return {
      balanceContent: {
        number: 0,
        subNumber: 0,
        lock: true,
      },
      totalSupplyContent: {
        number: 0,
        subNumber: 0,
      },
      visible: true
    }
  },
  methods: {
    formatContent(){
      this.balanceContent = {
        ...this.balanceContent,
        title: this.$t('40'),
        subTitle: this.$t('50'),
      }
      this.totalSupplyContent = {
        ...this.totalSupplyContent,
        title: this.$t('60'),
        subTitle: this.$t('70'),
      }
    },
    handleClose(){
      this.visible = false
    },
    requests() {
      homeRequestsInBatch([
        (err, result) => {
          this.totalSupplyContent.number = getBalanceNumber(result)
        },
        (err, result) => {
          this.totalSupplyContent.subNumber = getBalanceNumber(result)
        },
        (res) => {
          this.balanceContent.number = getBalanceNumber(res.splice(0,1)[0])
          const pedingReward = res.reduce((pre, next) => {
            return pre + Number(next) 
          }, 0)
          this.balanceContent.subNumber = getBalanceNumber(pedingReward)
        },
      ])
    }
  },
  watch: {
    '$store.state.wallet.address'(address, oldAddress) {
      if (!oldAddress && address) {
        this.requests();
      }
    },
    '$i18n.locale'() {
      this.formatContent()
    },
  },
  mounted() {
    this.formatContent()
    this.requests()
  },
}