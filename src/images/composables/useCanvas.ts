import { fabric } from 'fabric'
import { ref, watch } from 'vue'


export function useCanvas() {
  // @ts-ignore
  const _canvas = ref<fabric.Canvas>()
  const _selectedNode = ref()
  const _selectedText = ref('')
  const _lastModified = ref(0)

  function init(): fabric.Canvas {
    _canvas.value = new fabric.Canvas('canvas')
    _canvas.value.on('object:modified', () => { update() })
    _canvas.value.on('selection:updated', onSelected)
    _canvas.value.on('selection:created', onSelected)
    return _canvas.value
  }

  function update() {
    _canvas.value?.renderAll()
    _lastModified.value = new Date().getTime()
  }


  function onSelected(obj: any) {
    _selectedNode.value = obj.selected[0]
    _selectedText.value = _selectedNode.value.text
  }

  function width() {
    return _canvas.value?.getWidth() || 0
  }

  function toSVG() {
    return _canvas.value?.toSVG() || ''
  }

  watch(_selectedText, (text) => {
    if (_selectedNode.value) {
      _selectedNode.value.text = text
      update()
    }
  })

  return {
    init,
    canvas: _canvas,
    selectedText: _selectedText,
    lastModified: _lastModified,
    toSVG,
    update,
    width
  }

}