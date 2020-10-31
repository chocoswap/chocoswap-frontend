import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import en from './i18n/en'

import enLocale from 'element-ui/lib/locale/lang/en'
import ElementLocale from 'element-ui/lib/locale'
import {
  Message, Loading,
  Button, DatePicker, Dialog,
  Collapse, CollapseItem,
  Dropdown, DropdownMenu, DropdownItem,
  Menu, Submenu, MenuItem, MenuItemGroup,
  Input, Form, FormItem, Checkbox, 
  Link, Upload, Option, Select,
  Pagination, Table, TableColumn,
  Carousel, CarouselItem,
} from 'element-ui'

import './style/base.scss'
import './style/element.scss'
import './style/element-variables.scss'

Vue.config.productionTip = false
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$message = Message;
Vue.prototype.$loading = options => Loading.service({
  spinner: 'el-icon-loading',
  background: 'rgba(150, 150, 150, 0.3)',
  ...options,
})
Vue.use(VueI18n)

const components = [
  Button, DatePicker, Dialog,
  Collapse, CollapseItem,
  Dropdown, DropdownMenu, DropdownItem,
  Menu, Submenu, MenuItem, MenuItemGroup,
  Input, Form, FormItem, Checkbox,
  Link, Upload, Option, Select,
  Pagination, Table, TableColumn,
  Carousel, CarouselItem,
]
components.forEach(component => Vue.use(component))

const i18n = new VueI18n({
  locale: 'en',
  // locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en: { ...en, ...enLocale },
  },
  silentTranslationWarn: true,
})

ElementLocale.i18n((key, value) => i18n.t(key, value))


window.VM = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
