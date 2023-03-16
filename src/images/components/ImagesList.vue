<template>
  <ion-list>
    <ImagesListItem
      v-for="card in props.images"
      :key="card._id"
      :card="card"
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
  images: Image[]
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>
