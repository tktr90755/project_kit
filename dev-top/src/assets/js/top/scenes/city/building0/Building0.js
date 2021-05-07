import * as PIXI from 'pixi.js'
import {TweenMax, Expo} from "gsap";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Building0 extends PIXI.Container{
    constructor(){
        super()
        this._dispatcher = new EventDispatcher()

        this.assetManager = null;

        this.buildingsContainer0 = null;
        this.buildingsContainer1 = null;
        this.buildings0 = null;
        this.buildings1 = null;

        this._speed = 6;

        Referer.set(this, "City_Building0");
    }

    initialize(){
        this.assetManager = Referer.get("AssetManager");

        this.buildingsContainer0 = new PIXI.Container();
        this.buildingsContainer1 = new PIXI.Container();
        this.addChild(this.buildingsContainer0);
        this.addChild(this.buildingsContainer1);

        this.buildings0 = [];
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront1.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront2.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront3.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront4.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront5.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront6.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront7.texture))
        this.buildings0.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront8.texture))
        
        this.buildings1 = [];
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront1.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront2.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront3.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront4.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront5.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront6.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront7.texture))
        this.buildings1.push(new PIXI.Sprite(this.assetManager.citySceneResources.city_buildingFront8.texture))

        let i = 0;
        let _width = 0;
        
        for(i in this.buildings0){
            if(i == 1 || i == 2 || i == 6 || i == 7){
                this.buildings0[i].x = _width - 10;
            }else{
                this.buildings0[i].x = _width;
            }
            _width += this.buildings0[i].width;
            this.buildingsContainer0.addChild(this.buildings0[i])
        }

        _width = 0;

        for(i in this.buildings1){
            if(i == 1 || i == 2 || i == 6 || i == 7){
                this.buildings1[i].x = _width - 10;
            }else{
                this.buildings1[i].x = _width;
            }
            _width += this.buildings1[i].width;
            this.buildingsContainer1.addChild(this.buildings1[i])
        }

        this.buildingsContainer1.x = this.buildingsContainer0.width;

        // this.resizeHandler();
        // this.startRendering();
        
        this._dispatcher.dispatchEvent(new Event("initializeComplete"));
    };

    appear(){
        let delayCount = 0;
        const startTime = 1;
        let i = 0;
        for(i in this.buildings0){
            this.buildings0[i].y = 0;
            TweenMax.to(this.buildings0[i], 1.0, { delay:(delayCount * 0.2) + startTime, ease:Expo.easeOut, y:-(this.buildings0[i].height) });
            delayCount++;
        }

        delayCount = 0;

        for(i in this.buildings1){
            this.buildings1[i].y = 0;
            TweenMax.to(this.buildings1[i], 1.0, { delay:(delayCount * 0.2) + startTime, ease:Expo.easeOut, y:-(this.buildings1[i].height) });
            delayCount++;
        }
    }
    //__________________________________________________________________________________
    // resize
    resizeHandler(){
        const self = Referer.get("City_Building0");
        const city = Referer.get("City");
        const road = Referer.get("City_Road");
        
        self.x = 0;
        self.y = window.innerHeight / city.scale.y - road.baseHeight;
    };

    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener("City_Building0") == false){
            EnterFrameManager.addListener(()=>{
                this._tick()
            }, "City_Building0");
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener("City_Building0") == true) EnterFrameManager.removeListener("City_Building0");
    };

    _tick(){
        if(this.x <= -(this.buildingsContainer0.width)){
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