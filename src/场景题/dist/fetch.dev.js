"use strict";

function request(url, options) {
  var res, data;
  return regeneratorRuntime.async(function request$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url, options));

        case 3:
          res = _context.sent;

          if (res.ok) {
            _context.next = 6;
            break;
          }

          throw Error(res.statusText);

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(res.json());

        case 8:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          throw _context.t0;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}