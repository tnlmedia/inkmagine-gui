import { createI18n } from 'vue-i18n'
import zh from '@/lang/zh-tw.json'
import en from '@/lang/en-us.json'
import jp from '@/lang/ja-jp.json'
export const inkI18n = createI18n({
  locale: 'en-us',
  fallbackLocale: 'en-us',
  legacy: false,
  messages: {
    'zh-tw': zh,
    'en-us': en,
    'ja-jp': jp,
  }
})

export const { t } = inkI18n.global