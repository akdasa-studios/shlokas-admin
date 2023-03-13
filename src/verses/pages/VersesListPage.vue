<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            router-link="/tabs/verses/create"
            router-direction="forward"
          >
            Add
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="start">
          <ion-button
            @click="sync"
          >
            Sync
          </ion-button>
        </ion-buttons>
        <ion-title>Verses</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-loading
        :is-open="isLoading"
        message="Please wait..."
        :duration="0"
      />

      <VersesList
        :verses="verses"
        @remove="onVerseRemove"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { useVersesListController, Verse, VersesList } from '@/verses'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesListController = useVersesListController()
const verses = ref<Verse[]>([])
const isLoading = ref(false)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => { await sync() })
onIonViewWillEnter(async () => { await refresh() })

async function onVerseRemove(id: string) {
  await versesListController.remove(id)
  await refresh()
}

async function refresh() {
  verses.value = await versesListController.getAllVerses()
}

async function sync() {
  try {
    isLoading.value = true
    await versesListController.sync()
    isLoading.value = false
  } catch (err) {
    console.error('Error syncing verses list.', err)
  }
  await refresh()
}
</script>
