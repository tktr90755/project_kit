import * as PIXI from 'pixi.js'

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Mountain extends PIXI.Container{
    constructor(){
        super()
        this._dispatcher = new EventDispatcher()

        this.assetManager = null;

        this.buildings = null;
        this.cityBuilding0 = null;

        this._speed = 3;

        Referer.set(this, "City_Mountain");
    }

    initialize(){
        this.assetManager = Referer.get("AssetManager");
        this.cityBuilding0 = Referer.get("City_Building0");

        this.buildings = [];
        this.buildings.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_mountain.texture))
        this.buildings.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_plant.texture))
        
        for(let i in this.buildings){
            if(i == 0){
                this.buildings[i].x = 924;
                this.buildings[i].y = -(this.buildings[i].height - 262);
            }else if(i == 1){
                this.buildings[i].x = 936;
                this.buildings[i].y = -(this.buildings[i].height);
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
        const self = Referer.get("City_Mountain");
        const city = Referer.get("City");
        const road = Referer.get("City_Road");
        
        self.x = 0;
        self.y = window.innerHeight / city.scale.y - road.baseHeight;
    };

    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener("City_Mountain") == false){
            EnterFrameManager.addListener(()=>{
                this._tick()
            }, "City_Mountain");
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener("City_Mountain") == true) EnterFrameManager.removeListener("City_Mountain");
    };

    _tick(){
        if(this.x <= -(this.buildings[0].width)){
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
}