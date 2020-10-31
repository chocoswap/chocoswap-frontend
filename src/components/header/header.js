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
    }
  },
  computed: {
    
  },
  methods: {
    handleCommandLang: function(lang) {
      this.lang = lang
      document.querySelector('html').lang = MAP_LANGUAGE_TO_CODE[lang]
      this.$root.$i18n.locale = MAP_LANGUAGE_TO_CODE[lang]
    }
  }
}