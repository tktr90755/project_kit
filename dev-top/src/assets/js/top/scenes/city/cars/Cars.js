import * as PIXI from 'pixi.js'
import Car from './Car.js'

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;
const Item = t90755.managers.iterator.Item;
const Iterator = t90755.managers.iterator.Iterator;

export default class Cars extends PIXI.Container{
    constructor(){
        super()
        this._dispatcher = new EventDispatcher()

        this.baseWidth = 0;
        this.baseHeight = 0;

        this.cars = [];
        this.carNumber = 0;
        this.allowAddOutsideCar0 = true;
        this.allowAddOutsideCar1 = true;
        this.allowAddOutsideCar2 = true;
        this.allowAddInsideCar = true;

        this.carTextures = null;
        this.outsideLane = null;
        this.insideLane = null;

        this.domManager = Referer.get("DomManager");
        Referer.set(this, "City_Cars");
    }

    initialize(){
        this.assetManager = Referer.get("AssetManager");
        this.baseWidth = Referer.get("DocumentRoot").baseWidth;
        this.baseHeight = Referer.get("DocumentRoot").baseHeight;

        const buffer = 800;
        const right = this.baseWidth + buffer;
        const left = 0 - buffer;

        this.carTextures = new Iterator();
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_blue.texture, "car_body_blue"));
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_green.texture, "car_body_green"));
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_orange.texture, "car_body_orange"));
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_white.texture, "car_body_white"));
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_light_blue.texture, "car_body_light_blue"));
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_red.texture, "car_body_red"));
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_gray.texture, "car_body_gray"));
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_light_gray.texture, "car_body_light_gray"));
        this.carTextures.addItem(new Item(this.assetManager.resources.car_body_black.texture, "car_body_black"));

        this.outsideLane = new Iterator();
        this.outsideLane.addItem(new Item({ speed:8, startX:left, targetX:right, endX:right, y:250, useBalloon:true, balloonPosition:500 }, "outsideRoot1"));
        this.outsideLane.addItem(new Item({ speed:8, startX:left, targetX:right, endX:right, y:250, useBalloon:true, balloonPosition:2000 }, "outsideRoot1"));

        this.insideLane = new Iterator();
        this.insideLane.addItem(new Item({ speed:8, startX:right, targetX:-1400, endX:left, y:400, useBalloon:false }, "insideRoot1"));

        const serialList = new SerialList( "Cars initialize" );
        serialList.push([
            new Command( ()=>{ this._dispatcher.dispatchEvent(new Event("initializeComplete")); } )
        ]);
        serialList.execute();
    };

    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener("City_Cars_render") == false){
            EnterFrameManager.addListener(()=>{
                this.tick()
            }, "City_Cars_render");
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener("City_Cars_render") == true) EnterFrameManager.removeListener("City_Cars_render");
    };

    tick(){
        this.addCarOutSide();
        this.addCarInSide();
    };

    //__________________________________________________________________________________
    // add car
    addCarOutSide(){
        if(this.allowAddOutsideCar0 === true) {
            this.allowAddOutsideCar0 = false;
        }else{
            return;
        }

        const root = (this.outsideLane.hasNext())?this.outsideLane.next().content():this.outsideLane.fast().content();
        const myItem = this.carTextures.shuffle();
        
        this.cars.push(new Car("car" + this.cars.length, myItem));
        const car = this.cars[this.cars.length - 1];
        car.scale.x = 1;

        const serialList = new SerialList( "Cars addCarOutSide" );
        serialList.push([
            new Command( ()=>{car.initialize()}, null, car.dispatcher, "initializeComplete" ),
            new Command( ()=>{ this.addChildAt(car,0); }),
            [
                new Command( ()=>{car.appear(root.speed, { x:root.startX, y:root.y }, { x:root.targetX, y:root.y })}, null, car.dispatcher, "appearComplete" ),
                new Command( ()=>{
                    const updateHandler =()=>{
                        if(this.domManager.userAgent === true){
                            if(car.x >= root.balloonPosition){
                                car.dispatcher.removeEventListener("update", updateHandler);
                                if(root.useBalloon === true && car.addedBalloon === false){
                                    const balloons = Referer.get("City_Balloons");
                                    const r0 = Math.random() * 100;
                                    const r1 = Math.random() * 100;
                                    balloons.addBalloon(car.x + (r0 - r1), root.y);
                                    car.addedBalloon = true;
                                }
                            }
                        }else{
                            if(car.x >= 600){
                                car.dispatcher.removeEventListener("update", updateHandler);
                                if(root.useBalloon === true && car.addedBalloon === false){
                                    const balloons = Referer.get("City_Balloons");
                                    const r0 = Math.random() * 300;
                                    const r1 = Math.random() * 300;
                                    balloons.addBalloon(car.x + (r0 - r1), root.y);
                                    car.addedBalloon = true;
                                }
                            }
                        }
                    }
                    car.dispatcher.addEventListener("update", updateHandler);
                }),
            ],
            new Command( ()=>{car.terminate()}, null, car.dispatcher, "terminateComplete" ),
            new Command( ()=>{
                this.allowAddOutsideCar0 = true;
                if(this.cars.length >= 50){
                    this.cars = []
                }
            } )
        ]);
        serialList.execute();
    }

    addCarInSide(){
        if(this.allowAddInsideCar === true) {
            this.allowAddInsideCar = false;
        }else{
            return;
        }

        const root = this.insideLane.shuffle().content();
        const myItem0 = this.carTextures.shuffle();
        const myItem1 = this.carTextures.shuffle();
        
        this.cars.push(new Car("car" + this.cars.length, myItem0));
        this.cars.push(new Car("car" + this.cars.length, myItem1));
        const car0 = this.cars[this.cars.length - 1];
        const car1 = this.cars[this.cars.length - 2];
        car0.scale.x = -1;
        car1.scale.x = -1;

        const delay = 1.5 + (Math.random() * 2);
        const serialList = new SerialList( "Cars addCarInSide" );
        serialList.push([
            [
                new Command( ()=>{car0.initialize()}, null, car0.dispatcher, "initializeComplete" ),
                new Command( ()=>{car1.initialize()}, null, car1.dispatcher, "initializeComplete" ),
            ],
            [
                new Command( ()=>{ this.addChild(car0); }),
                new Command( ()=>{ this.addChild(car1); }, null, null, null, delay),
                new Command( ()=>{car0.appear(root.speed, { x:root.startX, y:root.y }, { x:root.targetX, y:root.y })}, null, car0.dispatcher, "appearComplete" ),
                new Command( ()=>{car1.appear(root.speed, { x:root.startX, y:root.y }, { x:root.targetX, y:root.y })}, null, car1.dispatcher, "appearComplete", delay ),
            ],
            [
                new Command( ()=>{car0.terminate()}, null, car0.dispatcher, "terminateComplete" ),
                new Command( ()=>{car1.terminate()}, null, car1.dispatcher, "terminateComplete" ),
            ],
            new Command( ()=>{
                this.allowAddInsideCar = true;
                if(this.cars.length >= 50){
                    this.cars = []
                }
            } )
        ]);
        serialList.execute();
    }
    //__________________________________________________________________________________
    // resize
    resizeHandler(){
        const self = Referer.get("City_Cars");
        const city = Referer.get("City");
        const road = Referer.get("City_Road");
        
        self.x = 0;
        self.y = window.innerHeight / city.scale.y - road.baseHeight;
    };

    get dispatcher(){
        return this._dispatcher;
    }
}