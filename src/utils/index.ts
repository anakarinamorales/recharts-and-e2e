import { formatInTimeZone } from "date-fns-tz/formatInTimeZone";

export function noop() { }

export function getTzDate(date: Date) {
    const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzDate = formatInTimeZone(date, clientTimezone, 'yyyy-MM-dd HH:mm:ss');
    
    return tzDate;
}
