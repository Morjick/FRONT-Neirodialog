<template>
  <div class="ui-breadcrumbs">
    <div
      class="ui-breadcrumbs__item"
    >
      <router-link
        to="/"
      >
        Главная
      </router-link>

      <span v-if="items.length">/</span>
    </div>
    <div
      v-for="(item, index) in items"
      :key="item.path"
      class="ui-breadcrumbs__item"
      :class="{
        active: index === items.length - 1
      }"
    >
      <router-link
        :to="item.path"
      >
        {{ item.title }}
      </router-link>

      <span v-if="index !== items.length - 1">/</span>
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType } from 'vue'

export interface BreadCrumbI {
  title: string
  path: string
}

export default defineNuxtComponent({
  name: 'UiBreadcrumbs',
  data: () => ({}),
  components: {},
  props: {
    items: {
      type: Array as PropType<BreadCrumbI[]>,
      default: () => [],
    },
  },
  computed: {},
  methods: {},
  mounted () {},
})
</script>

<style lang="scss">
.ui-breadcrumbs {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &__item {
    margin-right: 5px;

    a {
      font-size: 14px;
      color: var(--font-color-secondary);
    }

    span {
      margin-left: 5px;
      color: var(--font-color-secondary);
    }

    &.active {
      a {
        color: var(--font-color-primary);
        font-weight: 600;
      }
    }
  }
}
</style>
