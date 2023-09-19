<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProviderStore } from 'src/stores';
import { MusinkAPIProvider } from 'src/types/global';
import { defineAsyncComponent, toRefs } from 'vue';
const ProviderLogin = defineAsyncComponent(() => import('components/ProviderLogin.vue'));
const ProviderBoard = defineAsyncComponent(() => import('components/ProviderBoard.vue'));
const props = defineProps<{
  apiProvider: MusinkAPIProvider
}>()
const { apiProvider } = toRefs(props);
const store = useProviderStore(apiProvider.value);
const { token } = storeToRefs(store);
console.log(token);
</script>

<template>
  <ProviderLogin v-if="!token" :api-provider="apiProvider" class="flex-center"></ProviderLogin>
  <Suspense>
    <ProviderBoard v-if="token" :api-provider="apiProvider" class="flex-center"></ProviderBoard>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
