import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);

export const formatTimestamp = (time: dayjs.ConfigType) =>
  dayjs(time).calendar(null, {
    sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
    nextDay: 'MM/DD/YYYY h:mm A', // The next day ( 10/17/2011 2:30 AM )
    nextWeek: 'MM/DD/YYYY h:mm A', // The next week ( 10/17/2011 2:30 AM )
    lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
    lastWeek: 'MM/DD/YYYY h:mm A', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'MM/DD/YYYY h:mm A' // Everything else ( 10/17/2011 2:30 AM )
  });
