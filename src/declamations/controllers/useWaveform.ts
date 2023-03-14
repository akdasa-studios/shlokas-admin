import { ref } from 'vue'
import WaveSurfer from 'wavesurfer.js'
// @ts-ignore
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.js'

export interface WaveformOptions {
  barWidth: number,
  barRadius: number,
  barGap: number,
  height: number,
}

export function useWaveform(
  query: string,
  options?: WaveformOptions
) {
  let _wavesurfer: WaveSurfer
  const _markers = ref<number[]>([])

  function init() {
    _wavesurfer = WaveSurfer.create({
      container: query,
      barWidth: options?.barWidth || 3,
      barRadius: options?.barRadius || 3,
      barGap: options?.barGap || 3,
      height: options?.height || 200,
      cursorWidth: 1,
      plugins: [MarkersPlugin.create()]
    })

    _wavesurfer.drawer.on('dblclick', () => {
      const pos = _wavesurfer.getCurrentTime()
      addMarker(pos)
    })

    _wavesurfer.on('marker-drop', (event) => {
      const idx = parseInt(event.label)
      _markers.value[idx] = event.time
    })
  }

  function load(url: string, markers: number[] = []) {
    _wavesurfer.load(url)
    markers.forEach((marker) => addMarker(marker))
  }

  function addMarker(time: number) {
    _wavesurfer.markers.add({
      time,
      draggable: true,
      label: _markers.value.length.toString(),
    })
    _markers.value.push(time)
  }

  function play() {
    _wavesurfer.play()
  }

  function destroy() {
    _wavesurfer.destroy()
  }

  return { init, load, markers: _markers, play, destroy }
}