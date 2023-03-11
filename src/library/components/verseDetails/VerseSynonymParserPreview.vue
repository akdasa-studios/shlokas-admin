<template>
  <div
    v-if="grouped"
    class="preview"
  >
    <div
      v-for="synonym, id in grouped"
      :key="id"
    >
      {{ synonym }}
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
  const result: string[] = []

  for(const s of props.synonyms) {
    if (s.lineNumber === undefined) { continue }
    if (!result[s.lineNumber]) { result[s.lineNumber] = '' }
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