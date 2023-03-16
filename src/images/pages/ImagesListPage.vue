<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            router-link="/tabs/images/create"
            router-direction="forward"
          >
            Add
          </ion-button>
        </ion-buttons>

        <ion-title>Images</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ImagesList
        :images="images"
        @remove="onImageRemove"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'
import { Image, useImagesRepository, ImagesList } from '@/images'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const imagesRepo = useImagesRepository()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const images = ref<Image[]>([])


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(async () => { await onRefresh() })


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onImageRemove(id: string) {
  await imagesRepo.removeImage(id)
  await onRefresh()
}

async function onRefresh() {
  images.value = await imagesRepo.getAllImages()
}
</script>
