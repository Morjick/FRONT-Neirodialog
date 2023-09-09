<template>
  <div
    class="ui-select"
    :class="{
      active: isOpen,
      disabled
    }"
    @click="toggleSelect"
  >
    <div class="ui-select__header">
      <span>
        {{
          value[textValue]
            ? value[textValue]
            : defaultValue ? defaultValue[textValue] : placeholder
        }}
      </span>
      <img
        src="~/assets/icons/arrow-down.png"
        alt=""
      >
    </div>
    <div
      v-if="items.length"
      class="ui-select__body"
    >
      <div
        v-for="item in items"
        :key="item[activeValue]"
        class="ui-select__item"
        @click.stop="select(item)"
      >
        {{ item[textValue] }}
      </div>
    </div>
    <div
      v-else
      class="ui-select__body"
    >
      <span>{{ emptyMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType } from 'vue'

export default defineNuxtComponent({
  name: 'UiSelect',
  data: () => ({
    value: {} as any,
    isOpen: false,
  }),
  components: {},
  props: {
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    textValue: {
      type: String,
      default: 'title',
    },
    activeValue: {
      type: String,
      default: 'id',
    },
    defaultValue: {
      type: Object,
    },
    emptyMessage: {
      type: String,
      default: 'Тут пока пусто',
    },
    placeholder: {
      type: String,
      default: 'Выберите один из параметров',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {
    select (item: any) {
      this.value = item

      this.isOpen = false
      this.$emit('select', item[this.activeValue])
    },
    toggleSelect () {
      if (this.disabled) { return false }
      this.isOpen = !this.isOpen
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
$maxWidth: 350px;
$selectPadding: 10px;

.ui-select {
  position: relative;

  max-width: $maxWidth;

  cursor: pointer;

  &.active {
    .ui-select__body {
      opacity: 1;
      pointer-events: all;
    }
  }

  &.disabled {
    opacity: .5;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: $maxWidth;
    padding: $selectPadding;

    border: 2px solid var(--input-color);
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__body {
    position: absolute;
    bottom: 0;

    max-width: $maxWidth;
    max-height: 150px;
    width: 100%;

    border: 2px solid var(--input-color);
    border-radius: 3px;
    background: var(--background-color);
    overflow-y: scroll;

    z-index: 10;
    transform: translateY(calc(100% + 10px));
    transition: all .3s;
    opacity: 0;
    pointer-events: none;

    span {
      padding: 0 $selectPadding;
    }
  }

  &__item {
    border-bottom: 2px solid var(--input-color);
    padding: $selectPadding;
  }
}
</style>
