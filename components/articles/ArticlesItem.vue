<template>
  <div class="articles-item">
    <div class="articles-item__header">
      <p class="articles-item__title">
        {{ article.title }}
      </p>
      <span class="articles-item__date">{{ getArticleDate(article.updatedAt) }}</span>
    </div>
    <div class="articles-item__body">
      <div
        class="articles-item__content"
        v-html="article.description"
      />
      <div class="articles-item__avatar">
        <img
          :ref="(el: any) => getAvatar(article.avatar, el)"
          alt=""
        >
      </div>
    </div>
    <div class="articles-item__footer">
      <router-link :to="`/articles/${article.href}`">
        На страницу записи
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import { type ArticleI } from 'store/modules/article.store'

export default defineComponent({
  name: 'ArticlesItem',
  components: {},
  props: {
    article: {
      type: Object as PropType<ArticleI>,
      required: true,
    },
  },
  data: () => ({}),
  computed: {},
  mounted () {},
  methods: {
    getArticleDate (date: string) {
      return getDate(date)
    },
    async getAvatar (avatar: string, el: any) {
      const image = await checkImage(avatar)

      el?.setAttribute('src', image)
    },
  },
})
</script>

<style lang="scss">
.articles-item {
  margin-bottom: 40px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 500px) {
      display: block;
    }
  }

  &__title {
    max-width: 1250px;
    max-height: 40px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-weight: 800;
    font-size: 24px;
    letter-spacing: 2px;
    font-family: 'Martian Mono', monospace;

    @media (max-width: 500px) {
      max-height: 200px;
      white-space: normal;
      overflow: visible;
      margin-bottom: 10px;
    }
  }

  &__date {
    color: var(--font-color-secondary);
    border-bottom: 1px solid var(--font-color-secondary);

    @media (max-width: 500px) {
      display: none;
    }
  }

  &__body {
    display: flex;
    justify-content: space-between;

    min-height: 350px;

    margin-top: 10px;

    @media (max-width: 500px) {
      display: block;
      min-height: auto;
    }
  }

  &__content {
    max-height: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 440px;
    max-height: 330px;
    width: 100%;

    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
      border-radius: 6px;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;

    margin-top: 20px;

    a {
      color: var(--font-color-href);
      font-weight: 800;
    }
  }
}
</style>
