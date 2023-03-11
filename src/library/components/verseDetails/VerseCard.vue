<template>
  <div id="root">
    <canvas id="canvas" />
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted , defineProps, defineEmits } from 'vue'
import { useFileUploader } from '@/shared/services/useFileUploader'
import { useEnvironment } from '@/shared/services/useEnvironment'
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

const env = useEnvironment()
const uploader = useFileUploader(env.getContentUrl())
let canvas: any

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(() => {
  canvas = new fabric.Canvas('canvas')
  canvas.on('object:modified', () => { save() })
  add(props.verse.text, props.verse.synonyms)
})


const wordToElemMap = new Map<number, fabric.Text>()
const zoom = .45

function add(lines: string[], words: Synonym[]) {
  const result = []
  const fontSize = 60 * zoom
  const lineSpace = 5 * zoom
  let maxWidth = 0
  let maxHeight = 0


  for (const line of lines) {
    var text = new fabric.Text(line, {
      originX: 'center',
      originY: 'top',
      fontSize: fontSize,
      fontFamily: 'Georgia',
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
    })

    maxWidth = Math.max(text.width || 0, maxWidth)
    maxHeight = Math.max(text.height || 0, maxHeight) + lineSpace
    result.push(text)
    canvas.add(text)
  }

  canvas.setWidth(maxWidth)
  canvas.setHeight(maxHeight * lines.length)

  for (const [i, text] of result.entries()) {
    text.left = maxWidth / 2
    text.top  = maxHeight * i
    text.adjustPosition('center')
  }

  let alwn = 0
  for (const word of words) {
    const wordsOfLine = words.filter(x => x.lineNumber === word.lineNumber)
    const wordsCount = wordsOfLine.length
    const wordNum = wordsOfLine.findIndex(x => x===word)

    const txt = word.shortTranslation || word.translation
    const elem = new fabric.Text(txt, {
      top: maxHeight * ((word.lineNumber || 0) + 1),
      left: word.positionX ? word.positionX * maxWidth : (maxWidth / (wordsCount+1)) * (wordNum+1),
      originX: 'center',
      originY: 'bottom',
      fontSize: fontSize/2,
      fontFamily: 'Georgia',
      fontStyle: 'italic',
      hasControls: false,
      lockMovementY: true,
      fill: 'gray'
    })
    wordToElemMap.set(alwn++, elem)
    canvas.add(elem)
  }
  canvas.renderAll()
}

function save() {
  const synonyms: Synonym[] = { ...props.verse.synonyms }
  for (const [key, elem] of wordToElemMap.entries()) {
    synonyms[key].positionX = (elem.left || 0) / canvas.width
  }

  emit('change', {
    ...props.verse,
    synonyms: Object.values(synonyms)
  })

  const data = canvas.toSVG()
  const fileName = 'verse-card-' + props.verse._id + '.svg'
  uploader.upload(fileName, data, 'image/svg+xml')
}
</script>

<style scoped>
#root {
  display: flex;
  justify-content: center;
}
</style>
