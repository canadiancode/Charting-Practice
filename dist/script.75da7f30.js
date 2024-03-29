// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// FETCHING AND UPDATING THE CHART
// arrays for the price and timeframe
var chartTimeframe = [];
var AddedPriceData = []; // the new asset getting added in
var assetPricesData = []; // list of all assets

// variables for the data
var selectedAssetIDs = ['bitcoin'];
var selectedAssetNames = ['Bitcoin'];
var selectedAssetID = 'bitcoin';
var selectedAssetName = 'Bitcoin';
var selectedTimePeriod = '365';

// count to add a new yAxis each time
var yAxisCount = 1;

// FETCH TIMEFRAME OF DATA
function fetchTimeframe() {
  return _fetchTimeframe.apply(this, arguments);
}
function _fetchTimeframe() {
  _fetchTimeframe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var URL, response, data, prices, _iterator4, _step4, price, epochTimeframe, formattedDate, longTimeframe, timeframe;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // link to fetch data from CoinGecko
          URL = "https://api.coingecko.com/api/v3/coins/".concat(selectedAssetID, "/market_chart?vs_currency=usd&days=").concat(selectedTimePeriod); // Get the dataset from CoinGecko API
          _context3.next = 4;
          return fetch(URL);
        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return response.json();
        case 7:
          data = _context3.sent;
          _context3.next = 10;
          return data.prices;
        case 10:
          prices = _context3.sent;
          // extraction of the desired data from dataset (time and price)
          // use this instead of forEach for normal for loop for async await
          chartTimeframe = [];
          _iterator4 = _createForOfIteratorHelper(prices);
          _context3.prev = 13;
          _iterator4.s();
        case 15:
          if ((_step4 = _iterator4.n()).done) {
            _context3.next = 26;
            break;
          }
          price = _step4.value;
          _context3.next = 19;
          return price[0];
        case 19:
          epochTimeframe = _context3.sent;
          formattedDate = new Date(epochTimeframe);
          longTimeframe = formattedDate.toUTCString();
          timeframe = longTimeframe.substring(4, 16); // add time to label array
          chartTimeframe.push(timeframe);
        case 24:
          _context3.next = 15;
          break;
        case 26:
          _context3.next = 31;
          break;
        case 28:
          _context3.prev = 28;
          _context3.t0 = _context3["catch"](13);
          _iterator4.e(_context3.t0);
        case 31:
          _context3.prev = 31;
          _iterator4.f();
          return _context3.finish(31);
        case 34:
          // update the chart with new timeframe
          displayedChart.data.labels = chartTimeframe;
          displayedChart.update();
          _context3.next = 42;
          break;
        case 38:
          _context3.prev = 38;
          _context3.t1 = _context3["catch"](0);
          console.log('cannot get timeframe data from coingecko...');
          console.log(_context3.t1);
        case 42:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 38], [13, 28, 31, 34]]);
  }));
  return _fetchTimeframe.apply(this, arguments);
}
;

// GET THE PRICE OF ASSET
function fetchPrice() {
  return _fetchPrice.apply(this, arguments);
}
function _fetchPrice() {
  _fetchPrice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var URL, response, data, prices, _iterator5, _step5, price, newDataObject;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // link to fetch data from CoinGecko
          URL = "https://api.coingecko.com/api/v3/coins/".concat(selectedAssetIDs[0], "/market_chart?vs_currency=usd&days=").concat(selectedTimePeriod); // Get the dataset from CoinGecko API
          _context4.next = 4;
          return fetch(URL);
        case 4:
          response = _context4.sent;
          _context4.next = 7;
          return response.json();
        case 7:
          data = _context4.sent;
          _context4.next = 10;
          return data.prices;
        case 10:
          prices = _context4.sent;
          // extraction of the desired data from dataset (time and price)
          // use this instead of forEach for normal for loop for async await
          AddedPriceData = [];
          _iterator5 = _createForOfIteratorHelper(prices);
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              price = _step5.value;
              // add price data to arrays
              AddedPriceData.push(price[1]);
            }

            // Adding new data to the assetPricesData array
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          newDataObject = {
            label: "Price of ".concat(selectedAssetName),
            data: AddedPriceData,
            fill: false,
            pointRadius: 0,
            borderWidth: 1,
            backgroundColor: '#FFA500',
            borderColor: '#FFA500',
            yAxisID: 'y'
          };
          assetPricesData.push(newDataObject);
          displayedChart.data.datasets = assetPricesData;
          displayedChart.update();
          _context4.next = 24;
          break;
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          console.log('cannot get price data from coingecko...');
          console.log(_context4.t0);
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 20]]);
  }));
  return _fetchPrice.apply(this, arguments);
}
;
fetchTimeframe();
fetchPrice();

