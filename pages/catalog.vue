<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div
    class="catalog-page"
  >
    <catalog-aside
      :filters="filters"
      @update-filters="updateFilters"
    />
    <div class="catalog-page__body">
      <product-item
        v-for="item in products"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'
import ProductItem from '~/components/products/ProductItem.vue'
import CatalogAsideVue, { type FiltersI } from '~/components/catalog/CatalogAside.vue'
import { type ProductI } from '~/store/modules/product.store'

const CatalogAside: any = CatalogAsideVue

export default defineNuxtComponent({
  name: 'CatalogPage',
  async setup () {
    const $route = useRoute()

    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Каталог',
        path: '/catalog',
      },
    ]

    let queryString = ''

    for (const key in $route.query) {
      queryString += `${key}=${$route.query[key]}&`
    }
    queryString = queryString.slice(0, -1)

    const { data, }: any = await preFetch(`product/get-many?${queryString}`)

    const { products, pagination, } = data.value

    const filters = {
      title: $route.query.title ?? '',
      sortColumn: $route.query.sortColumn,
      sort: $route.query.sort,
      pagination,
    }

    useHead({
      title: 'Каталог',
    })

    return {
      breadcrumbs,
      defaultProducts: products as ProductI[],
      filters,
    }
  },
  data: () => ({
    products: [] as ProductI[],
  }),
  components: { UiBreadcrumbs, ProductItem, CatalogAside, },
  props: {},
  computed: {},
  methods: {
    async updateFilters (filters: FiltersI) {
      try {
        let queryString = ''

        for (const key in filters) {
          if (key === 'sort') {
            queryString += `${filters[key]}&`
          } else if (key === 'sortColumn') {
            queryString += ''
          } else {
            // @ts-expect-error
            queryString += `${key}=${filters[key]}&`
          }
        }

        queryString = queryString.slice(0, -1)

        void this.$router.push(`/catalog?${queryString}`)

        const data: any = await $fetch(`product/get-many?${queryString}`)

        this.products = JSON.parse(JSON.stringify(data.products))
      } catch (e) {}
    },
  },
  mounted () {
    this.products = this.defaultProducts
  },
})
</script>

<style lang="scss">
.catalog-page {
  display: flex;

  &__body {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    width: 100%;
    margin-left: 20px;

    .product-item {
      margin-bottom: 20px;
      margin-right: 20px;
    }
  }
}
</style>
