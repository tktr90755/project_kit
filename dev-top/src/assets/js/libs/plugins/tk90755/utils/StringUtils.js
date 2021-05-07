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