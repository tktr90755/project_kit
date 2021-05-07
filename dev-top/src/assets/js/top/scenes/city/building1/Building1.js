import * as PIXI from 'pixi.js'
import {TweenMax, Expo} from "gsap";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Building1 extends PIXI.Container{
    constructor(){
        super()
        this._dispatcher = new EventDispatcher()

        this.assetManager = null;

        this.buildingsContainer0 = null;
        this.buildingsContainer1 = null;
        this.buildings0 = null;
        this.buildings1 = null;
        this.buildingsAll = null;

        this._speed = 5;
        this._widthHalf = 0;

        Referer.set(this, "City_Building1");
    }

    initialize(){
        this.assetManager = Referer.get("AssetManager");

        this.buildingsContainer0 = new PIXI.Container();
        this.buildingsContainer1 = new PIXI.Container();
        this.addChild(this.buildingsContainer0);
        this.addChild(this.buildingsContainer1);

        this.buildings0 = [];
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack1.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack2.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack3.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack4.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack5.texture))
        
        this.buildings1 = [];
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack1.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack2.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack3.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack4.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingBack5.texture))

        this.buildingsAll = [];

        let i = 0;
        for(i in this.buildings0){
            if(i == 0){
                this.buildings0[i].x = 787;
                this.buildings0[i].y = -(this.buildings0[i].height);
                this.buildingsContainer0.addChild(this.buildings0[i])
            }else if(i == 1){
                this.buildings0[i].x = 1051;
                this.buildings0[i].y = -(this.buildings0[i].height);
                this.buildingsContainer0.addChild(this.buildings0[i])
            }else if(i == 2){
                this.buildings0[i].x = 1484;
                this.buildings0[i].y = -360;
                this.buildingsContainer0.addChild(this.buildings0[i])
            }else if(i == 3){
                this.buildings0[i].x = 2256;
                this.buildings0[i].y = -(this.buildings0[i].height);
                this.buildingsContainer0.addChild(this.buildings0[i])
            }else if(i == 4){
                this.buildings0[i].x = 2093;
                this.buildings0[i].y = -(this.buildings0[i].height);
                this.buildingsContainer0.addChildAt(this.buildings0[i], 0)
                this._widthHalf = this.buildingsContainer0.width + (787 + this.buildings0[0].width);
            }
            this.buildingsAll.push(this.buildings0[i]);
        }

        for(i in this.buildings1){
            if(i == 0){
                this.buildings1[i].x = 787;
                this.buildings1[i].y = -(this.buildings1[i].height);
                this.buildingsContainer1.addChild(this.buildings1[i])
            }else if(i == 1){
                this.buildings1[i].x = 1051;
                this.buildings1[i].y = -(this.buildings1[i].height);
                this.buildingsContainer1.addChild(this.buildings1[i])
            }else if(i == 2){
                this.buildings1[i].x = 1484;
                this.buildings1[i].y = -360;
                this.buildingsContainer1.addChild(this.buildings1[i])
            }else if(i == 3){
                this.buildings1[i].x = 2256;
                this.buildings1[i].y = -(this.buildings1[i].height);
                this.buildingsContainer1.addChild(this.buildings1[i])
            }else if(i == 4){
                this.buildings1[i].x = 2093;
                this.buildings1[i].y = -(this.buildings1[i].height);
                this.buildingsContainer1.addChildAt(this.buildings1[i], 0)
            }
            this.buildingsAll.push(this.buildings1[i]);
        }

        this.buildingsContainer1.x = this._widthHalf;

        // this.resizeHandler();
        // this.startRendering();
        this._dispatcher.dispatchEvent(new Event("initializeComplete"));
    };

    appear(){
        const startTime = 2;
        let i;
        for(i in this.buildingsAll){
            const targetY = this.buildingsAll[i].y;
            this.buildingsAll[i].y = 0;
            TweenMax.to(this.buildingsAll[i], 1.0, { delay:(i * 0.2) + startTime, ease:Expo.easeOut, y:targetY });
        }
    }
    //__________________________________________________________________________________
    // resize
    resizeHandler(){
        const self = Referer.get("City_Building1");
        const city = Referer.get("City");
        const road = Referer.get("City_Road");
        
        self.x = 0;
        self.y = window.innerHeight / city.scale.y - road.baseHeight;
    };

    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener("City_Building1") == false){
            EnterFrameManager.addListener(()=>{
                this._tick()
            }, "City_Building1");
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener("City_Building1") == true) EnterFrameManager.removeListener("City_Building1");
    };

    _tick(){
        if(this.x <= -(this._widthHalf)){
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