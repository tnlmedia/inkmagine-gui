import { App } from 'vue'
import InkButton from '@/components/InkButton.vue'
import InkAccordion from '@/components/InkAccordion.vue'
import InkSpinner from '@/components/InkSpinner.vue'
export { InkButton, InkAccordion, InkSpinner }

export default {
  install: (app: App) => {
    app.component('InkButton', InkButton)
    app.component('InkAccordion', InkAccordion)
    app.component('InkSpinner', InkSpinner)
  }
} 