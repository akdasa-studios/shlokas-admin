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
      <ion-list
        v-if="loadDataTask.executedYet.value"
        lines="full"
      >
        <ion-list-header>
          <ion-label>Content</ion-label>
        </ion-list-header>

        <ion-item
          :detail="true"
          :router-link="go('verses:content')"
        >
          <ion-label>Content</ion-label>
        </ion-item>
        <ion-item
          :detail="true"
          :router-link="go('verses:synonyms')"
        >
          <ion-label>Synonyms</ion-label>
        </ion-item>

        <!-- Images -->
        <ion-list-header>
          <ion-label>Images</ion-label>
          <ion-button :router-link="go('images:create', {verseId: verse._id})">
            <ion-icon />
            Add
          </ion-button>
        </ion-list-header>
        <ion-item
          v-for="image in images"
          :key="image._id"
          :detail="true"
          :router-link="go('images:edit', {id: image._id})"
        >
          {{ image.theme }}
          {{ image.url }}
        </ion-item>

        <!-- Declamations -->
        <ion-list-header>
          <ion-label>Declamations</ion-label>
          <ion-button @click="onCreateDeclamationClicked">
            <ion-icon />
            Add
          </ion-button>
        </ion-list-header>
        <ion-item
          v-for="declamation in declamations"
          :key="declamation._id"
          :detail="true"
          :router-link="go('declamations:edit', {id: declamation._id})"
        >
          {{ declamation.theme }} {{ declamation.type }}
        </ion-item>
      </ion-list>
    </ion-content>

    <CreateDeclamationActionSheet
      :is-open="isCreateDeclamationOpen"
      @did-dismiss="onCreateDeclamationDismissed"
    />
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonPage, IonTitle, IonToolbar, IonListHeader, IonButton, onIonViewWillEnter, IonIcon,
} from '@ionic/vue'
import { defineProps, ref } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import { Verse, useVersesRepository, getVerseReference, CreateDeclamationActionSheet } from '@/verses'
import { useVerseImagesRepository, VerseImage } from '@/images'
import { Declamation, useDeclamationsRepository } from '@/declamations'
import { go, useLongTask } from '@/shared'
import router from '@/router'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const loadDataTask = useLongTask(loadData)
const versesRepo = useVersesRepository()
const imagesRepo = useVerseImagesRepository()
const declamationsRepo = useDeclamationsRepository()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const verse = ref<Verse>({} as Verse)
const images = ref<VerseImage[]>([])
const declamations = ref<Declamation[]>([])
const isCreateDeclamationOpen = ref(false)


/* -------------------------------------------------------------------------- */
/*                                 Lifehooks                                  */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onOpened)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  await loadDataTask.run()
}

function onCreateDeclamationClicked() {
  isCreateDeclamationOpen.value = true
}

function onCreateDeclamationDismissed(type: string) {
  isCreateDeclamationOpen.value = false
  if (!type) return

  const routes: { [key: string]: RouteLocationRaw } = {
    verse:       go('declamations:create', {verseReference: getVerseReference(verse.value.number), type: 'verse'}),
    translation: go('declamations:create', {verseReference: verse.value._id, type: 'translation'}),
  }
  router.push(routes[type])
}


/* -------------------------------------------------------------------------- */
/*                                    Tasks                                   */
/* -------------------------------------------------------------------------- */

async function loadData() {
  verse.value = await versesRepo.getVerse(props.id)
  images.value = await imagesRepo.getImagesOfVerse(props.id)
  declamations.value = await declamationsRepo.getDeclamationsOfVerse(
    [getVerseReference(verse.value.number), verse.value._id]
  )
}
</script>
