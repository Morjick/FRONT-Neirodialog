<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ofetch } from 'ofetch'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const layout = 'default'
const $store = useStore()

useHead({
  titleTemplate: (title: string | undefined) => {
    return title ? `${title} - Неиродилог` : 'Неиродиалог'
  },
})

const checkAuth = async (): Promise<boolean> => {
  const token = localStorage.getItem('neirodialog-token')
  if (!token) {
    globalThis.$fetch = ofetch.create({
      baseURL: 'http://localhost:8080',
      onRequest: () => {},
      headers: {},
    })
    return false
  }

  globalThis.$fetch = ofetch.create({
    baseURL: 'http://localhost:8080',
    onRequest: () => {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await $fetch('user/check-token', {
    method: 'POST',
  })

  await $store.dispatch('login', data)
  await $store.dispatch('fetchCart')

  return true
}

onMounted(async () => {
  await checkAuth()
})
</script>

<style lang="scss">
@use "~/assets/style/app.scss";
</style>
