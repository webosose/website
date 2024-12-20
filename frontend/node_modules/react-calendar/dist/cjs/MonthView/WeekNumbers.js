"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WeekNumbers;
var jsx_runtime_1 = require("react/jsx-runtime");
var date_utils_1 = require("@wojtekmaj/date-utils");
var WeekNumber_js_1 = __importDefault(require("./WeekNumber.js"));
var Flex_js_1 = __importDefault(require("../Flex.js"));
var dates_js_1 = require("../shared/dates.js");
function WeekNumbers(props) {
    var activeStartDate = props.activeStartDate, calendarType = props.calendarType, onClickWeekNumber = props.onClickWeekNumber, onMouseLeave = props.onMouseLeave, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks;
    var numberOfWeeks = (function () {
        if (showFixedNumberOfWeeks) {
            return 6;
        }
        var numberOfDays = (0, date_utils_1.getDaysInMonth)(activeStartDate);
        var startWeekday = (0, dates_js_1.getDayOfWeek)(activeStartDate, calendarType);
        var days = numberOfDays - (7 - startWeekday);
        return 1 + Math.ceil(days / 7);
    })();
    var dates = (function () {
        var year = (0, date_utils_1.getYear)(activeStartDate);
        var monthIndex = (0, date_utils_1.getMonth)(activeStartDate);
        var day = (0, date_utils_1.getDate)(activeStartDate);
        var result = [];
        for (var index = 0; index < numberOfWeeks; index += 1) {
            result.push((0, dates_js_1.getBeginOfWeek)(new Date(year, monthIndex, day + index * 7), calendarType));
        }
        return result;
    })();
    var weekNumbers = dates.map(function (date) { return (0, dates_js_1.getWeekNumber)(date, calendarType); });
    return ((0, jsx_runtime_1.jsx)(Flex_js_1.default, { className: "react-calendar__month-view__weekNumbers", count: numberOfWeeks, direction: "column", onFocus: onMouseLeave, onMouseOver: onMouseLeave, style: { flexBasis: 'calc(100% * (1 / 8)', flexShrink: 0 }, children: weekNumbers.map(function (weekNumber, weekIndex) {
            var date = dates[weekIndex];
            if (!date) {
                throw new Error('date is not defined');
            }
            return ((0, jsx_runtime_1.jsx)(WeekNumber_js_1.default, { date: date, onClickWeekNumber: onClickWeekNumber, weekNumber: weekNumber }, weekNumber));
        }) }));
}
