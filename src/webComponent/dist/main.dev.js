"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
Web components可以将标记结构，样式和行为隐藏起来，并与页面上的其他代码香格里拉，保证不同部分不会混合在一起，
可以使代码更加干净，整洁，其中Shadow DOM接口是关键所在，它可以将一个隐藏的，独立的DOM附加到一个元素上
*/
var PopUpInfo =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(PopUpInfo, _HTMLElement);

  function PopUpInfo() {
    _classCallCheck(this, PopUpInfo);

    // Always call super first in constructor
    return _possibleConstructorReturn(this, _getPrototypeOf(PopUpInfo).call(this));
  }

  _createClass(PopUpInfo, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      // Create a shadow root
      var shadow = this.attachShadow({
        mode: "open"
      }); // Create spans

      var wrapper = document.createElement("span");
      wrapper.setAttribute("class", "wrapper");
      var icon = document.createElement("span");
      icon.setAttribute("class", "icon");
      icon.setAttribute("tabindex", 0);
      var info = document.createElement("span");
      info.setAttribute("class", "info"); // Take attribute content and put it inside the info span

      var text = this.getAttribute("data-text");
      info.textContent = text; // Insert icon

      var imgUrl;

      if (this.hasAttribute("img")) {
        imgUrl = this.getAttribute("img");
      } else {
        imgUrl = "img/default.png";
      }

      var img = document.createElement("img");
      img.src = imgUrl;
      icon.appendChild(img); // Create some CSS to apply to the shadow dom

      var style = document.createElement("style");
      console.log(style.isConnected);
      style.textContent = "\n        .wrapper {\n          position: relative;\n        }\n  \n        .info {\n          font-size: 0.8rem;\n          width: 200px;\n          display: inline-block;\n          border: 1px solid black;\n          padding: 10px;\n          background: white;\n          border-radius: 10px;\n          opacity: 0;\n          transition: 0.6s all;\n          position: absolute;\n          bottom: 20px;\n          left: 10px;\n          z-index: 3;\n        }\n  \n        img {\n          width: 1.2rem;\n        }\n  \n        .icon:hover + .info, .icon:focus + .info {\n          opacity: 1;\n        }\n      "; // Attach the created elements to the shadow dom

      shadow.appendChild(style);
      console.log(style.isConnected);
      shadow.appendChild(wrapper);
      wrapper.appendChild(icon);
      wrapper.appendChild(info);
    }
  }]);

  return PopUpInfo;
}(_wrapNativeSuper(HTMLElement)); // Define the new element


customElements.define("popup-info", PopUpInfo);