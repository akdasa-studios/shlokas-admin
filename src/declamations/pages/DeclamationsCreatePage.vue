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

        <ion-title>Add Declamation</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <DeclamationEditForm
        v-model="declamation"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, useIonRouter } from '@ionic/vue'
import { ref, defineProps } from 'vue'
import { DeclamationEditForm, Declamation, EmptyDeclamation, useDeclamationsRepository } from '@/declamations'


const props = defineProps<{
  verseReference?: string,
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const repo = useDeclamationsRepository()
const router = useIonRouter()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const declamation = ref<Declamation>(EmptyDeclamation(props.verseReference, 'default'))

function onSaveClicked() {
  repo.saveDeclamation(declamation.value)
  router.back()
}

</script>
