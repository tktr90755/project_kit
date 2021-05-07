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
 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.events.Event.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*


*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.events = this.t90755.events||{};
(function() {

    function Event ($type, $origin, $bubbles, $cancelable) {
        // classes
        
        // instances
        
        // refers
        var s = this;
        // consts

        // members
		var _flags = 0x00;
		var _preventDefaults = 0x01;
		var _stopPropagation = 0x02;

        //__________________________________________________________________________________
        // constructer
        var construct = function($type, $origin, $bubbles, $cancelable){
			if ($type === null || $type === undefined) {
				throw new Error("Have to set Event Type.");
			}
			_type = $type;
			_origin = ($origin) ? $origin : null;
			_bubbles = (typeof($bubbles) === 'boolean') ? $bubbles : false;
			_cancelable = (typeof($cancelable) === 'boolean') ? $cancelable : false;
        };
        
        //__________________________________________________________________________________
        // 
        var setFlag = function ($flag) {
			_flags |= $flag;
		};

		var clearFlag = function ($flag) {
			if (hasFlag($flag)) {
				_flags ^= $flag;
			}
		};

		var hasFlag = function (flag) {
			return (_flags & flag) == flag;
		};

		var resetFlags = function () {
			_flags = 0x00;
		};

		var isDefaultPrevented = function () {
			return hasFlag(_preventDefaults);
		};

		var preventDefault = function () {
			if (_cancelable) {
				p.setFlag(_preventDefaults);
			}
		};

		var stopPropagation = function () {
			setFlag(_stopPropagation);
		};

        //__________________________________________________________________________________
        // getter & setter
		var _currentTarget = null;
	    Object.defineProperty(s, "currentTarget", {
	      get: function () {
	        return _currentTarget;
	      },
	      set: function ($currentTarget) {
	        _currentTarget = $currentTarget;
	      }
	    });

		//__________________________________________________________________________________
        // getter
        Object.defineProperty(s, "canPropagate", {
	      get: function () {
	        return !hasFlag(_stopPropagation);
	      }
	    });

	    var _bubbles;
	    Object.defineProperty(s, "bubbles", {
	      get: function () {
	        return _bubbles;
	      }
	    });

	    var _cancelable;
	    Object.defineProperty(s, "cancelable", {
	      get: function () {
	        return _cancelable;
	      }
	    });
		
		var _origin;
		Object.defineProperty(s, "origin", {
	      get: function () {
	        return _origin;
	      }
	    });

		var _type;
		Object.defineProperty(s, "type", {
	      get: function () {
	        return _type;
	      }
	    });
		
        //__________________________________________________________________________________
        // return
        return construct($type, $origin, $bubbles, $cancelable);
    }

    //__________________________________________________________________________________
    // statics
    //classPath
    Event.CLASS_PATH = "t90755.events.Event.";
	//event types
	Event.INIT = "init";
	Event.START = "start";
	Event.ERROR = "error";
	Event.IO_ERROR = "ioError";
	Event.SECURITY_ERROR = "securityError";
	Event.CHANGE = "change";
	Event.CANCEL = "cancel";
	Event.RENDER = "render";
	Event.COMPLETE = "complete";
	Event.RESIZE = "resize";
	Event.ENTER_FRAME = "enterFrame";

    //__________________________________________________________________________________
    // set construct
    t90755.events.Event = Event;
}());

 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.events.EventDispatcher.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
var Event = t90755.events.Event;
var EventDispatcher = t90755.events.EventDispatcher;

var dispatcher = new EventDispatcher(window);
dispatcher.name="dispatcher";

dispatcher.addEventListener('say1', function (event) {
    alert(event.type);
});
dispatcher.dispatchEvent(new Event('say1', window, true));

var testObject = function () {
    this.someVar = 1;
    this.dispatcher = new EventDispatcher(this, dispatcher);
};

var test = new testObject();
test.name="test";
test.dispatcher.addEventListener('say2', function (event) {
    alert(event.currentTarget.name + ":" + test.dispatcher.hasEventListener('say2'));
});

