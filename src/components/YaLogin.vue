<script setup lang="ts">
import { useYandexAuthAPI } from 'api';
import { useYandexStore } from 'src/stores/yandex';
const { startLogin } = useYandexAuthAPI();
const { setToken } = useYandexStore();

const onSubmit = async () => {
  const tokenObj = await startLogin();
  console.log('onTokenReceived', tokenObj);
  setToken(tokenObj);
};
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit">
      <q-btn type="submit" label="Start Yandex Login" color="primary" size="xl"></q-btn>
    </q-form>
  </div>
</template>
