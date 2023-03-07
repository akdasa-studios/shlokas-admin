<template>
  <ion-input
    v-for="word, widx in synonym.words"
    :key="widx"
    v-model="synonym.words[widx]"
    placeholder="word"
  />

  <ion-input
    v-model="synonym.translation"
    placeholder="Translation"
  />
</template>

<script setup lang="ts">
import { IonInput } from '@ionic/vue'
import { defineProps, defineEmits, reactive, watch, toRaw } from 'vue'
import { Synonym, Verse } from '../models/verse'

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

const synonym = reactive<Synonym>(props.verse.synonyms[props.synonymId])


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch([synonym], () => {
  const copy = {...props.verse}
  copy.synonyms[props.synonymId] = toRaw(synonym)
  emit('change', copy)
})
</script>
