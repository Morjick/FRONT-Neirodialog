<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div
    class="articles-page"
  >
    <articles-item
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script lang="ts">
import { type ArticleI } from 'store/modules/article.store'
import { defineComponent } from 'vue'
import ArticlesItemVue from '~/components/articles/ArticlesItem.vue'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'

const ArticlesItem: any = ArticlesItemVue

export default defineComponent({
  name: 'ArticlesPage',
  components: { ArticlesItem, UiBreadcrumbs, },
  props: {},
  async setup () {
    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Статьи',
        path: '/articles',
      },
    ]

    const { data, }: any = await preFetch('articles/get-many')

    return {
      articles: data.value.articles as ArticleI[],
      breadcrumbs,
    }
  },
  data: () => ({
    isPageLoad: false,
  }),
  computed: {},
  mounted () {
    setTimeout(() => {
      this.isPageLoad = true
    }, 500)
  },
  methods: {
    async getArticles () {

    },
  },
})
</script>

<style lang="scss">
// .articles-page {}
</style>
