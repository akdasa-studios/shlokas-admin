<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button @click="onSaveClicked">
            Save
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button
            color="medium"
            @click="onCancelClicked"
          >
            Cancel
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{ props.title }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <component
        :is="props.component"
        :verse="props.verse"
        @change="onVerseChanged"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonToolbar, IonButtons, IonTitle, IonHeader, IonContent, IonButton, modalController } from '@ionic/vue'
import { defineProps, ref } from 'vue'
import { Verse } from '../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse,
  component: object,
  title: string
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const changedVerse = ref({})

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onVerseChanged(verse: Verse) {
  changedVerse.value = verse
}

function onSaveClicked() {
  return modalController.dismiss(changedVerse.value, 'confirm')
}

function onCancelClicked() {
  return modalController.dismiss(null, 'cancel')
}
</script>
