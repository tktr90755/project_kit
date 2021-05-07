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