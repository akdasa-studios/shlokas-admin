<template>
  <ion-page class="root">
    <ion-content
      class="ion-padding"
      :scroll-x="false"
      :scroll-y="false"
    >
      <div class="container">
        <div class="box">
          <img
            :src="env.getAssetsPath('logo.svg')"
            alt="Logo"
          >

          <div class="controls">
            <div
              v-if="showError"
              class="error"
            >
              Can't log in with provided credentials
            </div>

            <ion-input
              v-model="login"
              placeholder="Login"
              class="credentials"
            />
            <ion-input
              v-model="password"
              placeholder="Password"
              class="credentials"
              type="password"
            />
            <ion-input
              v-model="totp"
              placeholder="One Time Password"
              class="credentials"
            />

            <ion-button
              expand="block"
              :disabled="!isLogInButtonEnabled"
              @click="onLogInClicked"
            >
              Log In
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonButton, IonInput, IonPage, IonContent } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { useAuthService, useAuthStore, useTotpService } from '@/auth'
import { useEnvironment } from '@/shared'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const authStore = useAuthStore()
const authService = useAuthService()
const totpService = useTotpService()
const router = useRouter()
const env = useEnvironment()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const login = ref('')
const password = ref('')
const totp = ref('')
const showError = ref(false)
const isLogInButtonEnabled = computed(() => login.value && password.value && totp.value)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onLogInClicked() {
  const authResult = await authService.logIn(login.value, password.value)
  const totpResult = await totpService.validate(totp.value)
  if (authResult && totpResult) {
    authStore.loggedIn(login.value, password.value)
    router.push({ name: 'home' })
  } else {
    showError.value = !(authResult && totpResult)
  }
}
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.box {
  display: flex;
  flex-direction: column;
  align-self: center;

  width: 100%;
  max-width: 390px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  background-color: var(--ion-color-danger);
  color: var(--ion-color-danger-contrast);
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

ion-input.credentials {
  border-radius: 10px;
  --background: var(--ion-color-light);
  --color: var(--ion-color-light-contrast);
  --placeholder-color: var(--ion-color-light-contrast);
  --placeholder-opacity: .5;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-start: 10px;
  --padding-end: 10px;
}
</style>