 /**
 * Copyright 2015, "t90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title t90755.net.MultipleLoader.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
//Sample of JSON file "user_data.json"
{
    "current_time": 1381329076, 
    "user_data": [
        {
            "id": 216561, 
            "thumbnail": "https://pbs.twimg.com/profile_images/424872299901091840/GBIwDP5S_bigger.jpeg", 
            "rank": 100, 
            "score": 10200,
            "items": [
                {
            "name": "白手袋",
            "id": "0",
            "have": "1"
                }, 
                {
            "name": "電卓",
            "id": "1",
            "have": "1"
                }, 
                {
            "name": "メジャー",
            "id": "2",
            "have": "1"
                }, 
                {
            "name": "金のブラ",
            "id": "3",
            "have": "1"
                }, 
                {
            "name": "銀のブラ",
            "id": "4",
            "have": "3"
                }, 
                {
            "name": "プラチナのブラ",
            "id": "5",
            "have": "0"
                }
            ]
        }
    ]
}
// How to use
var multipleLoader = new t90755.net.MultipleLoader(function(){
    var response = multipleLoader.content.replace(/\\'/g, "'");
    var json = JSON.parse(response);
    var userData = json;
    console.log("userData.current_time:" + userData.current_time);
});
multipleLoader.load("user_data.json", null, "GET");
*/
// namespace:
this.t90755 = this.t90755||{};
this.t90755.net = this.t90755.net||{};
(function() {

    function MultipleLoader ($callback) {
        // classes
        var Event = t90755.events.Event;
        var EventDispatcher = t90755.events.EventDispatcher;
        // instances
        
        // refers
        var s = this;
        // for inherits
        
        // consts

        // members
        var _request;
        var _requestType;
        var _loader;
        var _urlLoader;
        var _info;
        var _callback;

        var _total;
        var _loaded;
        var _percent;
        var _postData;
        var _getData;
        var _content = null;

        var _dispatcher = new EventDispatcher(s);
        //__________________________________________________________________________________
        // constructer
        var construct = function($callback){
            _callback = $callback;
        };
        
        //__________________________________________________________________________________
        // リアクション
        s.load = function ($path, $variables, $requestType) {
            loaderInitHandler();
            if ($requestType === null || $requestType === undefined ) {
                _requestType = getType($path, $variables);
            }else{
                _requestType = $requestType;//リクエストタイプを強制指定
            }
            var xhr = null;
            var result = null;
            switch(_requestType)
            {
                case "SWF":
                case "PNG":
                case "JPG":
                case "GIF":
                    
                break;
                case "TXT":
                case "XML":
                case "MQO":
                case "WRL":
                case "FBX":
                case "CSV":
                case "JSON":
                    
                break;
                case "POST":
                    xhr = new XMLHttpRequest();
                    xhr.open('POST', $path, true);
                    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
                    xhr.onreadystatechange = function(){
                        if(xhr.status === 404){
                            loadIOErrorHandler();
                        }else{
                            if(xhr.readyState === 0){ }
                            else if(xhr.readyState === 1){ loaderProgressHandler(); }
                            else if(xhr.readyState === 2){ }
                            else if(xhr.readyState === 3){ }
                            else if(xhr.readyState === 4){
                                if (xhr.status === 200){
                                    result = document.getElementById('xhr-result1');
                                    _content = xhr.responseText;
                                }else if(xhr.status === 0){
                                    result = document.getElementById('xhr-result1');
                                    _content = xhr.responseText;
                                }
                                loaderCompleteHandler();
                            }
                        }
                    };
                    var postData = encodeHTMLForm( $variables );
                    xhr.send(postData);
                break;
                case "GET":
                    xhr = new XMLHttpRequest();
                    xhr.open('GET', $path, true);
                    xhr.onreadystatechange = function(){
                        if(xhr.status === 404){
                            loadIOErrorHandler();
                        }else{
                            if(xhr.readyState === 0){ }
                            else if(xhr.readyState === 1){ loaderProgressHandler(); }
                            else if(xhr.readyState === 2){ }
                            else if(xhr.readyState === 3){ }
                            else if(xhr.readyState === 4){
                                 if(xhr.status === 200){
                                    result = document.getElementById('xhr-result1');
                                    _content = xhr.responseText;
                                }else if(xhr.status === 0){
                                    result = document.getElementById('xhr-result1');
                                    _content = xhr.responseText;
                                }
                                loaderCompleteHandler();
                            }
                        }
                    };
                    xhr.send(null);
                break;
                default :console.log("["+ MultipleLoader.CLASS_PATH +"]requestType[", _requestType, "]が空もしくは対応外です。");
            }
        };

        s.kill = function ($value) {
            
        };

        s.cancel = function ($value) {
            
        };

        //__________________________________________________________________________________
        // ハンドラ
        var loaderInitHandler = function () {
            _dispatcher.dispatchEvent(new Event(Event.INIT));
        };

        var loaderProgressHandler = function () {
            _dispatcher.dispatchEvent(new Event(Event.RENDER));
        };

        var loaderCompleteHandler = function () {
            if(_callback!==null||_callback!==undefined)_callback();
            _dispatcher.dispatchEvent(new Event(Event.COMPLETE));
        };

        var loadIOErrorHandler = function () {
            _dispatcher.dispatchEvent(new Event(Event.IO_ERROR));
        };

        var loadSecurityHandler = function () {
            _dispatcher.dispatchEvent(new Event(Event.SECURITY_ERROR));
        };

        //__________________________________________________________________________________
        // 
        if (!window.XMLHttpRequest){
            XMLHttpRequest = function(){
                try{
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                }catch(e){}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                }catch(e){}
                try{
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }catch(e){}
                throw new Error("This browser does not support XMLHttpRequest.");
            };
        }

        var getType = function ($path, $variables) {
            var type = "";
            var extension = $path.slice($path.length - 4, $path.length); 　//拡張子
            extension = extension.toLowerCase();
            if      (extension == ".swf")                               { type = "SWF"; }
            else if (extension == ".png")                               { type = "PNG"; }
            else if (extension == ".gif")                               { type = "GIF"; }
            else if (extension == ".jpg")                               { type = "JPG"; }
            else if (extension == "jpeg")                               { type = "JPG"; }
            else if (extension == "json")                               { type = "JSON"; }
            else if (extension == ".txt")                               { type = "TXT"; }
            else if (extension == ".mqo")                               { type = "MQO"; }
            else if (extension == ".fbx")                               { type = "FBX"; }
            else if (extension == ".wrl")                               { type = "WRL"; }
            else if (extension == ".xml")                               { type = "XML"; }
            else if (extension == ".csv")                               { type = "CSV"; }
            else if (extension == ".php" && $variables !== undefined)   { type = "POST"; }
            else if (extension == ".php" && $variables === undefined)   { type = "GET"; }
            return type;
        };

        var encodeHTMLForm = function( $data ){
            var params = [];
            for( var name in $data )
            {
                var value = $data[ name ];
                var param = "";
                param += encodeURIComponent( name ).replace( /%20/g, '+' );
                param += '=';
                param += encodeURIComponent( value ).replace( /%20/g, '+' );
                params.push( param );
            }
            return params.join( '&' );
        };

        //__________________________________________________________________________________
        // getter & setter
        s.dispatcher = function(){
            return _dispatcher;
        };

        //__________________________________________________________________________________
        // getter 
        Object.defineProperty(s, "request", {
          get: function () {
            return _request;
          }
        });

        Object.defineProperty(s, "total", {
          get: function () {
            return _total;
          }
        });

        Object.defineProperty(s, "loaded", {
          get: function () {
            return _loaded;
          }
        });

        Object.defineProperty(s, "percent", {
          get: function () {
            return _percent;
          }
        });

        Object.defineProperty(s, "postData", {
          get: function () {
            return _postData;
          }
        });

        Object.defineProperty(s, "getData", {
          get: function () {
            return _getData;
          }
        });
        
        Object.defineProperty(s, "content", {
          get: function () {
            return _content;
          }
        });
        
        //__________________________________________________________________________________
        // return
        return construct($callback);
    }

    //__________________________________________________________________________________
    // statics

    //const
    MultipleLoader.CLASS_PATH = "t90755.net.MultipleLoader.";
    

    //__________________________________________________________________________________
    // set construct
    t90755.net.MultipleLoader = MultipleLoader;
    //__________________________________________________________________________________
    // set inherits

}());