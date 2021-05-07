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