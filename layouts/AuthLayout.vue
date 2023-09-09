<template>
  <div class="auth-layout">
    <div class="auth-layout__header">
      <div class="auth-layout__artefact" />
      <img
        src="../../shared/assets/icons/auth-waiting.png"
        alt=""
      >
      <div class="auth-layout__artefact" />
    </div>
    <div class="auth-layout__body">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthLayout',
  components: {},
  props: {},
  data: () => ({}),
  computed: {},
  mounted () { },
  methods: {},
})
</script>

<style lang="scss">
.auth-layout {
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px 0;
  }

  &__artefact {
    width: 300px;
    height: 1px;
    background: var(--artefact-color);
    margin: 0 20px;
  }

  &__body {
    max-width: 1440px;
    width: 100%;

    margin: 0 auto;
    padding: 20px 40px 40px;
    border-radius: 6px;

    box-shadow: var(--default-shadow);
  }
}
</style>
