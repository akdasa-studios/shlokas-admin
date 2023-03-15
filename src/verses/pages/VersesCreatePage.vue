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
      <VerseContent
        :verse="verseContent"
        @change="v => verseContent = v"
      />

      <VerseSynonymParser
        :lines="verseContent.text"
        @change="v => synonyms = v"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/vue'
import { ref } from 'vue'
import { VerseContent, Synonym, VerseSynonymParser, useVersesRepository } from '@/verses'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesRepo = useVersesRepository()
const router = useIonRouter()
const verseContent = ref({
  number: '',
  text: [''],
  translation: '',
  language: ''
})
const synonyms = ref<Synonym[]>([])

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onSaveClicked() {
  // @ts-ignore
  await versesRepo.saveVerse({
    ...verseContent.value,
    synonyms: synonyms.value
  })
  router.back()
}
</script>
