<template>
  <!-- {{ wordsLength }} -->
  <div id="root">
    <canvas id="canvas" />
  </div>
  <ion-item>
    <ion-textarea
      v-model="canvas.selectedText.value"
      placeholder="translation"
    />
  </ion-item>
  <ion-item>
    <ion-button
      @click="onDeleteWord"
    >
      Delete
    </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonTextarea, IonButton } from '@ionic/vue'
import { fabric } from 'fabric'
import { defineEmits, defineProps, onMounted, toRefs, watch, computed } from 'vue'
import { Verse } from '@/verses'
import { VerseImage, useCanvas, useWordsPacker } from '@/images'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse,
  modelValue: VerseImage
}>()

const emit = defineEmits<{
  (event: 'fileGenerated', value: string): void,
  (event: 'deleteWord', index: number): void
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const canvas = useCanvas()
const packer = useWordsPacker()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

let canvasInstance: fabric.Canvas | undefined = undefined
const { modelValue } = toRefs(props)
const { words } = toRefs(props.modelValue)
let elements: fabric.Text[] = []
// const wordsLength = computed(() => words.value.length)


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onOpened)
watch(modelValue, () => onOpened())


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
  if (canvasInstance === undefined) {
    canvasInstance = canvas.init()
  } else {
    console.log('CLEAR')
    canvas.clear()
  }

  elements = packer.pack(
    canvasInstance, props.verse, props.modelValue,
    {
      fontFamily: 'Georgia',
      fontSize: 60,
      lineSpace: 5,
    }
  )
}

function onDeleteWord() {
  emit('deleteWord', canvas.selectedWordIdx.value)
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
