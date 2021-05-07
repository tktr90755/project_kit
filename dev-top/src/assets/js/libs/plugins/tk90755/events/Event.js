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
