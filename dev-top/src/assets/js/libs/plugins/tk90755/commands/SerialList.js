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