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

  <ion-modal
    :initial-breakpoint="0.5"
    :breakpoints="[0.25, 0.5]"
    :is-open="isModalOpen"
    @will-dismiss="onModalClose"
  >
    <VerseSynonymEdit
      :synonym-id="synonymId"
      :verse="props.verse"
    />
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { defineProps, defineEmits, reactive, watch, toRaw, ref } from 'vue'
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

const synonyms = reactive(props.verse.synonyms)
const isModalOpen = ref(false)
const synonymId = ref(0)


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

async function onSynonymClick(idx: number) {
  isModalOpen.value = true
  synonymId.value = idx
}

function onModalClose() {
  isModalOpen.value = false
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