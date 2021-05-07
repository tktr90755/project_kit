import * as PIXI from 'pixi.js'
import AssetManager from './data/assetManager/AssetManager.js'
import DomManager from './data/domManager/DomManager.js'
import City from './scenes/city/City.js'

import Mat from './scenes/mat/Mat.js'

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;
const Item = t90755.managers.iterator.Item;
const Iterator = t90755.managers.iterator.Iterator;

export default class DocumentRoot{
    constructor(){ 
        t90755.managers.EnterFrameManager.fps = 60;
        this.efm = t90755.managers.EnterFrameManager;

        this._wrapper = null;
        this._canvasContainer = null;
        this._app = null;

        this.baseWidth = 1400;
        this.baseHeight = 776;
        this.interval = 0;

        this._dispatcher = new EventDispatcher() 
        this.assetManager = new AssetManager()
        this.domManager = new DomManager()
        this.cityScene = new City();
        this.mat = new Mat();

        Referer.set(this, "DocumentRoot");
    }

    initialize(){
        const serialList = new SerialList( "DocumentRoot initialize" );
        // serialList.debug = true;
        serialList.push([
            new Command( ()=>{this.domManager.initialize()}, null, this.domManager.dispatcher, "initializeComplete" ),
            new Command( ()=>{this.setCanvas()}, null, this._dispatcher, "setCanvasComplete" ),
            new Command( ()=>{this.assetManager.initialize()}, null, this.assetManager.dispatcher, "initializeComplete" ),
            new Command( ()=>{this.mat.initialize()}, null, this.mat.dispatcher, "initializeComplete" ),
            new Command( ()=>{this.setResize()} ),
            new Command( ()=>{this.initLoading() }, null, this._dispatcher, "initLoadingComplete" ),
            new Command( ()=>{this.cityScene.initialize() }, null, this.cityScene.dispatcher, "initializeComplete" ),
            new Command( ()=>{this.mat.initialize() }, null, this.mat.dispatcher, "initializeComplete" ),
            new Command( ()=>{
              this._app.stage.addChildAt(this.cityScene,0);
              this.cityScene.appear();
            }, null, this.cityScene.dispatcher, "appearComplete" ),
            new Command( ()=>{
                this._app.stage.addChildAt(this.mat, 1);
            })
        ]);
        serialList.execute();
    };

    setCanvas(){
        this._wrapper = document.getElementById("wrapper");
        this._canvasContainer = this._wrapper.getElementsByClassName("canvasContainer")[0];
        this._app = new PIXI.Application(window.innerWidth, window.innerHeight, { transparent: true });
        this._canvasContainer.appendChild(this._app.view);
        this._app.renderer.backgroundColor = 0xe5f6f7;

        Referer.set(this._app, "DocumentRoot.app");
        Referer.set(this._app.stage, "DocumentRoot.app.stage");
        Referer.set(this._app.renderer, "DocumentRoot.app.renderer");

        this._dispatcher.dispatchEvent(new Event("setCanvasComplete"));
    };

    initLoading(){
        const loading = this._wrapper.getElementsByClassName("loading")[0];
        TweenMax.to(loading,1.0,{opacity:0,onComplete:()=>{
            loading.style.display = "none";
            this._dispatcher.dispatchEvent(new Event("initLoadingComplete"));
        }});
    }
    
    //__________________________________________________________________________________
    // resize
    setResize(){
        window.addEventListener("resize", this.resizeHandler);
        this.resizeHandler(null);
    };

    killResize(){
        window.removeEventListener("resize", this.resizeHandler);
    };

    resizeHandler(e){
        const self = Referer.get("DocumentRoot");
        const app = Referer.get("DocumentRoot.app");
        const domManager = Referer.get("DomManager");
        const assetManager = Referer.get("AssetManager");

        const w = window.innerWidth;
        const h = window.innerHeight;
        app.renderer.resize(w, h);

        if(self.cityScene.initialized === true) self.cityScene.resizeHandler();

        self.mat.resizeHandler();
        domManager.resizeHandler();
    };
}

function windowOnLoad(e){
    window.removeEventListener("load", windowOnLoad, false);
    const dr = new DocumentRoot();
    dr.initialize()
}
window.addEventListener("load", windowOnLoad, false);


