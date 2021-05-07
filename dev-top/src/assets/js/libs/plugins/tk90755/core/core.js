 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.core.js
 * @author 
 * @version 0.2.0 
 * @update 
 * [0.2.0]2014/06/03 クラス化のフローを変更。ミックスインからプロトタイプチェーンへ
 * [0.1.2]2013/02/12 dispatcherがnullかundefinedで、かつeventTypeが存在していたときはエラーとする処理を追加
 */
//__________________________________________________________________________________
// add method
if (!Object.prototype.__defineGetter__ && Object.defineProperty) {
  Object.defineProperty(Object.prototype, '__defineGetter__', {
    value: function (name, func) {
      Object.defineProperty(this, name,
        {get: func, enumerable: true, configurable: true});
    }, enumerable: false, configurable: true});
}

if (!Object.prototype.__defineSetter__ && Object.defineProperty) {
  Object.defineProperty(Object.prototype, '__defineSetter__', {
    value: function (name, func) {
      Object.defineProperty(this, name,
        {set: func, enumerable: true, configurable: true});
    }, enumerable: false, configurable: true});
}

if (!('name' in Function.prototype)) {
  Function.prototype.__defineGetter__('name', function () {
    return ('' + this).replace(/^\s*function\s*\**\s*([^\(]*)[\S\s]+$/im, '$1');
  });
}

if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function(){};
    F.prototype = o;
    return new F();
  };
}

//__________________________________________________________________________________
// Namespaces
var t90755 = {};
t90755.virsion = {};

//__________________________________________________________________________________
// virsion
t90755.virsion.Virsion = {
  query : "?version=",
  path : 'scripts/libs',
  major : '0',
  minor : '2',
  build : '0',
  date : '20150629',
  time : '1018',
  antiCash : Math.floor(Math.random() * 10000000000) + new Date().getMilliseconds(),
  useAntiCash : true
};

//__________________________________________________________________________________
// inherits
t90755.inherits = function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};