import { createStore } from 'vuex'
import { AuthStore } from './modules/auth.store'
import { ProductStore } from './modules/product.store'
import { CartStore } from './modules/cart.store'
import { ArticleStore } from './modules/article.store'

const store = createStore({
  modules: {
    authStore: AuthStore,
    product: ProductStore,
    cart: CartStore,
    article: ArticleStore,
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)
})
