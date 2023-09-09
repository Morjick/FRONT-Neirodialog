import { type ActionContext } from 'vuex'
import { type UserI } from './auth.store'

interface ArticleI {
  id: 1
  title: string
  description: string
  body: string
  tags: string[]
  author: UserI
  autorId: number
  show: boolean
  images: string[]
  avatar: string
  href: string
  createdAt: string
  updatedAt: string
}

interface ArticleStateI {
  activeArticles: ArticleI | null
}

const ArticleStore = {
  state: (): ArticleStateI => ({
    activeArticles: null,
  }),
  getters: {
    getActiveArtivle (state: ArticleStateI) {
      return state.activeArticles
    },
  },
  actions: {
    async searchActiveArticle (context: ActionContext<'S', 'R'>, href: string) {
      const data: any = await $fetch(`/articles/get-article/${href}`)

      if (!data?.data?.article) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return await Promise.reject({ code: 404, })
      }

      context.commit('setActiveArticle', data.data.article)
    },
  },
  mutations: {
    setActiveArticle (state: ArticleStateI, article: ArticleI) {
      state.activeArticles = article
    },
  },
}

export {
  ArticleStore,
  type ArticleStateI,
  type ArticleI
}
