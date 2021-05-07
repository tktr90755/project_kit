 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.managers.EnterFrameManager.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
	var efm = t90755.managers.EnterFrameManager;
	var count = 0;
	var testFunc = function(){
		console.log("count:"+count);
		count++;
		if(count>=100){
			efm.removeListener("testFunc");
		}
	};
	efm.addListener(testFunc,"testFunc");
*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.managers = this.t90755.managers||{};
(function() {

	//__________________________________________________________________________________
	// コンストラクタ
	var EnterFrameManager = function() {
		throw "EnterFrameManager cannot be instantiated";
	};
	EnterFrameManager.numListeners = 0;
	EnterFrameManager._listeners = {};
	EnterFrameManager._timer = null;
	EnterFrameManager.fps = 30;
	//___________________________________________________________________________________________________________________________________________
	// 追加と削除
	EnterFrameManager.addListener = function( instance , id ){
		if (EnterFrameManager._listeners[id] === undefined){
			EnterFrameManager._listeners[id] = instance;
			if (EnterFrameManager.numListeners++ === 0){
				EnterFrameManager.resume();
			}
		}else{
			throw "【EnterFrameManager Error】" + id + "というインスタンス名は" + EnterFrameManager._listeners[id] + "において使用されています。";
		}
	};
	
	EnterFrameManager.removeListener = function( id ){
		if ( EnterFrameManager.hasListener(id) ){
			if ( --EnterFrameManager.numListeners <= 0 ) EnterFrameManager.pause();
			delete EnterFrameManager._listeners[id];
		}else{
			throw "【EnterFrameManager Error】" + id + "というインスタンスはリストに登録されていません。";
		}
	};

	EnterFrameManager.pause = function(){
		clearTimeout( EnterFrameManager._timer );
		EnterFrameManager._timer = null;
    };
	
    EnterFrameManager.resume = function(){
		if(EnterFrameManager.numListeners !== 0){
			EnterFrameManager._timer = setInterval(
				EnterFrameManager.render,
				1000 / EnterFrameManager.fps
			);
		}
    };
	//___________________________________________________________________________________________________________________________________________
	// 有るかどうか
	EnterFrameManager.hasListener = function( id ){
		return EnterFrameManager._listeners[id] !== undefined;
	};

	//___________________________________________________________________________________________________________________________________________
	// レンダリング
	EnterFrameManager.render = function(){
		for (var pName in EnterFrameManager._listeners){
			EnterFrameManager._listeners[pName]();
		}
	};

	t90755.managers.EnterFrameManager = EnterFrameManager;
}());