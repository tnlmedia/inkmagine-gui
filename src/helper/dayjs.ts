import dayjs from 'dayjs'

import utc from  'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;

export const formatUnixTime = (tz: string, time: number, format = 'YYYY-MM-DD HH:mm') => {
  return dayjs.unix(time).tz( tz ).format(format);
}
export const formatTimeToUnix = (tz: string, time: string) => {
  return dayjs(time).tz( tz ).unix();
}
export const utcTimezone = (timezone: string) => { 
  return dayjs().tz(timezone).format('[UTC]Z');
}
export const convertTimstampToEndDay = (time: number, timezone: string) => { 
  return dayjs.unix(time).tz(timezone).endOf('day').unix();
}