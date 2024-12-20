"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Weekdays;
var jsx_runtime_1 = require("react/jsx-runtime");
var clsx_1 = __importDefault(require("clsx"));
var date_utils_1 = require("@wojtekmaj/date-utils");
var Flex_js_1 = __importDefault(require("../Flex.js"));
var dates_js_1 = require("../shared/dates.js");
var dateFormatter_js_1 = require("../shared/dateFormatter.js");
var className = 'react-calendar__month-view__weekdays';
var weekdayClassName = "".concat(className, "__weekday");
function Weekdays(props) {
    var calendarType = props.calendarType, _a = props.formatShortWeekday, formatShortWeekday = _a === void 0 ? dateFormatter_js_1.formatShortWeekday : _a, _b = props.formatWeekday, formatWeekday = _b === void 0 ? dateFormatter_js_1.formatWeekday : _b, locale = props.locale, onMouseLeave = props.onMouseLeave;
    var anyDate = new Date();
    var beginOfMonth = (0, date_utils_1.getMonthStart)(anyDate);
    var year = (0, date_utils_1.getYear)(beginOfMonth);
    var monthIndex = (0, date_utils_1.getMonth)(beginOfMonth);
    var weekdays = [];
    for (var weekday = 1; weekday <= 7; weekday += 1) {
        var weekdayDate = new Date(year, monthIndex, weekday - (0, dates_js_1.getDayOfWeek)(beginOfMonth, calendarType));
        var abbr = formatWeekday(locale, weekdayDate);
        weekdays.push((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)(weekdayClassName, (0, dates_js_1.isCurrentDayOfWeek)(weekdayDate) && "".concat(weekdayClassName, "--current"), (0, dates_js_1.isWeekend)(weekdayDate, calendarType) && "".concat(weekdayClassName, "--weekend")), children: (0, jsx_runtime_1.jsx)("abbr", { "aria-label": abbr, title: abbr, children: formatShortWeekday(locale, weekdayDate).replace('.', '') }) }, weekday));
    }
    return ((0, jsx_runtime_1.jsx)(Flex_js_1.default, { className: className, count: 7, onFocus: onMouseLeave, onMouseOver: onMouseLeave, children: weekdays }));
}
