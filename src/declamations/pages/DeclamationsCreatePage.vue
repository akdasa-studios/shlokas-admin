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
      {{ declamation }}
      <DeclamationEditForm
        v-model="declamation"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton } from '@ionic/vue'
import { ref } from 'vue'
import { DeclamationEditForm, Declamation, EmptyDeclamation } from '@/declamations'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const declamation = ref<Declamation>(EmptyDeclamation())

function onSaveClicked() {
  ///
}

</script>
