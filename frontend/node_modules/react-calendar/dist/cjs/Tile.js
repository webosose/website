"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tile;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var clsx_1 = __importDefault(require("clsx"));
function Tile(props) {
    var activeStartDate = props.activeStartDate, children = props.children, classes = props.classes, date = props.date, formatAbbr = props.formatAbbr, locale = props.locale, maxDate = props.maxDate, maxDateTransform = props.maxDateTransform, minDate = props.minDate, minDateTransform = props.minDateTransform, onClick = props.onClick, onMouseOver = props.onMouseOver, style = props.style, tileClassNameProps = props.tileClassName, tileContentProps = props.tileContent, tileDisabled = props.tileDisabled, view = props.view;
    var tileClassName = (0, react_1.useMemo)(function () {
        var args = { activeStartDate: activeStartDate, date: date, view: view };
        return typeof tileClassNameProps === 'function' ? tileClassNameProps(args) : tileClassNameProps;
    }, [activeStartDate, date, tileClassNameProps, view]);
    var tileContent = (0, react_1.useMemo)(function () {
        var args = { activeStartDate: activeStartDate, date: date, view: view };
        return typeof tileContentProps === 'function' ? tileContentProps(args) : tileContentProps;
    }, [activeStartDate, date, tileContentProps, view]);
    return ((0, jsx_runtime_1.jsxs)("button", { className: (0, clsx_1.default)(classes, tileClassName), disabled: (minDate && minDateTransform(minDate) > date) ||
            (maxDate && maxDateTransform(maxDate) < date) ||
            (tileDisabled === null || tileDisabled === void 0 ? void 0 : tileDisabled({ activeStartDate: activeStartDate, date: date, view: view })), onClick: onClick ? function (event) { return onClick(date, event); } : undefined, onFocus: onMouseOver ? function () { return onMouseOver(date); } : undefined, onMouseOver: onMouseOver ? function () { return onMouseOver(date); } : undefined, style: style, type: "button", children: [formatAbbr ? (0, jsx_runtime_1.jsx)("abbr", { "aria-label": formatAbbr(locale, date), children: children }) : children, tileContent] }));
}
