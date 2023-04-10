<script setup lang="ts">
import { useProviderStore } from 'src/stores';
import { MusinkAPIProvider } from 'src/types/global';
import { toRefs } from 'vue';
const props = defineProps<{
  apiProvider: MusinkAPIProvider
}>()
const { apiProvider } = toRefs(props);
const { setToken, token } = useProviderStore(apiProvider.value);
const onSubmit = async () => {
  const tokenObj = await musinkAPI.invokeInMainProcess(`${apiProvider.value}-oauth-get-token`);
  console.log('onTokenReceived', tokenObj);
  setToken(tokenObj);
};
</script>

<template>
  <div v-if="!token" class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit">
      <q-btn type="submit" :label="`Start ${apiProvider} Login`" color="primary" size="xl"></q-btn>
    </q-form>
  </div>
</template>
