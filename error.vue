<template>
  <div class="not-found-layout container">
    <h1>Упс! Страница не найдена... Возможно она была удалена</h1>
    <img
      src="~/assets/images/error-404.jpg"
      alt=""
    >
    <ui-button
      text="На главную"
      style="max-width: 250px; margin: 0 auto;"
      :loading="loading"
      @send="toMainPage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UiButton from '~/components/ui/UiButton.vue'

export default defineComponent({
  name: 'NotFoundLayout',
  components: { UiButton, },
  props: {},
  data: () => ({
    loading: true,
  }),
  computed: {},
  mounted () {},
  methods: {
    toMainPage () {
      this.loading = false
      void this.$router.push('/')
    },
  },
})
</script>

<style lang="scss">
.not-found-layout {
  display: flex;
  flex-direction: column;
  text-align: center;

  img {
    width: 40%;
    margin: 0 auto;
  }
}
</style>
