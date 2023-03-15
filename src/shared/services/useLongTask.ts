import { loadingController } from '@ionic/vue'
import { ref } from 'vue'

export interface LongTaskOptions {
  message: string,
  duration?: number
}

export function useLongTask(
  task: () => Promise<void>,
  options?: LongTaskOptions
) {
  const _running = ref(false)
  const _executedYet = ref(false)

  async function run() {
    const loading = await loadingController.create({
      message: options?.message ?? 'Loading...',
      duration: options?.duration ?? 3000
    })
    _running.value = true
    await loading.present()
    await task()
    await loading.dismiss()
    _running.value = false
    _executedYet.value = true
  }

  return { run, running: _running, executedYet: _executedYet }
}