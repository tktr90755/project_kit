import * as PIXI from 'pixi.js'

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Sky extends PIXI.Container{
    constructor(){
        super()
        this._dispatcher = new EventDispatcher()

        this.assetManager = null;

        this.buildings = null;
        
        this._speed = 2;

        Referer.set(this, "City_Sky");
    }

    initialize(){
        this.assetManager = Referer.get("AssetManager");

        this.buildings = [];
        this.buildings.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_cloud.texture))
        this.buildings.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_cloud.texture))
        
        for(let i in this.buildings){
            if(i == 0){
                this.buildings[i].x = 229;
                this.buildings[i].y = -1039;
            }else if(i == 1){
                this.buildings[i].x = 1771;
                this.buildings[i].y = -1105;
            }
            this.addChild(this.buildings[i])
        }

        // this.resizeHandler();
        // this.startRendering();

        this._dispatcher.dispatchEvent(new Event("initializeComplete"));
    };

    //__________________________________________________________________________________
    // resize
    resizeHandler(){
        const self = Referer.get("City_Sky");
        const city = Referer.get("City");
        const road = Referer.get("City_Road");
        
        self.x = 0;
        self.y = window.innerHeight / city.scale.y - road.baseHeight;
    };

    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener("City_Sky") == false){
            EnterFrameManager.addListener(()=>{
                this._tick()
            }, "City_Sky");
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener("City_Sky") == true) EnterFrameManager.removeListener("City_Sky");
    };

    _tick(){
        if(this.x <= -(this.width)){
            this.x = this.width * 2;
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
}