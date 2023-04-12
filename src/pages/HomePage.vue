<script setup lang="ts">
import ProviderHome from 'components/ProviderHome.vue'
</script>

<template>
  <q-page>
    <div class="row">
      <div class="col">
        <ProviderHome api-provider="yandex">
        </ProviderHome>
      </div>
      <div class="cola-2"></div>
      <div class="col">
        <ProviderHome api-provider="spotify">
        </ProviderHome>
      </div>
    </div>
  </q-page>
</template>
