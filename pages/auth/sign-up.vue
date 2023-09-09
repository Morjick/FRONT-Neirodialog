<template>
  <div class="sign-up">
    <h1 class="sign-up__title">
      Добро пожаловать!
    </h1>
    <div class="sign-up__form">
      <p
        v-if="errorMessage.length"
        class="validation-error"
      >
        {{ errorMessage }}
      </p>

      <ui-input
        v-model="email"
        placeholder="Email"
      />

      <ui-input
        v-model="firstname"
        placeholder="Введите Ваше имя"
      />

      <ui-input
        v-model="lastname"
        placeholder="Введите Вашу фамилию"
      />

      <p
        v-if="isPasswordLengthError"
        class="validation-error"
      >
        Длинна пароля должна быть не менее 6 символов
      </p>
      <ui-input
        v-model="password"
        placeholder="Придумайте пароль"
        input-type="password"
      />

      <ui-input
        v-model="confirmPassword"
        placeholder="Повторите пароль"
        input-type="password"
      />

      <ui-button
        text="Зарегистрироваться"
        :disabled="isButtonDisabled"
        @send="signUp"
      />

      <div style="margin-top: 20px;">
        <span>Есть аккаунт?  </span>
        <router-link
          to="/auth/sign-in"
          class="sign-in__sign-up"
        >
          Авторизуйтесь
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ofetch } from 'ofetch'
import UiInput from '~/components/ui/UiInput.vue'
import UiButton from '~/components/ui/UiButton.vue'

export default defineComponent({
  name: 'SignUpPage',
  components: { UiInput, UiButton, },
  mixins: [],
  layout: 'AuthLayout',
  props: {},
  setup () {},
  data: () => ({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
  }),
  computed: {
    isButtonDisabled () {
      return !(this.email.length &&
        this.firstname.length &&
        this.lastname.length &&
        this.password.length &&
        this.password === this.confirmPassword)
    },
    isPasswordLengthError () {
      return this.password.length && this.password.length < 6
    },
  },
  mounted () {},
  methods: {
    async signUp () {
      try {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Пароли не совпадают'
          return
        }

        const data: any = await $fetch('user/sign-up', {
          body: {
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password,
          },
          method: 'POST',
        })

        if (data.ok) {
          localStorage.setItem('neirodialog-token', data.token)
          void this.$store.dispatch('login', data)

          globalThis.$fetch = ofetch.create({
            baseURL: 'http://localhost:8080',
            onRequest: () => {},
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
        }

        void this.$router.push('/')
      } catch (e: any) {
        const message = Array.isArray(e.response.data.message)
          ? e.response.data.message[0]
          : e.response.data.message
        if (message?.length) {
          this.errorMessage = message
        }
      }
    },
  },
})
</script>

<style lang="scss">
.sign-up {
  &__title {
    text-transform: uppercase;
    font-family: 'Merriweather', serif;
  }

  &__form {
    .ui-input {
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
