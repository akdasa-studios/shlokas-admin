<template>
  <div class="preview">
    <div
      v-for="synonym, id in grouped"
      :key="id"
    >
      {{ id }}: {{ synonym }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Synonym } from '../../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  synonyms: Synonym[],
  lines: string[],
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */


const grouped = computed(function() {
  const lineNumbers = props.synonyms.map(s => s.lineNumber || 0)
  const maxLineNumber = Math.max(0, ...lineNumbers)
  const result: Array<string> = Array.from({length: maxLineNumber+1}, () => '')

  for(const s of props.synonyms) {
    result[s.lineNumber || 0] += s.words.join(' ') + ' '
  }
  return result
})
</script>


<style scoped>
.preview {
  text-align: center;
  font-style: italic;
}
</style>