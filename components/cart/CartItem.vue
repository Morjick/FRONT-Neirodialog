<template>
  <div class="cart-item">
    <div class="cart-item__info">
      <div class="cart-item__head">
        {{ item.title }}
      </div>
      <div class="cart-item__bottom">
        <router-link
          :to="`/product/${item.href}`"
          target="_blank"
        >
          На страницу товара
        </router-link>
      </div>
    </div>
    <div class="cart-item__price">
      <p class="cart-item__base-price">
        &#8381; {{ String(item.basePrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }}
      </p>
      <div class="cart-item__price--summ">
        <p>
          {{ String(item.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }} &#8381; / шт
        </p>
        <p v-if="count !== 1">
          {{ getSummPrices(item.price) }} &#8381; / итого
        </p>
      </div>
    </div>
    <div class="cart-item__actions">
      <ui-counter
        :count="count"
        :loading="loading"
        @update="emitUpdate"
      />
      <div
        class="remove-button"
        @click="deleteCartItem"
      >
        <img
          v-if="!removeLoading"
          src="~/assets/icons/delete.png"
          alt=""
        >
        <img
          v-else
          src="~/assets/gif/loader.gif"
          style="width: 24px;"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import { type ProductI } from '~/store/modules/product.store'
import UiCounter from '~/components/ui/UiCounter.vue'

export default defineComponent({
  name: 'CartItem',
  components: { UiCounter, },
  props: {
    item: {
      type: Object as PropType<ProductI>,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  emits: ['delete-cart-item', 'update-count',],
  data: () => ({
    loading: false,
    removeLoading: false,
  }),
  computed: {},
  watch: {
    count () {
      this.loading = false
    },
  },
  mounted () {},
  methods: {
    deleteCartItem () {
      this.removeLoading = true
      this.$emit('delete-cart-item', this.item)
    },
    getSummPrices (price: number) {
      const summ = price * this.count

      return String(summ).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    },
    emitUpdate (count: number) {
      this.loading = true

      this.$emit('update-count', {
        count,
        product: this.item,
      })
    },
  },
})
</script>

<style lang="scss">
.cart-item {
  display: flex;
  justify-content: space-between;

  padding: 10px 40px;
  margin-bottom: 20px;

  border-radius: 3px;
  box-shadow: var(--default-shadow);
  overflow: hidden;

  @media (max-width: 500px) {
    flex-wrap: wrap;
  }

  &__info {
    width: 50%;
    margin-right: 50px;
  }

  &__head {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__bottom {
    a {
      color: var(--font-color-href);
      font-size: 12px;
      margin: 0;
    }
  }

  &__price {
    width: 300px;
    margin-right: 20px;

    p {
      margin: 0;
    }

    &--summ {
      display: flex;
      p {
        flex-shrink: 0;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    @media (max-width: 500px) {
      margin: 10px 0;
    }
  }

  &__base-price {
    font-size: 14px;
    text-decoration: line-through;
  }

  &__actions {
    display: flex;
    align-items: center;

    .remove-button {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>
