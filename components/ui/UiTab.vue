<template>
  <div
    class="ui-tab"
    @click="pushToProp"
  >
    <div class="ui-tab__info">
      <p>{{ title }}</p>
      <span>{{ description }}</span>
    </div>
    <div class="ui-tab__arrow">
      <img
        src="~/assets/icons/arrow-right.png"
        alt=""
      >
    </div>
  </div>
</template>

<script lang="ts">

export default defineNuxtComponent({
  name: 'UiTab',
  data: () => ({}),
  components: {},
  props: {
    title: String,
    description: String,
    href: String,
  },
  computed: {},
  methods: {
    pushToProp () {
      if (!this.href?.length) { return false }

      void this.$router.push(this.href)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-tab {
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: var(--default-shadow);
  border-radius: 3px;
  padding: 20px;
  cursor: pointer;

  &__info {
    p {
      margin: 0 0 5px 0;
      font-weight: 800;
      font-family: 'Martian Mono', monospace;
      font-size: 18px;
    }

    span {
      color: var(--font-color-secondary);
      font-size: 12px;
    }
  }
}
</style>
