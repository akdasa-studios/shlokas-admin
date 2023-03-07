<template>
  <div
    v-for="synonym, idx in synonyms"
    :key="idx"
    @click="onSynonymClick(idx)"
  >
    <span class="word">{{ synonym.words.join(' ') }}</span>
    {{ synonym.translation }}
  </div>
</template>

<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
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

const router = useIonRouter()
const synonyms = ref(props.verse.synonyms)

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

function onSynonymClick(idx: number) {
  router.push(`synonyms/${idx}`)
}

// watch([text, translation], () => {
//   emit('change', {
//     ...props.verse,
//     text: text.value.split('\n'),
//     translation: translation.value
//   })
// })
</script>


<style scoped>
.word {
  font-weight: bold;
}
</style>