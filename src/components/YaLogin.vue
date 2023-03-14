<script setup lang="ts">
import { ref } from 'vue'
import { useYandexAPI } from 'api'
const { startLogin, requestToken } = useYandexAPI()
const hasCode = ref(false)
const code = ref('')
const onLoginBtn = () => {
  startLogin()
  hasCode.value = true
}
const onSubmit = async () => {
  const token = await requestToken(code.value)
  console.log(token)
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit">
      <q-btn type="button" @click="onLoginBtn" label="Start Yandex Login" color="primary" size="xl"></q-btn>
      <q-input class="q-pa-md" type="text" label="Confirmation Code" filled v-model="code" v-if="hasCode" hint="Enter your code for Yandex Music"></q-input>
    </q-form>
  </div>

</template>
