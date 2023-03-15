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

        <!-- Cards -->
        <ion-list-header>
          <ion-label>Cards</ion-label>
        </ion-list-header>
        <ion-item
          v-for="card in cards"
          :key="card._id"
          :detail="true"
          :router-link="go('cards:edit', {id: card._id})"
        >
          {{ card.theme }}
        </ion-item>
        <ion-item
          :detail="true"
          :router-link="go('cards:create', {verseId: verse._id})"
        >
          Add card
        </ion-item>

        <!-- Declamations -->
        <ion-list-header>
          <ion-label>Declamations</ion-label>
        </ion-list-header>
        <ion-item
          v-for="declamation in declamations"
          :key="declamation._id"
          :detail="true"
          :router-link="go('declamations:edit', {id: declamation._id})"
        >
          {{ declamation.theme }}
        </ion-item>
        <ion-item
          :detail="true"
          :router-link="go('declamations:create', {verseReference: getVerseReference(verse.number)})"
        >
          Add declamation
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonListHeader } from '@ionic/vue'
import { defineProps, onMounted, ref } from 'vue'
import { Verse, useVersesRepository, getVerseReference } from '@/verses'
import { Card, useCardsRepository } from '@/cards'
import { Declamation, useDeclamationsRepository } from '@/declamations'
import { go, useLongTask } from '@/shared'


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
const cardsRepo = useCardsRepository()
const declamationsRepo = useDeclamationsRepository()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const verse = ref<Verse>({} as Verse)
const cards = ref<Card[]>([])
const declamations = ref<Declamation[]>([])


/* -------------------------------------------------------------------------- */
/*                                 Lifehooks                                  */
/* -------------------------------------------------------------------------- */

onMounted(onOpened)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  await loadDataTask.run()
}


/* -------------------------------------------------------------------------- */
/*                                    Tasks                                   */
/* -------------------------------------------------------------------------- */

async function loadData() {
  verse.value = await versesRepo.getVerse(props.id)
  cards.value = await cardsRepo.getCardsOfVerse(props.id)
  declamations.value = await declamationsRepo.getDeclamationsOfVerseReference(getVerseReference(verse.value.number))
}
</script>
