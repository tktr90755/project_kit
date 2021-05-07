import * as PIXI from 'pixi.js'
import {TweenMax, Expo} from "gsap";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;
const Item = t90755.managers.iterator.Item;

export default class Car extends PIXI.Container{
    constructor(name, item){
        super()
        this._dispatcher = new EventDispatcher()

        this.assetManager = null;
        this.shadow = null;
        this.body = null;
        this.rearTire = null;
        this.frontTire = null;
        this.name = name;
        this.item = item;
        this._addedBalloon = false;
    }

    initialize(){
        this.assetManager = Referer.get("AssetManager");

        this.body = new PIXI.Sprite(this.item.content())
        this.body.anchor.x = 0.5;
        this.body.anchor.y = 1;
        this.rearTire = new PIXI.Sprite(this.assetManager.resources.car_tire.texture)
        this.rearTire.anchor.x = 0.5;
        this.rearTire.anchor.y = 0.5;
        this.frontTire = new PIXI.Sprite(this.assetManager.resources.car_tire.texture)
        this.frontTire.anchor.x = 0.5;
        this.frontTire.anchor.y = 0.5;
        this.shadow = new PIXI.Sprite(this.assetManager.resources.car_shadow.texture)
        this.shadow.anchor.x = 0.5;
        this.shadow.anchor.y = 0.5;
        this.shadow.y = 42;
        if(this.item.name() === "car_body_white"){
            this.rearTire.x = -200;
            this.rearTire.y = -10;
            this.frontTire.x = 185;
            this.frontTire.y = -10;
        }else{
            this.rearTire.x = -200;
            this.rearTire.y = -10;
            this.frontTire.x = 192;
            this.frontTire.y = -10; 
        }
        
        this.addChild(this.shadow)
        this.addChild(this.body)
        this.addChild(this.frontTire)
        this.addChild(this.rearTire)

        this._dispatcher.dispatchEvent(new Event("initializeComplete"));
    };

    terminate(){
        this.removeChild(this.body)
        this.removeChild(this.frontTire)
        this.removeChild(this.rearTire)

        this._dispatcher.dispatchEvent(new Event("terminateComplete"));
    }

    appear(speed, from, to){
        this.x = from.x;
        this.y = from.y;
        TweenMax.to(this, speed, { x:to.x, y:to.y, 
            onUpdate:()=>{
                this._dispatcher.dispatchEvent(new Event("update"));
            },
            onComplete:()=>{
                this._dispatcher.dispatchEvent(new Event("appearComplete"));
            }
        })
    }

    disappear(speed,from, to){
        this.x = from.x;
        this.y = from.y;
        TweenMax.to(this, speed, { x:to.x, y:to.y, 
            onComplete:()=>{
                this._dispatcher.dispatchEvent(new Event("disappearComplete"));
            }
        })
    }

    get dispatcher(){
        return this._dispatcher;
    }

    get addedBalloon(){
        return this._addedBalloon;
    }

    set addedBalloon(v){
        this._addedBalloon = v;
    }
}