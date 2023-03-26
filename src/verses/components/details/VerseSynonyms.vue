<template>
  <!-- <div
    v-for="line in props.verse.text"
    :key="line"
  >
    {{ line }}
  </div> -->
  <VerseSynonymsList
    :verse="props.verse"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, toRaw, watch } from 'vue'
import { Verse } from '../../models/verse'
import VerseSynonymsList from './VerseSynonymsList.vue'

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

const synonyms = ref(props.verse.synonyms)


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(synonyms, () => {
  emit('change', {
    ...props.verse,
    synonyms: toRaw(synonyms.value)
  })
}, { deep: true })

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onChange(verse: Verse) {
  emit('change', verse)
}
</script>
