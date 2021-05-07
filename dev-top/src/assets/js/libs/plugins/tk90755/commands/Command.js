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