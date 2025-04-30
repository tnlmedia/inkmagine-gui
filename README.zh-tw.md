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
  :currentMainSwitchItem="newcurrentConsole" 
  :mainSwitchItems="user.permission.map((item:Permission) => item.console)"
  @mainItemCheckSwitch="checkSwitchEnv"
  :menu="menu"
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
| `currentTabSwitchItemId` | string \| number | 否 | 當前選中的標籤切換項目 ID |
| `tabSwitchItems` | array | 否 | 標籤切換項目列表，每個項目包含與 `currentMainSwitchItem` 相同的屬性 |
| `menu` | array | 是 | 選單項目列表，每個項目包含以下屬性：<br>- `id`: 項目 ID<br>- `name`: 項目名稱<br>- `icon`: 圖標類名<br>- `route`: 路由資訊（可選）<br>- `children`: 子選單項目（可選）<br>- `isAllow`: 是否允許訪問（可選） |

#### 事件說明

| 事件名稱 | 參數 | 說明 |
|---------|------|------|
| `mainItemCheckSwitch` | `(item: SwitchItem, close: () => void)` | 當主要切換項目被點擊時觸發 |
| `tabItemCheckSwitch` | `(item: SwitchItem)` | 當標籤切換項目被點擊時觸發 |

#### 功能說明
- 側邊欄可折疊/展開
- 支援品牌切換功能
- 支援多層級選單結構
- 支援路由導航
- 支援權限控制
- 支援自定義內容（通過插槽）

#### 注意事項
- 選單項目的 `isAllow` 屬性用於控制項目的顯示權限
- 子選單項目的路由資訊必須包含 `name` 屬性
- 側邊欄的折疊狀態會保存在 body 的 class 中

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

### InkButton 按鈕組件

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
| `size` | string | - | 'md' \| 'xs' | 按鈕尺寸。'md' 為中等尺寸(32px)，'xs' 為小尺寸(24px)，不指定則為預設尺寸(36px) |
| `variant` | string | 'base' | 'base' \| 'txt' \| 'icon' | 按鈕變體。'base' 為基礎按鈕，'txt' 為文字按鈕，'icon' 為圖標按鈕 |
| `theme` | string | 'transparent' | 'primary' \| 'info' \| 'gray' \| 'outline-gray' \| 'link' \| 'transparent' | 按鈕主題樣式 |
| `disabled` | boolean | false | true \| false | 是否禁用按鈕。當為 true 時，按鈕無法點擊且會套用禁用樣式 |
| `loading` | boolean | false | true \| false | 是否顯示載入狀態。當為 true 時，會顯示載入動畫並隱藏按鈕內容 |

### InkMenu 選單組件

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

### InkDisclosure 展開/收合組件

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