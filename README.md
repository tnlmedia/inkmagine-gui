# Inkmagine GUI tool

Inkmagine unify components and styles

## 安裝需求
套件使用 Tailwind 作為樣式基礎，使用前請確保已安裝 Tailwind

## Install

```bash
npm install @tnlmedia/inkmagine-gui
```

## style example
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

<!-- example from example folder -->
## compoment example

| 元件名稱 | 範例 |
|---------|---------|
| InkButton | [範例程式碼](./ink-example/InkButton.md) | 
| InkMenu | [範例程式碼](./ink-example/InkMenu.md) | 
| InkDisclosure | [範例程式碼](./ink-example/InkDisclosure.md) |