test.dispatcher.dispatchEvent(new Event('say2'));
test.dispatcher.queueEventDispatch('say2', new Event('say2', window));
test.dispatcher.deferEventDispatch(new Event('say2', window), 4000);
*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.events = this.t90755.events||{};
(function() {

    function EventDispatcher ($currentTarget, $eventTarget) {
        // classes
        
        // instances
        
        // refers
        var s = this;
        // consts

        // members
        var _currentTarget;
        var _queuedEvents;
        var _deferedEvents;
        var _listeners;
        var _target;
        //__________________________________________________________________________________
        // constructer
        var construct = function($currentTarget, $eventTarget){
            _currentTarget = ($currentTarget) ? $currentTarget : null;
            _queuedEvents = {};
            _deferedEvents = [];
            _listeners = {};
            _target = ($eventTarget) ? $eventTarget : null;
        };

        //__________________________________________________________________________________
        // 
        s.dispatchQueuedEvents = function ($type) {
            if (_queuedEvents.hasOwnProperty($type)) {
                if (_queuedEvents.hasOwnProperty($type)) {
                    var event;
                    var eventsToDispatch = _queuedEvents[$type].slice(0);
                    delete _queuedEvents[$type];

                    while ((event = eventsToDispatch.pop())) {
                        s.dispatchEvent(event);
                    }
                }
            }
        };

        s.addEventListener = function ($type, $listener) {
            if (!_listeners.hasOwnProperty($type)) {
                _listeners[$type] = [];
            }

            if (typeof($listener) == 'function') {
                _listeners[$type].push($listener);
            } else {
                throw new Error("Listener is not a function.");
            }
        };
        
        s.cancelDeferredEvents = function () {
            var deferedEvent;

            while ((deferedEvent = _deferedEvents.pop())) {
                clearTimeout(deferedEvent);
            }
        };
        
        s.cancelQueuedEvents = function () {
            for (var evtName in _queuedEvents) {
                if (_queuedEvents.hasOwnProperty(evtName)) {
                    delete _queuedEvents[evtName];
                }
            }
        };
        
        s.deferEventDispatch = function ($event, $iMillis) {
            var index = _deferedEvents.length;
            
            _deferedEvents.push(setTimeout(function () {
                s.dispatchEvent($event);
                _deferedEvents.slice(index, 1);
            }, $iMillis || 1000));
        };

        s.dispatchEvent = function ($event) {
            $event.currentTarget = _currentTarget;
            if (_listeners.hasOwnProperty($event.type)) {
                var lItr,
                    lCount,
                    listeners = _listeners[$event.type],
                    listener;

                for (lItr = 0, lCount = listeners.length; lItr < lCount; ++lItr){
                    listener = listeners[lItr];
                    listener($event);
                }
            }
            
            s.dispatchQueuedEvents($event.type);

            if (_target !== null && $event.bubbles === true && $event.canPropagate === true) {
                _target.dispatchEvent($event);
            }
        };

        s.getEventListeners = function ($type) {
            if (s.hasEventListener($type)) {
                return _listeners[$type];
            }

            return [];
        };

        s.hasEventListener = function ($type) {
            if (_listeners.hasOwnProperty($type)) {
                if (_listeners[$type].length > 0) {
                    return true;
                }
            }

            return false;
        };
        
        s.queueEventDispatch = function ($trigger, $event) {
            if (!_queuedEvents.hasOwnProperty($trigger)) {
                _queuedEvents[$trigger] = [];
            }

            _queuedEvents[$trigger].push($event);
        };

        s.removeEventListener = function ($type, $listener) {
            if (_listeners.hasOwnProperty($type)) {
                var lItr,
                    lCount,
                    listeners = _listeners[$type];

                for (lItr = 0, lCount = _listeners.length; lItr < lCount; ++lItr) {
                    if (listeners[lItr] === $listener) {
                        _listeners[$type].splice(lItr, 1);
                        break;
                    }
                }
            }
        };

        //__________________________________________________________________________________
        // getter & setter
        

        //__________________________________________________________________________________
        // return
        return construct($currentTarget, $eventTarget);
    }

    //__________________________________________________________________________________
    // statics

    //const
    EventDispatcher.CLASS_PATH = "t90755.events.EventDispatcher.";
    

    //__________________________________________________________________________________
    // set construct
    t90755.events.EventDispatcher = EventDispatcher;
}());
/*
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 */
 // namespace:
this.t90755 = this.t90755||{};
this.t90755.data = this.t90755.data||{};
(function() {

    function Referer () {
        //__________________________________________________________________________________
        // constructer
        var construct = function(){
            throw "t90755.data.Referer cannot be instantiated";
        };
        construct();
    }

	/**
	 * @property _objectList
	 * @type Object
	 * @static 
	 **/
	Referer._objectList = {};

	/**
	 * @method get
	 * @return {Object} the Object from id. or {Null} the Empty.
	 * @static
	 **/
	Referer.get = function( $id ) {
		return Referer._objectList[$id];
	};

	/**
	 * @method set
	 * @return nothing.
	 * @static
	 **/
	Referer.set = function( $instance , $id ) {
		if(Referer._objectList[$id] === undefined){
			Referer._objectList[$id] = $instance;
		}else{
			throw "【Referer Error】" + $id + "というインスタンス名は" + _objectList[$id] + "において使用されています。";
		}
	};

	/**
	 * @method kill
	 * @return nothing.
	 * @static
	 **/
	Referer.kill = function( $id ) {
		if ( Referer._objectList[$id] ){
			delete Referer._objectList[$id];
		}else{
			throw "【Referer Error】" + $id + "というインスタンスはリストに登録されていません。";
		}
	};

	/**
	 * @method kill
	 * @return nothing.
	 * @static
	 **/
	Referer.killAll = function() {
		for (var name in Referer._objectList) {
			delete Referer._objectList[name];
		}
	};

	/**
	 * @method kill
	 * @return nothing.
	 * @static
	 **/
	Referer.hasItem = function( $id ) {
		return Referer._objectList[$id] !== undefined;
	};

    //__________________________________________________________________________________
    // set construct
    t90755.data.Referer = Referer;
}());
 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.utils.MathUtils.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*


