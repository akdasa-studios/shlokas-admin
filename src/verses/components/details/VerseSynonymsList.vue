<template>
  <ion-reorder-group
    :disabled="false"
    @ion-item-reorder="onReorder"
  >
    <ion-item
      v-for="item, idx in items"
      :key="item.id"
      :color="item.type === 'delimiter' ? 'medium' : ''"
      :detail="true"
      :router-link="go('verses:synonym', { id: props.verse._id, synonymIdx: idx })"
    >
      <ion-label
        v-if="item.synonym"
      >
        <h2>{{ item.synonym.words.join(' ') }}</h2>
        <p>{{ item.synonym.translation }}</p>
      </ion-label>
      <ion-label
        v-else
      >
        Next Line
      </ion-label>

      <ion-button
        v-if="item.synonym"
        slot="end"
        fill="clear"
        @click.stop="onDblClick(idx)"
      >
        <ion-icon
          slot="start"
          :icon="arrowUpOutline"
        />
        Split
      </ion-button>

      <ion-reorder slot="end" />
    </ion-item>
  </ion-reorder-group>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonReorder, IonReorderGroup, ItemReorderEventDetail, IonIcon, IonButton } from '@ionic/vue'
import { defineProps, onMounted, ref, toRaw, defineEmits } from 'vue'
import { arrowUpOutline } from 'ionicons/icons'
import { go } from '@/shared'
import { Synonym, Verse } from '../../models/verse'

/* -------------------------------------------------------------------------- */
/*                                  Inerface                                  */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  verse: Verse
}>()

const emit = defineEmits<{
  (e: 'change', verse: Verse): void
}>()


/* -------------------------------------------------------------------------- */
/*                                  Lifehooks                                 */
/* -------------------------------------------------------------------------- */

onMounted(onOpened)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

interface LineItem {
  id: string,
  type: 'synonym'|'delimiter'
  synonym?: Synonym
}

const items = ref<LineItem[]>([])


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */
function getId() { return Math.random().toString(36) }

function onOpened() {
  let lineNumber = 0
  for (const synonym of props.verse.synonyms) {
    if (lineNumber !== (synonym.lineNumber || 0)) {
      lineNumber = synonym.lineNumber || 0
      items.value.push({ id: getId(), type: 'delimiter'  })
    }

    items.value.push({ id: getId(), type: 'synonym', synonym })
  }
}

function onDblClick(idx: number) {
  items.value.splice(idx, 0, { id: getId(), type: 'delimiter' })
  onUpdate()
}

function onReorder(event: any) {
  const detail = event.detail as ItemReorderEventDetail
  [items.value[detail.from], items.value[detail.to]] = [items.value[detail.to], items.value[detail.from]]
  onUpdate()
  detail.complete(true)
}


function onUpdate() {
  let currentLineNumber = 0
  const resultSynonyms = []
  for (const item of items.value) {
    if (item.type === 'delimiter') { currentLineNumber += 1}
    if (item.type === 'synonym' && item.synonym) {
      item.synonym.lineNumber = currentLineNumber
      resultSynonyms.push(toRaw(item.synonym))
    }
  }

  emit('change', {
    ...props.verse,
    synonyms: resultSynonyms
  })
}
</script>
