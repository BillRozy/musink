<script setup lang="ts">
import { useSpotifyAuthAPI } from 'api';
import { useSpotifyStore } from 'src/stores/spotify';
const { startLogin } = useSpotifyAuthAPI();
const { setToken } = useSpotifyStore();
const onSubmit = async () => {
  const tokenObj = await startLogin();
  console.log('onTokenReceived', tokenObj);
  setToken(tokenObj);
};
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit">
      <q-btn type="submit" label="Start Spotify Login" color="primary" size="xl"></q-btn>
    </q-form>
  </div>
</template>
