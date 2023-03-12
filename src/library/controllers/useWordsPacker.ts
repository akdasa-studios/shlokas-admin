import { fabric } from 'fabric'
import { Verse } from '../models/verse'

export interface VersCardPackerOptions {
  fontFamily: string, // Georgia
  fontSize: number, // 60*zoom
  lineSpace: number, //5*zoom
}

export function useWordsPacker() {
  function pack(
    canvas: fabric.Canvas,
    verse: Verse,
    options: VersCardPackerOptions
  ) {
    const result       = [] // todo: looks useless
    const synonymNodes = [] // todo: looks useless
    let canvasWidth    = 0
    let canvasHeight   = 0

    // Stage 1: Pack verse lines
    for (const line of verse.text) {
      const text = new fabric.Text(line, {
        originX: 'center',
        originY: 'top',
        fontSize: options.fontSize,
        fontFamily: options.fontFamily,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        // shadow: new fabric.Shadow('2px 2px 10px rgba(0,0,0,0.2)')
      })

      canvasWidth = Math.max(text.width || 0, canvasWidth)
      canvasHeight = Math.max(text.height || 0, canvasHeight) + options.lineSpace
      result.push(text)
      canvas.add(text)
    }

    canvas.setWidth(canvasWidth)
    canvas.setHeight(canvasHeight * verse.text.length)

    for (const [i, text] of result.entries()) {
      text.left = canvasWidth / 2
      text.top  = canvasHeight * i
      text.adjustPosition('center')
    }

    for (const word of verse.synonyms) {
      if (word.lineNumber === undefined) { continue }

      const wordsOfLine = verse.synonyms.filter(x => x.lineNumber === word.lineNumber)
      const wordsCount = wordsOfLine.length
      const wordNum = wordsOfLine.findIndex(x => x===word)

      const txt = word.shortTranslation || word.translation
      const elem = new fabric.Text(txt, {
        top: (canvasHeight * (word.lineNumber+1)) - (options.fontSize / 2),
        left: word.positionX ? word.positionX * canvasWidth : (canvasWidth / (wordsCount+1)) * (wordNum+1),
        originX: 'center',
        originY: 'top',
        fontSize: options.fontSize/2,
        lineHeight: .75,
        fontFamily: options.fontFamily,
        fontStyle: 'italic',
        hasControls: false,
        lockMovementY: true,
        textAlign: 'center',
        opacity: .3
      })
      synonymNodes.push(elem)
      canvas.add(elem)
    }
    canvas.renderAll()
    return synonymNodes
  }

  return { pack }
}