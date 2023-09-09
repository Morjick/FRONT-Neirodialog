import { type ActionContext } from 'vuex'
import { type ProductI } from './product.store'

interface CartItemI {
  id: number
  cartId: number
  itemId: number
  count: number
  item: ProductI
}

interface AddressI {
  id: number
  userId: number
  address: string
}

interface UserI {
  id: number
  firstname: string
  lastname: string
  email: string
  city: string
  role: string
  // eslint-disable-next-line no-use-before-define
  cart: CartI
  orders: any
  address: AddressI[]
  defaultAddress: AddressI
  avatar: string
}

interface CartI {
  id: number
  userId: number
  user: UserI
  items: CartItemI[]
}

interface OrderI {
  id: number
  userId: number
  cartId: number
  summ: number
  needPay: boolean
  user: UserI
  cart: CartI
  createdAt: string
}

interface AuthStoreState {
  isAuth: boolean
  mainUser: UserI | null
  token: string
  cart: any
  ssrTest?: string
  context?: any
  orders: OrderI[]
}

const AuthStore = {
  state: (): AuthStoreState => ({
    isAuth: false,
    mainUser: null,
    token: '',
    cart: [],
    ssrTest: 'no prefetch',
    context: {},
    orders: [],
  }),
  getters: {
    getMainUser (state: AuthStoreState): UserI | null {
      return state.mainUser
    },
    getisAuth (state: AuthStoreState): boolean {
      return state.isAuth
    },
    getToken (state: AuthStoreState): string {
      return state.token
    },
    getSsrTest (state: AuthStoreState) {
      return state.ssrTest
    },
    getAddress (state: AuthStoreState) {
      return state.mainUser ? state.mainUser.address : []
    },
    getDefaultAddress (state: AuthStoreState) {
      return state.mainUser ? state.mainUser.defaultAddress : null
    },
    getOrders (state: AuthStoreState) {
      return state.orders
    },
  },
  actions: {
    async login (context: ActionContext<'S', 'R'>, data: any) {
      context.commit('setToken', data.token)
      context.commit('setMainUser', data.user)
      context.commit('setIsAuth', true)
      context.commit('setCart', data.cart)

      await context.dispatch('getOrders')
    },
    async checkToken (context: ActionContext<'S', 'R'>, token: string) {
      context.commit('setSsrTest', { value: token, })
      if (!token) {
        return
      }

      const { data, }: any = await $fetch('user/check-token', {
        method: 'POST',
      })

      await context.dispatch('login', data)
    },
    logout (context: ActionContext<'S', 'R'>) {
      context.commit('setToken', '')
      context.commit('setMainUser', null)
      context.commit('setIsAuth', false)
      context.commit('setCart', [])
    },
    async getOrders (context: ActionContext<'S', 'R'>) {
      const data: any = await $fetch('order/get-many')

      context.commit('setOrders', data.orders)
    },
  },
  mutations: {
    setToken (state: AuthStoreState, token: string) {
      state.token = token
    },
    setMainUser (state: AuthStoreState, user: UserI) {
      state.mainUser = user
    },
    setIsAuth (state: AuthStoreState, key: boolean) {
      state.isAuth = key
    },
    setCart (state: AuthStoreState, cart: any) {
      state.cart = cart
    },
    setSsrTest (state: AuthStoreState, { value, context, }: any) {
      state.ssrTest = value
      state.context = context
    },
    setOrders (state: AuthStoreState, orders: OrderI[]) {
      state.orders = orders.reverse()
    },
    setDefaultAddress (state: AuthStoreState, address: AddressI) {
      if (!state.mainUser) {
        return
      }

      state.mainUser.defaultAddress = address
    },
    addAddress (state: AuthStoreState, address: AddressI) {
      if (!state.mainUser) { return false }
      state.mainUser.address.push(address)
    },
  },
}

export {
  AuthStore,
  type UserI,
  type AuthStoreState,
  type OrderI,
  type AddressI,
  type CartItemI,
  type CartI
}
