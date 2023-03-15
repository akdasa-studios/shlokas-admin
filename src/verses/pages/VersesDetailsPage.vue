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
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { defineProps, onMounted, ref } from 'vue'
import { Verse, useVersesRepository, getVerseReference } from '@/verses'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesRepo = useVersesRepository()
const verse = ref<Verse>({} as Verse)
const pages = [
  { title: 'Content', url: 'content' },
  { title: 'Synonyms', url: 'synonyms' },
  { title: 'Add declamation', url: '/tabs/declamations/create' },
  { title: 'Add card', url: '/tabs/cards/create' },
]

function getUrl(url: string): string {
  if (url.startsWith('/')) {
    const vr = getVerseReference(verse.value.number)
    const vid = verse.value._id
    return url + `?verseReference=${vr}&verseId=${vid}`
  }
  return `/tabs/verses/${verse.value._id}/${url}`
}


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  verse.value = await versesRepo.getVerse(props.id)
})
</script>
