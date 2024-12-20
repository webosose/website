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
import { jsx as _jsx } from "react/jsx-runtime";
import Months from './YearView/Months.js';
/**
 * Displays a given year.
 */
export default function YearView(props) {
    function renderMonths() {
        return _jsx(Months, __assign({}, props));
    }
    return _jsx("div", { className: "react-calendar__year-view", children: renderMonths() });
}
