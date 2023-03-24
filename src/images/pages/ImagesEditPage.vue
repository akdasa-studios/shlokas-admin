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

        <ion-title>Add Image</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ImageEditForm
        v-if="verse._id"
        v-model="verseImage"
        :verse="verse"
        @file-generated="onFileGenerated"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, useIonRouter } from '@ionic/vue'
import { onMounted, ref, defineProps } from 'vue'
import { ImageEditForm, VerseImage, EmptyImage, useVerseImagesRepository } from '@/images'
import { useVersesRepository, Verse } from '@/verses'
import { useEnvironment, useFileUploader } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verseImageId?: string
  verseId?: string
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const imagesRepo = useVerseImagesRepository()
const verseRepo = useVersesRepository()
const uploader = useFileUploader(useEnvironment().getContentUrl())
const router = useIonRouter()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const verseImage = ref<VerseImage>(EmptyImage())
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
  if (props.verseImageId) {
    verseImage.value = await imagesRepo.getImage(props.verseImageId)
  }

  // Load verse using verseId or verseImage.verseId
  const verseId = props.verseId || verseImage.value.verseId
  verse.value = await verseRepo.getVerse(verseId)

  // If verseImageId is not provided, initialize verseImage with verse data
  if (!props.verseImageId) {
    verseImage.value.verseId = verse.value._id
    verseImage.value.words = verse.value.synonyms.map(x => ({
      text: x.translation,
      line: x.lineNumber || 0,
      posx: 0
    }))
  }
}

async function onSaveClicked() {
  const verseId = props.verseId || verseImage.value.verseId
  verseImage.value.theme = verseImage.value.theme || 'default'
  if (generatedFile) {
    const fileName = `verse-image-${verseId}-${verseImage.value.theme}.svg`
    await uploader.upload(fileName, generatedFile, 'image/svg+xml')
    verseImage.value.url = fileName
  }
  await imagesRepo.saveVerseImage(verseImage.value)
  router.back()
}

function onFileGenerated(file: string) {
  generatedFile = file
}

</script>