// GENERATE LIST OF ASSETS
var assetListURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';
var assetListEl = document.querySelector('.assetList');
var addDataButton = document.querySelector('.addDataButton');
function getAssetList() {
  return _getAssetList.apply(this, arguments);
}
function _getAssetList() {
  _getAssetList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var response, assetListData, _iterator6, _step6, asset, assetID, listOptions, assetName;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return fetch(assetListURL);
        case 3:
          response = _context5.sent;
          _context5.next = 6;
          return response.json();
        case 6:
          assetListData = _context5.sent;
          _iterator6 = _createForOfIteratorHelper(assetListData);
          _context5.prev = 8;
          _iterator6.s();
        case 10:
          if ((_step6 = _iterator6.n()).done) {
            _context5.next = 27;
            break;
          }
          asset = _step6.value;
          _context5.next = 14;
          return asset.id;
        case 14:
          assetID = _context5.sent;
          listOptions = document.createElement('option');
          listOptions.classList.add(assetID);

          // for the display name
          _context5.next = 19;
          return asset.name;
        case 19:
          assetName = _context5.sent;
          _context5.next = 22;
          return assetName;
        case 22:
          listOptions.value = _context5.sent;
          // add option onto the dropdown selection
          listOptions.appendChild(document.createTextNode(assetName));
          assetListEl.appendChild(listOptions);
        case 25:
          _context5.next = 10;
          break;
        case 27:
          _context5.next = 32;
          break;
        case 29:
          _context5.prev = 29;
          _context5.t0 = _context5["catch"](8);
          _iterator6.e(_context5.t0);
        case 32:
          _context5.prev = 32;
          _iterator6.f();
          return _context5.finish(32);
        case 35:
          _context5.next = 41;
          break;
        case 37:
          _context5.prev = 37;
          _context5.t1 = _context5["catch"](0);
          console.log(_context5.t1);
          console.log('cannot get list of assets from CoinGecko...');
        case 41:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 37], [8, 29, 32, 35]]);
  }));
  return _getAssetList.apply(this, arguments);
}
getAssetList();

// ADD NEW ASSET TO THE CHART
function addAsset() {
  // change the data on the chart
  var assetList = document.querySelector('.assetList');
  var selectedEl = assetList.options[assetList.selectedIndex];
  var ID = selectedEl.classList[0];
  selectedAssetID = ID;
  selectedAssetName = assetList.value;
  selectedAssetNames.push(selectedAssetName);
  selectedAssetIDs.push(ID);

  // adding the tab on the selected list
  var selectedAssetListEl = document.querySelector('.selectedAssetList');
  var addedAsset = document.createElement('div');
  addedAsset.classList.add('assetContainer');
  var removeButtonEl = document.createElement('button');
  removeButtonEl.appendChild(document.createTextNode('✖'));
  removeButtonEl.classList.add('removeAsset');
  addedAsset.appendChild(removeButtonEl);
  var buttonTextEl = document.createElement('p');
  buttonTextEl.classList.add('selectedAssetName');
  buttonTextEl.appendChild(document.createTextNode(selectedAssetName));
  addedAsset.appendChild(buttonTextEl);
  selectedAssetListEl.appendChild(addedAsset);

  // add a new yAxis to the chart
  yAxisCount++;
  var yAxisNumberString = yAxisCount.toString();
  var yAxisvalue = 'y' + yAxisNumberString;
  function fetchNewPrice() {
    return _fetchNewPrice.apply(this, arguments);
  }
  function _fetchNewPrice() {
    _fetchNewPrice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var randomHSL, URL, response, data, prices, _iterator, _step, price, randomColor, newDataObject;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // generate random light color
            randomHSL = function randomHSL() {
              return "hsla(" + ~~(360 * Math.random()) + "," + "50%," + "50%,1)";
            };
            // link to fetch data from CoinGecko
            URL = "https://api.coingecko.com/api/v3/coins/".concat(selectedAssetID, "/market_chart?vs_currency=usd&days=").concat(selectedTimePeriod); // Get the dataset from CoinGecko API
            _context.next = 5;
            return fetch(URL);
          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();
          case 8:
            data = _context.sent;
            _context.next = 11;
            return data.prices;
          case 11:
            prices = _context.sent;
            // extraction of the desired data from dataset (time and price)
            // use this instead of forEach for normal for loop for async await
            AddedPriceData = [];
            _iterator = _createForOfIteratorHelper(prices);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                price = _step.value;
                // add price data to arrays
                AddedPriceData.push(price[1]);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            ;
            ;
            randomColor = randomHSL(); // Adding new data to the assetPricesData array
            newDataObject = {
              label: "Price of ".concat(selectedAssetName),
              data: AddedPriceData,
              fill: false,
              pointRadius: 0,
              borderWidth: 1,
              backgroundColor: randomColor,
              borderColor: randomColor,
              yAxisID: yAxisvalue
            };
            assetPricesData.push(newDataObject);
            displayedChart.data.datasets = assetPricesData;
            displayedChart.update();

            // incorporate variable for chart scale

            // update the chart with new data
            displayedChart.update();
            _context.next = 29;
            break;
          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](0);
            console.log('cannot get price data from coingecko...');
            console.log(_context.t0);
          case 29:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 25]]);
    }));
    return _fetchNewPrice.apply(this, arguments);
  }
  ;

  // update the chart
  fetchNewPrice();
  fetchTimeframe();
}
;
addDataButton.addEventListener('click', addAsset);

