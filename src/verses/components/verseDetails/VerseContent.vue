<template>
  <!-- Language -->
  <ion-item>
    <ion-label position="stacked">
      Language
    </ion-label>
    <ion-input
      v-model="lang"
      placeholder="en"
      :disabled="disableLanguage"
    />
    <ion-note slot="helper">
      Language of the verse. Use two letter code
    </ion-note>
  </ion-item>

  <!-- Verse Number -->
  <ion-item>
    <ion-label position="stacked">
      Verse Number
    </ion-label>
    <ion-input
      v-model="number"
      placeholder="BG 1.1"
      :disabled="disableNumber"
    />
    <ion-note slot="helper">
      Use uppercase letters for book name and dots for separating verse numbers
    </ion-note>
  </ion-item>

  <!-- Text of a verse -->
  <ion-item>
    <ion-label position="stacked">
      Text
    </ion-label>
    <ion-textarea
      v-model="text"
      :placeholder="`dharma-kṣetre kuru-kṣetre\nsamavetā yuyutsavaḥ`"
      :auto-grow="true"
    />
    <ion-note slot="helper">
      Put each line of a verse on a new line
    </ion-note>
    <ion-note slot="error">
      Unable to parse
    </ion-note>
  </ion-item>

  <!-- Translation -->
  <ion-item>
    <ion-label position="stacked">
      Translation
    </ion-label>
    <ion-textarea
      v-model="translation"
      placeholder="Translation of a verse"
      :auto-grow="true"
    />
    <ion-note slot="helper">
      Translation of the verse into the chosen language
    </ion-note>
  </ion-item>
</template>

<script setup lang="ts">
import { IonTextarea, IonInput, IonLabel, IonItem, IonNote } from '@ionic/vue'
import { defineProps, ref, defineEmits, watch, withDefaults } from 'vue'
import { Verse } from '../../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */
type EditableFields = 'language'|'number'|'text'|'translation'

const props = withDefaults(defineProps<{
  verse: Pick<Verse, EditableFields>,
  disableLanguage?: boolean,
  disableNumber?: boolean,
}>(), {
  disableLanguage: false,
  disableNumber: false,
})

const emit = defineEmits<{
  (event: 'change', verse: Verse): void
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const lang   = ref(props.verse.language)
const number = ref(props.verse.number)
const text   = ref(props.verse.text?.join('\n'))
const translation = ref(props.verse.translation)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

watch([lang, number, text, translation], () => {
  emit('change', {
    ...props.verse as Verse,
    text: text.value?.split('\n'),
    translation: translation.value,
    language: lang.value,
    number: number.value,
  })
})
</script>
