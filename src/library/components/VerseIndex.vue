<template>
  <ion-list lines="full">
    <ion-item
      :router-link="links.content"
      :detail="true"
      router-direction="forward"
    >
      <ion-label>Text and translation</ion-label>
    </ion-item>
    <ion-item
      :router-link="links.synonyms"
      :detail="true"
      router-direction="forward"
    >
      <ion-label>
        Synonyms
      </ion-label>
    </ion-item>
    <ion-item
      :router-link="links.card"
      :detail="true"
      router-direction="forward"
    >
      <ion-label>Card</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Audio</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { IonItem, IonLabel, IonList } from '@ionic/vue'
import { Verse } from '../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const links = {
  card: `${props.verse._id}/card`,
  content: `${props.verse._id}/content`,
  synonyms: `${props.verse._id}/synonyms`,
}
</script>
