# Inkmagine GUI tool

Inkmagine unify components and styles

## 安裝需求
套件使用 Tailwind 作為樣式基礎，使用前請確保已安裝 Tailwind

## Install

```bash
npm install @tnlmedia/inkmagine-gui
```
- 如果遇到 peerDependencies 的套件版本過低可以使用忽略 peerDependencies 套件的安裝方式

```bash
npm install @tnlmedia/inkmagine-gui --legacy-peer-deps
```

## style example
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

<!-- example from example folder -->
## compoment example

| 全域名稱 | 範例 |
|---------|---------|
| inkmagineGui| [範例程式碼](./ink-example/inkmagineGui.md)|

| 容器名稱 | 範例 |
|---------|---------|
| InkNavbar |[範例程式碼](./ink-example/InkNavbar.md)|
| InkSidebar |[範例程式碼](./ink-example/InkSidebar.md)|

| 元件名稱 | 範例 |
|---------|---------|
| InkButton | [範例程式碼](./ink-example/InkButton.md) | 
| InkMenu | [範例程式碼](./ink-example/InkMenu.md) | 
| InkDisclosure | [範例程式碼](./ink-example/InkDisclosure.md) |
| v-inkTooltip | [範例程式碼](./ink-example/vInkTooltip.md) |
| InkVTooltip | [範例程式碼](./ink-example/InkVTooltip.md) |
| InkBadge | [範例程式碼](./ink-example/InkBadge.md) |
| InkSpinner | [範例程式碼](./ink-example/InkSpinner.md) |


| input 類元件名稱 | 依賴的第三方套件 |
|---------|---------|
| InkField | floating-vue |
| InkText ||
| InkUrl ||
| InkTextarea ||
| InkSelect | vue-select |
| InkCheckbox ||
| InkRadio ||
| InkSwitch ||
| InkElConfigProvider | element-plus |
| InkDatetime, InkDate | element-plus |
| InkDatetimerng, InkDaterng | element-plus |
| InkHashtag | vue-select |
| InkFieldMessage ||
| InkErrorMessage ||
- input 元件都有依賴 vee-validate
- 範例請見 cabinet 專案