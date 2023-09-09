<template>
  <ui-breadcrumbs :items="breadcrumbs" />
  <div class="address-page">
    <div class="address-page__add">
      <ui-input
        v-model="newAddress"
        placeholder="Введите новый адрес"
        @enter-press="addAddress"
      />
      <ui-button
        text="Добавить"
        @send="addAddress"
      />
    </div>
    <h1>Адрес по умолчанию</h1>
    <ui-select
      :items="address"
      :default-value="defaultAddress"
      text-value="address"
      placeholder="Адрес по умолчанию"
      @select="setDefaultAddress"
    />
    <h1 v-if="address.length">
      Ваши адреса:
    </h1>
    <ul
      v-if="address.length"
      class="address-page__list"
    >
      <li
        v-for="item in address"
        :key="item.id"
        class="address-page__list__item"
      >
        <p>{{ item.address }}</p>
        <span class="address-page__list__item-remove">
          <img
            src="~/assets/icons/delete.png"
            alt=""
          >
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { type AddressI } from '~/store/modules/auth.store'
import UiInput from '~/components/ui/UiInput.vue'
import UiButton from '~/components/ui/UiButton.vue'
import UiSelect from '~/components/ui/UiSelect.vue'
import UiBreadcrumbs, { type BreadCrumbI } from '~/components/ui/UiBreadcrumbs.vue'

export default defineComponent({
  name: 'AddresPage',
  components: { UiInput, UiButton, UiBreadcrumbs, UiSelect, },
  props: {},
  setup () {
    const breadcrumbs: BreadCrumbI[] = [
      {
        title: 'Мой профиль',
        path: '/profile',
      },
      {
        title: 'Мои адреса',
        path: '/profile/address',
      },
    ]

    return {
      breadcrumbs,
      $store: useStore(),
    }
  },
  data: () => ({
    newAddress: '',
  }),
  computed: {
    address (): AddressI[] {
      return this.$store.getters.getAddress
    },
    defaultAddress () {
      return this.$store.getters.getDefaultAddress
    },
  },
  mounted () {},
  methods: {
    async addAddress () {
      if (!this.newAddress.length) { return false }
      const data: any = await $fetch('address/add-address', {
        body: {
          value: this.newAddress,
        },
        method: 'POST',
      })

      if (data.ok) {
        this.newAddress = ''
        this.$store.commit('addAddress', data.address)
      }
    },
    async setDefaultAddress (addressId: number) {
      const data: any = await $fetch('address/set-default-address', {
        body: {
          addressId,
        },
        method: 'POST',
      })

      if (data.ok) {
        const addressIndex = this.address.findIndex(el => el.id === addressId)

        if (addressIndex < 0) {
          return
        }

        this.$store.commit('setDefaultAddress', this.address[addressIndex])
      }
    },
  },
})
</script>

<style lang="scss">
.address-page {
  margin-top: 40px;

  &__add {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ui-input {
      max-width: 100%;
      width: 100%;

      margin-right: 50px;
    }

    @media (max-width: 500px) {
      display: block;

      .ui-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }

  &__list {
    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      box-shadow: var(--default-shadow);
      border-radius: 3px;
      padding: 10px;
      overflow: hidden;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }

      &-remove {
        cursor: pointer;
      }
    }
  }
}
</style>