*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.utils = this.t90755.utils||{};
(function() {

	var ArrayUtils = function(){
        //__________________________________________________________________________________
        // constructer
        var construct = function(){
            throw "t90755.utils.ArrayUArrayUtilstil cannot be instantiated";
        };
        construct();
	};
	//__________________________________________________________________________________
	// copy
	ArrayUtils.copy = function($v)
	{
		var arr = [];
		var l = $v.length;
		for (var i = 0; i < l; i++)
		{
			arr[i] = $v[i];
		}
		return arr;
	};
    //__________________________________________________________________________________
    // set construct
    t90755.utils.ArrayUtils = ArrayUtils;
}());
 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.utils.MathUtils.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*


*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.utils = this.t90755.utils||{};
(function() {

	var MathUtils = function(){
        //__________________________________________________________________________________
        // constructer
        var construct = function(){
            throw "t90755.utils.MathUtils cannot be instantiated";
        };
        construct();
	};
	//__________________________________________________________________________________
	// ランダムカラー #000000 ～ #FFFFFF
	MathUtils.randomColor16 = function(){
		var color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
		for(count = color.length; count < 6; count++){
			color = "0" + color;
		}
		return "#" + color;
	};
    //__________________________________________________________________________________
    // set construct
    t90755.utils.MathUtils = MathUtils;
}());
 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.utils.StringUtils.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*


*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.utils = this.t90755.utils||{};
(function() {
	var StringUtils = function(){
        //__________________________________________________________________________________
        // constructer
        var construct = function(){
            throw "t90755.utils.StringUtils cannot be instantiated";
        };
        construct();
	};

	//__________________________________________________________________________________
	// 前ゼロ追加
	StringUtils.addZero = function(num, digit){
		//数値
		var percentNum = num + "";
		//桁数
		var perNumLeng = percentNum.length;
		for (var i= perNumLeng + 1; i <= digit; ++i){
			percentNum = "0" + percentNum;
		}
		return percentNum;
	};

    //__________________________________________________________________________________
    // set construct
    t90755.utils.StringUtils = StringUtils;
}());
 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.managers.EnterFrameManager.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
	var efm = t90755.managers.EnterFrameManager;
	var count = 0;
	var testFunc = function(){
		console.log("count:"+count);
		count++;
		if(count>=100){
			efm.removeListener("testFunc");
		}
	};
	efm.addListener(testFunc,"testFunc");
*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.managers = this.t90755.managers||{};
(function() {

	//__________________________________________________________________________________
	// コンストラクタ
	var EnterFrameManager = function() {
		throw "EnterFrameManager cannot be instantiated";
	};
	EnterFrameManager.numListeners = 0;
	EnterFrameManager._listeners = {};
	EnterFrameManager._timer = null;
	EnterFrameManager.fps = 30;
	//___________________________________________________________________________________________________________________________________________
	// 追加と削除
	EnterFrameManager.addListener = function( instance , id ){
		if (EnterFrameManager._listeners[id] === undefined){
			EnterFrameManager._listeners[id] = instance;
			if (EnterFrameManager.numListeners++ === 0){
				EnterFrameManager.resume();
			}
		}else{
			throw "【EnterFrameManager Error】" + id + "というインスタンス名は" + EnterFrameManager._listeners[id] + "において使用されています。";
		}
	};
	
	EnterFrameManager.removeListener = function( id ){
		if ( EnterFrameManager.hasListener(id) ){
			if ( --EnterFrameManager.numListeners <= 0 ) EnterFrameManager.pause();
			delete EnterFrameManager._listeners[id];
		}else{
			throw "【EnterFrameManager Error】" + id + "というインスタンスはリストに登録されていません。";
		}
	};

	EnterFrameManager.pause = function(){
		clearTimeout( EnterFrameManager._timer );
		EnterFrameManager._timer = null;
    };
	
    EnterFrameManager.resume = function(){
		if(EnterFrameManager.numListeners !== 0){
			EnterFrameManager._timer = setInterval(
				EnterFrameManager.render,
				1000 / EnterFrameManager.fps
			);
		}
    };
	//___________________________________________________________________________________________________________________________________________
	// 有るかどうか
	EnterFrameManager.hasListener = function( id ){
		return EnterFrameManager._listeners[id] !== undefined;
	};

	//___________________________________________________________________________________________________________________________________________
	// レンダリング
	EnterFrameManager.render = function(){
		for (var pName in EnterFrameManager._listeners){
			EnterFrameManager._listeners[pName]();
		}
	};

	t90755.managers.EnterFrameManager = EnterFrameManager;
}());
/*
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 */

