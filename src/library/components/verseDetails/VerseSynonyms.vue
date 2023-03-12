<template>
  <ion-item
    v-for="synonym,idx in synonyms"
    :key="idx"
    @click="onSynonymClick(idx)"
  >
    <ion-label>
      <h2>{{ synonym.words.join(' ') }}</h2>
      <p>{{ synonym.translation }}</p>
    </ion-label>
  </ion-item>


  <ion-modal
    :initial-breakpoint="0.25"
    :breakpoints="[0.25, 0.5, 0.75]"
    :backdrop-breakpoint="0.5"
    :is-open="isModalOpen"
    @will-dismiss="isModalOpen = false"
  >
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button @click="isModalOpen = false">
            Close
          </ion-button>
        </ion-buttons>
        <ion-title>
          Edit Synonym
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <VerseSynonymEdit
      :synonym-id="synonymId"
      :verse="props.verse"
    />
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonItem, IonLabel, IonToolbar, IonHeader, IonTitle, IonButtons, IonButton } from '@ionic/vue'
import { defineProps, defineEmits, watch, toRaw, ref } from 'vue'
import { Verse } from '../../models/verse'
import VerseSynonymEdit from './VerseSynonymEdit.vue'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse
}>()

const emit = defineEmits<{
  (e: 'change', verse: Verse): void
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const synonyms = ref(props.verse.synonyms)
const isModalOpen = ref(false)
const synonymId = ref(0)


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

async function onSynonymClick(idx: number) {
  isModalOpen.value = true
  synonymId.value = idx
}

watch(synonyms, () => {
  emit('change', {
    ...props.verse,
    synonyms: toRaw(synonyms.value)
  })
}, { deep: true })
</script>
