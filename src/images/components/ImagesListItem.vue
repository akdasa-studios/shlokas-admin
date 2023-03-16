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
      <ion-label
        class="ion-text-wrap"
        :router-link="'/tabs/images/' + props.card._id"
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
import { Image } from '@/images'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  card: Image
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>