//__________________________________________________________________________________
// How to use
/*


*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.managers = this.t90755.managers||{};
this.t90755.managers.iterator = this.t90755.managers.iterator||{};
(function() {

    function Item ($content,$name) {

        // prototype
        var p = Item.prototype = {};
        // members
        var _content;
		var _name;
        
        //__________________________________________________________________________________
        // constructer
        var construct = function($content,$name){
            _content = $content;
            _name = $name;
            return p;
        };
        
        //__________________________________________________________________________________
        // getter
        p.content = function () { return _content; };
        p.name = function () { return _name; };

        //__________________________________________________________________________________
        // return
        return construct($content,$name);
    }

    //__________________________________________________________________________________
    // statics

    //const
    Item.CLASS_PATH = "t90755.managers.iterator.Item.";
    
    //__________________________________________________________________________________
    // set construct
    t90755.managers.iterator.Item = Item;
}());
﻿/*
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 */

//__________________________________________________________________________________
// How to use
/*
var iIterator = new Iterator();
iIterator.addItem(new Item(function() { console.log("mc0"); }, "mc0"));
iIterator.addItem(new Item(function() { console.log("mc1"); }, "mc1"));
iIterator.addItem(new Item(function() { console.log("mc2"); }, "mc2"));
iIterator.addItem(new Item(function() { console.log("mc3"); }, "mc3"));
iIterator.addItem(new Item(function() { console.log("mc4"); }, "mc4"));
iIterator.addItem(new Item(function() { console.log("mc5"); }, "mc5"));
console.log("fastName:"+iIterator.fast().name());
console.log("lastName:"+iIterator.last().name());
setInterval(function(){
	// console.log("random:"+iIterator.random().name());
	console.log("shuffle:"+iIterator.shuffle().name());
}, 100);
*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.managers = this.t90755.managers||{};
this.t90755.managers.iterator = this.t90755.managers.iterator||{};
(function() {

    function Iterator () {

        // classes
        var ArrayUtil = t90755.utils.ArrayUtil;
        
        // prototype
        var p = Iterator.prototype = {};
        // refers

        // members
		var _list;
		var _index;
		var shuffleList;
		var shuffleCount;

        //__________________________________________________________________________________
        // constructer
        var construct = function(){
			_list = [];
			_index = 0;
            return p;
        };
        
		//__________________________________________________________________________________
		//  hasNext 次のItem存在するかどうか
		p.hasNext = function()
		{
			var b = _index >= _list.length - 1;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  hasPrev 一つ前のItem存在するかどうか
		p.hasPrev = function()
		{
			var b = _index < 1;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  hasFast 最初のItem存在するかどうか
		p.hasFast = function()
		{
			var b = _list[0] == undefined;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  hasLast 最後のItem存在するかどうか
		p.hasLast = function()
		{
			var b = _list[_list.length - 1] == undefined;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  hasPickup  チョイスしたItemが存在するかどうか
		/**
		 * @param	index 		存在を確認したいItemの番号
		 */
		p.hasPickup = function($index)
		{
			var b = $index[$index] == undefined;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  next 次へ進む
		p.next = function()
		{
			_index++;
			return getItemAt(_index);
		}
		
		//__________________________________________________________________________________
		//  prev 前へ進む
		p.prev = function()
		{
			_index--;
			return getItemAt(_index);
		}
		
		//__________________________________________________________________________________
		//  pickup
		/**
		 * @param	index 		取り出したいItemの番号
		 */
		p.pickup = function($index)
		{
			_index = $index;
			return getItemAt($index);
		}
		
		//__________________________________________________________________________________
		//  fast 最初のItemを取得
		p.fast = function()
		{ 
			_index = 0;
			return _list[0]; 
		};
		
		//__________________________________________________________________________________
		//  last 最後のItemを取得
		p.last = function()
		{ 
			_index = p.length() - 1;
			return p.pickup(p.length() - 1); 
		};
		
		//__________________________________________________________________________________
		//  random	shuffleとの違いは連続して同じ物が出る事があるということ(0->2->2->3とかね)
		p.random = function() 
		{ 
			var r = Math.random() * p.length();
			return p.pickup(Math.floor(r)); 
		};

		//__________________________________________________________________________________
		//  shuffle	randomとの違いは連続して同じ物が出ないということ
		/**
		 * @param	init 		シャッフル開始時のコールバック
		 * @param	update 		シャッフル中のコールバック
		 * @param	complete 	シャッフル終了時のコールバック
		 */
		p.shuffle = function(init, update, complete)
		{
			if(init===undefined)init=null;
			if(update===undefined)update=null;
			if(complete===undefined)complete=null;

			var i;
			var l;
			var clone;
            var copy = function($v)
            {
                var arr = [];
                var _l = $v.length;
                for (var _i = 0; _i < _l; _i++)
                {
                    arr[_i] = $v[_i];
                }
                return arr;
            };

			if (shuffleList === null)
			{
				if (init !== null) init();
				shuffleCount = 0;
				shuffleList = [];
				clone = copy(_list);
				l = clone.length;
				for (i = 0; i < l; i++)
				{
					var r = Math.random() * clone.length;
					shuffleList[i] = clone[Math.floor(r)];
					clone.splice(r, 1);
				}
			}

			var targetItem = shuffleList[shuffleCount];
			if (update !== null) update();
			if (shuffleCount >= p.length() - 1)
			{
				if (complete !== null) complete();
				shuffleCount = -1;
				shuffleList = null;
			}
			shuffleCount++;
			var currentCount=0;
			l = _list.length;
			for (i = 0; i < l; i++) 
			{
				if (targetItem === _list[i])
				{
					currentCount = i;
				}
			}
			
			return p.pickup(currentCount);
		}
		
		p.killShuffle = function()
		{
			shuffleList = null;
		}
		
		//__________________________________________________________________________________
		// アイテムを追加
		/**
		 * @param	item 		追加したいItem
		 */
		p.addItem = function(item)
		{
			p.killShuffle();//追加したらシャッフルメソッドを初期化
			_list[_list.length] = item;
		}
		
		//__________________________________________________________________________________
		// アイテムを削除
		/**
		 * @param	item 		削除したいItem
		 */
		p.killItem = function(name)
		{
			var l = _list.length;
			var isKilled = false;
			for (var i = 0; i < l; i++) 
			{
				if (!isKilled)
				{
					var tmpItem = _list[i];
					if (tmpItem.name() == name)
					{
						isKilled = true;
						console.log("listからID[ " + tmpItem.name() + " ]の要素を削除しました。");
						_list.splice(i, 1);
						//killしたらカウントは初期値に戻る
						_index = 0;
						p.killShuffle();//削除したらシャッフルメソッドを初期化
					}
				}
			}
			if (!isKilled) console.log("指定したID[ " + name + " ]はlistに存在しませんでした。" );
		}
		
		//__________________________________________________________________________________
		// アイテムを全削除
		p.allKillItem = function()
		{
			_list = [];
			//killしたらカウントは初期値に戻る
			_index = 0;
			p.killShuffle();//削除したらシャッフルメソッドを初期化
		}
		
		//__________________________________________________________________________________
		// アイテムを取得するだけ
		/**
		 * @param	index 
		 */
		var getItemAt = function(index) { return _list[_index]; };
		
		//__________________________________________________________________________________
		// 現在のアイテムを取得
		p.currentItem = function() { return _list[_index]; };
			
		//__________________________________________________________________________________
		// 格納しているリストの長さ
		p.length = function() { return _list.length; };
		
		//__________________________________________________________________________________
		// 格納しているリストそのもの
		p.list = function() { return _list; };
		
		//__________________________________________________________________________________
		// 現在のインデックス
		p.index = function() { return _index; };

        //__________________________________________________________________________________
        // return
        return construct();
    }

    //__________________________________________________________________________________
    // statics

    //const
    Iterator.CLASS_PATH = "t90755.managers.iterator.Iterator.";
    
    //__________________________________________________________________________________
    // set construct
    t90755.managers.iterator.Iterator = Iterator;
}());
/*
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 */

