<template>
  <div
    class="home-page"
  >
    <h1>Добро пожаловать!</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas autem,
      beatae odio vitae, pariatur alias in culpa, sit quos atque veritatis numquam
      aperiam doloremque a esse neque est nisi odit quaerat omnis itaque ut. Impedit
      deleniti, consectetur aperiam explicabo ipsum at quas non sapiente commodi
      cum dolorum enim, omnis facilis quos mollitia et recusandae. Harum blanditiis,
      facere nam inventore officia doloremque saepe perferendis, asperiores, voluptas
      odio error quia at soluta temporibus. Tempora maxime consectetur illum earum,
      aliquid officiis inventore corrupti sit magnam? Fuga blanditiis facilis fugit
      aspernatur modi molestiae similique accusantium tenetur. Neque sint provident
      rem odio adipisci a eaque fuga reprehenderit saepe quis, qui rerum ipsa voluptatem
      explicabo enim magnam aliquam. Ut nobis quas laborum assumenda cum debitis
      fuga enim delectus quia architecto tempora repudiandae minima, officiis amet
      unde obcaecati, numquam nesciunt praesentium vitae animi. Eveniet, similique
      consequatur animi nihil soluta, dolorem quis non sit pariatur perspiciatis
      debitis.
    </p>
    <h1>Новые продукты</h1>
    <div class="home-page__products">
      <product-item
        v-for="item in products"
        :key="item.id"
        :item="item"
      />
    </div>
    <h1>Кому нужен Неиродиалог?</h1>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas autem,
        beatae odio vitae, pariatur alias in culpa, sit quos atque veritatis numquam
        aperiam doloremque a esse neque est nisi odit quaerat omnis itaque ut. Impedit
        deleniti, consectetur aperiam explicabo ipsum at quas non sapiente commodi
        cum dolorum enim, omnis facilis quos mollitia et recusandae. Harum blanditiis,
        facere nam inventore officia doloremque saepe perferendis, asperiores, voluptas
        odio error quia at soluta temporibus. Tempora maxime consectetur illum earum,
        aliquid officiis inventore corrupti sit magnam? Fuga blanditiis facilis fugit
        aspernatur modi molestiae similique accusantium tenetur. Neque sint provident
        rem odio adipisci a eaque fuga reprehenderit saepe quis, qui rerum ipsa voluptatem
        explicabo enim magnam aliquam. Ut nobis quas laborum assumenda cum debitis
        fuga enim delectus quia architecto tempora repudiandae minima, officiis amet
        unde obcaecati, numquam nesciunt praesentium vitae animi. Eveniet, similique
        consequatur animi nihil soluta, dolorem quis non sit pariatur perspiciatis
        debitis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas autem,
        beatae odio vitae, pariatur alias in culpa, sit quos atque veritatis numquam
        aperiam doloremque a esse neque est nisi odit quaerat omnis itaque ut. Impedit
        deleniti, consectetur aperiam explicabo ipsum at quas non sapiente commodi
        cum dolorum enim, omnis facilis quos mollitia et recusandae. Harum blanditiis,
        facere nam inventore officia doloremque saepe perferendis, asperiores, voluptas
        odio error quia at soluta temporibus. Tempora maxime consectetur illum earum,
        aliquid officiis inventore corrupti sit magnam? Fuga blanditiis facilis fugit
        aspernatur modi molestiae similique accusantium tenetur. Neque sint provident
        rem odio adipisci a eaque fuga reprehenderit saepe quis, qui rerum ipsa voluptatem
        explicabo enim magnam aliquam. Ut nobis quas laborum assumenda cum debitis
        fuga enim delectus quia architecto tempora repudiandae minima, officiis amet
        unde obcaecati, numquam nesciunt praesentium vitae animi. Eveniet, similique
        consequatur animi nihil soluta, dolorem quis non sit pariatur perspiciatis
        debitis.
      </p>
    </div>
    <h1>Статьи</h1>
    <div>
      <articles-item
        v-for="item in articles"
        :key="item.id"
        :article="item"
      />
    </div>
    <h1>Консультации</h1>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas autem,
        beatae odio vitae, pariatur alias in culpa, sit quos atque veritatis numquam
        aperiam doloremque a esse neque est nisi odit quaerat omnis itaque ut. Impedit
        deleniti, consectetur aperiam explicabo ipsum at quas non sapiente commodi
        cum dolorum enim, omnis facilis quos mollitia et recusandae. Harum blanditiis,
        facere nam inventore officia doloremque saepe perferendis, asperiores, voluptas
        odio error quia at soluta temporibus. Tempora maxime consectetur illum earum,
        aliquid officiis inventore corrupti sit magnam? Fuga blanditiis facilis fugit
        aspernatur modi molestiae similique accusantium tenetur. Neque sint provident
        rem odio adipisci a eaque fuga reprehenderit saepe quis, qui rerum ipsa voluptatem
        explicabo enim magnam aliquam. Ut nobis quas laborum assumenda cum debitis
        fuga enim delectus quia architecto tempora repudiandae minima, officiis amet
        unde obcaecati, numquam nesciunt praesentium vitae animi. Eveniet, similique
        consequatur animi nihil soluta, dolorem quis non sit pariatur perspiciatis
        debitis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas autem,
        beatae odio vitae, pariatur alias in culpa, sit quos atque veritatis numquam
        aperiam doloremque a esse neque est nisi odit quaerat omnis itaque ut. Impedit
        deleniti, consectetur aperiam explicabo ipsum at quas non sapiente commodi
        cum dolorum enim, omnis facilis quos mollitia et recusandae. Harum blanditiis,
        facere nam inventore officia doloremque saepe perferendis, asperiores, voluptas
        odio error quia at soluta temporibus. Tempora maxime consectetur illum earum,
        aliquid officiis inventore corrupti sit magnam? Fuga blanditiis facilis fugit
        aspernatur modi molestiae similique accusantium tenetur. Neque sint provident
        rem odio adipisci a eaque fuga reprehenderit saepe quis, qui rerum ipsa voluptatem
        explicabo enim magnam aliquam. Ut nobis quas laborum assumenda cum debitis
        fuga enim delectus quia architecto tempora repudiandae minima, officiis amet
        unde obcaecati, numquam nesciunt praesentium vitae animi. Eveniet, similique
        consequatur animi nihil soluta, dolorem quis non sit pariatur perspiciatis
        debitis.
      </p>
    </div>
    <h1>Вебинары</h1>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas autem,
        beatae odio vitae, pariatur alias in culpa, sit quos atque veritatis numquam
        aperiam doloremque a esse neque est nisi odit quaerat omnis itaque ut. Impedit
        deleniti, consectetur aperiam explicabo ipsum at quas non sapiente commodi
        cum dolorum enim, omnis facilis quos mollitia et recusandae. Harum blanditiis,
        facere nam inventore officia doloremque saepe perferendis, asperiores, voluptas
        odio error quia at soluta temporibus. Tempora maxime consectetur illum earum,
        aliquid officiis inventore corrupti sit magnam? Fuga blanditiis facilis fugit
        aspernatur modi molestiae similique accusantium tenetur. Neque sint provident
        rem odio adipisci a eaque fuga reprehenderit saepe quis, qui rerum ipsa voluptatem
        explicabo enim magnam aliquam. Ut nobis quas laborum assumenda cum debitis
        fuga enim delectus quia architecto tempora repudiandae minima, officiis amet
        unde obcaecati, numquam nesciunt praesentium vitae animi. Eveniet, similique
        consequatur animi nihil soluta, dolorem quis non sit pariatur perspiciatis
        debitis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quas autem,
        beatae odio vitae, pariatur alias in culpa, sit quos atque veritatis numquam
        aperiam doloremque a esse neque est nisi odit quaerat omnis itaque ut. Impedit
        deleniti, consectetur aperiam explicabo ipsum at quas non sapiente commodi
        cum dolorum enim, omnis facilis quos mollitia et recusandae. Harum blanditiis,
        facere nam inventore officia doloremque saepe perferendis, asperiores, voluptas
        odio error quia at soluta temporibus. Tempora maxime consectetur illum earum,
        aliquid officiis inventore corrupti sit magnam? Fuga blanditiis facilis fugit
        aspernatur modi molestiae similique accusantium tenetur. Neque sint provident
        rem odio adipisci a eaque fuga reprehenderit saepe quis, qui rerum ipsa voluptatem
        explicabo enim magnam aliquam. Ut nobis quas laborum assumenda cum debitis
        fuga enim delectus quia architecto tempora repudiandae minima, officiis amet
        unde obcaecati, numquam nesciunt praesentium vitae animi. Eveniet, similique
        consequatur animi nihil soluta, dolorem quis non sit pariatur perspiciatis
        debitis.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { type ProductI } from 'store/modules/product.store'
import ProductItem from '~/components/products/ProductItem.vue'
import { type ArticleI } from '~/store/modules/article.store'
import ArticlesItemVue from '~/components/articles/ArticlesItem.vue'

const ArticlesItem: any = ArticlesItemVue

export default defineNuxtComponent({
  name: 'HomePage',
  async setup () {
    const { data: productData, }: any =
      await preFetch('product/get-many?sortColumn=createdAt&sort=DESC&limit=8')
    const { data: articlesData, }: any = await preFetch('articles/get-many?limit=5')

    return {
      products: productData.value ? productData.value.products as ProductI[] : [] as ProductI[],
      articles: articlesData.value.articles as ArticleI[],
    }
  },
  data: () => ({}),
  components: { ProductItem, ArticlesItem, },
  props: {},
  computed: {},
  methods: {
  },
  mounted () {},
})
</script>

<style lang="scss">
.home-page {
  &__products {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-bottom: 20px;

    .product-item{
      margin-right: 15px;
      margin-bottom: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
