<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button
            router-link="/tabs/declamations/create"
            router-direction="forward"
          >
            Add
          </ion-button>
        </ion-buttons>

        <ion-title>Declamations</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      Declamations
      <!-- <VersesList
        :verses="verses"
        @remove="onVerseRemove"
      /> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

</script>
