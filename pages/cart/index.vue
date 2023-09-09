<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div
    v-if="cart && cart.items"
    class="cart-page"
  >
    <h1 v-if="cart.items.length">
      Продукты в вашей корзине:
    </h1>
    <h1 v-else>
      Корзина пуста
    </h1>
    <div class="cart-page__items">
      <cart-item
        v-for="item in cart.items"
        :key="item.id"
        :item="item.item"
        :count="item.count"
        @delete-cart-item="deleteCartItem"
        @update-count="updateCartItem"
      />
    </div>
    <h1
      v-if="cart.items.length"
    >
      Адрес доставки:
    </h1>
    <p
      v-if="!address.length"
      class="cart-page__no-image"
    >
      Вы не добавили ни одного адреса. Хотите
      <router-link to="/profile/address">
        добавить
      </router-link>?
    </p>
    <ui-select
      v-if="cart.items.length"
      :items="address"
      :disabled="!address.length"
      :default-value="defautlAddress"
      empty-message="Нет доступных адресов"
      text-value="address"
      active-value="id"
      @select="setAddress"
    />
    <h1 v-if="cart.items.length">
      Оплата:
    </h1>
    <p
      v-if="summ < 3000 && cart.items.length"
      class="validate"
    >
      Минимальная сумма заказа - 3000 рублей
    </p>
    <p
      v-if="errorMessage.length"
      class="validate"
    >
      {{ errorMessage }}
    </p>
    <div
      v-if="cart.items.length"
      class="cart-page__payment"
    >
      <p>
        Сумма к оплате:
        <span>{{ String(summ).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }} &#8381;</span>
      </p>
      <ui-button
        text="Перейти к оплате"
        :loading="paymentButtonLoading"
        :disabled="summ < 3000"
        @send="pushToPay"
      />
    </div>
  </div>
  <div v-else>
    <h1>Подождите, корзина загружается</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { type CartI } from '~/store/modules/cart.store'
import { type ProductI } from '~/store/modules/product.store'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'
import UiButton from '~/components/ui/UiButton.vue'
import CartItem from '~/components/cart/CartItem.vue'
import UiSelect from '~/components/ui/UiSelect.vue'
import { type AddressI } from '~/store/modules/auth.store'

interface UpdateCountCartItemI {
  count: number
  product: ProductI
}

export default defineComponent({
  name: 'CartPage',
  components: { UiBreadcrumbs, UiButton, CartItem, UiSelect, },
  props: {},
  setup () {
    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Каталог',
        path: '/catalog',
      },
      {
        title: 'Моя корзина',
        path: '/cart',
      },
    ]

    return {
      breadcrumbs,
    }
  },
  data: () => ({
    paymentButtonLoading: true,
    selectedAddress: null as AddressI | null,
    errorMessage: '',
  }),
  computed: {
    cart (): CartI {
      const store: any = this.$store
      return store.getters.getCart
    },
    summ (): number {
      const store: any = this.$store
      return store.getters.getCartSumm
    },
    address (): AddressI[] {
      const store: any = this.$store
      return store.getters.getMainUser ? store.getters.getMainUser.address : []
    },
    defautlAddress () {
      const store: any = this.$store
      return store.getters.getDefaultAddress
    },
  },
  mounted () {},
  methods: {
    pushToCatalog () {
      void this.$router.push('/shop')
    },
    async pushToPay () {
      this.paymentButtonLoading = false

      if (!this.selectedAddress) {
        this.errorMessage = 'Для совершения заказа необходимо указать адрес'
        this.paymentButtonLoading = true
        return false
      }

      // @ts-expect-error
      await this.$store.dispatch('createOrder')

      this.paymentButtonLoading = true
      void this.$router.push('/profile/orders')
    },
    async deleteCartItem (item: ProductI) {
      // @ts-expect-error
      await this.$store.dispatch('addToCart', {
        itemId: item.id,
        count: 0,
      })
    },
    async updateCartItem (update: UpdateCountCartItemI) {
      // @ts-expect-error
      await this.$store.dispatch('addToCart', {
        itemId: update.product.id,
        count: Number(update.count),
      })

      // @ts-expect-error
      await this.$store.dispatch('fetchCart')
    },
    setAddress (address: AddressI) {
      this.selectedAddress = address
    },
  },
})
</script>

<style lang="scss">
.cart-page {
  p.validate {
    color: var(--danger-color);
  }

  &__payment {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;

    p {
      @media (max-width: 500px) {
        margin-bottom: 10px;
      }

      span {
        font-weight: 800;
        font-size: 20px;

        margin-left: 20px;
      }
    }

    @media (max-width: 500px) {
      display: block;
    }
  }

  &__no-image {
    a {
      font-weight: 700;
      color: var(--font-color-href);
    }
  }
}
</style>
