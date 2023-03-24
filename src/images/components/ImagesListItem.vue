<template>
  <ion-item-sliding>
    <ion-item-options>
      <ion-item-option
        color="danger"
        @click="emit('remove', props.verseImage._id)"
      >
        Delete
      </ion-item-option>
    </ion-item-options>

    <ion-item>
      <ion-label
        class="ion-text-wrap"
        :router-link="'/tabs/images/' + props.verseImage._id"
        router-direction="forward"
      >
        <h2>{{ props.verseImage.verseId }}</h2>
        <p>{{ props.verseImage.theme }}</p>
      </ion-label>
    </ion-item>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/vue'
import { defineProps, defineEmits } from 'vue'
import { VerseImage } from '@/images'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verseImage: VerseImage
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>