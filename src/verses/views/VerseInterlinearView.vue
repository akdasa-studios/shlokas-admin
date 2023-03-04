<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>{{ verse.number }} / Interlinear</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <InterlinearTranslation />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue'
import { defineProps } from 'vue'
import InterlinearTranslation from '../components/InterlinearTranslation.vue'
import { useVersesStore } from '../stores/versesStore'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesStore = useVersesStore()
const verse = await versesStore.get(props.id)
</script>
