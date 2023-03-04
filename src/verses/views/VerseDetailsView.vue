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

    <ion-content
      class="ion-padding"
    >
      <VerseTextView
        :lines="verse.text"
      />

      <ion-button
        :router-link="'/tabs/verses/' + verse.id + '/interlinear'"
        router-direction="forward"
      >
        sdsd
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton } from '@ionic/vue'
import { defineProps } from 'vue'
import VerseTextView from '../components/VerseTextView.vue'
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
