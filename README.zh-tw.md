# Inkmagine GUI 工具

Inkmagine 是一個統一的組件和樣式庫，提供了一系列可重用的 Vue 組件。

## 安裝需求
套件使用 Tailwind 作為樣式基礎，使用前請確保已安裝 Tailwind

## 安裝
```bash
npm install @tnlmedia/inkmagine-gui
```
- 如果遇到 peerDependencies 的套件版本過低可以使用忽略 peerDependencies 套件的安裝方式

```bash
npm install @tnlmedia/inkmagine-gui --legacy-peer-deps
```

## 可用樣式使用說明
### tailwind config
```js
import {inkTailwindConfig} from '@tnlmedia/inkmagine-gui/tailwind.config.js'
export default {
  ...inkTailwindConfig,
  content: [
    './node_modules/@tnlmedia/inkmagine-gui/**/*.{js,ts,vue}',
    'Set the file path to be scanned in the project'
  ],
}
```
## 全域設定說明

### vue-i18n language

在初始化應用程式時，可以透過 `inkmagineGui` 的選項來設定語言：

```js
import inkmagineGui from "@tnlmedia/inkmagine-gui"

createApp(App)
  .use(inkmagineGui, { lang: 'zh-tw' }) // 設定語言
```

#### 支援的語言
- `zh-tw`: 繁體中文
- `en-us`: 英文
- `ja-jp`: 日文

如果未指定語言，預設將使用 `en-us`。

## How to import component
```vue
import { InkVTooltip, InkMenu, InkMenuButton, InkMenuItems, InkMenuItem, InkMenuItemsWrapper, InkButton } from '@tnlmedia/inkmagine-gui';
```

## 容器使用說明

### InkNavbar 

InkNavbar 是一個導航欄組件，提供網站頂部的導航功能，包含側邊欄切換、應用程式選單和用戶選單等功能。

#### 基本用法
```vue
<InkNavbar 
  :timezone="user?.timezone" 
  :user="user" 
  logoutUrl="/logout" 
/>
```

#### 屬性說明

| 屬性名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| `timezone` | string | 否 | 用戶的時區設定 |
| `user` | object | 是 | 用戶資訊物件，包含以下屬性：<br>- `nickname`: 用戶暱稱<br>- `avatar`: 用戶頭像 URL<br>- `mail`: 用戶電子郵件 |
| `logoutUrl` | string | 是 | 登出功能的 URL |

#### 功能說明
- 側邊欄切換按鈕
- 時區顯示
- 應用程式選單（包含 dashboard、member、team、cabinet 等應用）
- 用戶選單（包含用戶資訊、個人資料和登出功能）

#### 注意事項
- 應用程式選單的 URL 會根據當前環境（sandbox、stage、production）自動調整
- 用戶頭像若未設定，將顯示用戶電子郵件的第一個字母
- 所有文字內容都支援多語言設定

### InkSidebar

InkSidebar 是一個側邊欄組件，提供網站的主要導航功能，包含品牌切換、選單導航等功能。

#### 基本用法
```vue
<InkSidebar
  :currentAppName="$t('sandwich')" 
  :currentMainSwitchItem="currentConsole?.console" 
  :mainSwitchItems="user.permission.map((item:Permission) => item.console)"
  @mainItemCheckSwitch="checkSwitchEnv"
  :menu="menu"
  :currentMenuItemId="checkCurrentMenuItemId"
/>
```

#### 進階用法（使用插槽）
```vue
<InkSidebar 
  :currentAppName="trans('cabinet.name')" 
  :currentMainSwitchItem="currentTeam" 
  :mainSwitchItems="env.team"
  @mainItemCheckSwitch="checkSwitchEnv"
  @tabItemCheckSwitch="checkSwitchEnv"
  :menu="menu"
  :currentMenuItemId="checkCurrentMenuItemId"
  :currentTabSwitchItemId="env.workspace.console"
  :tabSwitchItems="consoleList"
>
  <!-- 自定義內容 -->
  <InkButton
    as="router-link"
    variant="txt"
    theme="primary"
    :to="{ name: 'article-create' }"
  >
    <i class="far fa-edit tw-text-base"></i>
    <InkSidebarSimpleHide>
      {{ trans('buttons.compose') }}
    </InkSidebarSimpleHide>
  </InkButton>
</InkSidebar>
```

#### 屬性說明

| 屬性名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| `currentAppName` | string | 是 | 當前應用程式名稱 |
| `currentMainSwitchItem` | object | 是 | 當前選中的主要切換項目，包含以下屬性：<br>- `id`: 項目 ID<br>- `name`: 項目名稱<br>- `logo`: 項目圖標 URL |
| `mainSwitchItems` | array | 是 | 主要切換項目列表，每個項目包含與 `currentMainSwitchItem` 相同的屬性 |
| `currentTabSwitchItemId` | string \| number | 否 | 當前選中的 tabSwitchItems 切換項目的 id |
| `tabSwitchItems` | array | 否 | 標籤切換項目列表，每個項目包含與 `currentMainSwitchItem` 相同的屬性 |
| `menu` | array | 是 | 選單項目列表，每個項目包含以下屬性：<br>- `id`: 項目 ID<br>- `name`: 項目名稱<br>- `icon`: 圖標類名<br>- `route`: 路由資訊（可選）<br>- `children`: 子選單項目（可選）<br>- `isAllow`: 是否允許訪問（可選） |
| `currentMenuItemId` | string \| number | 是 | 當前選中的選單項目 ID |

#### 事件說明

| 事件名稱 | 參數 | 說明 |
|---------|------|------|
| `mainItemCheckSwitch` | `(item: SwitchItem, close: () => void)` | 當主要切換項目被點擊時觸發 |
| `tabItemCheckSwitch` | `(item: SwitchItem)` | 當標籤切換項目被點擊時觸發 |

#### 選單結構範例
```js
const menu = [
  {
    id: 'deliveryArticle',
    icon: 'fa-file-waveform',
    name: 'deliveryArticle',
    children: [{
      id: 'deliveryArticleOverview',
      name: 'overview',
      route: {
        name: 'article-delivery-overview',
        query: {
          console_id: currentConsole?.console?.id
        }
      },
      isAllow: true,
    }],
  },
  {
    id: 'setting',
    icon: 'fa-gear',
    name: 'setting',
    children: [{
      id: 'deliveryPosition',
      name: 'deliveryPosition',
      route: {
        name: 'position',
        query: {
          console_id: currentConsole?.console?.id
        }
      },
      isAllow: true,
    }],
  },
];
```

#### 功能說明
- 支援多層級選單結構
- 支援路由導航
- 支援權限控制
- 支援自定義內容（通過插槽）

