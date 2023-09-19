<script setup lang="ts">
import { ref, Ref, toRefs } from 'vue';
import useRestAPI from 'src/api';
import { useProviderStore } from 'src/stores';
import UserProfileComponent from 'components/UserProfile.vue';
import type { Track, UserProfile } from 'src/types/models';
import { MusinkAPIProvider } from 'src/types/global';
import { storeToRefs } from 'pinia';
import TrackList from './TrackList.vue';
const props = defineProps<{
  apiProvider: MusinkAPIProvider
}>()
const { apiProvider } = toRefs(props);
const store = useProviderStore(apiProvider.value);
const { token } = storeToRefs(store);
const { getCurrentUser, getFavoriteTracks } = useRestAPI(apiProvider.value);
const userInfo: Ref<UserProfile | null> = ref(null);
const userTracks: Ref<Track[]> = ref([]);
userInfo.value = await getCurrentUser();
userTracks.value = await getFavoriteTracks(userInfo.value);
console.log(userTracks.value);
</script>

<template>
  <div v-if="token" class="q-pa-md">
    <UserProfileComponent v-if="userInfo" :user="userInfo"></UserProfileComponent>
    <TrackList :tracks="userTracks"></TrackList>
  </div>
</template>
