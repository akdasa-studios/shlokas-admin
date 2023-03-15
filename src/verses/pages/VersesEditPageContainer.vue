<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button @click="onSaveClicked">
            Save
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>
          {{ props.title }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <component
        :is="component"
        :verse="verse"
        v-bind="props.componentProps"
        @change="onVerseChanged"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonToolbar, IonButtons, IonTitle, IonHeader, IonContent, IonButton, IonBackButton, useIonRouter } from '@ionic/vue'
import { defineProps, onMounted, ref, shallowRef, withDefaults } from 'vue'
import { useVersesRepository, Verse } from '@/verses'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = withDefaults(defineProps<{
  id: string
  component: object,
  componentProps?: object,
  title: string
}>(), {
  componentProps: () => ({}),
})

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesRepo = useVersesRepository()
const router = useIonRouter()
const verse = ref<Verse>({} as Verse)
const component = shallowRef()

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  verse.value = await versesRepo.getVerse(props.id)
  // @ts-ignore
  component.value = (await props.component).default
})

function onVerseChanged(changedVerse: Verse) {
  verse.value = changedVerse
}

function onSaveClicked() {
  versesRepo.saveVerse(verse.value)
  router.back()
}
</script>