//__________________________________________________________________________________
// How to use
/*


*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.commands = this.t90755.commands||{};
(function() {

    function CommandObject () {
        // classes
        var Event = t90755.events.Event;
        var EventDispatcher = t90755.events.EventDispatcher;
        // instances
        
        // refers
        var s = this;
        // for inherits
        EventDispatcher.call(s);

        // consts

        // members

        //__________________________________________________________________________________
        // constructer
        var construct = function(){
            
        };

        //__________________________________________________________________________________
        // 
/*
        s.execute = function(){
            end();
        };

        s.cancel = function(){
            
        };

        s.end = function(){
            s.dispatchEvent( new Event( Event.COMPLETE ) );
        };
*/
        //__________________________________________________________________________________
        // getter & setter
        

        //__________________________________________________________________________________
        // return
        return construct();
    }

    //__________________________________________________________________________________
    // statics

    //const
    CommandObject.CLASS_PATH = "t90755.commands.CommandObject.";
    

    //__________________________________________________________________________________
    // set construct
    t90755.commands.CommandObject = CommandObject;
    //__________________________________________________________________________________
    // set inherits
    t90755.inherits(CommandObject, t90755.events.EventDispatcher);
}());
 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.commands.ParallelList.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*


*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.commands = this.t90755.commands||{};
(function() {

    function ParallelList ($name) {
		// classes
        var Event = t90755.events.Event;
        var EventDispatcher = t90755.events.EventDispatcher;
        var Command = t90755.commands.Command;
        var CommandObject = t90755.commands.CommandObject;
        // instances
        
        // refers
        var s = this;
        // for inherits
        CommandObject.call(s);
        // consts

        // members
		var _commands = null;
		var _numCompleted = 0;
		var _isRunning = false;
		var _isComplete = false;
		var _isCancel = false;
		var _count = 0;
        //__________________________________________________________________________________
        // constructer
        var construct = function($name){
            s.name = $name;
            _commands = [];
        };
        
		var _onCompleteHandler = function($event){
			if($event.currentTarget) $event.currentTarget.removeEventListener( Event.COMPLETE, _onCompleteHandler );
			_numCompleted++;
			if( _commands === null || _commands === undefined ){
				s.end();
			}else if ( _numCompleted === _commands.length ){
				s.end();
			}
		};

		var _checkError = function(){
			if ( _isRunning === true ) throw new Error( "this command is already running" );
			if ( _isComplete === true ) throw new Error( "this command is already completed" );
		};
        //__________________________________________________________________________________
        // 
		s.push = function( $commands ){
			_checkError();
			var i;
			var j;
			var commandsLength = $commands.length;
			for (i = 0 ; i < commandsLength ; i++) {
				if($commands[i] instanceof Array){
					if ($commands[i].length !== 0){
						for (j = 0 ; j < $commands[i].length ; j++) {
							_commands.push( $commands[i] );
						}
					}
				}else if(typeof($commands[i]) === "string"){
					//_commands.push( new Command( console.log , ["[String][" + s.name + "]:" + _count + ":" + $commands[i]] ));
					_count++;
				}else{
					_commands.push( $commands[i] );
				}
			}

			//TODO
			//throw new Error( "引数はICommandを実装しているCommandインスタンス、またはArray型のインスタンス、またはデバッグ用のStringでなければなりません。" );]
			//↑の実装
			//TODO
			//_commands.push( new Command( console.log , ["[String][" + s.name + "]:" + _count + ":" + $commands[i]] ));
			//↑の実装
		};

		s.execute = function(){
			_checkError();
			for (var command in _commands) {
				_commands[command].addEventListener( Event.COMPLETE, _onCompleteHandler );
				_commands[command].start();
			}
		};
		
		s.cancel = function(){
			if ( !_isComplete ){
				for (var command in _commands) {
					_commands[command].removeEventListener( Event.COMPLETE, _onCompleteHandler );
					_commands[command].stop();
				}
				end();
			}
		};
		
		s.end = function(){
			_commands = null;
			_numCompleted = 0;
			_isRunning = false;
			_isComplete = true;
			s.dispatchEvent( new Event( Event.COMPLETE ) );
		};
		
		s.concat = function($parallelList){
			s.push($parallelList.commands);
		};
		
        //__________________________________________________________________________________
        // getter
        Object.defineProperty(s, "length", {
	      get: function () {
	        return _commands.length;
	      }
	    });

	    Object.defineProperty(s, "commands", {
	      get: function () {
	        return _commands;
	      }
	    });

        //__________________________________________________________________________________
        // return
        return construct($name);
    }

    //__________________________________________________________________________________
    // statics

    //const
    ParallelList.CLASS_PATH = "t90755.commands.ParallelList.";
    

    //__________________________________________________________________________________
    // set construct
    t90755.commands.ParallelList = ParallelList;
    //__________________________________________________________________________________
    // set inherits
    t90755.inherits(ParallelList, t90755.commands.CommandObject);
}());
 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.commands.SerialList.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
