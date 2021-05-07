/*
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 */
 // namespace:
this.t90755 = this.t90755||{};
this.t90755.data = this.t90755.data||{};
(function() {

    function Referer () {
        //__________________________________________________________________________________
        // constructer
        var construct = function(){
            throw "t90755.data.Referer cannot be instantiated";
        };
        construct();
    }

	/**
	 * @property _objectList
	 * @type Object
	 * @static 
	 **/
	Referer._objectList = {};

	/**
	 * @method get
	 * @return {Object} the Object from id. or {Null} the Empty.
	 * @static
	 **/
	Referer.get = function( $id ) {
		return Referer._objectList[$id];
	};

	/**
	 * @method set
	 * @return nothing.
	 * @static
	 **/
	Referer.set = function( $instance , $id ) {
		if(Referer._objectList[$id] === undefined){
			Referer._objectList[$id] = $instance;
		}else{
			throw "【Referer Error】" + $id + "というインスタンス名は" + _objectList[$id] + "において使用されています。";
		}
	};

	/**
	 * @method kill
	 * @return nothing.
	 * @static
	 **/
	Referer.kill = function( $id ) {
		if ( Referer._objectList[$id] ){
			delete Referer._objectList[$id];
		}else{
			throw "【Referer Error】" + $id + "というインスタンスはリストに登録されていません。";
		}
	};

	/**
	 * @method kill
	 * @return nothing.
	 * @static
	 **/
	Referer.killAll = function() {
		for (var name in Referer._objectList) {
			delete Referer._objectList[name];
		}
	};

	/**
	 * @method kill
	 * @return nothing.
	 * @static
	 **/
	Referer.hasItem = function( $id ) {
		return Referer._objectList[$id] !== undefined;
	};

    //__________________________________________________________________________________
    // set construct
    t90755.data.Referer = Referer;
}());