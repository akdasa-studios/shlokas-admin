<template>
  <div class="root">
    <SVGTextLines
      :lines="props.lines"
      :line-height="20"
      line-class="line"
    />
  </div>
</template>

<script setup lang="ts">
import { SVGTextLines } from '@akdasa-studios/shlokas-uikit'
import { defineProps } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  lines: string[]
}>()
</script>


<style scoped>
.root {
  background-color: var(--ion-color-light);
  border: 1px solid var(--ion-color-light-shade);
  border-radius: 5px;
}
/deep/ .line {
  font-family: Georgia;
  fill: var(--ion-color-light-contrast);
  font-size: 20px;
}
</style>