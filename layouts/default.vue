<template>
  <div class="default-layout">
    <div class="default-layout__header">
      <div class="default-layout__navigation container">
        <div
          class="default-layout__logo"
          @click="toMainPage"
        >
          Neirodialog
        </div>
        <div class="default-layout__menu">
          <div
            v-for="item in menu"
            :key="item.id"
            class="default-layout__link"
          >
            <nuxt-link
              :to="item.path"
              :class="{
                active: activeLink === item.path
              }"
            >
              {{ item.title }}
            </nuxt-link>
          </div>
        </div>
        <div class="default-layout__subnav">
          <div
            v-if="isAuth"
            class="default-layout__subnav__item"
          >
            <img
              src="~/assets/icons/cart.png"
              alt=""
              @click="$router.push('/cart')"
            >
            <span v-if="cartLength">{{ cartLength }}</span>
          </div>
          <div
            v-if="isAuth"
            class="default-layout__user"
          >
            <div class="avatar">
              <img
                :ref="(el: any) => getAvatar(mainUser.avatar, el)"
                alt=""
              >
            </div>
            <div class="profile">
              <div>{{ mainUser.firstname }} {{ mainUser.lastname }}</div>
              <nuxt-link to="/profile">
                В профиль
              </nuxt-link>
            </div>
          </div>
          <div
            v-else
            class="default-layout__login"
          >
            <nuxt-link to="/auth/sign-in">
              Авторизоваться
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <NuxtLoadingIndicator />
    <div class="default-layout__body container">
      <NuxtPage />
    </div>
    <div class="default-layout__footer" />
  </div>
</template>

<script lang="ts">
import { type UserI } from 'store/modules/auth.store'

interface MenuItemI {
  id: number
  title: string
  path: string
}

export default defineNuxtComponent({
  name: 'DefaultLayout',
  data: () => ({
    menu: [
      {
        id: 1,
        title: 'Главная',
        path: '/',
      },
      {
        id: 2,
        title: 'Каталог',
        path: '/catalog',
      },
      {
        id: 3,
        title: 'Статьи',
        path: '/articles',
      },
      {
        id: 4,
        title: 'О нас',
        path: '/about',
      },
      {
        id: 5,
        title: 'Контакты',
        path: '/contacts',
      },
    ] as MenuItemI[],
  }),
  components: {},
  props: {},
  computed: {
    activeLink () {
      const activeLinkIndex = this.menu.findIndex(el => el.path === this.$route.path)

      return this.menu[activeLinkIndex] ? this.menu[activeLinkIndex].path : '/'
    },
    mainUser (): UserI {
      // @ts-expect-error
      return this.$store.getters.getMainUser
    },
    isAuth (): boolean {
      // @ts-expect-error
      return this.$store.getters.getisAuth
    },
    cartLength (): number {
      // @ts-expect-error
      return this.$store.getters.getCart?.items?.length
    },
  },
  methods: {
    toMainPage () {
      void this.$router.push('/')
    },
    async getAvatar (imageUrl: string, el: any) {
      const image = await checkImage(imageUrl)

      el?.setAttribute('src', image)
      if (String(image).includes('noImage')) {
        el?.classList.add('no-image')
      }
    },
  },
  mounted () {
  },
})
</script>

<style lang="scss">
$headerHeight: 80px;

.default-layout {
  &__header {
    height: $headerHeight;
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 20px 0;
  }

  &__logo {
    font-size: 30px;
    font-weight: 800;
    font-family: 'Merriweather', serif;
    text-transform: uppercase;
    cursor: pointer;
  }

  &__menu {
    display: flex;
    align-items: center;

    width: 100%;

    margin: 0 50px;
  }

  &__link {
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }

    a {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 14px;
      color: var(--font-color-placehold);
      transition: all .2s;

      &.active {
        color: var(--primary-color);
        font-weight: 600;
      }
    }
  }

  &__subnav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;

      pointer-events: all;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }

    &__item {
      position: relative;

      span {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        width: 20px;
        height: 20px;

        top: -5px;
        right: 15px;

        font-size: 12px;
        color: var(--font-color-primay-alternative);

        background: var(--danger-color);
        border-radius: 50%;
        pointer-events: none;
      }
    }
  }

  &__body {
    overflow: hidden;
    min-height: calc(100vh - $headerHeight);
  }

  &__user {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    min-width: 250px;

    text-align: right;

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 50px;
      height: 50px;

      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      img {
        height: 100%;
      }
    }

    a {
      font-size: 14px;
      color: var(--font-color-secondary);
      margin-top: 5px;
    }
  }
}
</style>
