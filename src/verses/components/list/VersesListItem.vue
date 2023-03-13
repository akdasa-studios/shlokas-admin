<template>
  <ion-item-sliding>
    <ion-item-options>
      <ion-item-option
        color="danger"
        @click="emit('remove', props.verse._id)"
      >
        Delete
      </ion-item-option>
    </ion-item-options>


    <ion-item>
      <ion-label
        class="ion-text-wrap"
        :router-link="'/tabs/verses/' + verse._id"
        router-direction="forward"
      >
        <h2>{{ props.verse.number }}</h2>
        <p>{{ props.verse.translation }}</p>
      </ion-label>
    </ion-item>
  </ion-item-sliding>
</template>

<script setup lang="ts">
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/vue'
import { defineProps, defineEmits } from 'vue'
import { Verse } from '@/verses'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse
}>()

const emit = defineEmits<{
  (event: 'remove', id: string): void
}>()
</script>
