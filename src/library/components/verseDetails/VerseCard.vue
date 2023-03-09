<template>
  <div id="content">
    <canvas id="root" />
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted , defineProps, defineEmits } from 'vue'
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

let canvas: any

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

onMounted(() => {
  canvas = new fabric.Canvas('root')
  // canvas.renderOnAddRemove = true
  canvas.on('object:modified', () => { save() })
  add(props.verse.text, props.verse.synonyms)
})


const wordToElemMap:any = {}
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
      // class: 'text'
    })
    wordToElemMap[alwn++] = elem
    canvas.add(elem)
  }
  canvas.renderAll()
  // canvas.renderCanvas()
}

function save() {
  const synonyms = { ...props.verse.synonyms }
  for (const [key, elem] of Object.entries(wordToElemMap)) {
    synonyms[key].positionX = elem.left / canvas.width
  }

  emit('change', {
    ...props.verse,
    synonyms: Object.values(synonyms)
  })
}
</script>

<style scoped>
#content {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
}

.text {
  color: red;
}
</style>
