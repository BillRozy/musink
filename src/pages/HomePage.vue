<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';
import { useYandexStore } from 'src/stores';
import { useSpotifyStore } from 'src/stores';
const YaLogin = defineAsyncComponent(() => import('components/YaLogin.vue'));
const SpLogin = defineAsyncComponent(() => import('components/SpLogin.vue'));
const YaBoard = defineAsyncComponent(() => import('components/YaBoard.vue'));
const SpBoard = defineAsyncComponent(() => import('components/SpBoard.vue'));

const yaStore = useYandexStore();
const spStore = useSpotifyStore();
const { token: yatoken } = storeToRefs(yaStore);
const { token: sptoken } = storeToRefs(spStore);
</script>

<template>
  <q-page>
    <div class="row">
      <div class="col">
        <YaLogin class="flex-center" v-if="!yatoken"></YaLogin>
        <Suspense>
          <YaBoard class="flex-center" v-if="yatoken"></YaBoard>
        </Suspense>
      </div>
      <div class="cola-2"></div>
      <div class="col">
        <SpLogin class="flex-center" v-if="!sptoken"></SpLogin>
        <Suspense>
          <SpBoard class="flex-center" v-if="sptoken"></SpBoard>
        </Suspense>
      </div>
    </div>
  </q-page>
</template>
