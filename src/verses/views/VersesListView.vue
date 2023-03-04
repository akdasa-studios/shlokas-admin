<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Verses</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Verses
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item
          v-for="verse in verses"
          :key="verse.id"
        >
          <ion-label
            :router-link="'/tabs/verses/' + verse.id"
            router-direction="forward"
          >
            <h2>{{ verse.title }}</h2>
            <p>{{ verse.content }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem } from '@ionic/vue'

export interface Verse {
  id: number
  title: string
  content: string
}

const verses = [
  { id: 1, title: 'First', content: 'First content' },
  { id: 2, title: 'Second', content: 'Second content' },
  { id: 3, title: 'Third', content: 'Third content' }
]
</script>
