import * as PIXI from "pixi.js";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Mat extends PIXI.Container {
  constructor() {
    super();
    this._dispatcher = new EventDispatcher();

    this.documentRoot = null;
    this.assetManager = null;
    this.domManager = null;
    this.stage = null;

    this.myMat = null;

    Referer.set(this, "Mat");
  }

  initialize() {
    this.documentRoot = Referer.get("DocumentRoot");
    this.domManager = Referer.get("DomManager");
    this.assetManager = Referer.get("AssetManager");
    this.stage = Referer.get("DocumentRoot.app.stage");

    const serialList = new SerialList( "Mat initialize" );
    // serialList.debug = true;
    serialList.push([
        new Command( ()=>{
            this.setMask(true);
            this.resizeHandler();
            this.setScroll();
        }),
        new Command( ()=>{ this._dispatcher.dispatchEvent(new Event("initializeComplete")); } )
    ]);
    serialList.execute();
  }

  //__________________________________________________________________________________
  //
  setScroll() {
    this.domManager.dispatcher.addEventListener("scroll", () => {
      this.excuteDraw();
    });
  }

  //__________________________________________________________________________________
  // resize
  resizeHandler() {
    const self = Referer.get("Mat");
    const app = Referer.get("DocumentRoot.app");

    this.excuteDraw();
  }

  //__________________________________________________________________________________
  // mask
  setMask(useDrawMask) {
    if (this.myMat === null) {
      this.myMat = new PIXI.Graphics();
      this.addChild(this.myMat);
    }
    if (useDrawMask) {
      this.excuteDraw();
    }
  }

  excuteDraw(){
    const alphaValue = Math.min(1, this.domManager.scrollTop / window.innerHeight);
    this.drawMask(0, 0, window.innerWidth,window.innerHeight, alphaValue * 0.3);
  }

  drawMask(x, y, w, h, alpha) {
    if (this.myMat === null) {
      this.setMask(false);
    }
    this.myMat.clear();
    this.myMat.beginFill(0xff0000, alpha);
    this.myMat.drawRect(x, y, w, h);
    this.myMat.endFill();
  }

  get dispatcher() {
    return this._dispatcher;
  }
}
