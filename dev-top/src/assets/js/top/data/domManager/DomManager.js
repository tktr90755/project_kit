import {TweenMax, Expo} from "gsap";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const EnterFrameManager = t90755.managers.EnterFrameManager;
const Referer = t90755.data.Referer;
export default class DomManager{
    constructor(){
        this._dispatcher = new EventDispatcher()

        this._header = null;
        this._wrapper = null;
        this._container = null;
        this._header = null;
        this._icon = null;
        this._iconH1 = null;
        this._iconP0 = null;
        this._iconP1 = null;
        this._caption = null;
        this.resizeTimer = null;
        this._loading = null;
        this._progress = null;
        this._mouseX = 0;
        this._mouseY = 0;
        this._scrollTop = this.getScrollTop();
        this._progress = 0;
        this._delayProgress = 0;
        this._realProgress = 0;
        Referer.set(this,"DomManager");
    }
    initialize(){
        // this._header = document.getElementById("header");
        // this._wrapper = document.getElementById("wrapper");
        // this._container = this._wrapper.getElementsByClassName("container")[0];
        // this._header = this._container.getElementsByClassName("header")[0];
        // this._icon = this._header.getElementsByClassName("icon")[0];
        // this._caption = this._container.getElementsByClassName("caption")[0];
        // this._loading = document.getElementById("loading");
        // this._progress = this._loading.getElementsByClassName("progress")[0];

        // if(window.innerWidth >= 737){
        //     this._header.style.height = (window.innerHeight - 52 ) + 'px';
        // }else{
        //     this._header.style.height = (window.innerHeight - 47 - this._caption.clientHeight) + 'px';
        // }

        // var iconValue={opacity:0};
        // TweenMax.to(iconValue,0.5,{delay:1, opacity:1, onUpdate:function(){
        //     var __wrapper = document.getElementById("wrapper");
        //     var __container = _wrapper.getElementsByClassName("container")[0];
        //     var __header = __container.getElementsByClassName("header")[0];
        //     var __icon = __header.getElementsByClassName("icon")[0];
        //     __icon.style.opacity = iconValue.opacity;
        // }})

        // フォントをロード
        // if(Ts){
        //   Ts.reload();
        //   Ts.onPostComplete(function(res) {
        //   // console.log(res);
        //   if (res.code === 0 && res.font[0].name === "新ゴ U") {
        //           // console.log('フォント取得完了');
  
        //           // canvasに入力
        //           setTimeout(() => {
        //               // this.container.children[0].text = this.inputText + 'FAMILY';
        //           } , 400);
        //       }
        //   });
        // }

        this.setScroll();
        this.setMouse();
        const serialList = new SerialList( "DomManager initialize" );
        serialList.push([
            new Command( ()=>{this._dispatcher.dispatchEvent(new Event("initializeComplete"));} )
        ]);
        serialList.execute();
    };

    appearSiteLogo(){
        // this._icon.style.opacity = 0;
        // // this._icon.style.display = 'block';
        // this._icon.style.visibility = 'visible';

        // let o = { opacity:0 };
        // TweenMax.to(o, 0.5, { delay:0.5, opacity:1, ease:Expo.easeOut,
        //     onUpdate:()=>{
        //         this._icon.style.opacity = o.opacity;
        //     },
        //     onComplete:()=>{
        //         this._dispatcher.dispatchEvent(new Event("appearSiteLogoComplete"));
        //     }
        // })
    }

    setScroll(){
        window.addEventListener( "scroll", ()=> {
            // this._scrollTop = this.getScrollTop();
            // this._dispatcher.dispatchEvent(new Event("scroll"));

            // if(window.innerWidth > 736)return;
            // if(this._scrollTop >= 300){
            //     if(String(this._header.className).indexOf("is-top") !== -1){
            //         this._header.classList.remove("is-top");
            //     }
            // }else{
            //     if(String(this._header.className).indexOf("is-top") == -1){
            //         this._header.classList.add("is-top");
            //     }
            // }
        });
    }
    
    getScrollTop(){
        // let __scrollTop = 0;
        // if(document.scrollingElement)__scrollTop = document.scrollingElement.scrollTop;
        // if(document.documentElement)__scrollTop = document.documentElement.scrollTop;
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    setMouse(){
        if(window.onmousemove == null){
            window.onmousemove =(e)=>{
                this._dispatcher.dispatchEvent(new Event("onmousemove"));
                if(!e) e = window.event;
                this._mouseX = e.clientX;
                this._mouseY = e.clientY;
            };
        }
    }

    //__________________________________________________________________________________
    // resize
    resizeHandler(){
        // const self = Referer.get("DomManager");
        // if (self.resizeTimer !== false) {
        //     clearTimeout(self.resizeTimer);
        // }
        // self.resizeTimer = setTimeout(()=> {
        //     this._FREED365header = document.getElementById("FREED365header");
        //     const marginTop = (window.innerWidth > 736)?105:-(this._FREED365header.clientHeight + 5);
        //     // self._icon.style.marginTop = marginTop + 'px';
        //     // if(window.innerWidth >= 737 && window.innerWidth <= 1330){
        //     //     const scale = window.innerWidth / 1330;
        //     //     this._container.style.webkitTransform = "scale(" + scale + "," + scale + ")";
        //     // }else{
        //     //     this._container.style.webkitTransform = "scale(1,1)";
        //     // }
        // }, 10);
    };

    //__________________________________________________________________________________
    // 
    setLoader(progress){
        // this._progress.textContent = Math.floor(progress) + "%";
        this._realProgress = progress;
        this.setLoadingRender();
    }

    setLoadingRender(){
        if(EnterFrameManager.hasListener("LoadingRender") == false){
            EnterFrameManager.addListener(()=>{
                this.tick()
            }, "LoadingRender");
        }
    };

    killLoadingRender(){
        if(EnterFrameManager.hasListener("LoadingRender") == true) EnterFrameManager.removeListener("LoadingRender");
    };

    tick(){
        if(this._delayProgress <= 99.5){
            this._delayProgress +=(this._realProgress - this._delayProgress) / 5;
            // this._progress.textContent = Math.floor(this._delayProgress) + "%";
        }else{
            // this._progress.textContent = "100%";
            this.killLoadingRender();
        }
    };

    get userAgent(){
        //true pc / false sp
        return !navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)
    }
    get dispatcher(){
        return this._dispatcher;
    }
    get scrollTop(){
        return this._scrollTop;
    }
    get mouseX(){
        return this._mouseX;
    }

    get mouseY(){
        return this._mouseY;
    }
}