var Event = t90755.events.Event;
var EventDispatcher = t90755.events.EventDispatcher;
var Command = t90755.commands.Command;
var SerialList = t90755.commands.SerialList;
var ParallelList = t90755.commands.ParallelList;

var testObject = function ($name) {
	var s = testObject.prototype = new EventDispatcher(this);
	s.func1 = function(){
		console.log("func1Dispatch");
		s.dispatchEvent(new Event('func1Dispatch'));
	};
	
	s.func2 = function(){
		console.log("func2Dispatch");
		s.dispatchEvent(new Event('func2Dispatch'));
	};

	s.func3 = function(){
		console.log("func3Dispatch");
		s.dispatchEvent(new Event('func3Dispatch'));
	};

	s.func4 = function(){
		console.log("func4Dispatch");
		s.dispatchEvent(new Event('func4Dispatch'));
	};

	s.func5 = function(){
		console.log("func5Dispatch");
		s.dispatchEvent(new Event('func5Dispatch'));
	};
	return s;
};

var test = new testObject("test1");
var serialList = new SerialList("testSerialList");
serialList.debug = true;
serialList.push([
	[
		new Command( test.func1 , null, test, "func1Dispatch", 3 ),
		new Command( test.func2 , null, test, "func2Dispatch", 1 ),
	],
	new Command( test.func3 , null, test, "func3Dispatch" ),
	new Command( test.func4 , null, test, "func4Dispatch", 1 ),
	new Command( test.func5 , null, test, "func5Dispatch" )
]);
serialList.execute();
*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.commands = this.t90755.commands||{};
(function() {

    function SerialList ($name) {
		// classes
        var Event = t90755.events.Event;
        var EventDispatcher = t90755.events.EventDispatcher;
        var Command = t90755.commands.Command;
        var CommandObject = t90755.commands.CommandObject;
        var ParallelList = t90755.commands.ParallelList;
        // instances
        
        // refers
        var s = this;
        // for inherits
        CommandObject.call(s, $name);
        // consts

        // members
        var _debug = false;
		var _commands;
		var _current;
		var _index = 0;
		var _isRunning = false;
		var _isComplete = false;
		var _isCancel = false;
		var _count = 0;

        //__________________________________________________________________________________
        // constructer
        var construct = function($name){
            s.name = $name;
            _commands = [];
        };
        
        //__________________________________________________________________________________
        // 

		var _onCompleteHandler = function( $event ){
			if ( _current !== null ) _current.removeEventListener( Event.COMPLETE, _onCompleteHandler );
			if ( _debug === true ){
				console.log("[SerialList][" + s.name + "]:" + _index + " complete");
			}
			if ( _commands !== null ){
				if( ++_index < _commands.length && _isCancel === false ){
					_next();
				}else{
					s.end();
				}
			}else{
				s.end();
			}
		};

		var _next = function(){
			if ( _debug === true ) {
				console.log("[SerialList][" + s.name + "]:" + _index + " start");
			}
			_current = _commands[_index];
			_current.addEventListener( Event.COMPLETE, _onCompleteHandler );
			if(_current.start !== undefined){
				_current.start();
			}else if(_current.execute !== undefined){
				_current.execute();
			}
		};

		var _checkError= function(){
			if ( _isRunning === true ) throw new Error( "this command is already running" );
			if ( _isComplete === true ) throw new Error( "this command is already completed" );
		};

		//___________________________________________________________________________________________________________________________________________
		// 実行
		s.push = function( $commands ){
			_checkError();
			var i;
			var j;
			var commandsLength = $commands.length;
			for (i = 0 ; i < commandsLength ; i++) {
				if($commands[i] instanceof Array){
					if ($commands[i].length !== 0){
						var parallel = new ParallelList(s.name);
						parallel.push( $commands[i] );
						_commands.push( parallel );
					}
				}else if(typeof($commands[i]) === "string"){
					//_commands.push( new Command( console.log , ["[String][" + s.name + "]:" + _count + ":" + $commands[i]] ));
					_count++;
				}else{
					_commands.push( $commands[i] );
				}
			}

			//TODO
			//throw new Error( "引数はICommandを実装しているCommandインスタンス、またはArray型のインスタンス、またはデバッグ用のStringでなければなりません。" );]
			//↑の実装
			//TODO
			//_commands.push( new Command( console.log , ["[String][" + s.name + "]:" + _count + ":" + $commands[i]] ));
			//↑の実装
		};

		s.execute = function(){
			_checkError();
			if (_commands.length !== 0){
				_isRunning = true;
				_next();
			}else{
				throw new Error( "this commands length are Zero" );
			}
		};

		s.cancel = function(){
			if ( !_isComplete )
			{
				_isCancel = true;
				_current.removeEventListener( Event.COMPLETE, _onCompleteHandler );
				_current.stop();
				end();
			}
		};
		
		s.end = function(){
			_commands = null;
			_current = null;
			_isRunning = false;
			_isComplete = true;
			if ( _debug === true ) console.log("[SerialList][" + s.name + "]:End");
		};
		
		s.concat = function($serialList){
			s.push($serialList.commands);
		};

        //__________________________________________________________________________________
        // getter & setter
	    Object.defineProperty(s, "debug", {
	      get: function () {
	        return _debug;
	      },
	      set: function ($debug) {
	        _debug = $debug;
	      }
	    });

	    Object.defineProperty(s, "length", {
	      get: function () {
	        return ( _commands === null||_commands === undefined ) ? 0 : _commands.length;
	      }
	    });

	    Object.defineProperty(s, "isRunning", {
	      get: function () {
	        return _isRunning;
	      }
	    });

	    Object.defineProperty(s, "isComplete", {
	      get: function () {
	        return _isComplete;
	      }
	    });

	    Object.defineProperty(s, "isCancel", {
	      get: function () {
	        return _isCancel;
	      }
	    });

	    Object.defineProperty(s, "commands", {
	      get: function () {
	        return _commands;
	      }
	    });

        //__________________________________________________________________________________
        // return
        return construct($name);
    }

    //__________________________________________________________________________________
    // statics

    //const
    SerialList.CLASS_PATH = "t90755.templates.SerialList.";
    

    //__________________________________________________________________________________
    // set construct
    t90755.commands.SerialList = SerialList;
    //__________________________________________________________________________________
    // set inherits
    t90755.inherits(SerialList, t90755.commands.CommandObject);
}());
 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.commands.Command.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/* 
 

*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.commands = this.t90755.commands||{};
(function() {

    function Command ($func, $params, $dispatcher, $eventType, $delay, $myname) {
        // classes
        var Event = t90755.events.Event;
        var EventDispatcher = t90755.events.EventDispatcher;
        var CommandObject = t90755.commands.CommandObject;
        // instances
        
        // refers
        var s = this;
        // for inherits
        CommandObject.call(s, $func, $params, $dispatcher, $eventType, $delay, $myname);
        // consts

        // members
        var _dispatcher;
        var _eventType;
        var _func;
        var _params;
        var _delay;
        var _timer;
        //__________________________________________________________________________________
        // constructer
        /**
         * @param $func          実行関数
         * @param $params        引数(Array)
         * @param $dispatcher    イベントディスパッチの対象
         * @param $eventType     イベントの種類
         * @param $delay         遅延(秒)delay兼thresholdスタックオーバーフローが出るようであればこの値を調整する
         */
        var construct = function($func, $params, $dispatcher, $eventType, $delay, $myname){
            if( $params === null || $params === undefined ) { $params = null; }
            if( $dispatcher === null || $dispatcher === undefined ) { $dispatcher = null; }
            if( $eventType === null || $eventType === undefined ) { $eventType = null; }
            if( $delay === null || $delay === undefined ) { $delay = NaN; }
            
            _func = $func;
            _params = $params;
            _dispatcher = $dispatcher;
            _eventType = $eventType;
            _delay = $delay;
            s.name = $myname;
        };
        
        //__________________________________________________________________________________
        // 
        var completeHandler = function($event){
            if ( _dispatcher !== null ) { _dispatcher.removeEventListener( _eventType, completeHandler ); }
            s.finish();
        };

        var excuteFunc = function(){
            _func.apply(null, arguments[0]);
        };

        s.start = function(){
            var f = function($event){
                if ( _dispatcher !== null ){
                    _dispatcher.addEventListener( _eventType, completeHandler );
                    excuteFunc(_params);
                }
                else if ( _dispatcher === null && _eventType !== null ){
                    throw new Error( "The dispatcher of the command is null or undefined.[ eventType : " + _eventType + " ]" );
                }
                else{
                    excuteFunc( _params );
                    completeHandler( null );
                }
                if ( _timer !== null || _timer !== undefined )
                {
                    clearTimeout(_timer);
                    _timer = null;
                }
            };
            if ( isNaN(_delay) === true ){
                f();
            }else{
                _timer = setTimeout(f, _delay * 1000);
            }
        };

        s.stop = function(){
            completeHandler( null );
        };
        
        s.finish = function(){
            if( _timer !== null || _timer !== undefined ){
                clearTimeout(_timer);
            }
            _dispatcher = null;
            _eventType = null;
            _func = null;
            _params = null;
            //s.end();
            s.dispatchEvent( new Event( Event.COMPLETE ) );
        };

        //__________________________________________________________________________________
        // getter & setter
        

        //__________________________________________________________________________________
        // return
        return construct($func, $params, $dispatcher, $eventType, $delay, $myname);
    }

    //__________________________________________________________________________________
    // statics

    //const
    Command.CLASS_PATH = "t90755.commands.Command.";
    

    //__________________________________________________________________________________
    // set construct
    t90755.commands.Command = Command;
    //__________________________________________________________________________________
    // set inherits
    t90755.inherits(Command, t90755.commands.CommandObject);
}());