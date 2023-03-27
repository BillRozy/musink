<script setup lang="ts">
import { ref, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSpotifyRestAPI } from 'api';
import { useSpotifyStore } from 'src/stores';
import UserProfileComponent from 'components/UserProfile.vue';
import type { UserProfile } from 'api/types';
const store = useSpotifyStore();
const { token } = storeToRefs(store);
const { getCurrentUser, getFavoriteTracks } = useSpotifyRestAPI(token.value);
const userInfo: Ref<UserProfile | null> = ref(null);
userInfo.value = await getCurrentUser();
</script>

<template>
  <div class="q-pa-md">
    <UserProfileComponent v-if="userInfo" :user="userInfo"></UserProfileComponent>
  </div>
</template>
