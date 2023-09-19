<script lang="ts" setup>
import { toRefs } from 'vue';
import type { Track } from 'src/types/models';
import { durationMsToMinutes } from 'src/helpers'
const props = defineProps<{
  track: Track;
}>();
const { track } = toRefs(props);
</script>

<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
        <img :src="track.album.images[0]?.url">
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ track.title }}</q-item-label>
      <q-item-label caption lines="1">{{ track.artist.map(art => art.title).join(', ') }}</q-item-label>
      <q-item-label caption lines="1">{{ durationMsToMinutes(track.duration) }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon name="mdi-music" color="grey" />
    </q-item-section>
  </q-item>
</template>
