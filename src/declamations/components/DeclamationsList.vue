<template>
  <ion-list>
    <DeclamationsListItem
      v-for="declamation in props.declamations"
      :key="declamation._id"
      :declamation="declamation"
      @remove="(id: string) => emit('remove', id)"
    />
  </ion-list>
</template>

<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { defineProps, defineEmits } from 'vue'
import { Declamation, DeclamationsListItem } from '@/declamations'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  declamations: Declamation[]
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>
