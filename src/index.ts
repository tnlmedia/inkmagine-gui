import { App } from 'vue'
import InkButton from '@/components/InkButton.vue'
import InkSpinner from '@/components/InkSpinner.vue'
import InkMenu from '@/components/ink-menu/InkMenu.vue'
import InkMenuButton from '@/components/ink-menu/InkMenuButton.vue'
import InkMenuItems from '@/components/ink-menu/InkMenuItems.vue'
import InkMenuItem from '@/components/ink-menu/InkMenuItem.vue'
import InkMenuItemsWrapper from '@/components/ink-menu/InkMenuItemsWrapper.vue'
import InkDisclosure from './components/ink-disclosure/InkDisclosure.vue'
import InkDisclosureButton from '@/components/ink-disclosure/InkDisclosureButton.vue'
import InkDisclosurePanel from '@/components/ink-disclosure/InkDisclosurePanel.vue'
export {
  InkButton,
  InkSpinner,
  InkMenu,
  InkMenuButton,
  InkMenuItems,
  InkMenuItem,
  InkMenuItemsWrapper,
  InkDisclosure,
  InkDisclosureButton,
  InkDisclosurePanel
}

export default {
  install: (app: App) => {
    app.component('InkButton', InkButton)
    app.component('InkSpinner', InkSpinner)
    app.component('InkMenu', InkMenu)
    app.component('InkMenuButton', InkMenuButton)
    app.component('InkMenuItems', InkMenuItems)
    app.component('InkMenuItem', InkMenuItem)
    app.component('InkMenuItemsWrapper', InkMenuItemsWrapper)
    app.component('InkDisclosure', InkDisclosure)
    app.component('InkDisclosureButton', InkDisclosureButton)
    app.component('InkDisclosurePanel', InkDisclosurePanel)
  }
} 