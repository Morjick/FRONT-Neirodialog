<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div
    class="product-page"
  >
    <div class="product-page__main">
      <div
        class="product-page__info"
      >
        <div class="product-page__info-title">
          <h1>{{ product.title }}</h1>
          <img
            v-if="true"
            src="~/assets/icons/favorite.png"
            alt=""
          >
          <img
            v-if="false"
            src="~/assets/icons/favorite-active.png"
            alt=""
          >
        </div>

        <div
          class="product-page__description"
          v-html="product.description"
        />
      </div>
      <div
        v-if="product.images && product.images.length"
        class="product-page__slider"
      >
        <img
          v-for="image in product.images"
          :key="image"
          :ref="(el: any) => getImage(image, el)"
          :style="{
            transform: `translateX(${sloderTransition})`
          }"
          alt=""
        >
        <div class="product-page__slider__dots">
          <span
            v-for="(image, index) in product.images"
            :key="image"
            :class="{
              active: index <= activeImageIndex
            }"
            @click="setActiveImageIndex(index)"
          />
        </div>
      </div>
      <div
        v-else
        class="product-page__no-image"
      >
        <img
          src="~/assets/images/noImage.jpg"
          alt=""
        >
      </div>
    </div>
    <div class="product-page__price">
      <div class="product-page__price-info">
        <div v-if="product.discount">
          <p style="text-decoration: line-through;">
            &#8381; {{ String(product.basePrice).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }}
          </p>
          <p>&#8381; {{ String(product.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }}</p>
        </div>
        <div
          v-else
          style="font-weight: 800;"
        >
          &#8381; {{ String(product.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') }}
        </div>
      </div>
      <ui-counter
        v-if="productInCart.inCart"
        :loading="counterLoading"
        :count="productInCart.count"
        @update="updateProductCount"
      />
      <ui-button
        v-else
        text="В корзину"
        :loading="!addToCartButtonLoading"
        @send="addToCart"
      />
    </div>
    <div class="product-page__characteristic">
      <h1>Характеристики</h1>
      <div
        v-for="characteristic in tempCharacteristic"
        :key="characteristic.key"
        class="product-page__characteristic-item"
      >
        <div class="product-page__characteristic-item__key">
          {{ characteristic.key }}
        </div>
        <div class="product-page__characteristic-item__value">
          {{
            typeof characteristic.value !== 'boolean'
              ? characteristic.value
              : characteristic.value ? 'Да' : 'Нет'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { type ProductI } from 'store/modules/product.store'
import { defineComponent } from 'vue'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'
import UiButton from '~/components/ui/UiButton.vue'
import UiCounter from '~/components/ui/UiCounter.vue'

export default defineComponent({
  name: 'ProductDetailPage',
  components: { UiBreadcrumbs, UiButton, UiCounter, },
  props: {},
  async setup () {
    const route = useRoute()
    const href: string = Array.isArray(route.params.href) ? route.params.href[0] : route.params.href

    const { data, }: any = await preFetch(`product/get-one/${href}`)
    const product: ProductI = data.value.product

    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Каталог',
        path: '/catalog',
      },
      {
        title: product.title,
        path: `/product/${product.href}`,
      },
    ]

    useHead({
      title: product.title,
      meta: [
        { name: 'description', content: product.description, },
        { name: 'og:title', content: product.title, },
        { name: 'og:description', content: product.description, },
        { name: 'og:image', content: String(process.env.baseURL) + product.avatar, },
      ],
    })

    const tempCharacteristic = [
      {
        key: 'Объём / л',
        value: product.volume,
      },
      {
        key: 'Вес / кг',
        value: product.weight,
      },
      {
        key: 'Размер / м',
        value: product.size,
      },
      {
        key: 'Количество в упаковке / шт',
        value: product.quantityInThePackage,
      },
      {
        key: 'Производитель',
        value: product.author.firstname + product.author.lastname,
      },
      {
        key: 'Товар подлежит маркировке',
        value: product.labeling,
      },
      {
        key: 'В наличии',
        value: product.inStock,
      },
      {
        key: 'Колличество в наличии',
        value: product.countInStock,
      },
    ]

    return {
      breadcrumbs,
      product,
      tempCharacteristic: tempCharacteristic.filter((el: any) => el.value !== null && el.value !== undefined),
    }
  },
  data: () => ({
    isPageLoad: false,
    counterLoading: false,
    addToCartButtonLoading: false,
    activeImageIndex: 0,
  }),
  computed: {
    productInCart () {
      // @ts-expect-error
      const items = this.$store.getters.getCart ? this.$store.getters.getCart.items : []

      const productIndex = items.findIndex((el: any) => el.item.id === this.product.id)

      return {
        inCart: productIndex >= 0,
        count: items?.length && productIndex >= 0 ? items[productIndex].count : 0,
      }
    },
    sloderTransition (): string {
      return String(this.activeImageIndex * -600) + 'px'
    },
  },
  mounted () {
    setTimeout(() => { this.isPageLoad = true }, 1000)
    setInterval(() => {
      if (this.activeImageIndex >= this.product.images.length - 1) {
        this.activeImageIndex = 0
      } else {
        this.activeImageIndex++
      }
    }, 2000)
  },
  methods: {
    async getImage (imageUrl: string, el: any) {
      if (el?.src || !el) {
        return false
      }
      const image: any = await checkImage(imageUrl)

      el?.setAttribute('src', image)
    },
    async addToCart (count: number = 1) {
      try {
        this.addToCartButtonLoading = true
        // @ts-expect-error
        void await this.$store.dispatch('addToCart', {
          itemId: this.product.id,
          count: Number(count),
        })

        // @ts-expect-error
        void this.$store.dispatch('fetchDetailProduct', this.product.href)
        this.addToCartButtonLoading = false
      } catch (e) {
      }
    },
    async updateProductCount (count: number) {
      this.counterLoading = true

      // @ts-expect-error
      await this.$store.dispatch('addToCart', {
        itemId: this.product.id,
        count: Number(count),
      })

      // @ts-expect-error
      void this.$store.dispatch('fetchDetailProduct', this.product.href)
      this.counterLoading = false
    },
    setActiveImageIndex (index: number) {
      this.activeImageIndex = index
    },
  },
})
</script>

