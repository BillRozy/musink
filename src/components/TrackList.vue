<script lang="ts" setup>
import { toRefs } from 'vue';
import type { Track } from 'src/types/models';
import TrackListItem from './TrackListItem.vue';
const props = defineProps<{
  tracks: Track[];
}>();
const { tracks } = toRefs(props);
</script>

<template>
  <q-list bordered separator class="overflow-auto track-list full-height">
    <TrackListItem :track="track" v-for="track in tracks" :key="track.id" class="q-my-sm">
    </TrackListItem>
  </q-list>
</template>

<style lang="scss">
.track-list {
  max-height: 800px;
}
</style>
