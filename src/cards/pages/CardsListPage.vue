<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            router-link="/tabs/cards/create"
            router-direction="forward"
          >
            Add
          </ion-button>
        </ion-buttons>

        <ion-title>Cards</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <CardsList
        :cards="cards"
        @remove="onCardRemove"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'
import { Card, useCardsRepository, CardsList } from '@/cards'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const cardsRepo = useCardsRepository()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const cards = ref<Card[]>([])


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(async () => { await onRefresh() })


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onCardRemove(id: string) {
  await cardsRepo.removeCard(id)
  await onRefresh()
}

async function onRefresh() {
  cards.value = await cardsRepo.getAllCards()
}
</script>
