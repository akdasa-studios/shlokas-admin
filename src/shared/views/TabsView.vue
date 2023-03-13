<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="verses"
          href="/tabs/verses"
        >
          <ion-icon
            aria-hidden="true"
            :icon="libraryOutline"
          />
          <ion-label>Verses</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="declamations"
          href="/tabs/declamations"
        >
          <ion-icon
            aria-hidden="true"
            :icon="musicalNotesOutline"
          />
          <ion-label>Declamations</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="users"
          href="/tabs/users"
        >
          <ion-icon
            aria-hidden="true"
            :icon="peopleOutline"
          />
          <ion-label>Users</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue'
import { libraryOutline, peopleOutline, musicalNotesOutline } from 'ionicons/icons'
</script>
