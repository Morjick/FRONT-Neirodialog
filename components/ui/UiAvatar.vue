<template>
  <div class="ui-avatar">
    <img
      v-if="image"
      :ref="(el: any) => getImage(image, el)"
      alt=""
    >
    <img
      v-else
      src="~/assets/gif/loader.gif"
      alt=""
    >
    <div
      v-if="isChangeImage"
      class="ui-avatar__edit"
      @click.stop="inputTarget"
    >
      <img
        src="~/assets/icons/edit.png"
        alt=""
        class="edit-image"
      >
    </div>
    <input
      id="uiAvatar"
      type="file"
      @change="changeAvatar"
    >
  </div>
</template>

<script lang="ts">
import noImage from '~/assets/images/noImage.jpg'

export default defineNuxtComponent({
  name: 'UiAvatar',
  data: () => ({}),
  components: {},
  props: {
    image: {
      type: String,
      default: noImage,
    },
    isChangeImage: {
      type: Boolean,
      default: false,
    },
    changeImageCallback: {
      type: Function,
      default: () => {},
    },
  },
  computed: {},
  methods: {
    changeAvatar (event: any) {
      if (!this.isChangeImage) { return false }

      const file = event.target.files[0]

      if (!file) { return false }

      this.$emit('change-avatar', file)
    },
    inputTarget () {
      const uiAvatar = document.getElementById('uiAvatar')

      uiAvatar?.click()
    },
    async getImage (imageUrl: string, el: any) {
      const image = await checkImage(imageUrl)

      el?.setAttribute('src', image)
    },
  },
  mounted () {},
})
</script>

<style lang="scss">
.ui-avatar {
  position: relative;

  width: 80px;
  height: 80px;

  border: 1px solid var(--font-color-primary);
  border-radius: 50%;
  overflow: hidden;
  margin-right: 30px;

  background-color: var(--font-color-secondary);
  cursor: pointer;

  &:hover {
    .ui-avatar__edit {
      opacity: 1;
    }
  }

  img {
    margin-left: 50%;
    transform: translateX(-50%);
    height: 100%;
  }

  .edit-image {
    height: auto;
    margin-left: 0;
    transform: translateX(0);
  }

  &__edit {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;

    width: 80px;
    height: 80px;

    opacity: 0;
    transition: all .2s;
    cursor: pointer;
    background: var(--artefact-color);
    z-index: 10;

    img {
      width: 30px;
    }
  }
}
</style>
