<template>
  <div id="content">
    <canvas id="root" />
  </div>

  <div @click="save">
    Save
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted } from 'vue'


let canvas: any
onMounted(() => {
  canvas = new fabric.Canvas('root')
  add([
    'дхр̣тара̄шт̣ра ува̄ча',
    'дхарма-кшетре куру-кшетре',
    'самавета̄ йуйутсавах̣',
    'ма̄мака̄х̣ па̄н̣д̣ава̄ш́ чаива',
    'ким акурвата сан̃джайа'
  ], [
    ['дхритараштра', 'сказал'],
    ['в месте паломничества', 'на Курукшетре'],
    ['собравшиеся', 'желающие сражаться'],
    ['кто на моей стороне', 'сыновья Панду', 'и', 'безусловно'],
    ['что', 'сделали', 'о Санджая'],
  ])
})

function add(lines: string[], words: string[][]) {
  const result = []
  const fontSize = 60
  const lineSpace = 5
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
      // class: 'text',
      // fill: undefined
    })

    maxWidth = Math.max(text.width, maxWidth)
    maxHeight = Math.max(text.height, maxHeight) + lineSpace
    result.push(text)
    canvas.add(text)
  }

  canvas.setWidth(maxWidth)
  canvas.setHeight(maxHeight*lines.length)

  let i = 0
  for (const text of result) {
    text.left = maxWidth / 2
    text.top  = maxHeight * i
    text.adjustPosition('center')
    i++
  }

  for (var idx=0; idx < lines.length; idx++) {
    const wordsCount = words[idx].length
    for (const [wordNum, word] of words[idx].entries()) {
      const elem = new fabric.Text(word, {
        top: maxHeight * (idx+1),
        left: (maxWidth / (wordsCount+1)) * (wordNum+1),
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
      canvas.add(elem)
    }
  }

  // canvas.renderAll()
}

function setSize() {
  canvas.setHeight(500)
  canvas.setWidth(800)
  canvas.renderAll()
}

function save() {
  console.log(canvas.toSVG())
}
</script>

<style scoped>
#root {
  /* background-color: lightcyan; */
}

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
