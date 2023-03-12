<template>
  <div id="root">
    <canvas id="canvas" />
  </div>
  <ion-item>
    <ion-label position="floating">
      Short translation
    </ion-label>
    <ion-textarea v-model="selectedText" />
  </ion-item>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted , defineProps, defineEmits, ref, watch } from 'vue'
import { IonTextarea, IonLabel, IonItem } from '@ionic/vue'
import { useFileUploader } from '@/shared/services/useFileUploader'
import { useEnvironment } from '@/shared/services/useEnvironment'
import { useWordsPacker } from '@/library/controllers/useWordsPacker'
import { Verse, Synonym } from '../../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse
}>()

const emit = defineEmits<{
  (event: 'change', verse: Verse): void
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const uploader = useFileUploader(useEnvironment().getContentUrl())
const packer = useWordsPacker()
const selectedNode = ref()
const selectedText = ref('')

let canvas: fabric.Canvas
let elements: fabric.Text[] = []

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(() => {
  canvas = new fabric.Canvas('canvas')
  canvas.on('object:modified', () => { save() })
  canvas.on('selection:updated', onSelected)
  canvas.on('selection:created', onSelected)
  elements = packer.pack(canvas, props.verse, {
    fontFamily: 'Georgia',
    fontSize: 60,
    lineSpace: 5,
  })
})


watch(selectedText, (v) => {
  selectedNode.value.text = v
  canvas.renderAll()
})

function onSelected(obj: any) {
  selectedNode.value = obj.selected[0]
  selectedText.value = selectedNode.value.text
}

function save() {
  const synonyms: Synonym[] = { ...props.verse.synonyms }
  for (const [key, elem] of elements.entries()) {
    synonyms[key].positionX = (elem.left || 0) / (canvas.width || 0)
    synonyms[key].shortTranslation = elem.text
  }

  const data = canvas.toSVG()
  const fileName = 'verse-card-' + props.verse._id + '.svg'
  uploader.upload(fileName, data, 'image/svg+xml')

  emit('change', {
    ...props.verse,
    synonyms: Object.values(synonyms),
    textImageUri: fileName
  })
}
</script>

<style scoped>
#root {
  display: flex;
  justify-content: center;
}
</style>
