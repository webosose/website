import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { getYear, getMonth, getMonthStart } from '@wojtekmaj/date-utils';
import Flex from '../Flex.js';
import { getDayOfWeek, isCurrentDayOfWeek, isWeekend } from '../shared/dates.js';
import { formatShortWeekday as defaultFormatShortWeekday, formatWeekday as defaultFormatWeekday, } from '../shared/dateFormatter.js';
var className = 'react-calendar__month-view__weekdays';
var weekdayClassName = "".concat(className, "__weekday");
export default function Weekdays(props) {
    var calendarType = props.calendarType, _a = props.formatShortWeekday, formatShortWeekday = _a === void 0 ? defaultFormatShortWeekday : _a, _b = props.formatWeekday, formatWeekday = _b === void 0 ? defaultFormatWeekday : _b, locale = props.locale, onMouseLeave = props.onMouseLeave;
    var anyDate = new Date();
    var beginOfMonth = getMonthStart(anyDate);
    var year = getYear(beginOfMonth);
    var monthIndex = getMonth(beginOfMonth);
    var weekdays = [];
    for (var weekday = 1; weekday <= 7; weekday += 1) {
        var weekdayDate = new Date(year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType));
        var abbr = formatWeekday(locale, weekdayDate);
        weekdays.push(_jsx("div", { className: clsx(weekdayClassName, isCurrentDayOfWeek(weekdayDate) && "".concat(weekdayClassName, "--current"), isWeekend(weekdayDate, calendarType) && "".concat(weekdayClassName, "--weekend")), children: _jsx("abbr", { "aria-label": abbr, title: abbr, children: formatShortWeekday(locale, weekdayDate).replace('.', '') }) }, weekday));
    }
    return (_jsx(Flex, { className: className, count: 7, onFocus: onMouseLeave, onMouseOver: onMouseLeave, children: weekdays }));
}
