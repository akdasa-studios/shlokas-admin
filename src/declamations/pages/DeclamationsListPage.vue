<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            router-link="/tabs/declamations/create"
            router-direction="forward"
          >
            Add
          </ion-button>
        </ion-buttons>

        <ion-title>Declamations</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <DeclamationsList
        :declamations="declamations"
        @remove="onDeclamationRemove"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'
import { Declamation, useDeclamationsRepository, DeclamationsList } from '@/declamations'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const declamationsRepo = useDeclamationsRepository()
const declamations = ref<Declamation[]>([])

onIonViewWillEnter(async () => { await refresh() })

async function refresh() {
  declamations.value = await declamationsRepo.getAllDeclamations()
}

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onDeclamationRemove(id: string) {
  await declamationsRepo.removeDeclamation(id)
  await refresh()
}
</script>
