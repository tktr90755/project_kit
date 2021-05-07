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
this.t90755.managers.resize = this.t90755.managers.resize||{};
(function() {

    function ResizeManager () {
        //__________________________________________________________________________________
        // constructer
        var construct = function(){
            throw "ResizeManager cannot be instantiated";
        };
        construct();
    }

	ResizeManager.queue = null;
	ResizeManager.defaultWidth = 0;
	ResizeManager.defaultHeight = 0;

	ResizeManager.initialize = function($defaultWidth, $defaultHeight){
		ResizeManager.defaultWidth = $defaultWidth;
		ResizeManager.defaultHeight = $defaultHeight;
	};
	
	//___________________________________________________________________________________________________________________________________________
	// 単体で取得
	ResizeManager.top = function() { return -((esizeManager.currentHeight() - ResizeManager.defaultHeight) / 2); };
	ResizeManager.down = function() { return ResizeManager.defaultHeight + ((ResizeManager.currentHeight() - ResizeManager.defaultHeight) / 2); };
	ResizeManager.left = function() { return -((ResizeManager.currentWidth() - ResizeManager.defaultWidth) / 2); };
	ResizeManager.right = function() { return ResizeManager.defaultWidth + (ResizeManager.currentWidth() - ResizeManager.defaultWidth) / 2; };
	ResizeManager.centerX = function() { return ((ResizeManager.currentWidth() - ResizeManager.defaultWidth) / 2) + (ResizeManager.currentWidth() / 2); };
	ResizeManager.centerY = function() { return ((ResizeManager.currentHeight() - ResizeManager.defaultHeight) / 2) + (ResizeManager.currentHeight() / 2); };

	ResizeManager.currentWidth = function() { return window.innerWidth || document.documentElement.clientWidth; };
	ResizeManager.currentHeight = function() { return window.innerHeight || document.documentElement.clientHeight; };

	//___________________________________________________________________________________________________________________________________________
	// 
	ResizeManager.resize = function(_container){
		if(ResizeManager.queue !== null) {
			clearTimeout( ResizeManager.queue );
		}
		ResizeManager.queue = setTimeout(function() {

			if (_container){
				var _defaultWidth = ResizeManager.defaultWidth;
				var _defaultHeight = ResizeManager.defaultHeight;
				var _currentWidth = ResizeManager.currentWidth();
				var _currentHeight = ResizeManager.currentHeight();
				var _currentScaleX = _currentWidth / _defaultWidth;
				var _currentScaleY = _currentHeight / _defaultHeight;
				var _targetWidth = 0;
				var _targetHeight = 0;

				var judge;
				if(_currentScaleX > _currentScaleY){
					judge = "<";
					_targetWidth  = Math.floor(_defaultWidth * _currentScaleY);
					_targetHeight = Math.floor(_defaultHeight * _currentScaleY);
				}
				else {
					judge = ">";
					_targetWidth  = Math.floor(_defaultWidth * _currentScaleX);
					_targetHeight = Math.floor(_defaultHeight * _currentScaleX);
				}

				//バッファ
				// _targetWidth -= 90;
				// _targetHeight -= 90;

				_container.style.width  = _targetWidth + 'px';
				_container.style.height = _targetHeight + 'px';
				/*
				$("canvas").css({
					'top':"100%",
					'left':"100%",
					//'margin-top': ''+(_currentHeight/2 - _container.height/2 - 40)+'px',
					'margin-left': ''+(_currentWidth/2-_targetWidth/2)+'px',
						'border':'4px solid #FF0000'
				});
				*/
			}
			clearTimeout( ResizeManager.queue );
			ResizeManager.queue = null;
		}, 50);
	};
    //__________________________________________________________________________________
    // set construct
    t90755.managers.resize.ResizeManager = ResizeManager;
}());