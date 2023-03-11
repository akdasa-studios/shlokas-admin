<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            @click="onSaveClicked"
          >
            Save
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>

        <ion-title>Add Verse</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-label position="floating">
          Language
        </ion-label>
        <ion-input v-model="language" />
      </ion-item>

      <ion-item>
        <ion-label position="floating">
          Number
        </ion-label>
        <ion-input v-model="number" />
      </ion-item>

      <ion-item>
        <ion-label position="floating">
          Text
        </ion-label>
        <ion-textarea
          v-model="text"
          :auto-grow="true"
        />
      </ion-item>

      <ion-item>
        <ion-label position="floating">
          Translation
        </ion-label>
        <ion-textarea
          v-model="translation"
          :auto-grow="true"
        />
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonButton, IonButtons, IonTextarea, IonInput, IonBackButton, useIonRouter } from '@ionic/vue'
import { ref } from 'vue'
import { useVersesListController } from '@/library/controllers/useVersesListController'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesListController = useVersesListController()
const router = useIonRouter()
const number = ref('')
const text = ref('')
const translation = ref('')
const language = ref('')

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onSaveClicked() {
  await versesListController.addVerse({
    language: language.value,
    number: number.value,
    text: text.value.split('\n'),
    translation: translation.value
  })
  router.back()
}
</script>
