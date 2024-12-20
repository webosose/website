"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MonthView;
var jsx_runtime_1 = require("react/jsx-runtime");
var clsx_1 = __importDefault(require("clsx"));
var Days_js_1 = __importDefault(require("./MonthView/Days.js"));
var Weekdays_js_1 = __importDefault(require("./MonthView/Weekdays.js"));
var WeekNumbers_js_1 = __importDefault(require("./MonthView/WeekNumbers.js"));
var const_js_1 = require("./shared/const.js");
function getCalendarTypeFromLocale(locale) {
    if (locale) {
        for (var _i = 0, _a = Object.entries(const_js_1.CALENDAR_TYPE_LOCALES); _i < _a.length; _i++) {
            var _b = _a[_i], calendarType = _b[0], locales = _b[1];
            if (locales.includes(locale)) {
                return calendarType;
            }
        }
    }
    return const_js_1.CALENDAR_TYPES.ISO_8601;
}
/**
 * Displays a given month.
 */
function MonthView(props) {
    var activeStartDate = props.activeStartDate, locale = props.locale, onMouseLeave = props.onMouseLeave, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks;
    var _a = props.calendarType, calendarType = _a === void 0 ? getCalendarTypeFromLocale(locale) : _a, formatShortWeekday = props.formatShortWeekday, formatWeekday = props.formatWeekday, onClickWeekNumber = props.onClickWeekNumber, showWeekNumbers = props.showWeekNumbers, childProps = __rest(props, ["calendarType", "formatShortWeekday", "formatWeekday", "onClickWeekNumber", "showWeekNumbers"]);
    function renderWeekdays() {
        return ((0, jsx_runtime_1.jsx)(Weekdays_js_1.default, { calendarType: calendarType, formatShortWeekday: formatShortWeekday, formatWeekday: formatWeekday, locale: locale, onMouseLeave: onMouseLeave }));
    }
    function renderWeekNumbers() {
        if (!showWeekNumbers) {
            return null;
        }
        return ((0, jsx_runtime_1.jsx)(WeekNumbers_js_1.default, { activeStartDate: activeStartDate, calendarType: calendarType, onClickWeekNumber: onClickWeekNumber, onMouseLeave: onMouseLeave, showFixedNumberOfWeeks: showFixedNumberOfWeeks }));
    }
    function renderDays() {
        return (0, jsx_runtime_1.jsx)(Days_js_1.default, __assign({ calendarType: calendarType }, childProps));
    }
    var className = 'react-calendar__month-view';
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)(className, showWeekNumbers ? "".concat(className, "--weekNumbers") : ''), children: (0, jsx_runtime_1.jsxs)("div", { style: {
                display: 'flex',
                alignItems: 'flex-end',
            }, children: [renderWeekNumbers(), (0, jsx_runtime_1.jsxs)("div", { style: {
                        flexGrow: 1,
                        width: '100%',
                    }, children: [renderWeekdays(), renderDays()] })] }) }));
}
