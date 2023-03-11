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
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonTextarea, IonNote } from '@ionic/vue'
import { defineEmits, ref, watch } from 'vue'
import { useSynonymsParser } from '@/library/controllers/useSynonymsParser'
import { Synonym } from '../../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  (e: 'change', synonyms: Synonym[]): void
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const parser = useSynonymsParser()
const text = ref('')
const synonymsParsedCount = ref(0)
const hasErrors = ref(false)

/* -------------------------------------------------------------------------- */
/*                                    Wathc                                   */
/* -------------------------------------------------------------------------- */

watch(text, () => {
  const result = parser.parse(text.value)
  synonymsParsedCount.value = result.sysnonyms.length
  hasErrors.value = result.hasError
  emit('change', result.sysnonyms)
})

</script>


<style scoped></style>