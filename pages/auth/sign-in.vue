<template>
  <div class="sign-in">
    <h3
      class="sign-in__subtitle"
      style="margin-bottom: 20px;"
    >
      Привет!
    </h3>
    <h1
      class="sign-in__title"
      style="margin-bottom: 20px;"
    >
      С возвращением
    </h1>

    <div class="sign-in__form">
      <p
        v-if="errorMessage.length"
        class="validation-error"
      >
        {{ errorMessage }}
      </p>

      <ui-input
        v-model="email"
        placeholder="Email"
        @enter-press="signIn"
      />

      <ui-input
        v-model="password"
        placeholder="Придумайте пароль"
        input-type="password"
        @enter-press="signIn"
      />

      <ui-button
        text="Авторизоваться"
        :disabled="isButtonDisabled"
        @send="signIn"
      />
      <div style="margin-top: 20px;">
        <span>Нет аккаунта?  </span>
        <router-link
          to="/auth/sign-up"
          class="sign-in__sign-up"
        >
          Зарегистрируйтесь
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ofetch } from 'ofetch'
import { defineComponent } from 'vue'
import UiInput from '~/components/ui/UiInput.vue'
import UiButton from '~/components/ui/UiButton.vue'

export default defineComponent({
  name: 'SignInPage',
  components: { UiInput, UiButton, },
  layout: 'AuthLayout',
  props: {},
  setup () {},
  data: () => ({
    email: '',
    password: '',
    errorMessage: '',
  }),
  computed: {
    isButtonDisabled () {
      return !(this.email.length && this.password.length)
    },
  },
  mounted () {},
  methods: {
    async signIn () {
      try {
        this.errorMessage = ''

        if (!this.email || !this.password) {
          this.errorMessage = 'Заполните все поля'
        }

        const data: any = await $fetch('user/sign-in', {
          body: {
            email: this.email,
            password: this.password,
          },
          method: 'POST',
        })

        if (!data.ok) {
          this.errorMessage = data.message
          return
        }

        if (data.ok) {
          localStorage.setItem('neirodialog-token', data.token)
          // @ts-expect-error
          void this.$store.dispatch('login', data)
          void this.$router.push('/')

          globalThis.$fetch = ofetch.create({
            baseURL: 'http://localhost:8080',
            onRequest: () => {},
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
        }
      } catch (e: any) {
        const message = Array.isArray(e.response?.data?.message)
          ? e.response?._data?.message[0]
          : e.response?._data?.message

        if (!message?.length) {
          this.errorMessage = e
        }
        if (message?.length) {
          this.errorMessage = message
        }
      }
    },
  },
})
</script>

<style lang="scss">
.sign-in {
  &__subtitle {
    color: var(--font-color-placehold);
  }

  &__subtitle, &__title {
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    font-family: 'Merriweather', serif;
    margin: 0;
  }

  &__form {
    .ui-input {
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__sign-up {
    color: var(--font-color-href);
  }
}
</style>
