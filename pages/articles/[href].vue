<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div
    v-if="isPageLoad && article"
    class="article-details-page"
  >
    <div class="article-details-page__header">
      <h1>{{ article.title }}</h1>
      <span class="date">{{ getArticleDate(article.createdAt) }}</span>
    </div>
    <div
      class="article-details-page__content"
      v-html="article.body"
    />
    <div class="article-details-page__footer">
      <div class="article-details-page__tags">
        <span
          v-for="tag in article.tags"
          :key="tag"
        >{{ tag }}</span>
      </div>
      <div class="article-details-page__autor">
        {{ article.author.firstname }} {{ article.author.lastname }}
      </div>
    </div>
  </div>
  <DefaultPageLoader v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { type ArticleI } from 'store/modules/article.store'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'

export default defineComponent({
  name: 'ArticleDetailsPage',
  components: { UiBreadcrumbs, },
  props: {},
  async setup () {
    const route = useRoute()
    const href: string = Array.isArray(route.params.href) ? route.params.href[0] : route.params.href
    const { data, }: any = await preFetch(`articles/get-article/${href}`)
    const article: ArticleI = data.value.article

    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Статьи',
        path: '/articles',
      },
      {
        title: article.title,
        path: `/articles/${article.href}`,
      },
    ]

    useHead({
      title: article.title,
      meta: [
        { name: 'description', content: article.description, },
        { name: 'og:title', content: article.title, },
        { name: 'og:description', content: article.description, },
        { name: 'og:image', content: String(process.env.baseURL) + article.avatar, },
      ],
    })

    return {
      breadcrumbs,
      article,
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
    getArticleDate (date: string) {
      return getDate(date)
    },
  },
})
</script>

<style lang="scss">
.article-details-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .date {
      color: var(--font-color-secondary);
      border-bottom: 1px solid var(--font-color-secondary);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 20px;
  }

  &__tags {
    margin-bottom: 10px;

    span {
      margin: 0 10px 10px 0;
      background: var(--font-color-href);
      padding: 5px;
      color: var(--font-color-primay-alternative);
      border-radius: 3px;
    }
  }
}
</style>
