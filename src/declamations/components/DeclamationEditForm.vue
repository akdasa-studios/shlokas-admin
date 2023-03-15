<template>
  <!-- Verse Number -->
  <ion-item
    :disabled="disableVerseReference"
    :class="referenceValidation.classes.value"
  >
    <ion-label position="stacked">
      Verse Reference
    </ion-label>
    <ion-input
      v-model="verseReference"
      placeholder="BG 1.1"
      @ion-blur="referenceValidation.markTouched"
    />
    <ion-note slot="helper">
      Use uppercase letters for book name and dots for separating verse numbers
    </ion-note>
    <ion-note slot="error">
      Invalid reference number
    </ion-note>
  </ion-item>

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
    {{ uri }}
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
import { IonInput, IonNote, IonLabel, IonItem, IonIcon, IonButton } from '@ionic/vue'
import { folderOpenOutline , playCircle } from 'ionicons/icons'
import { defineProps, ref, onMounted, toRefs, watch, computed, withDefaults, onUnmounted } from 'vue'
import getUuid from 'uuid-by-string'
import { useEnvironment } from '@/shared/services/useEnvironment'
import { useFileUploader } from '@/shared/services/useFileUploader'
import { useWaveform , Declamation } from '@/declamations'
import { isVerseReferencdValid } from '@/verses'
import { useValidation } from '@/shared'

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
const { verseReference, theme, uri, markers } = toRefs(props.modelValue)
const isFilePickerDisabled = computed(() => !(theme.value && verseReference.value))
const isWaveformDisabled = computed(() => !uri.value)
const referenceValidation = useValidation(verseReference, isVerseReferencdValid)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFileSelected(event: any) {
  console.log(`${contentUrl}/${uri.value}`)
  const file = event.target.files[0]
  await uploader.upload(uri.value, file, file.type)
  waveform.load(`${contentUrl}/${uri.value}`)
}

function onPlayClicked() {
  waveform.play()
}

function onOpened() {
  waveform.init()
  if (uri.value) {
    waveform.load(`${contentUrl}/${uri.value}`, markers.value)
  }
}


/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch([verseReference, theme], () => {
  if (verseReference.value && theme.value) {
    const uuid = getUuid(`declamation-${verseReference.value}-${theme.value}`)
    uri.value = `declamation-${uuid}.mp3`
  } else {
    uri.value = ''
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
