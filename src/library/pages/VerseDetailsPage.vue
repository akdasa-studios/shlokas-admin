<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
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
          :router-link="getUrl(page.url)"
        >
          <ion-label>{{ page.title }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { defineProps, onMounted, ref } from 'vue'
import { useVerseDetailsController } from '../controllers/useVerseDetailsController'
import { Verse } from '../models/verse'


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
const pages = [
  { title: 'Content', url: 'content' },
  { title: 'Synonyms', url: 'synonyms' },
  { title: 'Card', url: 'card' }
]

function getUrl(url: string): string {
  return `/tabs/verses/${verse.value._id}/${url}`
}


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  verse.value = await versesController.getVerse(props.id)
})
</script>
