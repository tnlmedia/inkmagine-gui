import dayjs, { OpUnitType } from 'dayjs'

import utc from  'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;

// Format
export const formatUnixTime = (tz: string, time: number, format = 'YYYY-MM-DD HH:mm') => {
  return dayjs.unix(time).tz( tz ).format(format);
}
export const formatValueOfTime = (tz: string, time: number, format = 'YYYY-MM-DD HH:mm') => {
  return dayjs(time).tz( tz ).format(format);
}
// Timestamp
export const formatTimeToUnix = (time?: Date) => {
  // seconds
  return dayjs(time).unix();
}
export const formatTimeToValueOf = (time?: Date) => {
  // milliseconds
  return dayjs(time).valueOf();
}

// UTC
export const utcTimezone = (timezone: string) => { 
  return dayjs().tz(timezone).format('[UTC]Z');
}

// EndOf
export const convertUnixToEndOf = (time: number, unit:OpUnitType = 'day') => { 
  return dayjs.unix(time).endOf(unit).unix();
}

// StartOf
export const convertUnixToStartOf = (time: number, unit:OpUnitType = 'day') => { 
  return dayjs.unix(time).startOf(unit).unix();
}
export const convertValueOfToStartOf = (time: number, unit:OpUnitType = 'day') => { 
  return dayjs(time).startOf(unit).valueOf();
}