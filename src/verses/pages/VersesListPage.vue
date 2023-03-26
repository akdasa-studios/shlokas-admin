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
        :is-open="isSyncing"
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
import { useVersesRepository, Verse, VersesList } from '@/verses'
import { useSync } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesRepo = useVersesRepository()
const verses = ref<Verse[]>([])
const { sync, isSyncing } = useSync()

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => { await onSync() })
onIonViewWillEnter(async () => { await refresh() })

async function onVerseRemove(id: string) {
  await versesRepo.removeVerse(id)
  await refresh()
}

async function refresh() {
  const repoVerses = await versesRepo.getAllVerses()
  verses.value = repoVerses.sort((a: Verse, b: Verse) => compare(a.number, b.number))
}


function compare(a: string, b: string): number {
  const tokens1 = a.split(/\.| /)
  const tokens2 = b.split(/\.| /)
  for (const [idx] of tokens1.entries()) {
    if (idx == 0) {
      if (tokens1[idx] > tokens2[idx]) { return 1 }
      if (tokens1[idx] < tokens2[idx]) { return -1 }
    } else {
      const c = parseInt(tokens1[idx]) - parseInt(tokens2[idx])
      if (c != 0) return c
    }
  }
  return 0
}


async function onSync() {
  try {
    await sync()
  } catch (err) {
    console.error('Error syncing verses list.', err)
  }
  await refresh()
}
</script>
