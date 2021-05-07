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