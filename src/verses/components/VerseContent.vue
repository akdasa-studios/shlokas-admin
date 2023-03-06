<template>
  <ion-item>
    <ion-textarea
      v-model="text"
      placeholder="Text"
      :auto-grow="true"
    />
  </ion-item>

  <ion-item>
    <ion-textarea
      v-model="translation"
      placeholder="Translation"
      :auto-grow="true"
    />
  </ion-item>
</template>

<script setup lang="ts">
import { IonTextarea, IonItem } from '@ionic/vue'
import { defineProps, defineEmits, ref, watch } from 'vue'
import { Verse } from '../models/verse'

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

const text = ref(props.verse.text.join('\n'))
const translation = ref(props.verse.translation)

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch([text, translation], () => {
  emit('change', {
    ...props.verse,
    text: text.value.split('\n'),
    translation: translation.value
  })
})
</script>
