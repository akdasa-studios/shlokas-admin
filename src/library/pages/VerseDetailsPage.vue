<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>

        <ion-buttons slot="primary">
          <ion-button
            :disabled="!isAnyChangeMade"
            @click="onSaveClicked"
          >
            Save
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{ verse.number }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list lines="full">
        <ion-item
          v-for="page in pages"
          :key="page.title"
          :detail="true"
          @click="onOpenModalRequested(page.component, page.title)"
        >
          <ion-label>{{ page.title }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonList, IonLabel, IonItem, IonBackButton, modalController } from '@ionic/vue'
import { defineProps, onMounted, ref } from 'vue'
import { ComponentRef } from '@ionic/core'
import { Verse } from '../models/verse'
import { useVerseDetailsController } from '../controllers/useVerseDetailsController'

import VerseContent from '../components/verseDetails/VerseContent.vue'
import VerseSynonyms from '../components/verseDetails/VerseSynonyms.vue'
import VerseCard from '../components/verseDetails/VerseCard.vue'
import VerseEditModalContainer from './VerseEditModalContainer.vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesController = useVerseDetailsController()
const verse = ref<Verse>({} as Verse)
const isAnyChangeMade = ref(false)
const pages = [
  { title: 'Content', component: VerseContent },
  { title: 'Synonyms', component: VerseSynonyms },
  { title: 'Card', component: VerseCard }
]


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  verse.value = await versesController.getVerse(props.id)
  console.log('verse.value', verse.value)
})

async function onOpenModalRequested(component: ComponentRef, title: string) {
  const modal = await modalController.create({
    component: VerseEditModalContainer,
    componentProps: {
      component: component,
      verse: verse.value,
      title: `${verse.value.number} :: ${title}`
    },
  })
  modal.present()

  const { data, role } = await modal.onWillDismiss()

  if (role === 'confirm') {
    verse.value = data
    isAnyChangeMade.value = true
  }
}

async function onSaveClicked() {
  versesController.saveVerse(verse.value)
}
</script>
