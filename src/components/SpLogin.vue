<script setup lang="ts">
import { ref } from 'vue'
import { useSpotifyAPI } from 'api'
const api = useSpotifyAPI()
const login = ref('')
const password = ref('')
const onSubmit = async () => {
  return api.login()
}
const onReset = () => {
  login.value = ''
  password.value = ''
}
onSubmit()
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset">
      <q-input class="q-pa-md" label="Login" filled v-model="login" hint="Enter your login for Spotify Music"></q-input>
      <q-input class="q-pa-md" type="password" label="Password" filled v-model="password" hint="Enter your password for Spotify Music"></q-input>
    </q-form>
  </div>

</template>