<style lang="scss">
.product-page {
  &__main {
    display: flex;
    justify-content: space-between;

    margin-bottom: 50px;

    .product-page__description {
      width: 100%;
    }

    @media (max-width: 500px) {
      display: block;
    }
  }

  &__price {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .ui-button, .ui-counter {
      margin-left: 50px;
    }

    div p {
      margin: 0;

      &:first-child {
        font-size: 14px;
        color: var(--font-color-secondary);
      }
    }
  }

  &__info {
    width: 48%;

    .product-page__info-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;

      h1 {
        margin: 0;
        margin-bottom: 20px;
      }
    }

    @media (max-width: 500px) {
      width: 100%;
    }
  }

  &__slider {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    position: relative;

    max-width: 600px;
    min-height: 400px;
    max-height: 400px;
    width: 48%;

    border-radius: 6px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      min-width: 600px;
      transition: all .2s;
    }

    &__dots {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      position: absolute;

      right: 0;
      bottom: 0;

      width: 100%;
      height: 50px;

      background: rgba(0, 0, 0, .2);
      padding: 10px;

      span {
        display: block;
        width: 60px;
        height: 10px;

        margin-right: 10px;
        background: var(--danger-color);
        transition: all .2s;
        cursor: pointer;

        &.active {
          background: var(--danger-color-alternative);
          box-shadow: var(--danger-shadow);
        }
      }
    }

    @media (max-width: 500px) {
      width: 100%;
    }
  }

  &__no-image {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 400px;
    padding: 5px;

    background: var(--shadow-color);

    img {
      height: 100%;
    }
  }

  &__characteristic {
    margin-bottom: 30px;

    &-item {
      display: flex;
      border-left: 1px solid var(--primary-color);
      border-top: 1px solid var(--primary-color);
      border-right: 1px solid var(--primary-color);

      &:last-child {
        border-bottom: 1px solid var(--primary-color);
      }

      div {
        width: 50%;
        padding: 10px;

        &:first-child {
          border-right: 1px solid var(--primary-color);
        }
      }
    }
  }
}
</style>
