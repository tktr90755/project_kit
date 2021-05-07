import * as PIXI from 'pixi.js'

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Road extends PIXI.Container{
    constructor(){
        super()
        this._dispatcher = new EventDispatcher()

        this.documentRoot = null;
        this.assetManager = null;
        this.street0 = null;
        this.street1 = null;
        this._speed = 7;

        Referer.set(this, "City_Road");
    }

    initialize(){
        this.documentRoot = Referer.get("DocumentRoot");
        this.assetManager = Referer.get("AssetManager");

        this.street0 = new PIXI.Sprite(this.assetManager.citySceneResources.city_street.texture)
        this.street0.width = this.documentRoot.baseWidth;
        this.street0.scale.y = this.street0.scale.x;
        this.addChild(this.street0)
        this.street1 = new PIXI.Sprite(this.assetManager.citySceneResources.city_street.texture)
        this.street1.width = this.documentRoot.baseWidth;
        this.street1.scale.y = this.street1.scale.x;
        this.street1.x = this.street0.width;
        this.addChild(this.street1)
        
        // this.resizeHandler();
        // this.startRendering();

        this._dispatcher.dispatchEvent(new Event("initializeComplete"));
    };

    //__________________________________________________________________________________
    // resize
    resizeHandler(){
        const self = Referer.get("City_Road");
        const city = Referer.get("City");
        
        self.x = 0;
        self.y = window.innerHeight / city.scale.y - self.baseHeight;
    };

    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener("City_Road") == false){
            EnterFrameManager.addListener(()=>{
                this._tick()
            }, "City_Road");
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener("City_Road") == true) EnterFrameManager.removeListener("City_Road");
    };

    _tick(){
        if(this.x <= -(this.street0.width)){
            this.x = 0;
        }
        this.x -= this._speed;
    };

    get speed(){
        return this._speed;
    }

    set speed(v){
        this._speed = v;
    }

    get dispatcher(){
        return this._dispatcher;
    }

    get baseHeight(){
        return 499;//道路を追加する前のheight
    }
}