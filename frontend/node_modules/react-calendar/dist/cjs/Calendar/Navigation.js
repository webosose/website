"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navigation;
var jsx_runtime_1 = require("react/jsx-runtime");
var get_user_locale_1 = require("get-user-locale");
var dates_js_1 = require("../shared/dates.js");
var dateFormatter_js_1 = require("../shared/dateFormatter.js");
var className = 'react-calendar__navigation';
function Navigation(_a) {
    var activeStartDate = _a.activeStartDate, drillUp = _a.drillUp, _b = _a.formatMonthYear, formatMonthYear = _b === void 0 ? dateFormatter_js_1.formatMonthYear : _b, _c = _a.formatYear, formatYear = _c === void 0 ? dateFormatter_js_1.formatYear : _c, locale = _a.locale, maxDate = _a.maxDate, minDate = _a.minDate, _d = _a.navigationAriaLabel, navigationAriaLabel = _d === void 0 ? '' : _d, navigationAriaLive = _a.navigationAriaLive, navigationLabel = _a.navigationLabel, _e = _a.next2AriaLabel, next2AriaLabel = _e === void 0 ? '' : _e, _f = _a.next2Label, next2Label = _f === void 0 ? '»' : _f, _g = _a.nextAriaLabel, nextAriaLabel = _g === void 0 ? '' : _g, _h = _a.nextLabel, nextLabel = _h === void 0 ? '›' : _h, _j = _a.prev2AriaLabel, prev2AriaLabel = _j === void 0 ? '' : _j, _k = _a.prev2Label, prev2Label = _k === void 0 ? '«' : _k, _l = _a.prevAriaLabel, prevAriaLabel = _l === void 0 ? '' : _l, _m = _a.prevLabel, prevLabel = _m === void 0 ? '‹' : _m, setActiveStartDate = _a.setActiveStartDate, showDoubleView = _a.showDoubleView, view = _a.view, views = _a.views;
    var drillUpAvailable = views.indexOf(view) > 0;
    var shouldShowPrevNext2Buttons = view !== 'century';
    var previousActiveStartDate = (0, dates_js_1.getBeginPrevious)(view, activeStartDate);
    var previousActiveStartDate2 = shouldShowPrevNext2Buttons
        ? (0, dates_js_1.getBeginPrevious2)(view, activeStartDate)
        : undefined;
    var nextActiveStartDate = (0, dates_js_1.getBeginNext)(view, activeStartDate);
    var nextActiveStartDate2 = shouldShowPrevNext2Buttons
        ? (0, dates_js_1.getBeginNext2)(view, activeStartDate)
        : undefined;
    var prevButtonDisabled = (function () {
        if (previousActiveStartDate.getFullYear() < 0) {
            return true;
        }
        var previousActiveEndDate = (0, dates_js_1.getEndPrevious)(view, activeStartDate);
        return minDate && minDate >= previousActiveEndDate;
    })();
    var prev2ButtonDisabled = shouldShowPrevNext2Buttons &&
        (function () {
            if (previousActiveStartDate2.getFullYear() < 0) {
                return true;
            }
            var previousActiveEndDate = (0, dates_js_1.getEndPrevious2)(view, activeStartDate);
            return minDate && minDate >= previousActiveEndDate;
        })();
    var nextButtonDisabled = maxDate && maxDate < nextActiveStartDate;
    var next2ButtonDisabled = shouldShowPrevNext2Buttons && maxDate && maxDate < nextActiveStartDate2;
    function onClickPrevious() {
        setActiveStartDate(previousActiveStartDate, 'prev');
    }
    function onClickPrevious2() {
        setActiveStartDate(previousActiveStartDate2, 'prev2');
    }
    function onClickNext() {
        setActiveStartDate(nextActiveStartDate, 'next');
    }
    function onClickNext2() {
        setActiveStartDate(nextActiveStartDate2, 'next2');
    }
    function renderLabel(date) {
        var label = (function () {
            switch (view) {
                case 'century':
                    return (0, dates_js_1.getCenturyLabel)(locale, formatYear, date);
                case 'decade':
                    return (0, dates_js_1.getDecadeLabel)(locale, formatYear, date);
                case 'year':
                    return formatYear(locale, date);
                case 'month':
                    return formatMonthYear(locale, date);
                default:
                    throw new Error("Invalid view: ".concat(view, "."));
            }
        })();
        return navigationLabel
            ? navigationLabel({
                date: date,
                label: label,
                locale: locale || (0, get_user_locale_1.getUserLocale)() || undefined,
                view: view,
            })
            : label;
    }
    function renderButton() {
        var labelClassName = "".concat(className, "__label");
        return ((0, jsx_runtime_1.jsxs)("button", { "aria-label": navigationAriaLabel, "aria-live": navigationAriaLive, className: labelClassName, disabled: !drillUpAvailable, onClick: drillUp, style: { flexGrow: 1 }, type: "button", children: [(0, jsx_runtime_1.jsx)("span", { className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--from"), children: renderLabel(activeStartDate) }), showDoubleView ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "".concat(labelClassName, "__divider"), children: " \u2013 " }), (0, jsx_runtime_1.jsx)("span", { className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--to"), children: renderLabel(nextActiveStartDate) })] })) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, children: [prev2Label !== null && shouldShowPrevNext2Buttons ? ((0, jsx_runtime_1.jsx)("button", { "aria-label": prev2AriaLabel, className: "".concat(className, "__arrow ").concat(className, "__prev2-button"), disabled: prev2ButtonDisabled, onClick: onClickPrevious2, type: "button", children: prev2Label })) : null, prevLabel !== null && ((0, jsx_runtime_1.jsx)("button", { "aria-label": prevAriaLabel, className: "".concat(className, "__arrow ").concat(className, "__prev-button"), disabled: prevButtonDisabled, onClick: onClickPrevious, type: "button", children: prevLabel })), renderButton(), nextLabel !== null && ((0, jsx_runtime_1.jsx)("button", { "aria-label": nextAriaLabel, className: "".concat(className, "__arrow ").concat(className, "__next-button"), disabled: nextButtonDisabled, onClick: onClickNext, type: "button", children: nextLabel })), next2Label !== null && shouldShowPrevNext2Buttons ? ((0, jsx_runtime_1.jsx)("button", { "aria-label": next2AriaLabel, className: "".concat(className, "__arrow ").concat(className, "__next2-button"), disabled: next2ButtonDisabled, onClick: onClickNext2, type: "button", children: next2Label })) : null] }));
}