#### 注意事項
- 選單項目的 `isAllow` 屬性用於控制項目的顯示權限
- 子選單項目的路由資訊必須包含 `name` 屬性
- 側邊欄的折疊狀態會保存在 body 的 class 中
- InkSidebarMenu 組件使用 [Vue Router](https://router.vuejs.org/) 作為路由管理工具，請確保您的專案中已安裝此套件
- 當使用 `tabSwitchItems` 時，需要同時提供 `currentTabSwitchItemId` 屬性

#### 相關組件說明

| 組件名稱 | 說明 | 屬性 | 預設值 | 可選值 |
|---------|------|------|--------|--------|
| `InkSidebarSimpleHide` | 側邊欄折疊時隱藏內容的包裝器 | `as` | 'span' | string \| Component |

#### 組件關係
```
InkSidebar
├──slot
│  └── InkSidebarSimpleHide (折疊時隱藏內容)
└── InkSidebarMenu (選單列表，已包含在容器內)
```

#### 使用說明
1. `InkSidebarSimpleHide` 用於包裝需要在側邊欄折疊時隱藏的內容
2. 可以通過 `as` 屬性來自定義渲染的標籤或組件
3. 預設使用 `span` 標籤渲染
4. 支援插槽內容

## 組件使用說明

### InkButton

InkButton 提供了多種樣式和尺寸的按鈕。

#### 基本連結按鈕
```vue
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="base" theme="link">router-link</InkButton>
  <InkButton variant="base" theme="link">tw-btn-link</InkButton>
  <InkButton as="a" href="#" variant="base" theme="link">tw-btn-link</InkButton>
</div>
```

#### 帶圖標的按鈕 (36px)
```vue
<div class="tw-flex tw-gap-1">
  <InkButton variant="txt" theme="transparent">
    <i class="far fa-sliders-h"></i>tw-btn-icon & txt
  </InkButton>
  <InkButton variant="txt" theme="gray">
    <i class="far fa-sliders-h"></i>tw-btn-gray
  </InkButton>
  <InkButton variant="txt" theme="primary">
    <i class="far fa-sliders-h"></i>tw-btn-primary
  </InkButton>
</div>
```

#### 中等尺寸按鈕 (32px)
```vue
<div class="tw-flex tw-gap-1">
  <InkButton variant="txt" size="md" theme="transparent">
    <i class="far fa-sliders-h"></i>tw-btn-icon & txt
  </InkButton>
  <InkButton variant="txt" size="md" theme="primary">
    <i class="far fa-sliders-h"></i>tw-btn-primary
  </InkButton>
</div>
```

#### 小尺寸按鈕 (24px)
```vue
<div class="tw-flex tw-gap-1">
  <InkButton variant="icon" size="xs" theme="transparent">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" size="xs" theme="primary">
    <i class="far fa-sliders-h"></i>
  </InkButton>
</div>
```

#### 圖標按鈕 (36px)
```vue
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="icon" theme="transparent">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" theme="transparent">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" theme="gray">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" theme="info">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" theme="primary">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" theme="outline-gray">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton as="a" href="#" variant="icon" theme="primary">
    <i class="far fa-sliders-h"></i>
  </InkButton>
</div>
```

#### 中等尺寸圖標按鈕 (32px)
```vue
<div class="tw-flex tw-gap-1">
  <InkButton as="router-link" to="/" variant="icon" size="md" theme="transparent">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" size="md" theme="transparent">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" size="md" theme="gray">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" size="md" theme="info">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" size="md" theme="primary">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton variant="icon" size="md" theme="outline-gray">
    <i class="far fa-sliders-h"></i>
  </InkButton>
  <InkButton as="a" href="#" variant="icon" size="md" theme="primary">
    <i class="far fa-sliders-h"></i>
  </InkButton>
</div>
```

#### 禁用狀態
```vue
<div class="tw-flex tw-gap-1">
  <InkButton variant="txt" disabled theme="transparent">
    <i class="far fa-sliders-h"></i>disabled
  </InkButton>
  <InkButton variant="txt" disabled theme="primary">
    <i class="far fa-sliders-h"></i>disabled
  </InkButton>
</div>
```

#### 載入狀態
```vue
<div class="tw-flex tw-gap-1">
  <InkButton :disabled="testLoading" :loading="testLoading" variant="txt" theme="primary">
    <i class="far fa-sliders-h"></i>loading
  </InkButton>
</div>
```

#### InkButton 屬性說明

| 屬性名稱 | 類型 | 預設值 | 可選值 | 說明 |
|---------|------|--------|--------|------|
| `as` | string | 'button' | 'a' \| 'button' \| 'router-link' | 指定按鈕渲染的標籤類型。當需要連結功能時，可設為 'a' 或 'router-link' |
| `type` | string | 'button' | 'button' \| 'submit' \| 'reset' | 當 `as="button"` 時，指定按鈕的類型 |
| `size` | string | - | 'md' \| 'xs' \| 'xxs' | 按鈕尺寸。'md' 為中等尺寸(32px)，'xs' 為小尺寸(24px)，不指定則為預設尺寸(36px) |
| `variant` | string | 'base' | 'base' \| 'txt' \| 'icon' | 按鈕變體。'base' 為基礎按鈕，'txt' 為文字按鈕，'icon' 為圖標按鈕 |
| `theme` | string | 'transparent' | 'primary' \| 'info' \| 'gray' \| 'outline-gray' \| 'link' \| 'transparent' | 按鈕主題樣式 |
| `disabled` | boolean | false | true \| false | 是否禁用按鈕。當為 true 時，按鈕無法點擊且會套用禁用樣式 |
| `loading` | boolean | false | true \| false | 是否顯示載入狀態。當為 true 時，會顯示載入動畫並隱藏按鈕內容 |

### InkMenu

InkMenu 是基於 @headlessui/vue 的 Menu 組件封裝，提供了一個完整的下拉選單解決方案。

#### 基本用法
```vue
<InkMenu v-slot="{open, close}">
  <InkMenuButton>
    <InkButton variant="txt" theme="transparent">
      <i class="far fa-grip-horizontal tw-text-base tw-text-gray-700"></i>
      {{ $t('navbar.apps.service') }}
    </InkButton>
  </InkMenuButton>
  <InkMenuItems>
    <InkMenuItemsWrapper>
      <InkMenuItem>
        <router-link :to="{ name: 'article-delivery-overview' }">
          <div class="content">
            <p class="tw-font-semibold tw-text-sm">test</p>
            <p class="sub-text tw-text-mute tw-text-xs">
              {{ $t(`navbar.apps.dashboard.description`) }}
            </p>
          </div>
        </router-link>
      </InkMenuItem>
    </InkMenuItemsWrapper>
  </InkMenuItems>
</InkMenu>
```

#### 進階用法
```vue
<InkMenu v-slot="{open, close}">
  <InkMenuButton>
    <InkButton variant="txt" theme="transparent">
      <i class="far fa-grip-horizontal tw-text-base tw-text-gray-700"></i>
      {{ $t('navbar.apps.service') }}
    </InkButton>
  </InkMenuButton>
  <InkMenuItems>
    <InkMenuItemsWrapper>
      <InkMenuItem 
        as="div" 
        class="test" 
        v-slot="{active}" 
        href="https://www.inkmaginecms.com/dashboard"
        target="_blank" 
        @mouseenter="console.log('mouseenter')"
      >
        <div class="content">
          {{ active }}
          <p class="tw-font-semibold tw-text-sm">{{ $t('navbar.apps.dashboard.label') }}</p>
          <p class="sub-text tw-text-mute tw-text-xs">
            {{ $t(`navbar.apps.dashboard.description`) }}
          </p>
        </div>
      </InkMenuItem>
    </InkMenuItemsWrapper>
  </InkMenuItems>
</InkMenu>
```

#### 多個選單項目容器
```vue
<InkMenu>
  <!-- 第一個選單按鈕 -->
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

  <!-- 第一個選單項目容器 -->
  <InkMenuItems :static="true" :unmount="false" class="tw-translate-y-4" v-show="!isRevisionList && isMoreList">
    <InkMenuItemsWrapper>
      <InkMenuItem :disabled="isLock" @click.prevent="openCopyArticle(); hideMoreList();" type="button" as="button">
        <i class="far fa-copy fa-fw tw-text-base icon"></i>
        {{ trans('article.copy_article.title') }}
      </InkMenuItem>
      <InkMenuItem as="button" type="button" @click="toggleReversionList" :disabled="isLock">
        <i class="far fa-history fa-fw tw-text-base icon"></i>
        {{ trans('article.revisions.title') }}
      </InkMenuItem>
    </InkMenuItemsWrapper>
  </InkMenuItems>

  <!-- 第二個選單項目容器 -->
  <InkMenuItems class="js-revision-list tw-translate-y-4 tw-overflow-hidden tw-py-0" :static="true" :unmount="false">
    <!-- 標題欄 -->
    <div class="tw-flex tw-items-center tw-relative tw-px-3 tw-py-2.5 tw-text-base tw-font-semibold tw-text-gray-900 after:tw-absolute after:tw-inset-x-0 after:tw-bottom-0 after:tw-h-[1px] after:tw-bg-gray-300 after:tw-content-['']">
      <InkButton variant="icon" theme="transparent" class="tw-mr-6" @click="$emit('hideReversionListEmit')">
        <i class="far fa-chevron-left fa-fw"></i>
      </InkButton>
      {{ trans('article.revisions.title') }}
    </div>

    <!-- 選單項目列表 -->
    <InkMenuItemsWrapper class="tw-max-h-[236px] tw-overflow-auto tw-py-2.5">
      <InkMenuItem v-slot="{ active }" v-for="item in dropdownList" :key="item.id">
        <a href :class="[{ 'tw-bg-primary-50': active }]" @click.prevent="onItemClick(item.id)">
          <div>
            <p class="tw-text-base tw-text-gray-900">{{ item.modifier }}</p>
            <p class="tw-text-xs tw-text-gray-700">{{ item.created }}</p>
            <p class="tw-text-xs tw-text-gray-700">{{ item.status }}</p>
          </div>
        </a>
      </InkMenuItem>

      <!-- 載入狀態 -->
      <div v-if="isLoading || dropdownList.length === 0" class="tw-flex tw-h-12 tw-items-center tw-justify-center tw-pt-2">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
        <p v-else class="tw-text-gray-900">{{ trans('datatable.no_data') }}</p>
      </div>

      <!-- 無限滾動觸發器 -->
      <div v-if="targetIsVisible" ref="target"></div>
    </InkMenuItemsWrapper>
  </InkMenuItems>
</InkMenu>
```

#### InkMenu 相關組件說明

| 組件名稱 | @headlessui/vue 組件名稱 | 說明 | 屬性 | 預設值 | 可選值 |
|---------|-------------------------|------|------|--------|--------|
| `InkMenu` | `Menu` | 選單容器，管理選單的狀態和行為 | `as` | 'div' | string \| Component |
| `InkMenuButton` | `MenuButton` | 觸發按鈕，控制選單的開啟/關閉。<br> `as` 是 template 時 props 還是要從 `InkMenuButton` 往下傳遞。 | `as` | 'template' | string \| Component |
| `InkMenuItems` | `MenuItems` | 選單項目容器，包含所有選單項目 | - | - | - |
| `InkMenuItemsWrapper` | - | 選單項目包裝器，用於自定義選單項目的樣式 | - | - | - |
| `InkMenuItem` | `MenuItem` | 選單項目，可以是連結、按鈕或其他元素。<br> `as` 是 template 時，子層不能只放字串 | `as` | 'template' | string |

#### 組件關係
```
InkMenu
├── InkMenuButton (觸發按鈕)
└── InkMenuItems (選單項目容器)
    ├── 其他自定義內容（可選）
    └── InkMenuItemsWrapper (選單項目包裝器)
        └── InkMenuItem (選單項目)
```

#### 使用說明
1. `InkMenu` 提供 `v-slot="{open, close}"` 用於控制選單的開啟和關閉
2. `InkMenuItem` 提供 `v-slot="{active}"` 用於獲取當前項目的激活狀態
3. 所有組件都支援 `v-bind="restAttrs"` 來傳遞額外的屬性
4. 可以通過 `as` 屬性來自定義渲染的標籤或組件
5. `v-slot` 提供的屬性（如 `open`、`close`、`active`）都是基於 @headlessui/vue 的 Menu 組件

#### 事件
- `InkMenuButton` 支援所有標準的 DOM 事件
- `InkMenuItem` 支援所有標準的 DOM 事件
- 選單項目可以通過 `@click`、`@mouseenter` 等事件來處理互動

#### 樣式
- 所有組件都預設套用了相應的樣式類
- 可以通過 `class` 屬性來自定義樣式
- 支援 Tailwind CSS 的樣式類

### InkDisclosure

InkDisclosure 是基於 @headlessui/vue 的 Disclosure 組件封裝，提供了一個可展開/收合的內容區塊解決方案。

#### 基本用法
```vue
<InkDisclosure v-slot="{ open }" :defaultOpen="true">
  <InkDisclosureButton>
    標題
  </InkDisclosureButton>
  <InkDisclosurePanel>
    展開的內容
  </InkDisclosurePanel>
</InkDisclosure>
```

#### 進階用法 - 群組展開
```vue
<InkDisclosure 
  v-for="(item, index) in group" 
  v-slot="{ open }" 
  :defaultOpen="defaultOpen[index]"
>
  <InkDisclosureButton @click="onOpen(index)">
    {{ item.name }}
  </InkDisclosureButton>
  <div v-show="open">
    <InkDisclosurePanel static :unmount="false">
      <DynamicComponent 
        v-for="field in item.field" 
        :key="field.id" 
        :field="field"
        :value="fieldValue.find(item => item.id === field.id)?.value" 
      />
    </InkDisclosurePanel>
  </div>
</InkDisclosure>
```

#### InkDisclosure 相關組件說明

| 組件名稱 | @headlessui/vue 組件名稱 | 說明 | 屬性 | 預設值 | 可選值 |
|---------|-------------------------|------|------|--------|--------|
| `InkDisclosure` | `Disclosure` | 展開/收合容器，管理內容的展開狀態 |  -  |  -  |  -  |
| `InkDisclosureButton` | `DisclosureButton` | 觸發按鈕，控制內容的展開/收合 | `as`<br>`type` | 'button'<br>'button' | string<br>string |
| `InkDisclosurePanel` | `DisclosurePanel` | 可展開/收合的內容區塊 |  -  |  -  |  -  |

#### 組件關係
```
InkDisclosure (展開/收合容器)
├── InkDisclosureButton (觸發按鈕)
└── InkDisclosurePanel (內容區塊)
```

#### 使用說明
1. `InkDisclosure` 提供 `v-slot="{ open }"` 用於獲取當前的展開狀態
2. `defaultOpen` 屬性可以設定預設是否展開
3. `InkDisclosureButton` 預設包含展開/收合的箭頭圖標

#### 樣式
- 按鈕預設使用灰色主題 (`tw-disclosure-button-gray`)
- 箭頭圖標會根據展開狀態自動旋轉
- 支援 Tailwind CSS 的樣式類

### vInkTooltip

vInkTooltip 是基於 [floating-vue](https://floating-vue.starpad.dev/) 的指令封裝，提供簡易的提示訊息功能。

#### 基本用法
```vue
<span v-inkTooltip.right="'test'">test</span>
```

#### 功能說明
- 支援多種位置設定（如 .right、.left、.top、.bottom 等）
- 可自訂提示內容（支援字串或 HTML）
- 適用於任何需要提示說明的場景
- 更多詳細屬性與用法，請參考 [floating-vue 官方 API 文件](https://floating-vue.starpad.dev/api/)，以獲得完整的組件參數說明。

#### 注意事項
- 需安裝 floating-vue 及其樣式（已於組件內自動引入）
- 建議用於簡單的文字提示場景
- 如需更複雜的提示功能，請使用 InkVTooltip 組件

#### 組件關係
```
vInkTooltip (指令)
└── Tooltip (floating-vue)
```

### InkVTooltip

InkVTooltip 是基於 [floating-vue](https://floating-vue.starpad.dev/) 的 Tooltip 組件封裝，提供簡易的提示訊息功能，支援多種觸發方式（hover、focus、click）。

#### 基本用法
```vue
<InkVTooltip>
  <button type="button"><i class="fa-regular fa-circle-info"></i></button>
  <template #popper>
    {{ tipContent }}
  </template>
</InkVTooltip>
```

#### 禁用狀態
```vue
<InkVTooltip :disabled="Boolean(list.deletable)">
  <InkButton
    size="xs"
    variant="icon"
    theme="transparent"
    :disabled="!Boolean(list.deletable) || currentConsoleUserPermission.view"
    @click="handleDelete(list.id, list.article.title)"
  >
    <i class="far fa-trash"></i>
  </InkButton>
  <template #popper>
    {{ $t('enabledCannotDeleted') }}
  </template>
</InkVTooltip>
```

#### 屬性說明

| 屬性名稱   | 類型    | 預設值   | 說明                       |
|------------|---------|----------|----------------------------|
| `disabled` | Boolean | false    | 是否停用 Tooltip 顯示      |

- 更多詳細屬性與用法，請參考 [floating-vue 官方 API 文件](https://floating-vue.starpad.dev/api/)，以獲得完整的組件參數說明。

#### 插槽說明

| 插槽名稱   | 說明                       |
|------------|----------------------------|
| default    | 觸發 Tooltip 的內容         |
| popper     | Tooltip 彈出時顯示的內容   |

##### 功能說明
- 支援 hover、focus、click 觸發（預設同時啟用）
- 可自訂提示內容（支援 slot）
- 可透過 `disabled` 屬性停用提示
- 彈出位置預設為下方（bottom）

#### 組件關係
```
InkVTooltip
└── Tooltip (floating-vue)
    ├── slot (觸發內容)
    └── slot name="popper" (提示內容)
```

#### 注意事項
- 需安裝 floating-vue 及其樣式（已於組件內自動引入）
- 適用於任何需要提示說明的場景

### InkBadge

InkBadge 是一個輕量級的標籤組件，用於顯示狀態、分類或其他簡短資訊。

#### 基本用法
```vue
<InkBadge>string</InkBadge>
<InkBadge as="button">string</InkBadge>
```

#### 屬性說明

| 屬性名稱 | 類型 | 預設值 | 可選值 | 說明 |
|---------|------|--------|--------|------|
| `as` | string | 'span' | 'span' \| 'button' | 指定標籤渲染的標籤類型 |
| `type` | string | - | 'button' | 當 `as="button"` 時，指定按鈕的類型 |
| `theme` | string | 'info' | 'info' | 標籤主題樣式 |
| `disabled` | boolean | false | true \| false | 是否禁用標籤。當為 true 時，標籤會套用禁用樣式 |

#### 功能說明
- 支援作為 span 或 button 元素渲染
- 提供 info 主題樣式
- 支援禁用狀態
- 可透過插槽自定義內容

#### 樣式
- 預設使用 info 主題 (`tw-badge tw-badge-info`)
- 禁用狀態會套用 `tw-disabled` 樣式類
- 支援 Tailwind CSS 的樣式類

### InkSpinner

InkSpinner 是一個載入動畫組件，用於表示正在載入或處理中的狀態。

#### 基本用法
```vue
<InkSpinner/>
```

#### 屬性說明

| 屬性名稱 | 類型 | 預設值 | 可選值 | 說明 |
|---------|------|--------|--------|------|
| `size` | string | - | 'md' | 載入動畫的尺寸 |
| `theme` | string | 'gray' | 'gray' | 載入動畫的主題顏色 |

#### 功能說明
- 提供中等尺寸的載入動畫
- 支援灰色主題
- 適用於按鈕、頁面或組件的載入狀態

#### 樣式
- 預設使用 `tw-spinner-grow` 作為基礎樣式
- 支援 `tw-spinner-md` 尺寸樣式
- 支援 `tw-spinner-grow-gray` 主題樣式
- 支援 Tailwind CSS 的樣式類

#### 使用場景
- 按鈕載入狀態
- 頁面內容載入
- 表單提交處理
- 資料請求等待

## input 類元件使用說明

### 表單驗證方法

Inkmagine GUI 使用 [vee-validate](https://vee-validate.logaretm.com/v4/) 作為表單驗證框架，並透過 `useDefineRule` 提供自定義驗證規則。

#### Assign value to input
- 詳情請見 vee-validate 的 [useForm](https://vee-validate.logaretm.com/v4/api/use-form/)

```vue
const { handleSubmit, setValues, setFieldValue } = useForm();
// 取得 data 後 (多 input)
setValues( { key:value })
// 或是 (單 input)
setFieldValue('key', 'value')
```

#### 支援的驗證規則

| 規則名稱 | 說明 | 參數 |
|---------|------|------|
| `required` | 必填驗證 | 無 |
| `wordLimit` | 文字長度限制 | `[min, max]` |
| `itemLimit` | 項目數量限制 | `[min, max]` |
| `url` | URL 格式驗證 | 無 |
| `datetimeRestrict` | 日期時間限制 | `[restrict, timezone, format]` |
| `datetimerngStartLimit` | 日期範圍開始時間限制 | `[endValue, minLength, maxLength, timezone, format]` |
| `datetimerngEndLimit` | 日期範圍結束時間限制 | `[startValue, minLength, maxLength, timezone, format]` |


### InkField 動態欄位元件

InkField 是一個動態欄位元件，根據欄位類型自動渲染對應的輸入元件，並提供多項目輸入管理功能。

#### 基本用法
```vue
<InkField
  :field="{
    id: 'title',
    type: 'text',
    name: '標題',
    placeholder: '請輸入標題',
    limit: [10, 100],
    max: 3,
    description: '請輸入文章標題',
    tip: '標題將顯示在文章列表'
  }"
  :required="true"
  :disabled="false"
  :inputBind="{
    // 根據欄位類型提供對應的 inputBind
  }"
  :inputOn="{
    // 事件處理函數
  }"
  @inkChanged="handleChange"
/>
```

#### 屬性說明

| 屬性名稱 | 類型 | 必填 | 預設值 | 說明 |
|---------|------|------|--------|------|
| `field` | FieldDataSharp | 是 | - | 欄位設定物件，包含所有欄位相關設定 |
| `required` | boolean | 否 | undefined | 是否必填 |
| `disabled` | boolean | 否 | undefined | 是否禁用 |
| `inputBind` | Record<string, any> | 否 | undefined | 輸入元件綁定屬性 |
| `inputOn` | Record<string, any> | 否 | undefined | 事件處理函數 |

#### field 物件結構
```js
{
  id: 'fieldId',           // 欄位 ID（必填）
  type: 'text',            // 欄位類型（必填）
  name: '欄位名稱',        // 顯示名稱（可選）
  require: true,           // 是否必填（可選）
  slug: 'field-slug',      // 欄位 slug（可選）
  description: '說明文字',  // 欄位說明（可選）
  position: 'left',        // 位置：'left' | 'center' | 'right'（可選）
  tip: '提示文字',         // 提示說明（可選）
  placeholder: '佔位符',   // 輸入提示（可選）
  min: 1,                  // 最小數量（可選，0 為無限制）
  max: 5,                  // 最大數量（可選，0 為無限制）
  limit: [10, 100],        // 限制條件（可選）
  default: ['預設值'],     // 預設值（可選）
  ai: ['AI 提示'],         // AI 相關設定（可選）
  // 根據 type 不同，會有額外的特定屬性
}
```

- 物件詳細資訊參考 
https://github.com/tnlmedia/cabinet/blob/prod/resources/docs/internal/fields/type.md
https://github.com/tnlmedia/cabinet/blob/prod/resources/docs/internal/articles/structure.md

#### 支援的欄位類型

| 類型 | 對應元件 | 說明 |
|------|----------|------|
| `text` | InkText | 文字輸入 |
| `url` | InkUrl | URL 輸入 |
| `textarea` | InkTextarea | 多行文字輸入 |
| `select` | InkSelect | 下拉選單 |
| `checkbox` | InkCheckbox | 複選框 |
| `radio` | InkRadio | 單選框 |
| `switch` | InkSwitch | 開關 |
| `datetime` | InkDatetime | 日期時間選擇器 |
| `date` | InkDatetime | 日期選擇器 |
| `datetimerng` | InkDatetimerng | 日期時間範圍選擇器 |
| `daterng` | InkDatetimerng | 日期範圍選擇器 |
| `hashtag` | InkHashtag | 標籤輸入 |

#### 單一欄位類型
以下欄位類型預設為單一輸入，不支援多項目：
- `select`
- `checkbox`
- `radio`
- `switch`
- `datetime`
- `date`
- `datetimerng`
- `daterng`
- `hashtag`

#### 多項目欄位類型
以下欄位類型支援多項目輸入：
- `text`
- `url`
- `textarea`

#### 功能特色
- **動態元件渲染**：根據 `field.type` 自動選擇對應的輸入元件
- **多項目管理**：支援動態新增/刪除輸入項目
- **統一驗證**：整合 vee-validate 提供統一的表單驗證
- **靈活配置**：支援豐富的欄位配置選項
- **事件處理**：提供 `inkChanged` 事件處理值變更
- **響應式設計**：根據欄位類型自動調整佈局

#### 事件說明

| 事件名稱 | 參數 | 說明 |
|---------|------|------|
| `inkChanged` | `(value: any)` | 當欄位值發生變更時觸發 |

#### 使用範例

##### 多項目文字輸入
```vue
<InkField
  :field="{
    id: 'keywords',
    type: 'text',
    name: '關鍵字',
    placeholder: '請輸入關鍵字',
    max: 5,
    limit: [1, 20]
  }"
  :required="true"
/>
```

##### 單一選擇器
```vue
<InkField
  :field="{
    id: 'category',
    type: 'select',
    name: '分類',
    placeholder: '請選擇分類'
  }"
  :inputBind="{
    options: [
      { key: 1, name: '分類一' },
      { key: 2, name: '分類二' }
    ]
  }"
  :required="true"
/>
```

##### 日期時間選擇
```vue
<InkField
  :field="{
    id: 'publishTime',
    type: 'datetime',
    name: '發布時間',
    placeholder: '請選擇發布時間'
  }"
  :inputBind="{
    timezone: 'Asia/Taipei',
    format: 'YYYY/MM/DD HH:mm',
    restrict: {
      restrictType: 'FUTURE',
      shiftSecond: 0
    }
  }"
  :required="true"
/>
```

### InkField 與單獨使用元件的差異

Inkmagine GUI 提供了兩種使用 input 元件的方式：透過 InkField 動態欄位元件或直接使用個別元件。以下是兩種方式的詳細差異說明：

#### 使用 InkField 的優勢

**1. 統一的欄位管理**
```vue
<!-- 使用 InkField - 推薦方式 -->
<InkField
  :field="{
    id: 'title',
    type: 'text',
    name: '標題',
    placeholder: '請輸入標題',
    limit: [10, 100],
    max: 3,
    description: '請輸入文章標題'
  }"
  :required="true"
  :disabled="false"
  @inkChanged="handleChange"
/>
```

**2. 自動多項目管理**
- 自動處理多項目輸入的新增/刪除
- 自動管理 `valueIndex` 和 `inputTotal`
- 自動處理表單驗證陣列
- 自動顯示新增按鈕和刪除按鈕

**3. 內建的 InkFieldMessage 支援**

**4. 簡化的配置**
- 只需要設定 `field` 物件，自動選擇對應元件
- 統一的屬性介面，減少重複配置
- 自動處理元件間的依賴關係

**5. 更好的維護性**
- 欄位配置集中管理
- 統一的驗證規則
- 一致的錯誤處理

#### 直接使用個別元件的場景

**1. 需要高度自定義**
```vue
<!-- 直接使用 InkText -->
<InkText
  :field="{
    id: 'customTitle',
    type: 'text',
    placeholder: '自定義標題'
  }"
  :valueIndex="0"
  :inputTotal="1"
  :required="true"
  :disabled="false"
  @removeInputItemFn="handleRemove"
/>
```

**2. 複雜的互動邏輯**
- 需要自定義事件處理
- 需要特殊的驗證邏輯
- 需要與其他元件深度整合

**3. 效能考量**
- 只需要單一輸入元件
- 避免不必要的動態載入開銷

#### 動態新增/刪除輸入項目的差異

**使用 InkField（自動處理）：**
```vue
<InkField
  :field="{
    id: 'keywords',
    type: 'text',
    name: '關鍵字',
    max: 5  // 最多 5 個項目
  }"
/>
<!-- 自動顯示新增按鈕，當項目數量 < max 時 -->
<!-- 自動顯示刪除按鈕，當項目數量 > 1 時 -->
<!-- 自動管理 valueIndex 和 inputTotal -->
```

### InkFieldMessage

- InkFieldMessage 是 InkField 內建的欄位說明元件，用於顯示欄位的詳細說明文字。
- 可單獨使用

**基本用法：**
```vue
<InkFieldMessage :descriptionText="'請輸入有效的電子郵件地址'" />
```

**屬性說明：**
| 屬性名稱 | 類型 | 預設值 | 說明 |
|---------|------|--------|------|
| `descriptionText` | string | '' | 欄位說明文字，支援 HTML 格式 |

**功能特色：**
- 支援 HTML 格式的說明文字
- 自動換行和斷字處理
- 統一的樣式設計
- 與 InkField 完美整合

**使用場景：**
- 欄位使用說明
- 格式要求說明
- 注意事項提醒
- 範例文字展示

#### 選擇建議

| 使用場景 | 推薦方式 | 原因 |
|---------|----------|------|
| 表單欄位管理 | InkField | 統一的欄位管理，簡化配置 |
| 多項目輸入 | InkField | 自動處理多項目邏輯 |
| 動態表單 | InkField | 根據配置自動渲染元件 |
| 需要欄位說明 | InkField | 內建 InkFieldMessage 支援 |
| 單一輸入元件 | 直接使用對應的 input 元件 | 減少不必要的複雜度 |

### InkErrorMessage

InkErrorMessage 是用於顯示表單驗證錯誤訊息的元件，通常與其他 input 元件配合使用。

#### 基本用法
```vue
<InkErrorMessage v-if="errorMessage" :errorText="errorMessage" />
```

#### 屬性說明

| 屬性名稱 | 類型 | 必填 | 預設值 | 說明 |
|---------|------|------|--------|------|
| `errorText` | string | 否 | '' | 錯誤訊息文字 |

#### 功能特色
- 統一的錯誤訊息樣式
- 自動換行和斷字處理
- 支援條件渲染（通常與 `v-if` 配合使用）
- 與 vee-validate 完美整合

#### 使用場景
- 表單驗證錯誤顯示
- 必填欄位提示
- 格式錯誤提示
- 自定義錯誤訊息

#### 樣式說明
- 使用 `tw-error-message` 類別
- 預設為紅色錯誤文字樣式
- 支援自動換行（`tw-break-all`）
- 區塊級元素（`tw-block`）


### InkText

InkText 提供基本的文字輸入功能，支援驗證和字數限制。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkText
  :field="{
    id: 'title',
    type: 'text',
    placeholder: '請輸入標題',
    limit: [10, 100],
    prefix: '標題：',
    suffix: '字'
  }"
  :required="true"
  :disabled="false"
  @removeInputItemFn="handleRemove"
/>
```

#### 屬性說明

| 屬性名稱 | 類型 | 必填 | 預設值 | 說明 |
|---------|------|------|--------|------|
| `field` | TextSharp | 是 | - | 欄位設定物件 |
| `required` | boolean | 否 | false | 是否必填 |
| `disabled` | boolean | 否 | false | 是否禁用 |
| `valueIndex` | number | 否 | 0 | 值索引（多項目時使用） |
| `inputTotal` | number | 否 | 0 | 輸入項目總數 |
| `inputBind` | object | 否 | {} | 額外的輸入綁定屬性 |

#### field 物件結構（TextSharp）
- 請見 InkField 的 field 物件結構

#### 功能特色
- 支援單行文字輸入
- 支援字數限制驗證
- 支援前綴和後綴文字
- 支援多項目輸入（透過 InkField）
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證
- `wordLimit`: 字數限制驗證（使用 `field.limit` 設定）

### InkUrl

InkUrl 提供 URL 格式的輸入功能，自動驗證 URL 格式。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkUrl
  :field="{
    id: 'website',
    type: 'url',
    name: '網站網址',
    placeholder: '請輸入網站網址',
    prefix: 'https://'
  }"
  :required="true"
  :disabled="false"
  @removeInputItemFn="handleRemove"
/>
```

#### 屬性說明
- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'url'`

#### field 物件結構（UrlSharp）
- 請見 InkField 的 field 物件結構

#### 功能特色
- 支援 URL 格式輸入
- 自動驗證 URL 格式
- 支援多項目輸入（透過 InkField）
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證
- `url`: URL 格式驗證（必須以 http:// 或 https:// 開頭）

### InkTextarea

InkTextarea 提供多行文字輸入功能，支援字數統計和驗證。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkTextarea
  :field="{
    id: 'content',
    type: 'textarea',
    name: '內容',
    placeholder: '請輸入內容',
    limit: [10, 1000],
    description: '請詳細描述內容'
  }"
  :required="true"
  :disabled="false"
  @removeInputItemFn="handleRemove"
/>
```

#### 屬性說明
- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'textarea'`

#### field 物件結構（TextareaSharp）
- 請見 InkField 的 field 物件結構

#### 功能特色
- 支援多行文字輸入
- 自動顯示字數統計
- 支援字數限制驗證
- 預設 5 行高度
- 支援多項目輸入（透過 InkField）
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證
- `wordLimit`: 字數限制驗證（使用 `field.limit` 設定）

### InkSelect
- InkSelect 是基於 [Vue Select](https://vue-select.org/) 的組件封裝。
- InkSelect 提供下拉選單功能，支援搜尋、無限滾動和階層選項。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkSelect
  :field="{
    id: 'category',
    type: 'select',
    name: '分類',
    placeholder: '請選擇分類',
    options: [
      { key: 1, name: '分類一' },
      { key: 2, name: '分類二' }
    ],
    total: 2,
    choosable: [1],
    hierarchy: true
  }"
  :inputBind="{
    options: [
      { key: 1, name: '分類一', depth: 0 },
      { key: 2, name: '分類二', depth: 1 }
    ],
    label: 'name',
    valueKey: 'key',
    hasNextPage: false,
    infiniteFn: () => {},
    activeStyle: true
  }"
  :required="true"
  :disabled="false"
  :valueIndex="0"
  :inputTotal="1"
  @removeInputItemFn="handleRemove"
/>
```

#### 屬性說明
- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'select'`

#### field 物件結構（SelectSharp）
- 請見 InkField 的 field 物件結構

#### inputBind 物件結構（SelectInputBind）
```js
{
  options: [],              // 選項陣列
  label: 'name',            // 顯示標籤欄位(選項字串用的 key)
  hasNextPage: false,       // 是否有下一頁（可選）
  activeStyle: false,       // 是否啟用活躍樣式（可選），通常在 filter 功能時啟用
  optionDivider: [],        // 選項分隔線（可選），最多可填入[0,1,2]
  openFn: () => {},         // 開啟事件函數（可選），在 Vue Select 的 onOpen 觸發
  closeFn: () => {},        // 關閉事件函數（可選），在 Vue Select 的 onClose
  infiniteFn: () => {},     // 無限滾動函數（可選）
  reduce: (item) => item,   // 值轉換函數（可選），return selected 項目的資料範圍，Vue Select 的 props
  filterable: false,        // 是否可搜尋（可選），Vue Select 的 props
  autoscroll: false,        // 是否自動滾動（可選），Vue Select 的 props
  searchable: false,        // 是否可搜尋（可選），Vue Select 的 props
  selectable: (option) => !option.disabled  // 選擇條件函數（可選），讀取 option.disabled 的 值，Vue Select 的 props
}
```

#### options 物件結構（SelectOptions）
```js
{
  key: 'value',             // 選項值（必填），用於識別選項的唯一值
  name: '顯示名稱',         // 顯示名稱（必填），在選單中顯示的文字
  disabled: false,          // 是否禁用（可選），預設為 false
  depth: 0,                // 階層深度（可選），用於顯示階層結構，0 為最上層，每增加 1 代表下一層
  own: false,               // 是否為自有選項（可選），用於特殊標記
  status: true,             // 選項狀態（可選），預設為 true
  children: [],             // 子選項陣列（可選），用於階層結構
  total: 0,                 // 子選項總數（可選），用於顯示子項目數量
  [key: string]: unknown    // 其他自定義屬性（可選），可根據需求添加任意屬性
}
```
- `key` key 的使用需注意 inputBind.reduce
- `name` Key 與 inputBind.label 相同即可

**階層結構範例：**
```js
options: [
  {
    key: 1,
    name: '分類一',
    depth: 0,
    children: [
      {
        key: 11,
        name: '子分類一',
        depth: 1
      }
    ]
  },
  {
    key: 2,
    name: '分類二',
    depth: 0,
    disabled: true
  }
]
```

#### 功能特色
- 支援搜尋功能
- 支援無限滾動載入
- 支援階層選項（透過 depth 屬性）
- 支援自定義圖標
- 支援選項分隔線
- 支援選項禁用狀態
- 支援值轉換函數
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證

### InkCheckbox

InkCheckbox 提供複選框功能，支援多選和無限滾動。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkCheckbox
  :field="{
    id: 'tags',
    type: 'checkbox',
    name: '標籤',
    options: [
      { key: 1, name: '標籤一' },
      { key: 2, name: '標籤二' }
    ],
    total: 2,
    choosable: [1, 2],
    hierarchy: true
  }"
  :inputBind="{
    options: [
      { key: 1, name: '標籤一', depth: 0 },
      { key: 2, name: '標籤二', depth: 1, disabled: false }
    ],
    label: 'name',
    valueKey: 'key',
    hasNextPage: false,
    infiniteFn: () => {}
  }"
  :required="true"
  :disabled="false"
  :valueIndex="0"
  :inputTotal="1"
  @removeInputItemFn="handleRemove"
/>
```

#### 屬性說明
- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'checkbox'`

#### field 物件結構（CheckBoxSharp）
- 請見 InkField 的 field 物件結構

#### inputBind 物件結構（CheckBoxInputBind）
```js
{
  options: [],              // 選項陣列
  label: 'name',            // 顯示標籤欄位，選項字串使用的 key
  valueKey: 'key',          // 值欄位，選項 value 使用的 key
  hasNextPage: false,       // 是否有下一頁（可選）
  infiniteFn: () => {}      // 無限滾動函數（可選）
}
```

#### options 物件結構（CheckBoxOptions）
- 請見 InkSelect 的 options 物件結構
- `key` key 與 inputBind.valueKey 相同即可
- `name` Key 與 inputBind.label 相同即可

#### 功能特色
- 支援多選功能
- 支援無限滾動載入
- 支援階層選項（透過 depth 屬性）
- 支援禁用個別選項
- 支援自定義標籤和值欄位
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證

### InkRadio

InkRadio 提供單選框功能，支援無限滾動。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkRadio
  :field="{
    id: 'gender',
    type: 'radio',
    name: '性別',
    options: [
      { key: 'male', name: '男性' },
      { key: 'female', name: '女性' }
    ],
    total: 2
  }"
  :inputBind="{
    options: [
      { key: 'male', name: '男性' },
      { key: 'female', name: '女性', disabled: false }
    ],
    label: 'name',
    valueKey: 'key',
    hasNextPage: false,
    infiniteFn: () => {}
  }"
  :required="true"
  :disabled="false"
  :valueIndex="0"
  :inputTotal="1"
  @removeInputItemFn="handleRemove"
/>
```

#### 屬性說明

- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'radio'`

#### field 物件結構（RadioSharp）

- 請見 InkField 的 field 物件結構

#### inputBind 物件結構（RadioInputBind）

- 請見 InkCheckbox 的 inputBind 物件結構（CheckBoxInputBind）

#### options 物件結構（RadioOptions）

- 請見 InkCheckbox 的 options 物件結構
**注意：** Radio 選項不支援 `depth`、`children` 和 `total` 屬性，因為單選框不支援階層結構。

#### 功能特色
- 支援單選功能
- 支援無限滾動載入
- 支援禁用個別選項
- 支援自定義標籤和值欄位
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證

### InkSwitch

InkSwitch 提供開關切換功能。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkSwitch
  :field="{
    id: 'notification',
    type: 'switch',
    name: '通知設定',
    description: '是否啟用通知功能'
  }"
  :required="true"
  :disabled="false"
  @removeInputItemFn="handleRemove"
  @inkChanged="handleChange"
/>
```

#### 屬性說明
- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'switch'`

#### field 物件結構（SwitchSharp）
- 請見 InkField 的 field 物件結構

#### 功能特色
- 提供開關切換功能
- 支援 `inkChanged` 事件，當觸發 click 會觸發該事件
- 自動處理布林值轉換
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證

### InkElConfigProvider

InkElConfigProvider 為 [Element Plus](https://element-plus.org/en-US/) 提供的配置。

#### 基本用法
```vue
<InkElConfigProvider>
  <InkDatetime />
  <InkDatetimerng />
</InkElConfigProvider>
```

#### 功能說明
- 自動根據 Inkmagine GUI 的語言設定配置 Element Plus
- 支援 zh-tw、en-us、ja-jp 三種語言
- 用於 InkDatetime 和 InkDatetimerng 組件

### InkDatetime

InkDatetime 提供日期和時間選擇功能，基於 Element Plus 的 DatePicker。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkDatetime
  :field="{
    id: 'publishTime',
    type: 'datetime',
    name: '發布時間',
    placeholder: '請選擇發布時間',
    description: '選擇文章發布的時間'
  }"
  :inputBind="{
    type: 'datetime',
    format: 'YYYY/MM/DD HH:mm',
    timezone: 'Asia/Taipei',
    restrict: {
      restrictType: 'FUTURE',
      shiftSecond: 0
    },
    isClearable: true,
    popperClass: 'custom-popper'
  }"
  :required="true"
  :disabled="false"
  @removeInputItemFn="handleRemove"
  @inkChanged="handleChange"
/>
```

#### 屬性說明
- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'datetime'` | `'date'`

#### field 物件結構（DatetimeSharp）
- 請見 InkField 的 field 物件結構

#### inputBind 物件結構（DatetimePickerInputBind）
```js
{
  timezone: 'Asia/Taipei',  // 時區（必填）
  type: 'datetime',         // 類型：'year' | 'month' | 'date' | 'datetime' | 'week'（可選）與 field.type 同步
  format: 'YYYY/MM/DD HH:mm', // 顯示格式（可選）
  isClearable: true,       // 是否可清除（可選）
  restrict: {              // 時間限制（可選）
    restrictType: 'unlimited', // 'past' | 'future' | 'unlimited'，default is 'unlimited'
    shiftSecond: 0          // 時間偏移（秒）
  },
  clearable: false,         // 清除按鈕（可選）
  teleported: true         // 是否傳送到 body（可選）
}
```

#### 功能特色
- 支援 `inkChanged` 事件，當 useField value change 時觸發
- 支援日期和日期時間選擇
- 支援時區設定
- 支援時間限制（過去、未來、無限制）
- 支援清除功能
- 支援自定義格式
- 支援 "現在" 按鈕快速設定
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證
- `datetimeRestrict`: 日期時間限制驗證

### InkDatetimerng

InkDatetimerng 提供日期時間範圍選擇功能。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkDatetimerng
  :field="{
    id: 'publishRange',
    type: 'datetimerng',
    name: '發布時間範圍',
    limit: [1640995200, 1672531200],  // 最小和最大時間戳
    description: '選擇文章發布的時間範圍'
  }"
  :inputBind="{
    type: 'datetime',
    format: 'YYYY/MM/DD HH:mm',
    timezone: 'Asia/Taipei',
    isClearable: true,
    activeStyle: true,
    popperClass: 'custom-popper'
  }"
  :required="true"
  :disabled="false"
  @removeInputItemFn="handleRemove"
  @inkChanged="handleChange"
/>
```

#### 屬性說明

- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'datetimerng'` | `'daterng'`

#### field 物件結構（DatetimerngSharp）
- 請見 InkField 的 field 物件結構

#### inputBind 物件結構（DatetimerngInputBind）
```js
{
  timezone: 'Asia/Taipei',  // 時區（必填）
  type: 'datetime',         // 類型：'year' | 'month' | 'date' | 'datetime' | 'week'（可選），對應 field.type 預設是 'datetime'
  format: 'YYYY/MM/DD HH:mm', // 顯示格式（可選）
  isClearable: true,       // 是否可清除（可選）
  activeStyle: false,       // 是否啟用活躍樣式（可選）
  clearable: false,         // 清除按鈕（可選）
  teleported: true         // 是否傳送到 body（可選）
}
```

#### 功能特色
- 支援 `inkChanged` 事件，當 useField value change 時觸發
- 如果 `field.type` 為 `'daterng'`，結束時間會設定為當日的 23:59:59
- 支援日期範圍和日期時間範圍選擇
- 支援時區設定
- 支援時間範圍限制
- 支援清除功能
- 支援自定義格式
- 支援 "現在" 按鈕快速設定
- 自動處理開始時間和結束時間的關聯驗證
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證
- `datetimerngStartLimit`: 開始時間限制驗證
- `datetimerngEndLimit`: 結束時間限制驗證

### InkHashtag

- InkHashtag 是基於 [Vue Select](https://vue-select.org/) 的組件封裝。
- InkHashtag 提供標籤輸入功能，支援創建新標籤和選擇現有標籤。通常透過 InkField 元件使用。

#### 基本用法
```vue
<InkHashtag
  :field="{
    id: 'tags',
    type: 'hashtag',
    name: '標籤',
    placeholder: '請輸入標籤',
    limit: [1, 10],
    description: '請選擇或創建相關標籤'
  }"
  :inputBind="{
    options: [
      { key: 1, name: '標籤一' },
      { key: 2, name: '標籤二' }
    ],
    label: 'name',
    valueKey: 'key',
    activeStyle: true,
    noDrop: false,
    loading: false
  }"
  :required="true"
  :disabled="false"
  @removeInputItemFn="handleRemove"
/>
```

#### 屬性說明
- 請見 InkText 的 屬性說明
- 與 InkText 相同，但 `field.type` 必須為 `'hashtag'`

#### field 物件結構（HashtagSharp）
- 請見 InkField 的 field 物件結構

#### inputBind 物件結構（HashtagInputBind）
```js
{
  options: [],              // 現有標籤選項
  label: 'name',           // 顯示標籤欄位
  activeStyle: false,      // 是否啟用活躍樣式（可選）
  noDrop: false,          // 是否禁用拖拽（可選），Vue Select 的 props
  loading: false,         // 是否顯示載入狀態（可選），Vue Select 的 props
  clearable: true,         // 是否可清除（可選），Vue Select 的 props
  searchable: true,        // 是否可搜尋（可選），Vue Select 的 props
  filterable: false,       // 是否可篩選（可選），Vue Select 的 props
  autoscroll: false       // 是否自動滾動（可選），Vue Select 的 props
}
```

#### options 物件結構（HashtagOptions）
```js
- 請見 InkSelect 的 options 物件結構
**注意：** Hashtag 選項不支援 `disabled`、`depth`、`children` 和 `total` 屬性，因為標籤功能主要用於選擇和創建，不需要階層結構或禁用狀態。

#### 功能特色
- 支援創建新標籤
- 支援選擇現有標籤
- 支援多選功能
- 支援標籤數量限制
- 支援禁用狀態
- 支援自定義標籤格式
- 支援搜尋功能
- 支援載入狀態
- 整合 vee-validate 驗證

#### 驗證規則
- `required`: 必填驗證
- `itemLimit`: 標籤數量限制驗證（使用 `field.limit` 設定）

#### 使用場景
- 文章標籤
- 產品分類
- 用戶興趣標籤
- 搜尋關鍵字



