<template>
  <div id="waveform" />
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, toRefs } from 'vue'
import { Declamation, useWaveform } from '@/declamations'
import { useEnvironment } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  declamation: Declamation,
}>()


/* -------------------------------------------------------------------------- */
/*                                   Lifehooks                                */
/* -------------------------------------------------------------------------- */

onMounted(() => onOpened())
onUnmounted(() => waveform.destroy())


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const contentUrl = useEnvironment().getContentUrl()
const waveform   = useWaveform('#waveform', { height: 100, editableMarkers: false })


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { uri, markers } = toRefs(props.declamation)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onOpened() {
  waveform.init()
  if (uri.value) {
    waveform.load(`${contentUrl}/${uri.value}`, markers.value)
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

#waveform {
  width: 100%;
  height: 100px;
  margin-top: 20px;
}
</style>
