<template>
  <ion-page>
    <Suspense>
      <ion-router-outlet />
    </Suspense>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonRouterOutlet, IonPage } from '@ionic/vue'
</script>