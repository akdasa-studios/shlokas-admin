import { computed, ref, Ref, watch } from 'vue'

export function useValidation(
  value: Ref<any>,
  validator: (value: string) => boolean
) {
  const touched = ref(false)
  const isValid = ref(false)
  const classes = computed(() => ({
    'ion-invalid': touched.value && !isValid.value,
    'ion-valid': touched.value && isValid.value,
    'ion-touched': touched.value,
  }))

  watch(value, () => { validate(value.value) })

  function markTouched() {
    touched.value = true
  }

  function validate(value: string) {
    isValid.value = validator(value)
  }

  return {
    markTouched, validate, classes
  }
}