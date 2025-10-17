<script setup lang="ts">
  import '@/scss/component/_ink-navbar.scss'
  import '@/scss/component/_user-default-img.scss'
  import { handleSidebarTogglerClick } from '@/helper/handle-sidebar-toggler-click'
  import { utcTimezone } from '@/helper/dayjs'
  import InkButton from '@/components/InkButton.vue'
  import InkMenu from '@/components/ink-menu/InkMenu.vue'
  import InkMenuButton from '@/components/ink-menu/InkMenuButton.vue'
  import InkMenuItems from '@/components/ink-menu/InkMenuItems.vue'
  import InkMenuItemsWrapper from '@/components/ink-menu/InkMenuItemsWrapper.vue'
  import InkMenuItem from '@/components/ink-menu/InkMenuItem.vue'
  import { t } from '@/helper/i18n'
  interface NavbarProps {
    timezone?: string
    user:{
      nickname: string;
      avatar: string;
      mail: string;
    }
    logoutUrl: string;
  }
  const props = defineProps <NavbarProps>();

  const apps = ['member', 'team', 'cabinet','sandwich','console']
  const getHostname = (app: string) => {
    const hostname = window.location.hostname;
    let prefix = '';
    if(hostname.includes('sandbox') || hostname.includes('greenroom')){
      prefix = 'sandbox-';
    }
    if(hostname.includes('stage')){
      prefix = 'stage-';
    }

    return `//${prefix + app}.inkmaginecms.com`;
};
</script>
<template>
  <nav id="top-navbar" class="navbar top-navbar tw-z-[1011]">
    <button type="button" class="sidebar-toggler" @click.prevent.stop="handleSidebarTogglerClick">
      <i class="fas fa-bars"></i>
    </button>
    <div class="navbar-content pl-0">
      <img src="/src/images/logo-light-sm.svg" class="navbar-content__logo" alt="inkmagine logo" />
      <ul class="navbar-nav tw-items-center">
        <li v-if="timezone" class="nav-item tw-text-xs tw-text-gray-700">
          {{ utcTimezone(timezone) }}
        </li>
        <li class="nav-item">
          <InkMenu>
            <InkMenuButton>
              <InkButton variant="txt" theme="gray">
                <i class="far fa-grip-horizontal tw-text-base"></i>{{ t('navbar.apps.service') }}
              </InkButton>
            </InkMenuButton>
            <InkMenuItems>
              <InkMenuItemsWrapper>
                <InkMenuItem>
                  <a :href="`${getHostname('www')}/dashboard`" target="_blank">
                    <div class="content">
                      <p class="tw-font-semibold tw-text-sm">{{ t('navbar.apps.dashboard.label') }}</p>
                      <p class="sub-text tw-text-mute tw-text-xs">{{ t(`navbar.apps.dashboard.description`) }}</p>
                    </div>
                  </a>
                </InkMenuItem>
                <InkMenuItem v-for="app in apps" :key="app">
                  <a :href="getHostname(app)" target="_blank">
                    <div class="content">
                      <p class="tw-font-semibold tw-text-sm">{{ t(`navbar.apps.${app}.label`) }}</p>
                      <p class="sub-text tw-text-mute tw-text-xs">{{ t(`navbar.apps.${app}.description`) }}</p>
                    </div>
                  </a>
                </InkMenuItem>
              </InkMenuItemsWrapper>
            </InkMenuItems>
          </InkMenu>
        </li>
        <li v-if="user.mail" class="nav-item">
          <InkMenu>
            <InkMenuButton>
              <button type="button" class="user-default-img x30">
                <img v-if="user.avatar" :src="user.avatar" />
                <p v-else>{{ user . mail . slice(0, 1) . toLocaleUpperCase() }}</p>
              </button>
            </InkMenuButton>
            <InkMenuItems>
              <div class="tw-border-b tw-p-5 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-3">
                <div class="user-default-img x30">
                  <img v-if="user.avatar" :src="user.avatar" />
                  <p v-else>{{ user . mail . slice(0, 1) . toLocaleUpperCase() }}</p>
                </div>
                <div class="info tw-text-center">
                  <p class="name tw-font-semibold mb-0">{{ user . nickname }}</p>
                  <p class="email tw-text-mute tw-break-all tw-text-xs">{{ user . mail }}</p>
                </div>
              </div>
              <InkMenuItemsWrapper class="tw-pt-3">
                <InkMenuItem>
                <a :href="`${getHostname('member')}/profile`">
                  <i class="fal fa-user fa-fw tw-mr-1"></i>
                  {{ t('navbar.profile') }}
                </a>
                </InkMenuItem>
                <InkMenuItem>
                <a :href="logoutUrl">
                  <i class="fal fa-sign-out fa-fw icon"></i>
                  <span>{{ t('logout') }}</span>
                </a>
                </InkMenuItem>
              </InkMenuItemsWrapper>
            </InkMenuItems>
          </InkMenu>
        </li>
      </ul>
    </div>
  </nav>
</template>
