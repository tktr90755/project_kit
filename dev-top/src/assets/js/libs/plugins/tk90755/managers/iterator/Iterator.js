/*
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 */

//__________________________________________________________________________________
// How to use
/*
var iIterator = new Iterator();
iIterator.addItem(new Item(function() { console.log("mc0"); }, "mc0"));
iIterator.addItem(new Item(function() { console.log("mc1"); }, "mc1"));
iIterator.addItem(new Item(function() { console.log("mc2"); }, "mc2"));
iIterator.addItem(new Item(function() { console.log("mc3"); }, "mc3"));
iIterator.addItem(new Item(function() { console.log("mc4"); }, "mc4"));
iIterator.addItem(new Item(function() { console.log("mc5"); }, "mc5"));
console.log("fastName:"+iIterator.fast().name());
console.log("lastName:"+iIterator.last().name());
setInterval(function(){
	// console.log("random:"+iIterator.random().name());
	console.log("shuffle:"+iIterator.shuffle().name());
}, 100);
*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.managers = this.t90755.managers||{};
this.t90755.managers.iterator = this.t90755.managers.iterator||{};
(function() {

    function Iterator () {

        // classes
        var ArrayUtil = t90755.utils.ArrayUtil;
        
        // prototype
        var p = Iterator.prototype = {};
        // refers

        // members
		var _list;
		var _index;
		var shuffleList;
		var shuffleCount;

        //__________________________________________________________________________________
        // constructer
        var construct = function(){
			_list = [];
			_index = 0;
            return p;
        };
        
		//__________________________________________________________________________________
		//  hasNext 次のItem存在するかどうか
		p.hasNext = function()
		{
			var b = _index >= _list.length - 1;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  hasPrev 一つ前のItem存在するかどうか
		p.hasPrev = function()
		{
			var b = _index < 1;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  hasFast 最初のItem存在するかどうか
		p.hasFast = function()
		{
			var b = _list[0] == undefined;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  hasLast 最後のItem存在するかどうか
		p.hasLast = function()
		{
			var b = _list[_list.length - 1] == undefined;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  hasPickup  チョイスしたItemが存在するかどうか
		/**
		 * @param	index 		存在を確認したいItemの番号
		 */
		p.hasPickup = function($index)
		{
			var b = $index[$index] == undefined;
			return !b;
		}
		
		//__________________________________________________________________________________
		//  next 次へ進む
		p.next = function()
		{
			_index++;
			return getItemAt(_index);
		}
		
		//__________________________________________________________________________________
		//  prev 前へ進む
		p.prev = function()
		{
			_index--;
			return getItemAt(_index);
		}
		
		//__________________________________________________________________________________
		//  pickup
		/**
		 * @param	index 		取り出したいItemの番号
		 */
		p.pickup = function($index)
		{
			_index = $index;
			return getItemAt($index);
		}
		
		//__________________________________________________________________________________
		//  fast 最初のItemを取得
		p.fast = function()
		{ 
			_index = 0;
			return _list[0]; 
		};
		
		//__________________________________________________________________________________
		//  last 最後のItemを取得
		p.last = function()
		{ 
			_index = p.length() - 1;
			return p.pickup(p.length() - 1); 
		};
		
		//__________________________________________________________________________________
		//  random	shuffleとの違いは連続して同じ物が出る事があるということ(0->2->2->3とかね)
		p.random = function() 
		{ 
			var r = Math.random() * p.length();
			return p.pickup(Math.floor(r)); 
		};

		//__________________________________________________________________________________
		//  shuffle	randomとの違いは連続して同じ物が出ないということ
		/**
		 * @param	init 		シャッフル開始時のコールバック
		 * @param	update 		シャッフル中のコールバック
		 * @param	complete 	シャッフル終了時のコールバック
		 */
		p.shuffle = function(init, update, complete)
		{
			if(init===undefined)init=null;
			if(update===undefined)update=null;
			if(complete===undefined)complete=null;

			var i;
			var l;
			var clone;
            var copy = function($v)
            {
                var arr = [];
                var _l = $v.length;
                for (var _i = 0; _i < _l; _i++)
                {
                    arr[_i] = $v[_i];
                }
                return arr;
            };

			if (shuffleList === null)
			{
				if (init !== null) init();
				shuffleCount = 0;
				shuffleList = [];
				clone = copy(_list);
				l = clone.length;
				for (i = 0; i < l; i++)
				{
					var r = Math.random() * clone.length;
					shuffleList[i] = clone[Math.floor(r)];
					clone.splice(r, 1);
				}
			}

			var targetItem = shuffleList[shuffleCount];
			if (update !== null) update();
			if (shuffleCount >= p.length() - 1)
			{
				if (complete !== null) complete();
				shuffleCount = -1;
				shuffleList = null;
			}
			shuffleCount++;
			var currentCount=0;
			l = _list.length;
			for (i = 0; i < l; i++) 
			{
				if (targetItem === _list[i])
				{
					currentCount = i;
				}
			}
			
			return p.pickup(currentCount);
		}
		
		p.killShuffle = function()
		{
			shuffleList = null;
		}
		
		//__________________________________________________________________________________
		// アイテムを追加
		/**
		 * @param	item 		追加したいItem
		 */
		p.addItem = function(item)
		{
			p.killShuffle();//追加したらシャッフルメソッドを初期化
			_list[_list.length] = item;
		}
		
		//__________________________________________________________________________________
		// アイテムを削除
		/**
		 * @param	item 		削除したいItem
		 */
		p.killItem = function(name)
		{
			var l = _list.length;
			var isKilled = false;
			for (var i = 0; i < l; i++) 
			{
				if (!isKilled)
				{
					var tmpItem = _list[i];
					if (tmpItem.name() == name)
					{
						isKilled = true;
						console.log("listからID[ " + tmpItem.name() + " ]の要素を削除しました。");
						_list.splice(i, 1);
						//killしたらカウントは初期値に戻る
						_index = 0;
						p.killShuffle();//削除したらシャッフルメソッドを初期化
					}
				}
			}
			if (!isKilled) console.log("指定したID[ " + name + " ]はlistに存在しませんでした。" );
		}
		
		//__________________________________________________________________________________
		// アイテムを全削除
		p.allKillItem = function()
		{
			_list = [];
			//killしたらカウントは初期値に戻る
			_index = 0;
			p.killShuffle();//削除したらシャッフルメソッドを初期化
		}
		
		//__________________________________________________________________________________
		// アイテムを取得するだけ
		/**
		 * @param	index 
		 */
		var getItemAt = function(index) { return _list[_index]; };
		
		//__________________________________________________________________________________
		// 現在のアイテムを取得
		p.currentItem = function() { return _list[_index]; };
			
		//__________________________________________________________________________________
		// 格納しているリストの長さ
		p.length = function() { return _list.length; };
		
		//__________________________________________________________________________________
		// 格納しているリストそのもの
		p.list = function() { return _list; };
		
		//__________________________________________________________________________________
		// 現在のインデックス
		p.index = function() { return _index; };

        //__________________________________________________________________________________
        // return
        return construct();
    }

    //__________________________________________________________________________________
    // statics

    //const
    Iterator.CLASS_PATH = "t90755.managers.iterator.Iterator.";
    
    //__________________________________________________________________________________
    // set construct
    t90755.managers.iterator.Iterator = Iterator;
}());