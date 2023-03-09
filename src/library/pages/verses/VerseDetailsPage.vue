<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>
          {{ verse?.number }}
          <span v-if="title">
            :: {{ title }}
          </span>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content
      class="ion-padding"
    >
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue'
import { defineProps, onMounted, shallowRef, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { Verse } from '../../models/verse'
import { useVerseDetailsController } from '../../controllers/useVerseDetailsController'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
  component: Promise<object>,
  componentProps?: object,
  title?: string
}>()

const component = shallowRef<any>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const versesController = useVerseDetailsController()
const verse = ref({})


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(async () => {
  verse.value = await versesController.getVerse(props.id)
  console.log('verse.value', verse.value)
  // @ts-ignore
  component.value = (await props.component).default
})

const onVerseChanged = useDebounceFn((changedVerse: Verse) => {
  verse.value = changedVerse
  versesController.saveVerse(changedVerse)
}, 1000)
</script>
