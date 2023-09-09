<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div
    v-if="user"
    class="settings"
  >
    <h1>Общие настройки</h1>
    <div
      v-for="item in mainSettings"
      :key="item.title"
      class="settings__main"
    >
      <p>{{ item.title }}:</p>
      <span>{{ item.value }}</span>
    </div>
    <h1>Безопасность</h1>
    <div class="settings--tab">
      <h2>Сменить пароль</h2>
      <div>
        <p class="error-message">
          {{ passwordErrorMessage }}
        </p>
      </div>
      <div class="settings--tab__body">
        <ui-input
          v-model="password.oldPassword"
          placeholder="Введите старый пароль"
          mode="outlined"
        />
        <ui-input
          v-model="password.newPassword"
          placeholder="Введите новый пароль"
          mode="outlined"
        />
      </div>
      <div>
        <ui-button
          text="Сохранить"
          @click="changePassword"
        />
      </div>
    </div>
    <div class="settings--tab">
      <h2>Привязать номер телефона</h2>
      <div>
        <p class="error-message">
          {{ setPhoneErrorMessage }}
        </p>
      </div>
      <div class="settings--tab__body">
        <ui-input
          placeholder="Добавьте номер своего телефона"
          mode="outlined"
        />
      </div>
      <div>
        <ui-button
          text="Подтвердить"
        />
      </div>
    </div>
  </div>
  <div v-else>
    Подождите, загрузка...
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiInput from '~/components/ui/UiInput.vue'
import UiButtonVue from '~/components/ui/UiButton.vue'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'
import { type UserI } from '~/store/modules/auth.store'

interface MainSettingsItemI {
  title: string
  value: string
}

const UiButton: any = UiButtonVue

export default defineComponent({
  name: 'Settings',
  components: { UiBreadcrumbs, UiInput, UiButton, },
  props: {},
  setup () {
    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Профиль',
        path: '/profile',
      },
      {
        title: 'Настройки',
        path: '/settings',
      },
    ]

    return {
      breadcrumbs,
    }
  },
  data: () => ({
    passwordErrorMessage: '',
    setPhoneErrorMessage: '',
    password: {
      oldPassword: '',
      newPassword: '',
    },
  }),
  computed: {
    user (): UserI {
      // @ts-expect-error
      const user: UserI = this.$store.getters.getMainUser

      return user
    },
    mainSettings (): MainSettingsItemI[] {
      const mainSettings: MainSettingsItemI[] = [
        {
          title: 'Имя пользователя',
          value: this.user.firstname,
        },
        {
          title: 'Фамилия пользователя',
          value: this.user.lastname,
        },
        {
          title: 'Почта',
          value: this.user.email,
        },
      ]
      return mainSettings
    },
  },
  mounted () {},
  methods: {
    async changePassword () {
      try {
        const data: any = await $fetch('user/change-password', {
          body: {
            oldPassword: this.password.oldPassword,
            newPassword: this.password.newPassword,
          },
          method: 'PATCH',
        })

        if (!data.ok) {
          this.passwordErrorMessage = data.message

          return false
        }
      } catch (e) {
        this.passwordErrorMessage = 'Действие сейчас невозможно'
        // @ts-expect-error
        this.$store.dispatch('logout')
      }
    },
  },
})
</script>

<style lang="scss">
.settings {
  &__main {
    display: flex;
    align-items: center;

    margin-bottom: 10px;
    margin-left: 20px;

    p {
      width: 250px;

      margin-right: 20px;
      font-weight: 600;
    }
  }

  &--tab {
    box-shadow: var(--default-shadow);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 20px;

    h2 {
      margin-bottom: 20px;
    }

    .ui-input {
      margin-top: 20px;
    }

    &__body {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .ui-input:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>
