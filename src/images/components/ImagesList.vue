<template>
  <ion-list>
    <ImagesListItem
      v-for="verseImage in props.verseImages"
      :key="verseImage._id"
      :verse-image="verseImage"
      @remove="(id: string) => emit('remove', id)"
    />
  </ion-list>
</template>

<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { defineProps, defineEmits } from 'vue'
import { Image, ImagesListItem } from '@/images'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verseImages: Image[]
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>
