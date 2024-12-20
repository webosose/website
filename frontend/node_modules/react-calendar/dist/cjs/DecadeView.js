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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DecadeView;
var jsx_runtime_1 = require("react/jsx-runtime");
var Years_js_1 = __importDefault(require("./DecadeView/Years.js"));
/**
 * Displays a given decade.
 */
function DecadeView(props) {
    function renderYears() {
        return (0, jsx_runtime_1.jsx)(Years_js_1.default, __assign({}, props));
    }
    return (0, jsx_runtime_1.jsx)("div", { className: "react-calendar__decade-view", children: renderYears() });
}
