<template>
  <aside class="catalog-aside">
    <div
      class="catalog-aside__item"
    >
      <p>Поиск по названию:</p>
      <div class="flexer">
        <ui-input
          v-model="search"
          placeholder="Введите название товара"
        />
      </div>
    </div>
    <div class="catalog-aside__item">
      <p>Сортировать по:</p>
      <ui-select
        placeholder="Сортировать по:"
        active-value="sort"
        :items="sortList"
        :default-value="defaultSort"
        @select="setSort"
      />
    </div>
    <div class="catalog-aside__item flexer">
      <ui-button
        text="Сбросить фильтры"
        mode="danger"
        style="margin-top: auto; font-size: 12px;"
        @send="resetFilters"
      />
      <ui-button
        text="Применить"
        style="min-width: 100px; padding: 12px 20px;"
        @send="useFilters"
      />
    </div>
  </aside>
</template>

<script lang="ts">
import { type PropType } from 'vue'
import UiSelect from '~/components/ui/UiSelect.vue'
import UiInput from '~/components/ui/UiInput.vue'
import UiButton from '~/components/ui/UiButton.vue'

export interface FiltersI {
  title?: string
  sort?: string
  sortColumn?: string
  onlyImage?: boolean
}

export interface FiltersPropsI {
  title: string
  sortColumn: string
  sort: string
  onlyImage: boolean
}

export default defineNuxtComponent({
  name: 'CatalogAside',
  data: () => ({
    sortList: [
      {
        id: 1,
        title: 'Возрастанию цены',
        sort: 'sortColumn=price&sort=ASC',
        name: 'minPrice',
      },
      {
        id: 2,
        title: 'Новизне',
        sort: 'sortColumn=id&sort=DESC',
        name: 'newProduct',
      },
    ],
    defaultSort: null as any,
    search: '',
    sort: '',
    sortColumn: '',
  }),
  components: { UiSelect, UiInput, UiButton, },
  props: {
    filters: {
      type: Object as PropType<FiltersPropsI>,
      required: true,
    },
  },
  computed: {},
  methods: {
    setSort (sort: string) {
      this.sort = sort
      this.createFilters()
    },
    createFilters (): FiltersI {
      const filters: FiltersI = {}

      if (this.search) {
        filters.title = this.search
      }

      if (this.sort) {
        filters.sort = this.sort
      }

      if (this.sortColumn) {
        filters.sortColumn = this.sortColumn
      }

      return filters
    },
    useFilters () {
      const filters: FiltersI = this.createFilters()

      this.$emit('update-filters', filters)
    },
    setFilters () {
      this.sort = this.filters.sort
      this.sortColumn = this.filters.sortColumn
      this.search = this.filters.title

      if (this.sort && this.sortColumn) {
        const sortString = `sortColumn=${this.sortColumn}&sort=${this.sort}`

        const defaultSortIndex = this.sortList.findIndex(el => el.sort === sortString)

        if (defaultSortIndex >= 0) {
          this.defaultSort = this.sortList[defaultSortIndex]
        }
      }
    },
    resetFilters () {
      this.sort = ''
      this.sortColumn = ''
      this.search = ''

      const filters: FiltersI = this.createFilters()

      this.$emit('update-filters', filters)
    },
  },
  mounted () {
    setTimeout(() => { this.setFilters() }, 0)
  },
})
</script>

<style lang="scss">
.catalog-aside {
  display: inline-block;
  max-width: 350px;
  overflow: auto;
  max-height: 450px;
  width: 100%;
  flex-shrink: 0;

  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid var(--primary-color);

  p {
    font-weight: bold;
    margin-bottom: 15px;
  }

  &__item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
      margin-top: 15%;
    }

    &:first-child {
      margin-top: 20px;
    }
  }
}
</style>
