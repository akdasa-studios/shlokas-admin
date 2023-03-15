<template>
  <div id="root">
    <canvas id="canvas" />
  </div>
  <ion-item>
    <ion-textarea
      v-model="canvas.selectedText.value"
      placeholder="translation"
    />
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonTextarea } from '@ionic/vue'
import { fabric } from 'fabric'
import { defineEmits, defineProps, onMounted, toRefs, watch } from 'vue'
import { Verse } from '@/verses'
import { Card, useCanvas, useWordsPacker } from '@/cards'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse,
  modelValue: Card
}>()

const emit = defineEmits<{
  (event: 'fileGenerated', value: string): void
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const canvas = useCanvas()
const packer = useWordsPacker()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { words } = toRefs(props.modelValue)
let elements: fabric.Text[] = []


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(() => onOpened())


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(canvas.lastModified, () => {
  onCanvasChanged()
})


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onOpened() {
  const ic = canvas.init()
  elements = packer.pack(
    ic, props.verse, props.modelValue,
    {
      fontFamily: 'Georgia',
      fontSize: 60,
      lineSpace: 5,
    }
  )
}

function onCanvasChanged() {
  for (const [key, elem] of elements.entries()) {
    words.value[key].posx = (elem.left || 0) / (canvas.width() || 0)
    words.value[key].text = (elem.text || '')
  }

  emit('fileGenerated', canvas.toSVG())
}
</script>

<style scoped>
#root {
  display: flex;
  justify-content: center;
}
</style>
