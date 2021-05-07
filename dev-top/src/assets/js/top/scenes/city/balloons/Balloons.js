import * as PIXI from 'pixi.js'
import Balloon from './Balloon.js'

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;
const Item = t90755.managers.iterator.Item;
const Iterator = t90755.managers.iterator.Iterator;

export default class Balloons extends PIXI.Container{
    constructor(){
        super()
        this._dispatcher = new EventDispatcher();
        this.assetManager = null;

        this.addCount = 0;
        this.textures = null;
        this.comments = null;

        Referer.set(this, "City_Balloons");
    }

    initialize(){
        this.assetManager = Referer.get("AssetManager");

        this.textures = new Iterator();
        this.textures.addItem(new Item({texture:this.assetManager.resources.balloon_background_0.texture, color:"#ef6a18"}, "texture0"));
        this.textures.addItem(new Item({texture:this.assetManager.resources.balloon_background_1.texture, color:"#ffdc01"}, "texture1"));
        this.textures.addItem(new Item({texture:this.assetManager.resources.balloon_background_2.texture, color:"#94dbdf"}, "texture2"));
        this.textures.addItem(new Item({texture:this.assetManager.resources.balloon_background_3.texture, color:"#ffdc01"}, "texture3"));
        this.textures.addItem(new Item({texture:this.assetManager.resources.balloon_background_4.texture, color:"#2d355a"}, "texture4"));
        this.textures.addItem(new Item({texture:this.assetManager.resources.balloon_background_5.texture, color:"#94dbdf"}, "texture5"));

        const balloonTexts = this.assetManager.balloonTexts;
        this.comments = new Iterator();
        for(let i in balloonTexts){
            const balloonText= balloonTexts[i];
            if(balloonText.scene === "シーン1：街並み"){
                this.comments.addItem(new Item({comment:balloonText.comment, user:balloonText.user}, "comment" + i));
            }
        }

        const serialList = new SerialList( "Balloons initialize" );
        serialList.push([
            new Command( ()=>{ 
                // this.startRendering();
                // this.resizeHandler();
            }),
            new Command( ()=>{ this._dispatcher.dispatchEvent(new Event("initializeComplete")); } )
        ]);
        serialList.execute();
    };

    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener("City_Balloons_render") == false){
            EnterFrameManager.addListener(()=>{
                this.tick()
            }, "City_Balloons_render");
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener("City_Balloons_render") == true) EnterFrameManager.removeListener("City_Balloons_render");
    };

    tick(){
        
    };

    //__________________________________________________________________________________
    // add Balloon
    addBalloon(x, y){
        const comment = this.comments.shuffle().content();
        const data = this.textures.shuffle().content();
        const balloon = new Balloon("balloon" + this.addCount + Math.random(), data, comment.comment, comment.user, x, y, ()=>{
            this.removeChild(balloon);
        })
        this.addChild(balloon);
        this.addCount++;
    }

    //__________________________________________________________________________________
    // resize
    resizeHandler(){
        const self = Referer.get("City_Balloons");
        const city = Referer.get("City");
        const road = Referer.get("City_Road");
        
        self.x = 0;
        self.y = window.innerHeight / city.scale.y - road.baseHeight;
    };

    get dispatcher(){
        return this._dispatcher;
    }
}