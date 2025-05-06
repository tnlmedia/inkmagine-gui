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
import InkNavbar from '@/components/InkNavbar.vue'
import InkSidebar from '@/components/ink-sidebar/InkSidebar.vue'
import InkSidebarSimpleHide from '@/components/ink-sidebar/InkSidebarSimpleHide.vue'
import { InkVTooltip, vInkTooltip } from '@/components/ink-tooltip/Ink-tooltip'
import { inkI18n } from '@/helper/i18n'
import { setFont } from '@/helper/set-font'

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
  InkDisclosurePanel,
  InkNavbar,
  InkSidebar,
  InkSidebarSimpleHide,
  InkVTooltip,
  vInkTooltip
}

export default {
  install: (app: App, options: { lang?: 'zh-tw' | 'en-us' | 'ja-jp' }) => {
    setFont(options.lang)
    inkI18n.global.locale.value = options.lang || 'en-us'
  }
} 