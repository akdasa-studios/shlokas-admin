<template>
  <div />
</template>

<script setup lang="ts">
import { actionSheetController } from '@ionic/vue'
import { defineProps, toRefs, watch, defineEmits } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (event: 'didDismiss', type: string): void
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { isOpen } = toRefs(props)
const buttons = [
  {
    text: 'Verse',
    data: 'verse'
  },
  {
    text: 'Translation',
    data: 'translation'
  },
  {
    text: 'Cancel',
    role: 'cancel',
    data: undefined
  },
]

/* -------------------------------------------------------------------------- */
/*                                    Watch                                   */
/* -------------------------------------------------------------------------- */

watch(isOpen, (val) => {
  if (val) { onOpened() }
})

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onOpened() {
  const actionSheet = await actionSheetController.create({
    header: 'Create declamation',
    subHeader: 'Choose type of declamation',
    buttons: buttons
  })

  await actionSheet.present()

  const res = await actionSheet.onDidDismiss()
  emit('didDismiss', res.data)
}
</script>
