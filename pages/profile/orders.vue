<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div
    v-if="orders.length"
    class="order-page"
  >
    <p class="order-page__subtitle">
      На данный момент нет возможности оплатить заказ в режиме "Онлайн".
    </p>
    <p class="order-page__subtitle">
      По созданному заказу с Вами свяжется наш сотрудник.
    </p>
    <div
      v-for="order in orders"
      :key="order.id"
      class="order-page__item"
    >
      <div class="order-page__header">
        <div class="order-page__date">
          {{ new Date(order.createdAt).toLocaleString("ru") }}
        </div>
        <div class="order-page__summ">
          {{ String(order.summ ).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }} &#8381; -
          <span
            v-if="order.needPay"
            class="danger"
          >Не оплачен</span>
          <span
            v-else
            class="aproove"
          >Оплачен</span>
        </div>
      </div>
      <div class="order-page__body">
        <div
          v-for="productItem in order.cart.items"
          :key="productItem.id"
          class="order-page__product"
          @click="pushToProduct(productItem.item)"
        >
          <div class="order-page__product--avatar" />
          <div class="order-page__product--body">
            <div class="order-page__product--title">
              {{ productItem.item.title }}
            </div>
            <div class="order-page__product--summ">
              {{ productItem.item.price }} &#8381; * {{ productItem.count }} шт
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="order-page"
  >
    <h1>У вас пока нет заказов</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { type OrderI } from '~/store/modules/auth.store'
import { type ProductI } from '~/store/modules/product.store'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'

export default defineComponent({
  name: 'OrderPage',
  components: { UiBreadcrumbs, },
  props: {},
  setup () {
    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Профиль',
        path: '/profile',
      },
      {
        title: 'Мои заказы',
        path: '/orders',
      },
    ]

    return {
      breadcrumbs,
    }
  },
  data: () => ({}),
  computed: {
    orders (): OrderI[] {
      // @ts-expect-error
      return this.$store.getters.getOrders
    },
  },
  mounted () {},
  methods: {
    pushToProduct (product: ProductI) {
      void this.$router.push(`/product/${product.href}`)
    },
  },
})
</script>

<style lang="scss">
.order-page {
  &__subtitle {
    margin-bottom: 20px;
  }

  &__item {
    margin-bottom: 20px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    box-shadow: var(--default-shadow);
    padding: 20px;
    border-radius: 6px;
    overflow: hidden;
  }

  &__summ {
    span.danger {
      color: var(--danger-color);
    }
    span.aproove {
      color: var(--aproove-color);
    }
  }

  &__product {
    display: inline-block;
    max-width: 140px;

    margin-top: 20px;
    margin-right: 20px;
    padding: 10px;
    box-shadow: var(--default-shadow);
    overflow: hidden;
    cursor: pointer;

    &--title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &--summ {
      font-size: 12px;
    }
  }
}
</style>
