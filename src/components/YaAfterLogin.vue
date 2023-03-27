<script setup lang="ts">
import { useYandexAuthAPI } from 'api';
import { useRoute } from 'vue-router';
const { requestToken } = useYandexAuthAPI();
const { query } = useRoute();
const code = query.code;
if (code != null) {
  requestToken(code.toString());
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">{{ code }}</div>
</template>
