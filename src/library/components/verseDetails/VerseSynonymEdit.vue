<template>
  <ion-item
    v-for="word, widx in synonym.words"
    :key="widx"
  >
    <ion-label position="stacked">
      Word
    </ion-label>
    <ion-input
      v-model="synonym.words[widx]"
    />
  </ion-item>

  <ion-item>
    <ion-label position="stacked">
      Translation
    </ion-label>
    <ion-input
      v-model="synonym.translation"
    />
  </ion-item>

  <ion-item>
    <ion-label position="stacked">
      Short Translation
    </ion-label>
    <ion-input
      v-model="synonym.shortTranslation"
    />
  </ion-item>

  <ion-item>
    <ion-label position="stacked">
      Line Number
    </ion-label>
    <ion-input
      v-model="synonym.lineNumber"
      type="number"
    />
  </ion-item>
</template>

<script setup lang="ts">
import { IonInput, IonLabel, IonItem } from '@ionic/vue'
import { defineProps, defineEmits, toRef, watch, toRaw, ref } from 'vue'
import { Synonym, Verse } from '../../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse,
  synonymId: number
}>()

const emit = defineEmits<{
  (e: 'change', verse: Verse): void
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const synonymId = toRef(props, 'synonymId')
const synonym = ref<Synonym>(props.verse.synonyms[props.synonymId])


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(synonymId, (id) => {
  synonym.value = props.verse.synonyms[id]
})

watch(synonym, () => {
  const copy = {...props.verse}
  copy.synonyms[props.synonymId] = toRaw(synonym.value)
  // TODO:
  // @ts-ignore
  copy.synonyms[props.synonymId].lineNumber = parseInt(copy.synonyms[props.synonymId].lineNumber as string)
  emit('change', copy)
})
</script>
