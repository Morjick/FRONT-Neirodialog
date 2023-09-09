<template>
  <div
    class="ui-input"
    :class="mode, {
      valid: valid,
      invalid: !valid
    }"
  >
    <input
      :type="inputType"
      :value="modelValue"
      required
      @change="onChange"
      @input="onInput"
      @keypress.enter="onEnter"
    >
    <span v-if="placeholder?.length">{{ placeholder }}</span>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'UiInput',
  data: () => ({}),
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: String,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
    mode: {
      type: String,
      default: 'primary',
    },
  },
  computed: {},
  methods: {
    onChange (event: any) {
      setTimeout(() => {
        this.$emit('update:modelValue', event.target.value)
      }, this.delay)
    },
    onInput (event: any) {
      setTimeout(() => {
        this.$emit('update:modelValue', event.target.value)
      }, this.delay)
    },
    onEnter (event: any) {
      this.$emit('enter-press')
      this.$emit('update:modelValue', event.target.value)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-input {
  position: relative;

  max-width: 500px;

  transition: all .2s;

  &.primary {
    border-bottom: 1px solid var(--input-color);

    span {
      top: 0;
    }
  }

  &.outlined {
    border: 1px solid var(--input-color);
    border-radius: 6px;

    span {
      top: 10px;
      left: 10px;
    }
  }

  span {
    position: absolute;

    transition: all .2s;
    pointer-events: none;

    color: var(--font-color-placehold);
  }

  input {
    display: block;
    width: 100%;
    height: 100%;

    &:valid, &:active, &:focus {
      & ~ span {
        top: -50%;
      }
    }
  }
}
</style>
