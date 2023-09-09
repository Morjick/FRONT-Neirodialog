<template>
  <div
    v-show="item.price"
    class="product-item"
    @click="pushToProductPage"
  >
    <div class="product-item__image">
      <!-- <img
        :ref="(el: any) => getImage(item.avatar, el)"
        alt=""
      > -->
      <div
        class="product-item__image-content"
        :style="{
          backgroundImage: `url(${image})`
        }"
      />
    </div>
    <div class="product-item__info">
      <p class="product-item__title">
        {{ item.title }}
      </p>
      <p
        v-if="item.price"
        class="product-item__price"
      >
        &#8381; {{ String(item.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }}
      </p>
    </div>
    <div class="product-item__buttons">
      <ui-button
        v-if="!productInCart.inCart"
        text="В корзину"
        :loading="!addToCartButtonLoading"
        :style="addToCartButtonStyle"
        @send="addToCart"
      />
      <p v-else>
        Уже в корзине
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType } from 'vue'
import { type ProductI } from 'store/modules/product.store'
import UiButton from '~/components/ui/UiButton.vue'
import defaultImage from '~/assets/images/noImage.jpg'

export default defineNuxtComponent({
  name: 'ProductItem',
  data: () => ({
    addToCartButtonLoading: false,

    addToCartButtonStyle: 'min-width: 130px; max-width: 130px; padding: 0 10px; min-height: 10px; height: 40px; margin-left: 10%; margin-bottom: 5%;',
    image: defaultImage,
  }),
  components: { UiButton, },
  props: {
    item: {
      required: true,
      type: Object as PropType<ProductI>,
    },
    load: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    productInCart (): any {
      // eslint-disable-next-line
      // @ts-ignore
      const items = this.$store.getters.getCart?.items

      if (!items) {
        return {
          inCart: false,
          count: 0,
        }
      }

      const productIndex = items.findIndex((el: any) => el.item.id === this.item.id)

      return {
        inCart: productIndex >= 0,
        count: items?.length && productIndex >= 0 ? items[productIndex].count : 0,
      }
    },
  },
  methods: {
    async getImage () {
      const image = await checkImage(this.item.avatar)

      this.image = image
    },
    pushToProductPage () {
      void this.$router.push(`/product/${this.item.href}`)
    },
    async addToCart (count: number = 1) {
      try {
        this.addToCartButtonLoading = true
        // @ts-expect-error i hate this rule
        await this.$store.dispatch('addToCart', {
          itemId: this.item.id,
          count: Number(count),
        })

        this.addToCartButtonLoading = false
      } catch (e) {
      }
    },
  },
  mounted () {
    void this.getImage()
  },
})
</script>

<style lang="scss">
.product-item {
  max-width: 150px;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;

  cursor: pointer;
  box-shadow: var(--default-shadow);

  flex-shrink: 0;

  &__image {
    position: relative;

    max-width: 150px;
    min-height: 150px;
    max-height: 150px;

    overflow: hidden;

    border-bottom: 1px solid var(--font-color-secondary);

    img {
      // height: 100%;
      width: 100%;
      margin-top: 50%;
      margin-left: 50%;

      transform: translate(-50%, -50%);

      &.no-image {
        height: 100%;
        max-height: 150px;

        margin: 0;
        margin-left: 0;
        transform: translate(0, 0);
      }
    }

    &-content {
      width: 150px;
      height: 150px;

      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  &__add-to-cart {
    position: absolute;
    bottom: 0px;
    right: 5px;

    img {
      width: 30px;
      pointer-events: all;
      cursor: pointer;
    }
  }

  &__info {
    padding: 5px 10px;
  }

  &__title {
    color: var(--font-color-subtitle);
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
    font-weight: 800;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    margin: 10px 0 5px;
  }

  &__price {
    color: var(--font-color-primary);
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
  }

  &__buttons {
    p {
      font-size: 12px;
      font-weight: 800;
      text-align: right;

      margin: 20px 10px 10px 0;
    }
  }
}
</style>
