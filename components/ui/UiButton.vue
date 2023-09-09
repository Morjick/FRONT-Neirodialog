<template>
  <button
    class="ui-button"
    :class="mode"
    :disabled="disabled"
    @click.stop.prevent="handleButtonClick"
  >
    <span v-if="loading">{{ text }}</span>
    <img
      v-else
      src="~/assets/gif/primary-loader.gif"
      class="ui-button__loading"
      style="width: 40px;"
      alt=""
    >
  </button>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'UiButton',
  data: () => ({}),
  components: {},
  props: {
    mode: {
      type: String,
      default: 'primary',
    },
    text: {
      type: String,
      default: 'Отправить',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  methods: {
    handleButtonClick () {
      if (this.disabled) { return false }
      this.$emit('send')
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-button {
  position: relative;
  padding: 12px 50px;
  border-radius: 10px;
  font-size: 18px;

  &.primary {
    background-color: var(--primary-color);
    color: var(--font-color-primay-alternative);
    height: 50px;

    span {
      color: var(--font-color-primay-alternative);
    }
  }

  &.danger {
    min-width: auto;
    font-weight: 800;
    font-size: 20px;
    padding: 0;
    color: var(--danger-color);

    span {
      color: var(--danger-color);
    }
  }

  &__loading {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

  img {
    height: 100%;
  }

  span {
    font-size: inherit;
  }
}
</style>
