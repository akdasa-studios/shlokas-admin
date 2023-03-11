<template>
  <ion-item :class="{ 'ion-invalid': hasErrors }">
    <ion-label position="floating">
      Synonyms
    </ion-label>
    <ion-textarea
      v-model="text"
      :auto-grow="true"
    />
    <ion-note slot="helper">
      Parsed {{ synonymsParsedCount }} words
    </ion-note>
    <ion-note slot="error">
      Unable to parse
    </ion-note>
  </ion-item>

  <VerseSynonymParserPreview
    :lines="props.lines"
    :synonyms="synonyms"
  />
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonTextarea, IonNote } from '@ionic/vue'
import { defineEmits, ref, watch, defineProps } from 'vue'
import { useSynonymsParser } from '@/library/controllers/useSynonymsParser'
import { Synonym } from '../../models/verse'
import VerseSynonymParserPreview from './VerseSynonymParserPreview.vue'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  lines: string[],
}>()

const emit = defineEmits<{
  (e: 'change', synonyms: Synonym[]): void
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const parser = useSynonymsParser()
const text = ref('')
const synonyms = ref<Synonym[]>([])
const synonymsParsedCount = ref(0)
const hasErrors = ref(false)

/* -------------------------------------------------------------------------- */
/*                                    Wathc                                   */
/* -------------------------------------------------------------------------- */

watch(text, () => {
  const result = parser.parse(text.value, props.lines)
  synonyms.value = result.sysnonyms
  synonymsParsedCount.value = result.sysnonyms.length
  hasErrors.value = result.hasError
  emit('change', result.sysnonyms)
})
</script>