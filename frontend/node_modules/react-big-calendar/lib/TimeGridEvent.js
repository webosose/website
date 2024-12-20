"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%';
}

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  var style = props.style,
    className = props.className,
    event = props.event,
    accessors = props.accessors,
    rtl = props.rtl,
    selected = props.selected,
    label = props.label,
    continuesPrior = props.continuesPrior,
    continuesAfter = props.continuesAfter,
    getters = props.getters,
    onClick = props.onClick,
    onDoubleClick = props.onDoubleClick,
    isBackgroundEvent = props.isBackgroundEvent,
    onKeyPress = props.onKeyPress,
    _props$components = props.components,
    Event = _props$components.event,
    EventWrapper = _props$components.eventWrapper;
  var title = accessors.title(event);
  var tooltip = accessors.tooltip(event);
  var end = accessors.end(event);
  var start = accessors.start(event);
  var userProps = getters.eventProp(event, start, end, selected);
  var inner = [/*#__PURE__*/_react.default.createElement("div", {
    key: "1",
    className: "rbc-event-label"
  }, label), /*#__PURE__*/_react.default.createElement("div", {
    key: "2",
    className: "rbc-event-content"
  }, Event ? /*#__PURE__*/_react.default.createElement(Event, {
    event: event,
    title: title
  }) : title)];
  var height = style.height,
    top = style.top,
    width = style.width,
    xOffset = style.xOffset;
  var eventStyle = (0, _objectSpread3.default)((0, _objectSpread3.default)({}, userProps.style), {}, (0, _defineProperty2.default)({
    top: stringifyPercent(top),
    height: stringifyPercent(height),
    width: stringifyPercent(width)
  }, rtl ? 'right' : 'left', stringifyPercent(xOffset)));
  return /*#__PURE__*/_react.default.createElement(EventWrapper, Object.assign({
    type: "time"
  }, props), /*#__PURE__*/_react.default.createElement("div", {
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onDoubleClick: onDoubleClick,
    style: eventStyle,
    onKeyDown: onKeyPress,
    title: tooltip ? (typeof label === 'string' ? label + ': ' : '') + tooltip : undefined,
    className: (0, _clsx.default)(isBackgroundEvent ? 'rbc-background-event' : 'rbc-event', className, userProps.className, {
      'rbc-selected': selected,
      'rbc-event-continues-earlier': continuesPrior,
      'rbc-event-continues-later': continuesAfter
    })
  }, inner));
}
var _default = exports.default = TimeGridEvent;