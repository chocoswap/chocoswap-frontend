import messages from './locale'
import Title from '../../components/title/title.vue'
import SubTitle from '../../components/title/subTitle.vue'
import Space from '../../components/space/space.vue'
import MenuCard from '../../components/menuCard/menuCard.vue'
import { pairs } from '../../config/constant'
import { VNLAAPY, VNLAHUSDAPY } from '../../choco/batch'

export default {
  name: 'Menu',
  i18n: { messages },
  components: {
    Title,
    SubTitle,
    Space,
    MenuCard
  },
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    this.formatItems()
    this.getApy()
    this.getApyInterval()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  watch: {
    '$i18n.locale'() {
      this.formatItems()
    },
  },
  methods: {
    goMenuDetail({type}){
      if(!this.$store.state.wallet.address) return this.$message('Pelese Unlock Wallet!')
      this.$router.push(`/menu/${type}`)
    },
    formatItems() {
      const tmp = [
        {
          type: 'VNLA',
          title: 'VNLA',
          img: ['VNLA'],
          subTitle: `Staking VNLA <br />${this.$t('40')} VNLA`,
        },
        {
          type: 'VNLA-HUSD',
          title: 'VNLA-HUSD',
          img: ['VNLA', 'HUSD'],
          subTitle: `${this.$t('30')} VNLA-HUSD LP<br />${this.$t('40')} VNLA`,
        },
      ];

      this.items = tmp.map((item, index) => ({
        ...item, 
        ...pairs[item.type], 
        apy: '**.**',
        onTab: this.goMenuDetail
      }));
    },
    getApy() {
      VNLAAPY(this.items[0].id).then(res => {
        this.items[0].apy = res.toFixed(2)
      })
      VNLAHUSDAPY(this.items[1]).then(res => {
        this.items[1].apy = res.toFixed(2)
      })
    },
    getApyInterval() {
      this.timer = setInterval(() => {
      this.getApy()
      }, 3000)
    }
  }
}