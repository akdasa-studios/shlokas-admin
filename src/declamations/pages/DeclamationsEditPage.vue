<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button @click="onSaveClicked">
            Save
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>

        <ion-title>Edit Declamation</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <DeclamationEditForm
        v-if="isCreatingNew || loadDataTask.executedYet.value"
        v-model="declamation"
        :disable-verse-reference="!isCreatingNew"
        :disable-theme="!isCreatingNew"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, useIonRouter } from '@ionic/vue'
import { ref, defineProps, onMounted } from 'vue'
import { DeclamationEditForm, Declamation, EmptyDeclamation, useDeclamationsRepository } from '@/declamations'
import { useLongTask } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id?: string,
  verseReference?: string,
}>()

/* -------------------------------------------------------------------------- */
/*                                   Lifehooks                                */
/* -------------------------------------------------------------------------- */

onMounted(() => onOpened())

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const repo = useDeclamationsRepository()
const router = useIonRouter()
const loadDataTask = useLongTask(loadData)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const declamation = ref<Declamation>(
  EmptyDeclamation(props.verseReference, 'default')
)
const isCreatingNew = props.id === undefined


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onSaveClicked() {
  repo.saveDeclamation(declamation.value)
  router.back()
}

async function onOpened() {
  if (!props.id) { return }
  await loadDataTask.run()
}

/* -------------------------------------------------------------------------- */
/*                                    Tasks                                   */
/* -------------------------------------------------------------------------- */

async function loadData() {
  declamation.value = await repo.getDeclamation(props.id as string)
}
</script>
