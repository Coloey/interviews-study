"use strict";

function convertMillseconds(ms) {
  var seconds = Math.floor(ms / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);
  var remainMonths = months % 12;
  var remainDays = days % 30;
  var remainHours = hours % 24;
  var remainMinutes = minutes % 60;
  var remainSeconds = seconds % 60;
  return "".concat(years, "\u5E74 ").concat(remainMonths, "\u6708 ").concat(remainDays, "\u5929 ").concat(remainHours, "\u5C0F\u65F6 ").concat(remainMinutes, " \u5206\u949F ").concat(remainSeconds, "\u79D2");
}