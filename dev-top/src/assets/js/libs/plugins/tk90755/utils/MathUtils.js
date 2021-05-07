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