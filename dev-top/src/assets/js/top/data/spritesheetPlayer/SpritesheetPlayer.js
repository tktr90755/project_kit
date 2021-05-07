 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.media.SpriteSheetPlayer.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
let container = this.$el;
let elephant = this.$el.children[0];

let player = new SpriteSheetPlayer();
player.dispatcher.addEventListener(Event.INIT, ()=>{
  console.log("Event.INIT")

  elephant.style.backgroundImage = 'url("/' + this.path + '.png")';
  elephant.style.backgroundRepeat = 'no-repeat';

  var image = new Image();
  image.src = player.image;//使っているスプライトシートはこれ
  image.id = 'my-image';
  this.$el.append(image);
  
  //再生
  player.play();

  //TweenMaxの場合
  // player.percent = 0;
  // TweenMax.to(player,10.0,{ease:Expo.easeOut,percent:1});
});
player.dispatcher.addEventListener(Event.START, ()=>{
  console.log("Event.START")
});
player.dispatcher.addEventListener(Event.RENDER, ()=>{
  let x = player.x;
  let y = player.y;
  let w = player.width;
  let h = player.height;
  let paddingTop = player.spriteSourceSizeY;
  let marginLeft = player.spriteSourceSizeX;

  elephant.style.width = w + "px";
  elephant.style.height = h + "px";
  elephant.style.backgroundPosition = -x + 'px ' + -y + 'px';
  container.style.paddingTop = paddingTop + 'px'; 
  elephant.style.marginLeft = marginLeft + 'px';

  console.log("Event.RENDER: x:" + x + " y:" + y + " w:" + w + " h:" + h )
});
player.dispatcher.addEventListener(Event.COMPLETE, ()=>{
  console.log("Event.COMPLETE")
  player.play()
});
player.load(this.path + '.json', this.path + '.png', false)//第二引数をtrueにすると自動的にplay()する
*/
const Event = t90755.events.Event;
const Referer = t90755.data.Referer;
import SpriteSheetLoader from './SpriteSheetLoader.js'
import Player from './Player.js'
export default class SpriteSheetPlayer extends Player {

  constructor(name) {
    super();
    this._name = name;
    this._loader = null;
    this._spriteSheet = null;
    this._path = null;
    this._point = null;
    this._frameData = [];
    this._currentFrameData = null;
    Referer.set(this, this._name);
  }

  //__________________________________________________________________________________
  // methods
  load(jsonPath, imagePath, autoPlay){
    this._dispatcher.addEventListener(Event.RENDER, ()=>{
        this.renderHandler();
    });
    this._jsonPath = jsonPath;
    this._imagePath = imagePath;
    this._loader = new SpriteSheetLoader();
    this._loader.callback =()=>{
      this.createSpriteSheet();
      this.renderInitEvent();
      this.renderHandler();
      super.init();
      if(autoPlay !== false) this.play();
    };
    this._loader.load(jsonPath, imagePath);
  }

  kill(){
    // this._dispatcher.removeEventListener(Event.RENDER, this.renderHandler);
    super.kill()
    this._loader = null;
    this._spriteSheet = null;
    this._path = null;
    this._point = null;
    this._frameData = [];
    this._currentFrameData = null;
  }

  play(){
    this._dispatcher.addEventListener(Event.RENDER, ()=>{
        this.renderHandler();
    });
    super.play()
  }
  resume(){
    super.resume()
  }

  pause(){
    super.pause()
  }

  stop(){
    super.stop()
  }

  seek(seekTime){
    super.seek(seekTime)
  }
  
  //__________________________________________________________________________________
  // svg
  createSpriteSheet(){
    this.speed = 1;

    const json = this.json.frames;

    this._frameData = [];
    for(let i in json){
      this._frameData.push(json[i]);
    }
    this.totalFrames = this._frameData.length;
    this.currentFrame = 0;
  }

  //__________________________________________________________________________________
  // Event Handler
  renderHandler(){
    if(this._frameData.length !== 0){
      let data = this._frameData[parseInt(this.currentFrame)]
      if(data) this._currentFrameData = data;
    }
  }

  //__________________________________________________________________________________
  // getter
  get json(){
    return JSON.parse(this._loader.content['json']);
  }

  get image(){
    return this._loader.content['image'];
  }

  get loader(){
    return this._loader;
  }

  get jsonPath(){
    return this._jsonPath;
  }

  get imagePath(){
    return this._imagePath;
  }

  get spriteSheet(){
    return this._spriteSheet;
  }

  get path(){
    return this._path;
  }

  get point(){
    return this._point;
  }

  get frameData(){
    return this._frameData;
  }

  get currentFrameData(){
    return this._currentFrameData;
  }

  get x(){
    return (this._currentFrameData)?this._currentFrameData.frame.x:0;
  }

  get y(){
    return (this._currentFrameData)?this._currentFrameData.frame.y:0;
  }

  get width(){
    return (this._currentFrameData)?this._currentFrameData.frame.w:0;
  }

  get height(){
    return (this._currentFrameData)?this._currentFrameData.frame.h:0;
  }

  get rotated(){
    return (this._currentFrameData)?this._currentFrameData.rotated:0;
  }

  get trimmed(){
    return (this._currentFrameData)?this._currentFrameData.trimmed:false;
  }

  get spriteSourceSizeX(){
    return (this._currentFrameData)?this._currentFrameData.spriteSourceSize.x:0;
  }

  get spriteSourceSizeY(){
    return (this._currentFrameData)?this._currentFrameData.spriteSourceSize.y:0;
  }

  get spriteSourceSizeWidth(){
    return (this._currentFrameData)?this._currentFrameData.spriteSourceSize.w:0;
  }

  get spriteSourceSizeHeight(){
    return (this._currentFrameData)?this._currentFrameData.spriteSourceSize.h:0;
  }

  get sourceSizeWidth(){
    return (this._currentFrameData)?this._currentFrameData.sourceSize.w:0;
  }

  get sourceSizeHeight(){
    return (this._currentFrameData)?this._currentFrameData.sourceSize.h:0;
  }
}
