import * as PIXI from "pixi.js";
import Background from "./background/Background.js";
import Landscape from "./landscape/Landscape.js";
import Road from "./road/Road.js";
import Building0 from "./building0/Building0.js";
import Building1 from "./building1/Building1.js";
import Mountain from "./mountain/Mountain.js";
import Sky from "./sky/Sky.js";
import Cars from "./cars/Cars.js";
import Balloons from "./balloons/Balloons.js";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;

export default class City extends PIXI.Container {
  constructor() {
    super();
    this._dispatcher = new EventDispatcher();

    this.documentRoot = null;
    this.assetManager = null;
    this.domManager = null;
    this.stage = null;

    this.background = null;
    this.landscape = null;
    this.sky = null;
    this.mountain = null;
    this.road = null;
    this.building0 = null;
    this.building1 = null;
    this.cars = null;
    this.balloons = null;

    this.maskObject = null;
    this._initialized = false;

    Referer.set(this, "City");
  }

  initialize() {
    this.documentRoot = Referer.get("DocumentRoot");
    this.domManager = Referer.get("DomManager");
    this.assetManager = Referer.get("AssetManager");
    this.stage = Referer.get("DocumentRoot.app.stage");

    this.background = new Background();
    // this.landscape = new Landscape()
    // this.sky = new Sky()
    // this.mountain = new Mountain()
    // this.road = new Road()
    // this.building0 = new Building0()
    // this.building1 = new Building1()
    // this.cars = new Cars()
    // this.balloons = new Balloons()

    const serialList = new SerialList("City initialize");
    // serialList.debug = true;
    serialList.push([
      new Command(
        () => {
          this.background.initialize();
        },
        null,
        this.background.dispatcher,
        "initializeComplete"
      ),
      new Command(() => {
        this.addChild(this.background);
      }),
      new Command(() => {
        this._initialized = true;
        this._dispatcher.dispatchEvent(new Event("initializeComplete"));
      }),
    ]);
    serialList.execute();
  }

  appear() {
    if (this.domManager.userAgent) {
      this.background.startRendering();
    }
    this.resizeHandler();
    this._dispatcher.dispatchEvent(new Event("appearComplete"));
  }

  disappear() {
    this._dispatcher.dispatchEvent(new Event("disappearComplete"));
  }
  //__________________________________________________________________________________
  // resize
  resizeHandler() {
    const self = Referer.get("City");
    const WIDTH = self.documentRoot.baseWidth;
    const HEIGHT = self.documentRoot.baseHeight;
    const SCALE = Math.max(
      window.innerWidth / WIDTH,
      window.innerHeight / HEIGHT
    );
    self.background.resizeHandler();
    self.scale.x = self.scale.y = SCALE;

    //トリミング領域無し
    // if (self.height > window.innerHeight) {
    //   self.scale.y = window.innerHeight / HEIGHT;
    //   self.scale.x = window.innerHeight / HEIGHT;
    // }
    // if (self.width > window.innerWidth) {
    //   self.scale.y = window.innerWidth / WIDTH;
    //   self.scale.x = window.innerWidth / WIDTH;
    // }

    self.x = window.innerWidth / 2 - self.width / 2;
    self.y = window.innerHeight / 2 - self.height / 2;
  }

  get dispatcher() {
    return this._dispatcher;
  }

  get initialized() {
    return this._initialized;
  }
}
