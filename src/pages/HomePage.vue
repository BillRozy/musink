<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue';
import { useYandexStore } from '../stores/yandex';
const YaLogin = defineAsyncComponent(() => import('components/YaLogin.vue'));
const SpLogin = defineAsyncComponent(() => import('components/SpLogin.vue'));
const yaStore = useYandexStore();
const { user } = storeToRefs(yaStore);
</script>

<template>
  <q-page>
    <div class="row">
      <div class="col">
        <YaLogin class="flex-center" v-if="!user"></YaLogin>
      </div>
      <div class="cola-2"></div>
      <div class="col"><SpLogin class="flex-center"></SpLogin></div>
    </div>
  </q-page>
</template>
