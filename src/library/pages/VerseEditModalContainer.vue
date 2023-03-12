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
          <ion-back-button />
        </ion-buttons>
        <ion-title>
          {{ props.title }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <component
        :is="component"
        :verse="verse"
        @change="onVerseChanged"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonToolbar, IonButtons, IonTitle, IonHeader, IonContent, IonButton, IonBackButton, useIonRouter } from '@ionic/vue'
import { defineProps, onMounted, ref, shallowRef } from 'vue'
import { useVerseDetailsController } from '../controllers/useVerseDetailsController'
import { Verse } from '../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
  component: object,
  title: string
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesController = useVerseDetailsController()
const router = useIonRouter()
const verse = ref<Verse>({} as Verse)
const component = shallowRef()

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  verse.value = await versesController.getVerse(props.id)
  // @ts-ignore
  component.value = (await props.component).default
})

function onVerseChanged(changedVerse: Verse) {
  verse.value = changedVerse
}

function onSaveClicked() {
  versesController.saveVerse(verse.value)
  router.back()
}
</script>
