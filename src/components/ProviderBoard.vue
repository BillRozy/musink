<script setup lang="ts">
import { ref, Ref, toRefs } from 'vue';
import useRestAPI from 'src/api';
import { useProviderStore } from 'src/stores';
import UserProfileComponent from 'components/UserProfile.vue';
import type { Track, UserProfile } from 'api/types';
import { MusinkAPIProvider } from 'src/types/global';
import { storeToRefs } from 'pinia';
const props = defineProps<{
  apiProvider: MusinkAPIProvider
}>()
const { apiProvider } = toRefs(props);
const store = useProviderStore(apiProvider.value);
const { token } = storeToRefs(store);
const { getCurrentUser, getFavoriteTracks } = useRestAPI(apiProvider.value);
const userInfo: Ref<UserProfile | null> = ref(null);
const userTracks: Ref<Track[] | null> = ref(null);
userInfo.value = await getCurrentUser();
userTracks.value = await getFavoriteTracks();
console.log(userTracks.value);
</script>

<template>
  <div v-if="token" class="q-pa-md">
    <UserProfileComponent v-if="userInfo" :user="userInfo"></UserProfileComponent>
  </div>
</template>
