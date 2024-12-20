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
import Decades from './CenturyView/Decades.js';
/**
 * Displays a given century.
 */
export default function CenturyView(props) {
    function renderDecades() {
        return _jsx(Decades, __assign({}, props));
    }
    return _jsx("div", { className: "react-calendar__century-view", children: renderDecades() });
}
