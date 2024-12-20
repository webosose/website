import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import clsx from 'clsx';
export default function Tile(props) {
    var activeStartDate = props.activeStartDate, children = props.children, classes = props.classes, date = props.date, formatAbbr = props.formatAbbr, locale = props.locale, maxDate = props.maxDate, maxDateTransform = props.maxDateTransform, minDate = props.minDate, minDateTransform = props.minDateTransform, onClick = props.onClick, onMouseOver = props.onMouseOver, style = props.style, tileClassNameProps = props.tileClassName, tileContentProps = props.tileContent, tileDisabled = props.tileDisabled, view = props.view;
    var tileClassName = useMemo(function () {
        var args = { activeStartDate: activeStartDate, date: date, view: view };
        return typeof tileClassNameProps === 'function' ? tileClassNameProps(args) : tileClassNameProps;
    }, [activeStartDate, date, tileClassNameProps, view]);
    var tileContent = useMemo(function () {
        var args = { activeStartDate: activeStartDate, date: date, view: view };
        return typeof tileContentProps === 'function' ? tileContentProps(args) : tileContentProps;
    }, [activeStartDate, date, tileContentProps, view]);
    return (_jsxs("button", { className: clsx(classes, tileClassName), disabled: (minDate && minDateTransform(minDate) > date) ||
            (maxDate && maxDateTransform(maxDate) < date) ||
            (tileDisabled === null || tileDisabled === void 0 ? void 0 : tileDisabled({ activeStartDate: activeStartDate, date: date, view: view })), onClick: onClick ? function (event) { return onClick(date, event); } : undefined, onFocus: onMouseOver ? function () { return onMouseOver(date); } : undefined, onMouseOver: onMouseOver ? function () { return onMouseOver(date); } : undefined, style: style, type: "button", children: [formatAbbr ? _jsx("abbr", { "aria-label": formatAbbr(locale, date), children: children }) : children, tileContent] }));
}
