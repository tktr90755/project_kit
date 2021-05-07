import * as PIXI from "pixi.js";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
export default class AssetManager {
  constructor() {
    this._dispatcher = new EventDispatcher();
    this._resources = null;
    this._citySceneResources = null;
    this._mountainsSceneResources = null;
    this._nightCitySceneResources = null;
    this._planeSceneResources = null;

    Referer.set(this, "AssetManager");
  }

  initialize(){
    const serialList = new SerialList( "AssetManager initialize" );
    // serialList.debug = true;  
    serialList.push([
        new Command( ()=>{this.loadImages()}, null, this._dispatcher, "loadImagesComplete" ),
        new Command( ()=>{this._dispatcher.dispatchEvent(new Event("initializeComplete"));} )
    ]);
    serialList.execute();
  };

  loadImages(){
      const loader = new PIXI.Loader();
      loader
      //background
      .add('city_background','./assets/images/head/background.png')

      .on('progress', (loader)=>{
          // console.log("onProgressCallback",loader.progress)
      })
      .load((loader, resources) => {
          // console.log("callback",resources.img1.texture)
          this._resources = resources;
          this._dispatcher.dispatchEvent(new Event("loadImagesComplete"));
      });
  }

  loadSceneImages(){
    const documentRoot = Referer.get("DocumentRoot");

    // const scene0Name = documentRoot.scenes.pickup(0).name();
    // const scene1Name = documentRoot.scenes.pickup(1).name();
    // const scene2Name = documentRoot.scenes.pickup(2).name();
    // const scene3Name = documentRoot.scenes.pickup(3).name();
    // const scene0Content = documentRoot.scenes.pickup(0).content();
    // const scene1Content = documentRoot.scenes.pickup(1).content();
    // const scene2Content = documentRoot.scenes.pickup(2).content();
    // const scene3Content = documentRoot.scenes.pickup(3).content();

    const serialList = new SerialList( "AssetManager loadSceneImages" );
    serialList.push([
      new Command( ()=>{this._dispatcher.dispatchEvent(new Event("loadSceneImagesComplete"));}),//第一シーン読み込みで一旦終了する場合
      new Command( ()=>{this.loadSceneImage("city", true)}, null, this._dispatcher, "loadSceneImageComplete" + "city" ),
      new Command( ()=>{documentRoot.cityScene.initialize()}, null, documentRoot.cityScene.dispatcher, "initializeComplete" ),

      // new Command( ()=>{this._dispatcher.dispatchEvent(new Event("loadSceneImagesComplete"));}),//第一シーン読み込みで一旦終了する場合

      // new Command( ()=>{this.loadSceneImage(scene1Name, false)}, null, this._dispatcher, "loadSceneImageComplete" + scene1Name ),
      // new Command( ()=>{scene1Content.initialize()}, null, scene1Content.dispatcher, "initializeComplete" ),

      // new Command( ()=>{this.loadSceneImage(scene2Name, false)}, null, this._dispatcher, "loadSceneImageComplete" + scene2Name ),
      // new Command( ()=>{scene2Content.initialize()}, null, scene2Content.dispatcher, "initializeComplete" ),

      // new Command( ()=>{this.loadSceneImage(scene3Name, false)}, null, this._dispatcher, "loadSceneImageComplete" + scene3Name ),
      // new Command( ()=>{scene3Content.initialize()}, null, scene3Content.dispatcher, "initializeComplete" ),

      // new Command( ()=>{this._dispatcher.dispatchEvent(new Event("loadSceneImagesComplete"));}),//全部の読み込みを待つならこっち
    ])
    serialList.execute();
  }

  get resources() {
    return this._resources;
  }

  get dispatcher() {
    return this._dispatcher;
  }
}
