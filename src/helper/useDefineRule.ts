import { defineRule } from 'vee-validate';
import { t } from '@/helper/i18n';
import type { NumberLimit, FileLimit } from '@/components/input/field-data-interface';

export default () => {
  // from sandwich
  defineRule('required', (value: any) => {
    if (typeof value === 'number') return true;
    if (typeof value === 'string' && value.trim() !== '') return true; // string is not empty
    if (Array.isArray(value) && value[0]) return true; // array is not empty
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) return true; // object is not empty, if object is for empty object, change value to undefined || null
    return t('required');
  });

  // defineRule('matchRatio', (value: any, [valueWidth, valueHeight, reqWidth, reqHeight]: [number, number, number, number]) => {
  //   if(!value) return true; // 如果沒有值，則不進行檢查，交由required檢查
  //   if (typeof reqWidth === 'undefined') return true;
  //   // 計算實際比例和要求比例
  //   const actualRatio = valueWidth / valueHeight;
  //   const requiredRatio = reqWidth / reqHeight;
    
  //   // 計算基於3px誤差的可接受比例範圍
  //   const tolerance = 3 / valueHeight; // 將3px轉換為比例誤差
    
  //   // 檢查實際比例是否在可接受範圍內
  //   if (Math.abs(actualRatio - requiredRatio) > tolerance) {
  //     return t('notMatchRatio');
  //   }
  //   return true;
  // });

  // defineRule('slug', (value: string) => { 
  //   if (!value) return true;
  //   const pattern = /^[a-z0-9\.\-\_]+$/;
  //   if (!pattern.test(value)) return t('isSlug');
  //   return true;
  // })

  // form cabinet
  defineRule('wordLimit', (value: string, [min, max]: [number, number]) => {
    if (typeof value === 'undefined') return true; // for removed item data

    min = min === 0 ? -Infinity : min;
    max = max === 0 ? Infinity : max;

    const length = value ? value.trim().length : 0;
    if (length < min) {
      return t('isLessThenTextLimit', {length: min});
    }
    if (length > max) {
      return t('isMoreThenTextLimit', {length: max});
    }
    return true;
  });
  // defineRule('numberLimit', (value: number, [min, max]: NumberLimit) => {
  //   if (typeof value === 'undefined') return true; // for removed item data

  //   min = min === false ? -Infinity : min;
  //   max = max === false ? Infinity : max;

  //   if (value < min) {
  //     return t('isLessThenNumberLimit', {length: min});
  //   }
  //   if (value > max) {
  //     return t('isMoreThenNumberLimit', {length: max});
  //   }
  //   return true;
  // });
  defineRule('url', (value: string) => {
    if (typeof value === 'undefined') return true; // for removed item data
    const pattern = /^https?:\/\//;
    return !value || pattern.test(value) ? true : t('isUrl');
  });
  // defineRule('email', (value: string) => {
  //   if (typeof value === 'undefined') return true; // for removed item data
  //   const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return !value || pattern.test(value) ? true : t('isEmail');
  // });
  // defineRule('json', (value: string) => {
  //   if (typeof value === 'undefined') return true; // for removed item data
  //   try {
  //     JSON.parse(value || '{}');
  //     return true;
  //   } catch (error) {
  //     return t('isJson');
  //   }
  // });
  // defineRule('maxItem', (value: any[], [max]: [number]) => {
  //   if (typeof value === 'undefined') return true; // for removed item data
  //   if (value?.length > max) {
  //     return t('isMoreThenMax', {length: max});
  //   }
  //   return true;
  // });
}
