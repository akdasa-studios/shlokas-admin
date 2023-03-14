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
        v-if="declamation._id"
        v-model="declamation"
        :disable-verse-reference="true"
        :disable-theme="true"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, useIonRouter } from '@ionic/vue'
import { ref, defineProps, onMounted } from 'vue'
import { DeclamationEditForm, Declamation, EmptyDeclamation, useDeclamationsRepository } from '@/declamations'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()

/* -------------------------------------------------------------------------- */
/*                                   Lifehooks                                */
/* -------------------------------------------------------------------------- */

onMounted(() => onOpened())

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const declamation = ref<Declamation>(EmptyDeclamation())
const repo = useDeclamationsRepository()
const router = useIonRouter()

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onSaveClicked() {
  repo.saveDeclamation(declamation.value)
  router.back()
}

async function onOpened() {
  declamation.value = await repo.getDeclamation(props.id)
}
</script>
