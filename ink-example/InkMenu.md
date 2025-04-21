```vue
// 1. InkMenuItem dosen't setting the props as
<InkMenu v-slot="{open, close}">
  <InkMenuButton>
    <InkButton variant="txt" theme="transparent">
      <i class="far fa-grip-horizontal tw-text-base tw-text-gray-700"></i>{{ $t('navbar.apps.service') }}
    </InkButton>
  </InkMenuButton>
  <InkMenuItems>
    <InkMenuItemsWrapper>
      <InkMenuItem>
        <router-link :to="{ name: 'article-delivery-overview' }">
          <div class="content">
            <p class="tw-font-semibold tw-text-sm">test</p>
            <p class="sub-text tw-text-mute tw-text-xs">{{ $t(`navbar.apps.dashboard.description`) }}</p>
          </div>
        </router-link>
      </InkMenuItem>
      <InkMenuItem>
        <a href="https://www.inkmaginecms.com/dashboard" target="_blank">
          <div class="content">
            <p class="tw-font-semibold tw-text-sm">{{ $t('navbar.apps.dashboard.label') }}</p>
            <p class="sub-text tw-text-mute tw-text-xs">{{ $t(`navbar.apps.dashboard.description`) }}</p>
          </div>
        </a>
      </InkMenuItem>
      <InkMenuItem v-for="app in apps" :key="app">
        <a :href="getHostname(app)" target="_blank">
          <div class="content">
            <p class="tw-font-semibold tw-text-sm">{{ $t(`navbar.apps.${app}.label`) }}</p>
            <p class="sub-text tw-text-mute tw-text-xs">{{ $t(`navbar.apps.${app}.description`) }}</p>
          </div>
        </a>
      </InkMenuItem>
    </InkMenuItemsWrapper>
  </InkMenuItems>
</InkMenu>

// 2. InkMenuItem set the props as to string
<InkMenu v-slot="{open, close}">
  <InkMenuButton>
    <InkButton variant="txt" theme="transparent">
      <i class="far fa-grip-horizontal tw-text-base tw-text-gray-700"></i>{{ $t('navbar.apps.service') }}
    </InkButton>
  </InkMenuButton>
  <InkMenuItems>
    <InkMenuItemsWrapper>
      <InkMenuItem as="div" class="test" v-slot="{active}" href="https://www.inkmaginecms.com/dashboard"
        target="_blank" @mouseenter="console.log('mouseenter')">
        <div class="content">
          {{ active }}
          <p class="tw-font-semibold tw-text-sm">{{ $t('navbar.apps.dashboard.label') }}</p>
          <p class="sub-text tw-text-mute tw-text-xs">{{ $t(`navbar.apps.dashboard.description`) }}</p>
        </div>
      </InkMenuItem>
      <InkMenuItem v-for="app in apps" as="a" :href="getHostname(app)" target="_blank" :key="app"
        @mouseenter="console.log(`mouseenter${app}`)">
        <div class="content">
          <p class="tw-font-semibold tw-text-sm">{{ $t(`navbar.apps.${app}.label`) }}</p>
          <p class="sub-text tw-text-mute tw-text-xs">{{ $t(`navbar.apps.${app}.description`) }}</p>
        </div>
      </InkMenuItem>
    </InkMenuItemsWrapper>
  </InkMenuItems>
</InkMenu>

// 3. multiple InkMenuItems and InkMenuButton props example
<InkMenu>

  <VTooltip>
    <InkMenuButton :disabled="isLock" variant="icon" theme="transparent" @click="toggleMoreList" ref="moreListBtn">
      <InkButton>
        <i class="far fa-ellipsis-v fa-fw tw-text-base"></i>
      </InkButton>
    </InkMenuButton>
    <template #popper>
      more
    </template>
  </VTooltip>
  <InkMenuItems :static="true" :unmount="false" class="tw-translate-y-4"
    v-show="!isRevisionList && isMoreList">
    <InkMenuItemsWrapper>
      <InkMenuItem :disabled="isLock" @click.prevent="openCopyArticle(); hideMoreList();" type="button"
        as="button">
        <i class="far fa-copy fa-fw tw-text-base icon"></i>
        {{ trans('article.copy_article.title') }}
      </InkMenuItem>
      <InkMenuItem as="button" type="button" @click="toggleReversionList" :disabled="isLock">
        <i class="far fa-history fa-fw tw-text-base icon"></i>
        {{ trans('article.revisions.title') }}
      </InkMenuItem>
    </InkMenuItemsWrapper>
  </InkMenuItems>
  <Revision v-if="isRevisionList && isMoreList" :isRevisionList="isRevisionList"
    @hideReversionListEmit="hideReversionList" />
</InkMenu>

// 3-2. The <Revision> content and the other custom content
  <InkMenuItems class="js-revision-list tw-translate-y-4 tw-overflow-hidden tw-py-0" :static="true"
    :unmount="false">
    <div
      class="tw-flex tw-items-center tw-relative tw-px-3 tw-py-2.5 tw-text-base tw-font-semibold tw-text-gray-900 after:tw-absolute after:tw-inset-x-0 after:tw-bottom-0 after:tw-h-[1px] after:tw-bg-gray-300 after:tw-content-['']">
      <InkButton variant="icon" theme="transparent" class="tw-mr-6" @click="$emit('hideReversionListEmit')">
        <i class="far fa-chevron-left fa-fw"></i>
      </InkButton>
      {{ trans('article.revisions.title') }}
    </div>

    <InkMenuItemsWrapper class="tw-max-h-[236px] tw-overflow-auto tw-py-2.5">
      <InkMenuItem v-slot="{ active }" v-for="item in dropdownList" :key="item.id">
        <a href :class="[{ 'tw-bg-primary-50': active }]" @click.prevent="onItemClick(item.id)">
          <div>
            <p class="tw-text-base tw-text-gray-900">{{ item . modifier }}</p>
            <p class="tw-text-xs tw-text-gray-700">{{ item . created }}</p>
            <p class="tw-text-xs tw-text-gray-700">{{ item . status }}</p>
          </div>
        </a>
      </InkMenuItem>

      <!-- loading -->
      <div v-if="isLoading || dropdownList.length === 0"
        class="tw-flex tw-h-12 tw-items-center tw-justify-center tw-pt-2">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
        <p v-else class="tw-text-gray-900">{{ trans('datatable.no_data') }}</p>
      </div>

      <!-- infinite scroll trigger -->
      <div v-if="targetIsVisible" ref="target"></div>
    </InkMenuItemsWrapper>
  </InkMenuItems>
```