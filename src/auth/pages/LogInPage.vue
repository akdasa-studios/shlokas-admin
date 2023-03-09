<template>
  <ion-page class="root">
    <ion-content
      class="ion-padding"
      :scroll-x="false"
      :scroll-y="false"
    >
      <div class="container">
        <div class="header">
          Shlokas Admin
        </div>

        <div class="controls">
          <ion-input
            v-model="login"
            placeholder="Login"
            class="credentials"
          />
          <ion-input
            v-model="password"
            placeholder="Password"
            class="credentials"
          />
          <ion-input
            v-model="totp"
            placeholder="One Time Password"
            class="credentials"
          />

          <div
            v-if="showError"
            class="error"
          >
            Can't log in with provided credentials
          </div>

          <ion-button
            expand="block"
            @click="onLogInClicked"
          >
            Log In
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonButton, IonInput, IonPage, IonContent } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { useAuthController } from '../controllers/useAuthController'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const login = ref('')
const password = ref('')
const totp = ref('')
const showError = ref(false)
const controller = useAuthController(useRouter())


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onLogInClicked() {
  const isSuccessful = await controller.logIn(login.value, password.value, totp.value)
  showError.value = !isSuccessful
}
</script>


<style scoped>
.root {
  --ion-background-color: bisque;
}

.container {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-self: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header {
  font-size: larger;
  text-align: center;
  margin: 10px;
}

.error {
  background-color: lightcoral;
  padding: 10px;
  border-radius: 10px;
}

ion-input.credentials {
  border-radius: 10px;
  --background: white;
  --color: black;
  --placeholder-color: gray;
  --placeholder-opacity: .8;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-start: 10px;
  --padding-end: 10px;
}
</style>