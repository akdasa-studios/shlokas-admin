<template>
  <input
    ref="file"
    type="file"
  >
  <ion-button @click="upload" />
  <ion-button @click="play" />

  <div id="waveform" />
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { defineEmits, defineProps, ref, onMounted } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.js'
import { useEnvironment } from '@/shared/services/useEnvironment'
import { useFileUploader } from '@/shared/services/useFileUploader'
import { Verse } from '../../models/verse'

console.log(MarkersPlugin)

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

const fileName = `verse-audio-${props.verse._id}.mp3`
const url = 'http://localhost/content/' + fileName
const uploader = useFileUploader(useEnvironment().getContentUrl())
const file = ref()

async function upload() {
  await uploader.upload(fileName, file.value.files[0], file.value.files[0].type)


  // pass
}
var wavesurfer: any = undefined

onMounted(() => {
  wavesurfer = WaveSurfer.create({
    container: document.querySelector('#waveform'),
    barHeight: 5,
    // waveColor: 'violet',
    // progressColor: 'purple',
    plugins: [
      MarkersPlugin.create()
    //   MarkersPlugin.create({
    //     markers: [
    //       {
    //         time: 5.5,
    //         label: 'V1',
    //         color: '#ff990a'
    //       },
    //       {
    //         time: 10,
    //         label: 'V2',
    //         color: '#00ffcc',
    //         position: 'top'
    //       }
    //     ]
    //   })
    ]
  })
  wavesurfer.load(url)


})

function play() {
  // pass
  wavesurfer.play()
  const duration = wavesurfer.getDuration()

  const linesCount = props.verse.text.length

  for(const n of Array(linesCount+2).keys()) {
    wavesurfer.markers.add({
      time: duration / (linesCount+1) * n,
      label: `V${n + 1}`,
      color: '#ff990a',
      draggable: true
    })
  }
}


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

// finction onPickFileClicked() {
//   uploader.pickFile().then((file) => {
//     console.log(file)
//   })
// }

</script>

<style scoped>
#root {
  display: flex;
  justify-content: center;
}
</style>
