<template>
  <ion-item-sliding>
    <ion-item-options>
      <ion-item-option
        color="danger"
        @click="emit('remove', props.card._id)"
      >
        Delete
      </ion-item-option>
    </ion-item-options>

    <ion-item>
      <!-- <ion-thumbnail slot="start">
        <img
          alt="Silhouette of mountains"
          :src="'http://localhost/content/' + props.card.uri"
        >
      </ion-thumbnail> -->
      <ion-label
        class="ion-text-wrap"
        :router-link="'/tabs/cards/' + props.card._id"
        router-direction="forward"
      >
        <h2>{{ props.card.verseNumber }}</h2>
        <p>{{ props.card.theme }}</p>
      </ion-label>
    </ion-item>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/vue'
import { defineProps, defineEmits } from 'vue'
import { Card } from '@/cards'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: Card
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>