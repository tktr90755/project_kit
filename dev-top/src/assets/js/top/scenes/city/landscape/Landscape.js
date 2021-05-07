import * as PIXI from 'pixi.js'

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Landscape extends PIXI.Container{
    constructor(){
        super()
        this._dispatcher = new EventDispatcher()

        this.assetManager = null;

        this.assets = null;
        this._speed = 1;
        Referer.set(this, "City_Landscape");
    }

    initialize(){
        this.assetManager = Referer.get("AssetManager");

        this.assets = [];
        this.assets.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_landscape.texture))
        
        for(let i in this.assets){
            if(i == 0){
                this.assets[i].x = 100;
                this.assets[i].y = -(this.assets[i].height + 522);
            }
            this.addChild(this.assets[i])
        }

        this._dispatcher.dispatchEvent(new Event("initializeComplete"));
    };
    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener("City_Landscape") == false){
            EnterFrameManager.addListener(()=>{
                this.tick()
            }, "City_Landscape");
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener("City_Landscape") == true) EnterFrameManager.removeListener("City_Landscape");
    };

    tick(){
        if(this.x <= -(this.width)){
            this.x = window.innerWidth;
        }
        this.x -= this._speed;
    };
    //__________________________________________________________________________________
    // resize
    resizeHandler(){
        const self = Referer.get("City_Landscape");
        const city = Referer.get("City");
        const road = Referer.get("City_Road");
        
        self.x = 0;
        self.y = window.innerHeight / city.scale.y - road.baseHeight;
    };

    get dispatcher(){
        return this._dispatcher;
    }
}