<template>
  <ion-list>
    <VersesListItem
      v-for="verse in props.verses"
      :key="verse._id"
      :verse="verse"
      @remove="(id: string) => emit('remove', id)"
    />
  </ion-list>
</template>

<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { defineProps, defineEmits } from 'vue'
import { Verse, VersesListItem } from '@/verses'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verses: Verse[]
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>