// CHANGE THE TIME PERIOD ON THE CHART
function changeTimeframe() {
  var timeframeList = document.querySelector('.timeframeList');
  selectedTimePeriod = timeframeList.value;
  assetPricesData = [];
  function fetchNewTimeframe() {
    return _fetchNewTimeframe.apply(this, arguments);
  }
  function _fetchNewTimeframe() {
    _fetchNewTimeframe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var timeframeURL, response, fetchedData, timeData, _iterator2, _step2, time, epochTimeframe, formattedDate, longTimeframe, timeframe, singleAssetPriceData, listOfAssetPrices, _iterator3, _step3, asset, assetPriceURL, _response, assetPriceData, assetPriceAndTime, i, yAxisNumberString, yAxisvalue, selectedBackgroundColor, selectedBorderColor, newDataObject;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // FETCH AND DISPLAY TIMEFRAME DATA
            timeframeURL = "https://api.coingecko.com/api/v3/coins/".concat(selectedAssetID, "/market_chart?vs_currency=usd&days=").concat(selectedTimePeriod);
            _context2.next = 4;
            return fetch(timeframeURL);
          case 4:
            response = _context2.sent;
            _context2.next = 7;
            return response.json();
          case 7:
            fetchedData = _context2.sent;
            _context2.next = 10;
            return fetchedData.prices;
          case 10:
            timeData = _context2.sent;
            // remove old time data to replace with new data
            chartTimeframe = [];

            // looping through the fetched data and pushing to displayed array
            _iterator2 = _createForOfIteratorHelper(timeData);
            _context2.prev = 13;
            _iterator2.s();
          case 15:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 26;
              break;
            }
            time = _step2.value;
            _context2.next = 19;
            return time[0];
          case 19:
            epochTimeframe = _context2.sent;
            formattedDate = new Date(epochTimeframe);
            longTimeframe = formattedDate.toUTCString();
            timeframe = longTimeframe.substring(4, 16);
            chartTimeframe.push(timeframe);
          case 24:
            _context2.next = 15;
            break;
          case 26:
            _context2.next = 31;
            break;
          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2["catch"](13);
            _iterator2.e(_context2.t0);
          case 31:
            _context2.prev = 31;
            _iterator2.f();
            return _context2.finish(31);
          case 34:
            // update the chart with the new time data
            displayedChart.data.labels = chartTimeframe;
            displayedChart.update();

            // FETCH AND DISPLAY PRICE DATA
            singleAssetPriceData = [];
            listOfAssetPrices = []; // this removes the old yAxis scales
            displayedChart.options.scales = {};
            _iterator3 = _createForOfIteratorHelper(selectedAssetIDs);
            _context2.prev = 40;
            _iterator3.s();
          case 42:
            if ((_step3 = _iterator3.n()).done) {
              _context2.next = 59;
              break;
            }
            asset = _step3.value;
            assetPriceURL = "https://api.coingecko.com/api/v3/coins/".concat(asset, "/market_chart?vs_currency=usd&days=").concat(selectedTimePeriod);
            _context2.next = 47;
            return fetch(assetPriceURL);
          case 47:
            _response = _context2.sent;
            _context2.next = 50;
            return _response.json();
          case 50:
            assetPriceData = _context2.sent;
            _context2.next = 53;
            return assetPriceData.prices;
          case 53:
            assetPriceAndTime = _context2.sent;
            singleAssetPriceData = [];
            assetPriceAndTime.forEach(function (array) {
              var justPrice = array[1];
              singleAssetPriceData.push(justPrice);
            });
            listOfAssetPrices.push(singleAssetPriceData);
          case 57:
            _context2.next = 42;
            break;
          case 59:
            _context2.next = 64;
            break;
          case 61:
            _context2.prev = 61;
            _context2.t1 = _context2["catch"](40);
            _iterator3.e(_context2.t1);
          case 64:
            _context2.prev = 64;
            _iterator3.f();
            return _context2.finish(64);
          case 67:
            ;
            for (i = 0; i < selectedAssetNames.length; i++) {
              // add a new yAxis to the chart
              yAxisCount++;
              yAxisNumberString = yAxisCount.toString();
              yAxisvalue = 'y' + yAxisNumberString; // generate pre-selected color for each asset
              selectedBackgroundColor = displayedChart.data.datasets[i].backgroundColor;
              selectedBorderColor = displayedChart.data.datasets[i].borderColor;
              newDataObject = {
                label: "Price of ".concat(selectedAssetNames[i]),
                data: listOfAssetPrices[i],
                fill: false,
                pointRadius: 0,
                borderWidth: 1,
                backgroundColor: selectedBackgroundColor,
                borderColor: selectedBorderColor,
                yAxisID: yAxisvalue
              };
              assetPricesData.push(newDataObject);
            }
            displayedChart.data.datasets = assetPricesData;
            displayedChart.update();
            _context2.next = 77;
            break;
          case 73:
            _context2.prev = 73;
            _context2.t2 = _context2["catch"](0);
            console.log('cannot get new timeframe data from coingecko...');
            console.log(_context2.t2);
          case 77:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 73], [13, 28, 31, 34], [40, 61, 64, 67]]);
    }));
    return _fetchNewTimeframe.apply(this, arguments);
  }
  fetchNewTimeframe();
}
;
var selectedTimePeriodEl = document.querySelector('.timeframeList');
selectedTimePeriodEl.addEventListener('change', changeTimeframe);

