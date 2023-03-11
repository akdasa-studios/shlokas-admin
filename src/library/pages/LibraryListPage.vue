<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            router-link="/tabs/verses/add"
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

      <ion-list>
        <ion-item-sliding
          v-for="verse in verses"
          :key="verse._id"
        >
          <ion-item-options>
            <ion-item-option
              color="danger"
              @click="onDeleteClicked(verse._id)"
            >
              Delete
            </ion-item-option>
          </ion-item-options>


          <ion-item>
            <ion-label
              class="ion-text-wrap"
              :router-link="'/tabs/verses/' + verse._id"
              router-direction="forward"
            >
              <h2>{{ verse.number }}</h2>
              <p>{{ verse.translation }}</p>
            </ion-label>
          </ion-item>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem, IonLoading, IonButton, IonButtons, onIonViewWillEnter, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { Verse } from '@/library/models/verse'
import { useVersesListController } from '@/library/controllers/useVersesListController'

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

async function onDeleteClicked(id: string) {
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
}
</script>
