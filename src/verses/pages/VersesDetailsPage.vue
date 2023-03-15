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
      <div
        v-for="card in cards"
        :key="card._id"
        class="image-container"
      >
        <img
          class="image"
          :src="'http://localhost/content/'+card.uri+forceImageReload"
          @click="() => onImageClicked(card._id)"
        >

        <div
          v-for="declamation in declamations"
          :key="declamation._id"
          class="player-container"
        >
          <DeclamationPlayer
            :declamation="declamation"
          />
        </div>
      </div>


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
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonRouter, onIonViewWillEnter } from '@ionic/vue'
import { defineProps, onMounted, ref } from 'vue'
import { Verse, useVersesRepository, getVerseReference } from '@/verses'
import { Card, useCardsRepository } from '@/cards'
import { Declamation, DeclamationPlayer, useDeclamationsRepository } from '@/declamations'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const versesRepo = useVersesRepository()
const cardsRepo = useCardsRepository()
const declamationsRepo = useDeclamationsRepository()
const router = useIonRouter()

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(() => {
  console.log('onIonViewWillEnter')
  forceImageReload.value = '?'+Math.random()
})

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const verse = ref<Verse>({} as Verse)
const cards = ref<Card[]>([])
const declamations = ref<Declamation[]>([])
const forceImageReload = ref('')
const pages = [
  { title: 'Content', url: 'content' },
  { title: 'Synonyms', url: 'synonyms' },
  { title: 'Add declamation', url: '/tabs/declamations/create' },
  { title: 'Add card', url: '/tabs/cards/create' },
]


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  verse.value = await versesRepo.getVerse(props.id)
  cards.value = await cardsRepo.getCardsOfVerse(props.id)
  declamations.value = await declamationsRepo.getDeclamationsOfVerseReference(getVerseReference(verse.value.number))
})

function onImageClicked(id: string) {
  router.push('/tabs/cards/' + id)
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getUrl(url: string): string {
  if (url.startsWith('/')) {
    const vr = getVerseReference(verse.value.number)
    const vid = verse.value._id
    return url + `?verseReference=${vr}&verseId=${vid}`
  }
  return `/tabs/verses/${verse.value._id}/${url}`
}

</script>

<style>
.image {
  max-height: 240px;
  /* align-self: center; */
}

.image-container {
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.player-container {
  width: 50%;
}
</style>