// CODE FOR CHANGING THE CHART SCALE
var chartScale = 'linear'; //logarithmic or linear
var autoChartOption = document.querySelector('.autoChartOption');
autoChartOption.addEventListener('click', changeChartScale);
var logChartOption = document.querySelector('.logChartOption');
logChartOption.addEventListener('click', changeChartScale);
function changeChartScale(event) {
  if (event.target.classList.contains('autoChartOption')) {
    autoChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.6)';
    logChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.2)';
    chartScale = 'linear';
    displayedChart.options.scales.y.type = chartScale;
    displayedChart.update();
  } else {
    autoChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.2)';
    logChartOption.style.backgroundColor = 'rgb(128, 128, 128, 0.6)';
    chartScale = 'logarithmic';
    displayedChart.options.scales.y.type = chartScale;
    displayedChart.update();
  }
}

// CODE FOR THE CHART.JS LIBRARY
var ctx = document.querySelector('.chart');
var displayedChart = new Chart(ctx, {
  type: 'line',
  // data: assetPricesData,
  data: {
    labels: chartTimeframe,
    datasets: assetPricesData
  },
  options: {
    type: chartScale,
    display: true,
    position: 'left'
  }
});

// event listener for keeping canvas proper size
onresize = function onresize() {
  ctx.style.width = '100%';
  ctx.style.height = '100%';
};
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57640" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map