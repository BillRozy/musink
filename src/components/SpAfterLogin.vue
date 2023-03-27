<script setup lang="ts">
import { useSpotifyAuthAPI } from 'api';
const { requestToken } = useSpotifyAuthAPI();
const search = new URLSearchParams(location.search.replace('?', ''));
const code = search.get('code');
if (code != null) {
  requestToken(code);
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">{{ code }}</div>
</template>
