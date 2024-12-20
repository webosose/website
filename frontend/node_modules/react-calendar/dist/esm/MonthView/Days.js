var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { getYear, getMonth, getDaysInMonth, getDayStart } from '@wojtekmaj/date-utils';
import TileGroup from '../TileGroup.js';
import Day from './Day.js';
import { getDayOfWeek } from '../shared/dates.js';
export default function Days(props) {
    var activeStartDate = props.activeStartDate, calendarType = props.calendarType, hover = props.hover, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks, showNeighboringMonth = props.showNeighboringMonth, value = props.value, valueType = props.valueType, otherProps = __rest(props, ["activeStartDate", "calendarType", "hover", "showFixedNumberOfWeeks", "showNeighboringMonth", "value", "valueType"]);
    var year = getYear(activeStartDate);
    var monthIndex = getMonth(activeStartDate);
    var hasFixedNumberOfWeeks = showFixedNumberOfWeeks || showNeighboringMonth;
    var dayOfWeek = getDayOfWeek(activeStartDate, calendarType);
    var offset = hasFixedNumberOfWeeks ? 0 : dayOfWeek;
    /**
     * Defines on which day of the month the grid shall start. If we simply show current
     * month, we obviously start on day one, but if showNeighboringMonth is set to
     * true, we need to find the beginning of the week the first day of the month is in.
     */
    var start = (hasFixedNumberOfWeeks ? -dayOfWeek : 0) + 1;
    /**
     * Defines on which day of the month the grid shall end. If we simply show current
     * month, we need to stop on the last day of the month, but if showNeighboringMonth
     * is set to true, we need to find the end of the week the last day of the month is in.
     */
    var end = (function () {
        if (showFixedNumberOfWeeks) {
            // Always show 6 weeks
            return start + 6 * 7 - 1;
        }
        var daysInMonth = getDaysInMonth(activeStartDate);
        if (showNeighboringMonth) {
            var activeEndDate = new Date();
            activeEndDate.setFullYear(year, monthIndex, daysInMonth);
            activeEndDate.setHours(0, 0, 0, 0);
            var daysUntilEndOfTheWeek = 7 - getDayOfWeek(activeEndDate, calendarType) - 1;
            return daysInMonth + daysUntilEndOfTheWeek;
        }
        return daysInMonth;
    })();
    return (_jsx(TileGroup, { className: "react-calendar__month-view__days", count: 7, dateTransform: function (day) {
            var date = new Date();
            date.setFullYear(year, monthIndex, day);
            return getDayStart(date);
        }, dateType: "day", hover: hover, end: end, renderTile: function (_a) {
            var date = _a.date, otherTileProps = __rest(_a, ["date"]);
            return (_jsx(Day, __assign({}, otherProps, otherTileProps, { activeStartDate: activeStartDate, calendarType: calendarType, currentMonthIndex: monthIndex, date: date }), date.getTime()));
        }, offset: offset, start: start, value: value, valueType: valueType }));
}
