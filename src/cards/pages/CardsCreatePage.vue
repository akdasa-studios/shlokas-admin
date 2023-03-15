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

        <ion-title>Add Card</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <CardEditForm
        v-if="verse._id"
        v-model="card"
        :verse="verse"
        @file-generated="onFileGenerated"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, useIonRouter } from '@ionic/vue'
import { onMounted, ref, defineProps } from 'vue'
import { CardEditForm, Card, EmptyCard, useCardsRepository } from '@/cards'
import { useVersesRepository, Verse } from '@/verses'
import { useEnvironment, useFileUploader } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verseId?: string
  cardId?: string
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const cardsRepo = useCardsRepository()
const verseRepo = useVersesRepository()
const uploader = useFileUploader(useEnvironment().getContentUrl())
const router = useIonRouter()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const card = ref<Card>(EmptyCard())
const verse = ref<Verse>({} as Verse)
let generatedFile = ''

/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(async () => await onOpened())


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  // Load card if cardId is provided
  if (props.cardId) {
    card.value = await cardsRepo.getCard(props.cardId)
  }

  // Load verse using verseId or card.verseId
  verse.value = await verseRepo.getVerse(props.verseId || card.value.verseId)

  // If cardId is not provided, initialize card with verse data
  if (!props.cardId) {
    card.value.verseId = verse.value._id
    card.value.verseNumber = verse.value.number
    card.value.words = verse.value.synonyms.map(x => ({
      text: x.translation,
      line: x.lineNumber || 0,
      posx: 0
    }))
  }
}

async function onSaveClicked() {
  card.value.theme = card.value.theme || 'default'
  if (generatedFile) {
    const fileName = `verse-card-${props.verseId}-${card.value.theme}.svg`
    await uploader.upload(fileName, generatedFile, 'image/svg+xml')
    card.value.uri = fileName
  }
  cardsRepo.saveCard(card.value)
  router.back()
}

function onFileGenerated(file: string) {
  generatedFile = file
}

</script>
