import messages from './locale'
import UnLockWallet from '../unLockWallet/unLockWallet.vue'

const MAP_LANGUAGE_TO_CODE = {
  'EN': 'en',
  'ZH'  : 'zh',
}

export default {
  i18n: { messages },
  components: {
    UnLockWallet
  },
  data() {
    return {
      lang: 'EN',
      isHome: this.$route.fullPath === '/',
      isMenu: this.$route.fullPath.includes('menu'),
    }
  },
  methods: {
    handleCommandLang: function(lang) {
      this.lang = lang
      document.querySelector('html').lang = MAP_LANGUAGE_TO_CODE[lang]
      this.$root.$i18n.locale = MAP_LANGUAGE_TO_CODE[lang]
    },
    getPath(){
      this.isHome = this.$route.fullPath === '/'
      this.isMenu = this.$route.fullPath.includes('menu')
    },
    goAbout(){
      if(this.lang === 'EN'){
        window.open('https://chocoswap.medium.com/vnla-defi-mining-instructions-54817a37e421', '_blank')
      }else{
        window.open('https://www.jinse.com/news/blockchain/1011752.html', '_blank')
      }
    }
  },
  watch:{
    '$route': 'getPath'
  }
}