<template>
  <ion-list>
    <CardsListItem
      v-for="card in props.cards"
      :key="card._id"
      :card="card"
      @remove="(id: string) => emit('remove', id)"
    />
  </ion-list>
</template>

<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { defineProps, defineEmits } from 'vue'
import { Card, CardsListItem } from '@/cards'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  cards: Card[]
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>
