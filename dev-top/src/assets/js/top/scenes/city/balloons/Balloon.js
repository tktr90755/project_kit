import * as PIXI from 'pixi.js'
import {TweenMax, Back, Elastic} from "gsap";

const Event = t90755.events.Event;
const EventDispatcher = t90755.events.EventDispatcher;
const Command = t90755.commands.Command;
const SerialList = t90755.commands.SerialList;
const ParallelList = t90755.commands.ParallelList;
const Referer = t90755.data.Referer;
const EnterFrameManager = t90755.managers.EnterFrameManager;

export default class Balloon extends PIXI.Container{
    constructor(name, data, comment, user, x, y, callback){
        super()
        this._dispatcher = new EventDispatcher()

        this.balloonImage = new PIXI.Sprite(data.texture)
        this.balloonImage.anchor.x = 0.5;
        this.balloonImage.anchor.y = 1;
        this.addChild(this.balloonImage);
        
        this.balloonComtainer = new PIXI.Container();
        this.addChild(this.balloonComtainer);

        this.name = name;
        this.data = data;
        this.x = x;
        this.y = y - 200;
        this.scale.x = 0;
        this.scale.y = 0;
        this.callback = callback;
        this.randomX = Math.random();

        this.parentContent = Referer.get("City");
        this.rimitY = -(window.innerHeight / this.parentContent.scale.y);

        this.text0 = null;
        this.text1 = null;
        this.comment = comment;
        this.user = user;

        this.useMouse = true;
        this.hit = false;
        this.useAnime = true;

        this.domManager = Referer.get("DomManager");
        this.cityBalloons = Referer.get("City_Balloons");
        this.speedY = (this.domManager.userAgent === true)?0.5:1.0;
        this.setTexts();
        this.setMouse();
        this.startRendering();
        TweenMax.to(this.scale, 1.0,{ x:1, y:1, ease:Back.easeOut});
    }

    setTexts(){
        // PIXI.TextMetrics.BASELINE_SYMBOL += "あ｜";

        const style0 = new PIXI.TextStyle({
            fontFamily: 'Shuei MaruGo B',
            fontSize: 24,
            fontWeight: 'bold',
            lineHeight:39,
            wordWrap: true,
            wordWrapWidth: 225,
            breakWords: true,
            fill: this.data.color, 
            align: 'left', 
            stroke: this.data.color, 
        });
        
        this.text0 = new PIXI.Text(this.comment, style0);
        // this.text0.anchor.x = 0.5;
        this.text0.y = -235;
        this.balloonComtainer.addChild(this.text0);

        const style1 = new PIXI.TextStyle({
            fontFamily: 'Shuei MaruGo B',
            fontSize: 20,
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: this.balloonImage.width,
            breakWords: true,
            fill: this.data.color, 
            align: 'left', 
            stroke: this.data.color, 
        });

        this.text1 = new PIXI.Text(this.user, style1);
        // this.text1.anchor.x = 0.5;
        // this.text1.x = this.text0.x - 20;
        this.text1.y = this.text0.y + this.text0.height + 20;
        this.balloonComtainer.addChild(this.text1);

        const totalWidth = this.text0.width + this.text1.width;
        const totalHeight = this.text0.height + this.text1.height;
        this.balloonComtainer.x = -(totalWidth / 4) - 25;
        this.balloonComtainer.y = -(totalHeight / 4);
    }

    //__________________________________________________________________________________
    // mouse
    setMouse(){
        this.domManager.dispatcher.addEventListener("onmousemove",()=>{
            this.onMouseMoveHandler();
        })
        this.useMouse = true;
    }

    killMouse(){
        this.useMouse = false;
    }
    
    excuteMosue(){
        if(this.hit && this.useAnime){
            this.useAnime = false;
            this.scale.x = 1 - (Math.random() * 0.3);
            this.scale.y = 1 - (Math.random() * 0.3);
            let o = {
                scaleX:this.scale.x,
                scaleY:this.scale.y
            };
            TweenMax.to(o, 1, { ease:Elastic.easeOut, scaleX:1, scaleY:1,
                onUpdate:()=>{
                    this.scale.x = o.scaleX;
                    this.scale.y = o.scaleY;
                },
                onComplete:()=>{
                this.useAnime = true;
                }
            })
        }
    }
    
    onMouseMoveHandler(){
        if(this.useMouse === false) return;

        const _cx = this.domManager.mouseX;
        const _cy = this.domManager.mouseY;
        const _x = ((this.cityBalloons.x + this.x) - this.balloonImage.width) * this.parentContent.scale.x;
        const _y = ((this.cityBalloons.y + this.y) - this.balloonImage.height) * this.parentContent.scale.y;
        const _w = this.balloonImage.width * this.parentContent.scale.x;
        const _h = this.balloonImage.height * this.parentContent.scale.y;
        this.hit = this.hitTest(_cx, _cy, _x, _y, _w, _h);
    }

    hitTest(cx, cy, x, y, w, h){
		const minX = x;
		const minY = y;
		const maxX = minX + w;
		const maxY = minY + h;
		const currentX = cx;
		const currentY = cy;
        const b = currentX >= minX && currentX <= maxX && currentY >= minY && currentY <= maxY;
        return b;
    }
    //__________________________________________________________________________________
    // render
    startRendering(){
        if(EnterFrameManager.hasListener(this.name) == false){
            EnterFrameManager.addListener(()=>{
                this.tick()
            }, this.name);
        }
    };

    stopRendering(){
        if(EnterFrameManager.hasListener(this.name) == true) EnterFrameManager.removeListener(this.name);
    };

    tick(){
        var t = new Date().getTime();
        this.x += (Math.sin(t * 0.002) * 2);
        this.y -= this.speedY;
        this.excuteMosue();
        if(this.y <= this.rimitY){
            this.stopRendering();
            this.removeChild(this.balloonImage);
            this.removeChild(this.text0);
            this.killMouse();
            this.callback();
        }
    };
    
    get dispatcher(){
        return this._dispatcher;
    }
}