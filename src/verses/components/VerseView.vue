<template>
  <VerseTextView
    :lines="verse.text"
    :router-link="links.content"
    @click="router.push(links.content)"
  />

  <ion-button
    :router-link="links.interlinear"
    router-direction="forward"
  >
    Interlinear
  </ion-button>

  <ion-button
    :router-link="links.content"
    router-direction="forward"
  >
    Content
  </ion-button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { IonButton , useIonRouter } from '@ionic/vue'
import { Verse } from '../models/verse'
import VerseTextView from './VerseTextView.vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()

const links = {
  interlinear: `${props.verse.id}/interlinear`,
  content: `${props.verse.id}/content`
}

</script>
