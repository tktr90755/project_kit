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