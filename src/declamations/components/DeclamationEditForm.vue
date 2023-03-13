<template>
  <!-- Verse Number -->
  <ion-item>
    <ion-label position="stacked">
      Verse Number
    </ion-label>
    <ion-input
      v-model="verseNumber"
      placeholder="BG 1.1"
    />
    <ion-note slot="helper">
      Use uppercase letters for book name and dots for separating verse numbers
    </ion-note>
  </ion-item>

  <!-- Verse Number -->
  <ion-item>
    <ion-label position="stacked">
      Theme
    </ion-label>
    <ion-input
      v-model="theme"
      placeholder="default"
    />
    <ion-note slot="helper">
      Name of the theme
    </ion-note>
  </ion-item>

  <!-- File picker -->
  <ion-item
    :disabled="isFilePickerDisabled"
    @click="file.click()"
  >
    <ion-label>File</ion-label>
    {{ fileName }}
    <ion-icon
      slot="end"
      :icon="folderOpenOutline"
    />
  </ion-item>


  <input
    ref="file"
    class="hidden"
    type="file"
    @change="onFileChoose"
  >

  <!--
  <ion-button @click="upload" />
  <ion-button @click="play" />
  -->

  <!-- <ion-item> -->
  <div
    id="waveform"
  />
  <ion-note slot="helper">
    Name of the theme
  </ion-note>
  <!-- </ion-item> -->
</template>

<script setup lang="ts">
import { IonInput, IonNote, IonLabel, IonItem, IonIcon } from '@ionic/vue'
import { folderOpenOutline } from 'ionicons/icons'
import { defineEmits, defineProps, ref, onMounted, toRefs, watch, computed } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.js'
import { useEnvironment } from '@/shared/services/useEnvironment'
import { useFileUploader } from '@/shared/services/useFileUploader'
import { Declamation, getVerseRefenceId } from '../models/declamation'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  modelValue: Declamation
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', verse: Declamation): void
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

let wavesurfer: any = undefined
const file = ref()
const fileName = ref('')
const verseNumber = ref('')
const { verseReferenceId, theme, uri } = toRefs(props.modelValue)
const isFilePickerDisabled = computed(() => uri.value == '')



/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFileChoose(event: any) {
  const uploader = useFileUploader(useEnvironment().getContentUrl())
  const file = event.target.files[0]
  fileName.value = file.name

  await uploader.upload(uri.value, file, file.type)
  wavesurfer.load('http://localhost/content/' + uri.value)
  wavesurfer.drawer.on('dblclick', (e: any) => {
    const pos = wavesurfer.getCurrentTime()
    wavesurfer.markers.add({
      time: pos,
      // label: 'V',
      color: '#ff990a',
      draggable: true
    })
    console.log(pos)
  })
}

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch([verseNumber, theme], () => {
  verseReferenceId.value = getVerseRefenceId(verseNumber.value)
  if (verseReferenceId.value && theme.value) {
    uri.value = `declamation-${verseReferenceId.value}-${theme.value}.mp3`
  } else {
    uri.value = ''
  }
})

onMounted(() => {
  wavesurfer = WaveSurfer.create({
    container: document.querySelector('#waveform'),
    // barHeight: 5,
    barWidth: 3,
    barRadius: 3,
    cursorWidth: 1,
    height: 200,
    barGap: 3,
    plugins: [ MarkersPlugin.create() ]
  })
})


// watch([theme], () => {
//   emit('update:modelValue', {
//     ...props.modelValue,
//     theme: theme.value
//   })
// })
// const fileName = `verse-audio-${props.declamation.verseReferenceId}.mp3`
// const url = 'http://localhost/content/' + fileName

// async function upload() {
//   await uploader.upload(fileName, file.value.files[0], file.value.files[0].type)
//   // pass
// }
// var wavesurfer: any = undefined



// function play() {
//   // pass
//   wavesurfer.play()
//   const duration = wavesurfer.getDuration()

//   const linesCount = props.verse.text.length

//   for(const n of Array(linesCount+2).keys()) {
//     wavesurfer.markers.add({
//       time: duration / (linesCount+1) * n,
//       label: `V${n + 1}`,
//       color: '#ff990a',
//       draggable: true
//     })
//   }
// }


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

.hidden {
  display: none;
}

.waveform {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
</style>
