<script lang="ts" setup>
import { toRefs } from 'vue';
import { UserProfile } from 'api/types';
const props = defineProps<{
  user: UserProfile;
}>();
const { user } = toRefs(props);
</script>

<template>
  <q-card flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="user.imageURL" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user.name }}</q-item-label>
        <q-item-label caption> {{ user.email }} </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
