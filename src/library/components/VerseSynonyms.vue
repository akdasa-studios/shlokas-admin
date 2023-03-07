<template>
  <span
    v-for="synonym,idx in synonyms"
    :key="idx"
    class="wordBox"
    :class="'line-' + synonym.lineNumber || 0"
    @click="onSynonymClick(idx)"
  >
    <span v-if="synonym.lineNumber">
      {{ synonym.lineNumber }}:
    </span>
    <span class="word">
      {{ synonym.words.join(' ') }}
    </span>
    <span class="translation">
      – {{ synonym.translation }};&nbsp;
    </span>
  </span>
</template>

<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
import { defineProps, defineEmits, reactive, watch, toRaw } from 'vue'
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

const router = useIonRouter()
const synonyms = reactive(props.verse.synonyms)


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

function onSynonymClick(idx: number) {
  router.push(`synonyms/${idx}`)
}

watch([synonyms], () => {
  let currentLineNumber = undefined
  let linesToChange = []

  for (const line of synonyms) {

    if (line.lineNumber !== undefined) {
      if (currentLineNumber !== undefined) {
        for (const line of linesToChange) {
          line.lineNumber = currentLineNumber
        }
        linesToChange = []
      }
      currentLineNumber = line.lineNumber
    }

    if (currentLineNumber !== undefined) {
      linesToChange.push(line)
    }
  }

  emit('change', {
    ...props.verse,
    synonyms: toRaw(synonyms)
  })
}, { deep: true })
</script>


<style scoped>
.word {
  font-weight: bold;
}

.wordBox {
  /* padding-top: 5px; */
  /* padding-bottom: 5px; */
}
.translation {
  font-style: italic;
}
.line-0 {
  background-color: lightblue;
}

.line-1 {
  background-color: lightpink;
}

.line-2 {
  background-color: lightgreen;
}

.line-3 {
  background-color: lightyellow;
}

.line-4 {
  background-color: lightsalmon;
}
</style>