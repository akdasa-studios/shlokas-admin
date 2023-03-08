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
          :key="verse._id"
        >
          <ion-label
            class="ion-text-wrap"
            :router-link="'/tabs/verses/' + verse._id"
            router-direction="forward"
          >
            <h2>{{ verse.number }}</h2>
            <p>{{ verse.translation }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { Verse } from '@/library/models/verse'
import { useVersesStore } from '@/library/stores/useVersesStore'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesStore = useVersesStore()
const verses = ref<Verse[]>([])

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  verses.value  = await versesStore.all()
})
</script>
