<template>
  <ion-item-sliding>
    <ion-item-options>
      <ion-item-option
        color="danger"
        @click="emit('remove', props.declamation._id)"
      >
        Delete
      </ion-item-option>
    </ion-item-options>


    <ion-item>
      <ion-label
        class="ion-text-wrap"
        :router-link="'/tabs/declamations/' + props.declamation._id"
        router-direction="forward"
      >
        <h2>{{ props.declamation.verseReference }}</h2>
        <p>{{ props.declamation.theme }} {{ props.declamation.type }}</p>
      </ion-label>
    </ion-item>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/vue'
import { defineProps, defineEmits } from 'vue'
import { Declamation } from '@/declamations'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  declamation: Declamation
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>
