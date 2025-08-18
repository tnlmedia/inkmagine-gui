<script setup lang="ts">
  import "@/scss/component/_ink-sidebar.scss"
  import "@/scss/component/_ink-sidebar-simple.scss"
  import { handleSidebarTogglerClick } from '@/helper/handle-sidebar-toggler-click'
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import InkSidebarMenu from '@/components/ink-sidebar/InkSidebarMenu.vue'
  import { vInkTooltip } from '@/components/ink-tooltip/Ink-tooltip'
  import { onMounted, useTemplateRef } from 'vue'

  interface SwitchItem {
    id: string | number, // TODO 套用時跟後端確認:value 123 改用字串，後端改給 "123"; 之後後端 id to uuid "a456" 時前端不需要再修改
    name: string,
    logo: string,
  }
  interface MenuItemSchema {
    id: string,
    name: string,
    icon: string,
    route?: {
      name: string,
      [key: string]: string | number,
    },
    children?: MenuChildrenItemSchema[],
    isAllow?: boolean,
  }
interface MenuChildrenItemSchema { 
    id: string | number,
    name: string,
    route: {
      name: string,
      [key: string]: string | number,
    },
    isAllow: boolean,
  }

  interface SidebarProps {
    currentAppName:string,
    currentMainSwitchItem:SwitchItem,
    mainSwitchItems:SwitchItem[],
    currentTabSwitchItemId?:string | number,
    tabSwitchItems?:SwitchItem[],
    menu: MenuItemSchema[],
    currentMenuItemId: string | number,
  }
  const props = defineProps<SidebarProps>()

  const emit = defineEmits(['mainItemCheckSwitch', 'tabItemCheckSwitch'])
  const onMainItemCheckSwitch = (item:SwitchItem, close:()=>void) => {
    emit('mainItemCheckSwitch', item, close)
  }
  const tabBarRef = useTemplateRef<HTMLElement>('tabBarRef');
  const onTabItemCheckSwitch = (item:SwitchItem) => {
    emit('tabItemCheckSwitch', item)
  }
  const toggleSidebar = (e:Event) => {
    const isFolded = document.body.classList.contains('sidebar-folded');
    if (e.type === 'click') {
      handleSidebarTogglerClick();
    } else if (e.type === 'mouseenter' && isFolded) {
      document.body.classList.add('open-sidebar-folded');
    } else if (e.type === 'mouseleave' && isFolded) {
      document.body.classList.remove('open-sidebar-folded');
    }
  };
  const openTabBar = () => { 
    if (tabBarRef.value) {
      tabBarRef.value.classList.add('open-bloc_nav');
    }
  }
  const closeTabBar = () => { 
    if (tabBarRef.value) {
      tabBarRef.value.classList.remove('open-bloc_nav');
    }
  }
  // close sidebar when click outside on mobile/table
  const closeSidebar = (e:MouseEvent) => {
    if (!(e.target as HTMLElement).closest('#sidebar')) {
      document.body.classList.remove('sidebar-open');
    }
  };
  onMounted(() => {
    document.addEventListener('click', closeSidebar);
  });
</script>
<template>
  <nav id="sidebar" class="sidebar tw-z-[1020] tw-overflow-hidden">
    <div class="sidebar-header justify-content-start">
      <button class="sidebar-toggler tw-flex-shrink-0" @click.prevent.stop="toggleSidebar">
        <i class="fas fa-bars"></i>
      </button>
      <picture class="sidebar-brand">
        <source media="(min-width:992px)" srcset="/src/images/logo-light-lg.svg"/>
        <img src="/src/images/logo-light-sm.svg" alt="inkmagine logo"/>
      </picture>
    </div>
    <div class="sidebar-body" @mouseenter="toggleSidebar" @mouseleave="toggleSidebar">
      <!-- 集團列表 -->
      <ul 
        v-if="tabSwitchItems"
        id="console-list" 
        class="nav bloc_nav tw-flex-shrink-0"
        ref="tabBarRef"
        @mouseenter="openTabBar"
        @mouseleave="closeTabBar"
        >
        <li
          v-for="item in tabSwitchItems"
          :key="item.id"
          :class="['nav-item', { active: item.id === currentTabSwitchItemId }]"
          v-inkTooltip.right="item.name"
        >
          <button
            type="button"
            :class="['nav-link', { 'tw-cursor-default': item.id === currentTabSwitchItemId }]"
            @click.prevent="onTabItemCheckSwitch(item)"
          >
            <figure class="tw-border tw-border-solid tw-border-gray-300">
              <img v-if="item.logo" class="p-1" :src="item.logo" :alt="item.name"/>
            </figure>
          </button>
        </li>
      </ul>

      <div class="nav" v-scrollBar>
        <div class="nav__header">
          <h3 class="nav__title nav-simple-hide">{{ currentAppName }}</h3>
          <!-- 品牌列表 -->
          <Disclosure as="div" class="brand-nav-item">
            <DisclosureButton
            class="nav-link tw-font-semibold tw-border-0 tw-bg-transparent tw-text-left"
            >
            <figure class="tw-border tw-border-solid tw-border-gray-300">
                <img v-if="currentMainSwitchItem?.logo" :src="currentMainSwitchItem.logo" :alt="currentMainSwitchItem.name"/>
              </figure>
              <span class="brand-nav-item__title link-title tw-break-words">
                {{  currentMainSwitchItem.name }}
              </span>
              <i v-if="mainSwitchItems.length > 1" class="fal fa-chevron-down fa-fw link-arrow"></i>
            </DisclosureButton>
            <DisclosurePanel 
             v-if="mainSwitchItems.length > 1"
             v-slot="{ close }"
            >
              <ul class="nav sub-menu">
                <template v-for="item in mainSwitchItems" :key="item.id">
                <li 
                  v-if="item.id !== currentMainSwitchItem.id" 
                  class="nav-item"
                >
                  <button type="button" class="nav-link" @click.prevent="onMainItemCheckSwitch( item, close)">
                    <figure class="tw-border tw-border-solid tw-border-gray-300">
                      <img v-if="item.logo" :src="item.logo" :alt="item.name"/>
                    </figure>
                    <span class="link-title tw-text-left">{{ item.name }}</span>
                  </button>
                </li>
                </template>
              </ul>
            </DisclosurePanel>
          </Disclosure>
          <slot></slot>
        </div>
        <InkSidebarMenu :menu="menu" :currentMenuItemId="currentMenuItemId"/>
      </div>
    </div>
  </nav>
</template>