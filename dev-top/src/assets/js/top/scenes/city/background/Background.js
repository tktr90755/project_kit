import * as PIXI from "pixi.js";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Background extends PIXI.Container {
  constructor() {
    super();
    this._dispatcher = new EventDispatcher();

    this.documentRoot = null;
    this.assetManager = null;
    this.sky0 = null;
    this.sky1 = null;

    this._speed = 0.5;

    Referer.set(this, "City_Background");
  }

  initialize() {
    this.documentRoot = Referer.get("DocumentRoot");
    this.assetManager = Referer.get("AssetManager");

    // this.resizeHandler();
    // this.startRendering();
    this._dispatcher.dispatchEvent(new Event("initializeComplete"));
  }

  //__________________________________________________________________________________
  // resize
  resizeHandler() {
    const self = Referer.get("City_Background");
    const city = Referer.get("City");

    if (self.sky0 !== null) {
      self.removeChild(self.sky0);
      self.sky0.destroy();
    }
    if (self.sky1 !== null) {
      self.removeChild(self.sky1);
      self.sky1.destroy();
    }

    self.sky0 = new PIXI.Sprite(
      self.assetManager.resources.city_background.texture
    );
    self.addChild(self.sky0);

    // self.sky0 = new PIXI.TilingSprite(self.assetManager.citySceneResources.city_background.texture ,self.documentRoot.baseWidth , 3600)
    // self.addChild(self.sky0)
    // self.sky1 = new PIXI.TilingSprite(self.assetManager.citySceneResources.city_background.texture ,self.documentRoot.baseWidth , 3600)
    // self.addChild(self.sky1)
    // self.sky1.x = self.documentRoot.baseWidth;

    self.x = 0;
    self.y = 0;
    // self.height = window.innerHeight / city.scale.y;
  }

  //__________________________________________________________________________________
  // render
  startRendering() {
    if (EnterFrameManager.hasListener("City_Background") == false) {
      EnterFrameManager.addListener(() => {
        this._tick();
      }, "City_Background");
    }
  }

  stopRendering() {
    if (EnterFrameManager.hasListener("City_Background") == true)
      EnterFrameManager.removeListener("City_Background");
  }

  _tick() {
    
  }
  
  get dispatcher() {
    return this._dispatcher;
  }
}
