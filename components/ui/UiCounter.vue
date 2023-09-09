<template>
  <div class="ui-counter">
    <span @click="setCount('decrement')">-</span>
    <input
      v-if="!loading"
      type="text"
      :value="count"
      @input="updateCount"
    >
    <img
      v-else
      src="~/assets/gif/loader.gif"
      alt=""
    >
    <span @click="setCount('increment')">+</span>
  </div>
</template>

<script lang="ts">
const overTime: any = null

enum TypeCounterEnum {
  decrement = 'decrement',
  increment = 'increment'
}

export default defineNuxtComponent({
  name: 'UiCounter',
  data: () => ({
    overTime,
  }),
  components: {},
  props: {
    count: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {
    setCount (type: TypeCounterEnum) {
      this.$emit('update', type === TypeCounterEnum.increment ? this.count + 1 : this.count - 1)
    },
    updateCount (event: any) {
      if (this.overTime) {
        clearTimeout(this.overTime)
        this.overTime = null
      }

      this.overTime = setTimeout(() => {
        this.$emit('update', event.target.value)
      }, 1000)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-counter {
  display: flex;

  border-radius: 5px;
  border: 1px solid var(--primary-color);

  span {
    display: block;

    min-width: 50px;
    height: 50px;
    padding: 10px 0;

    background-color: var(--primary-color);
    cursor: pointer;

    text-align: center;
    color: var(--font-color-primay-alternative);
  }

  input {
    min-width: auto;
    max-width: 50px;
    text-align: center;
  }

  img {
    width: 50px;
  }
}
</style>
