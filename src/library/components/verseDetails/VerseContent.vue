<template>
  <ion-textarea
    v-model="text"
    placeholder="Text"
    :auto-grow="true"
  />

  <ion-textarea
    v-model="translation"
    placeholder="Translation"
    :auto-grow="true"
  />
</template>

<script setup lang="ts">
import { IonTextarea } from '@ionic/vue'
import { defineProps, ref, defineEmits, watch } from 'vue'
import { Verse } from '../../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse
}>()

const emit = defineEmits<{
  (event: 'change', verse: Verse): void
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const text = ref(props.verse.text.join('\n'))
const translation = ref(props.verse.translation)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

watch([text, translation], () => {
  emit('change', {
    ...props.verse,
    text: text.value.split('\n'),
    translation: translation.value
  })
})
</script>
