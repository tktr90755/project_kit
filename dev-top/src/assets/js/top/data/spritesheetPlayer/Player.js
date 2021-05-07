/**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.media.Player.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
/**
 * @class Player
 */
const EnterFrameManager = t90755.managers.EnterFrameManager;
const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
export default class Player{

  constructor() {
    this._id = new Date().getTime().toString(16)  + Math.floor(1000000 * Math.random()).toString(16);
    this._totalFrames = NaN;
    this._currentFrame = 0;
    this._percent = 0;
    this._speed = 0.1;
    this.currentTarget = this;
    this._dispatcher = new EventDispatcher();
  }

  //__________________________________________________________________________________
  // methods
  init(){
    this._currentFrame = 0;
    this.setPercent();
    this.renderStartEvent()
    this._render();
  }

  load(){
    
  }

  kill(){
    if(EnterFrameManager.hasListener('play_' + this._id)){
        EnterFrameManager.removeListener('play_' + this._id, false)
      }
    this._content = null;
    this._totalFrames = NaN;
    this._currentFrame = NaN;
    this._percent = NaN;
    this._speed = NaN;
    this.currentTarget = null;
  }

  play(){
    this._currentFrame = 0;
    this.setPercent();
    this.renderStartEvent()
    EnterFrameManager.addListener(()=>{
        this._render();
    }, 'play_' + this._id, false)
  }

  resume(){
    EnterFrameManager.addListener(()=>{
        this._render
    }, 'play_' + this._id, false)
  }

  pause(){
      if(EnterFrameManager.hasListener('play_' + this._id)){
        EnterFrameManager.removeListener('play_' + this._id, false)
      }
  }

  stop(){
    if(EnterFrameManager.hasListener('play_' + this._id)){
        EnterFrameManager.removeListener('play_' + this._id, false)
      }
    this._currentFrame = 0;
    this.setPercent();
    this.renderCompleteEvent()
  }

  seek(seekTime, autoPlay){
    this._currentFrame = seekTime;
    this.setPercent();
    if(autoPlay === true) this.resume()
  }

  _render(){
    if(
       isNaN(this._totalFrames) === true ||
       isNaN(this._currentFrame) === true ||
       isNaN(this._percent) === true
      ){
      this.stop()
    }else if(this._percent >= 1){
      this.stop()
    }else{
      this.setPercent();
      this.renderingEvent();
      if(this._speed != 0 ) this.currentFrame = this.currentFrame + this._speed;
    }
  }

  setPercent(){
    if( isNaN(this._totalFrames) === false && isNaN(this._currentFrame) === false ){
      this._percent = this._currentFrame / this._totalFrames;
    }
  }

  //__________________________________________________________________________________
  // Event Handler
  renderInitEvent() {
    this._dispatcher.dispatchEvent(new Event(Event.INIT));
  };

  renderStartEvent() {
    this._dispatcher.dispatchEvent(new Event(Event.START));
  };

  renderingEvent() {
    this._dispatcher.dispatchEvent(new Event(Event.RENDER));
  };

  renderCompleteEvent() {
    this._dispatcher.dispatchEvent(new Event(Event.COMPLETE));
  };

  //__________________________________________________________________________________
  // getter / setter
  get id(){
    return this._id;
  }

  get totalFrames(){
    return this._totalFrames;
  }
  set totalFrames(value){
    this._totalFrames = value;
    this.setPercent();
  }

  get currentFrame(){
    return this._currentFrame;
  }
  set currentFrame(value){
    this._currentFrame = value;
    this.setPercent();
  }

  get percent(){
    return this._percent;
  }
  set percent(value){
    value = Math.min(value, 1)
    this._currentFrame = value * this._totalFrames;
    this._percent = value;
    if(value !== 1){
      this.renderingEvent();
    }else{
      this.stop();
    }
  }

  get speed(){
    return this._speed;
  }
  set speed(value){
    this._speed = value;
  }

  get content(){
    return this._content;
  }

  get dispatcher(){
      return this._dispatcher;
  }
}
