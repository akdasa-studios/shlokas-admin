<template>
  <!-- Verse Number -->
  <ion-item
    :disabled="disableTheme"
  >
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
    @click="fileInputRef.click()"
  >
    <ion-label>File</ion-label>
    {{ url }}
    <ion-icon
      slot="end"
      :icon="folderOpenOutline"
    />
  </ion-item>

  <!-- Waveform -->
  <ion-item
    :disabled="isWaveformDisabled"
  >
    <div
      id="waveform"
    />
    <ion-note slot="helper">
      Double click to add marker between lines of the verse
    </ion-note>
  </ion-item>

  <ion-item
    :disabled="isWaveformDisabled"
  >
    <ion-button
      fill="clear"
      color="dark"
      @click="onPlayClicked"
    >
      <ion-icon
        slot="start"
        :icon="playCircle"
        @click="onPlayClicked"
      />
      play
    </ion-button>
  </ion-item>

  <!-- File picker -->
  <input
    ref="fileInputRef"
    class="hidden"
    type="file"
    @change="onFileSelected"
  >
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonNote } from '@ionic/vue'
import { folderOpenOutline, playCircle } from 'ionicons/icons'
import getUuid from 'uuid-by-string'
import { computed, defineProps, onMounted, onUnmounted, ref, toRefs, watch, withDefaults } from 'vue'
import { useFileUploader } from '@/shared/services/useFileUploader'
import { useEnvironment } from '@/shared'
import { Declamation, useWaveform } from '@/declamations'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = withDefaults(defineProps<{
  modelValue: Declamation,
  disableVerseReference?: boolean,
  disableTheme?: boolean,
}>(), {
  disableVerseNumber: false,
  disableTheme: false,
})


/* -------------------------------------------------------------------------- */
/*                                   Lifehooks                                */
/* -------------------------------------------------------------------------- */

onMounted(() => onOpened())
onUnmounted(() => waveform.destroy())


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const contentUrl = useEnvironment().getContentUrl()
const uploader   = useFileUploader(contentUrl)
const waveform   = useWaveform('#waveform')


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const fileInputRef = ref()
const { verseReference, theme, url, markers } = toRefs(props.modelValue)
const isFilePickerDisabled = computed(() => !(theme.value && verseReference.value))
const isWaveformDisabled = computed(() => !url.value)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFileSelected(event: any) {
  const file = event.target.files[0]
  await uploader.upload(url.value, file, file.type)
  waveform.load(`${contentUrl}/${url.value}`)
}

function onPlayClicked() {
  waveform.play()
}

function onOpened() {
  waveform.init()
  if (url.value) {
    waveform.load(`${contentUrl}/${url.value}`, markers.value)
  }
}


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch([verseReference, theme], () => {
  if (verseReference.value && theme.value) {
    const uuid = getUuid(`declamation-${verseReference.value}-${theme.value}`)
    url.value = `declamation-${uuid}.mp3`
  } else {
    url.value = ''
  }
}, { immediate: true })

watch(waveform.markers.value, (v) => { markers.value = v })
</script>

<style scoped>
.hidden {
  display: none;
}

#waveform {
  width: 100%;
  height: 200px;
  margin-top: 20px;
}
</style>
