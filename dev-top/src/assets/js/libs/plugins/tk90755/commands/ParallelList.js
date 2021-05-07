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