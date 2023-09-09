<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div
    v-if="getMainUser"
    class="profile-page"
  >
    <div class="profile-page__personal">
      <ui-avatar
        :is-change-image="true"
        :image="getMainUser.avatar"
        @change-avatar="changeAvatar"
      />
      <div class="profile-page__info">
        <div class="profile-page__name">
          {{ getMainUser.firstname }} {{ getMainUser.lastname }}
        </div>
        <div class="profile-page__email">
          {{ getMainUser.email }}
        </div>
      </div>
    </div>
    <div class="profile-page__tabs">
      <ui-tab
        title="Заказы"
        :description="getOrderDescription"
        href="/profile/orders"
      />
      <ui-tab
        title="Адреса"
        description="Просмотреть или добавить адрес"
        href="/profile/address"
      />
      <ui-tab
        title="Настройки"
        description="Пароль, личные данные, поддержка"
        href="/profile/settings"
      />
    </div>
    <ui-button
      text="Выйти"
      mode="danger"
      @send="logout"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { type UserI } from '~/store/modules/auth.store'
import UiTab from '~/components/ui/UiTab.vue'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'
import UiButton from '~/components/ui/UiButton.vue'
import UiAvatar from '~/components/ui/UiAvatar.vue'

export default defineComponent({
  name: 'ProfilePage',
  components: { UiTab, UiBreadcrumbs, UiAvatar, UiButton, },
  props: {},
  setup () {
    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Мой профиль',
        path: '/profile',
      },
    ]

    useHead({
      title: 'Профиль',
    })

    return {
      breadcrumbs,
    }
  },
  data: () => ({}),
  computed: {
    getMainUser (): UserI {
      // @ts-expect-error
      const user = this.$store.getters.getMainUser

      return user
    },
    getOrderDescription () {
      return this.getMainUser.orders?.length
        ? `Колличество сделанных заказов: ${this.getMainUser.orders.length}`
        : 'Вы пока не сделали ни одного заказа'
    },
  },
  mounted () {},
  methods: {
    async changeAvatar (file: any) {
      const formData = new FormData()
      formData.append('file', file)
      const data: any = await $fetch('static/upload-image', {
        headers: { ContentType: 'multipart/form-data', },
        method: 'POST',
        body: formData,
      })

      const userData: any = await $fetch('user/change-avatar', {
        body: {
          avatar: data.image.name,
        },
        method: 'POST',
      })

      // @ts-expect-error
      void this.$store.commit('setMainUser', userData.user)
    },
    logout () {
      // @ts-expect-error
      this.$store.dispatch('logout')
      localStorage.removeItem('neirodialog-token')
      void this.$router.push('/auth/sign-in')
    },
  },
})
</script>

<style lang="scss">
.profile-page {
  &__personal {
    display: flex;
    align-items: center;

    margin-bottom: 30px;
  }

  &__email {
    font-size: 14px;
    color: var(--font-color-secondary);
  }

  &__tabs {
    .ui-tab {
      margin-bottom: 20px;
    }
  }
}
</style>
