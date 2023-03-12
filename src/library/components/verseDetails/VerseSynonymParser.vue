<template>
  <!-- Synonyms parser -->
  <ion-item
    :class="{ 'ion-invalid': synonymsIsInvalid }"
  >
    <ion-label position="stacked">
      Synonyms
    </ion-label>
    <ion-textarea
      v-model="text"
      :auto-grow="true"
      placeholder="dhṛtarāṣṭraḥ uvāca — King Dhṛtarāṣṭra said;"
    />
    <ion-note slot="helper">
      Parsed {{ synonymsParsedCount }} words
    </ion-note>
    <ion-note slot="error">
      Unable to parse
    </ion-note>
  </ion-item>

  <!-- Line numbers parser -->
  <ion-item
    :class="{ 'ion-invalid': lineNumbersIsInvalid }"
  >
    <ion-label position="stacked">
      Line Numbers
    </ion-label>
    <div class="one-line">
      <ion-textarea
        v-model="parsedText"
        :auto-grow="true"
      />
      <div class="side-verse">
        <div
          v-for="line in lines"
          :key="line"
        >
          {{ line }}
        </div>
      </div>
    </div>
    <ion-note slot="error">
      Line numbers do not match
    </ion-note>
    <ion-note slot="helper">
      Edit text to change line numbers
    </ion-note>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonTextarea, IonNote } from '@ionic/vue'
import { defineEmits, ref, watch, defineProps, computed } from 'vue'
import { useSynonymsParser } from '@/library/controllers/useSynonymsParser'
import { Synonym } from '../../models/verse'

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
const parsedText = ref('')
const synonyms = ref<Synonym[]>([])
const synonymsParsedCount = ref(0)
const synonymsIsInvalid = ref(false)
const lineNumbersIsInvalid = computed(() => props.lines.length != parsedText.value.split('\n').length)

/* -------------------------------------------------------------------------- */
/*                                    Wathc                                   */
/* -------------------------------------------------------------------------- */

watch(text, () => {
  const result = parser.parse(text.value, props.lines)
  synonyms.value = result.sysnonyms
  synonymsParsedCount.value = result.sysnonyms.length
  synonymsIsInvalid.value = result.hasError


  const parsedLines: string[] = []
  for(const s of result.sysnonyms) {
    if (s.lineNumber === undefined) { continue }
    if (!parsedLines[s.lineNumber]) { parsedLines[s.lineNumber] = '' }
    parsedLines[s.lineNumber || 0] += s.words.join(' ') + ' '
  }
  parsedText.value = parsedLines.join('\n')
  emit('change', result.sysnonyms)
})


watch(parsedText, () => {
  parser.adjustLineNumbers(parsedText.value.split('\n'), synonyms.value)
})
</script>


<style scoped>
.one-line {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-basis: 50%;
}

.side-verse {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>