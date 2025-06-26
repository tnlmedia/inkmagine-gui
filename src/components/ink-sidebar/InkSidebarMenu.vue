<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  export interface MenuItemSchema {
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
export interface MenuChildrenItemSchema { 
    id: string | number,
    name: string,
    route: {
      name: string,
      [key: string]: string | number,
    },
    isAllow: boolean,
  }
  interface SidebarMenuProps {
    menu:MenuItemSchema[],
    currentMenuItemId: string | number,
  }
  const props = defineProps<SidebarMenuProps>()

</script>

<template>
  <ul class="nav__list">
    <template v-for="item in menu" :key="item.id">
      <li
        v-if="item.isAllow || item.children?.some(item => item.isAllow)"
        :class="['nav-item', { 'has-children': item.children }]"
      >
        <!-- 有子選單 -->
        <template v-if="item.children">
          <Disclosure
          v-slot="{ open }"
          >
            <DisclosureButton
            :class="['nav-link tw-w-full before:tw-hidden']"
            >
              <i :class="['icon far fa-fw', item.icon]"></i>
              <span class="link-title tw-pt-0">{{ item.name }}</span>
              <i class="link-arrow fal fa-chevron-down !tw-text-inherit"></i>
            </DisclosureButton>
            <DisclosurePanel
            static
            :unmount="false"
            v-show="open"
            >
               <!-- 子選單列表 -->
                <ul class="nav sub-menu tw-p-0">
                  <li
                    v-for="subitem in item.children.filter(item => item.isAllow)"
                    :key="subitem.route.name"
                    class="nav-item"
                  >
                    <router-link
                      :to="{
                        ...subitem.route
                      }"
                      :class="['nav-link tw-pl-10', { 'router-link-active': currentMenuItemId === subitem?.id }]"
                    >
                      {{ subitem.name }}
                    </router-link>
                  </li>
                </ul>
            </DisclosurePanel>
          </Disclosure>
        </template>
        <!-- 無子選單 -->
        <template v-else>
          <router-link :to="{ ...item.route }" :class="['nav-link before:tw-hidden', { 'router-link-active': currentMenuItemId === item.id }]">
            <i :class="['icon', 'far', 'fa-fw', item.icon]"></i>
            <span class="link-title tw-pt-0">{{ item.name }}</span>
          </router-link>
        </template>
      </li>
    </template>
  </ul>
</template>
