 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.net.HtmlLoader.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
let callback = ()=>{
  console.log('_callback kitayo')
  console.log(loader.content)
}
let loader = new SpriteSheetLoader(callback);
loader.load('test.svg')
*/

if (!window.XMLHttpRequest){
  XMLHttpRequest = function(){
      try{
          return new ActiveXObject("Msxml2.XMLHTTP.6.0");
      }catch(e){}
      try {
          return new ActiveXObject("Msxml2.XMLHTTP.3.0");
      }catch(e){}
      try{
          return new ActiveXObject("Msxml2.XMLHTTP");
      }catch(e){}
      throw new Error("This browser does not support XMLHttpRequest.");
  };
}

import Loader from './Loader.js'
export default class SpriteSheetLoader extends Loader {

  constructor() {
    super();
    this.id = new Date().getTime().toString(16)  + Math.floor(1000 * Math.random()).toString(16);
  }

  //__________________________________________________________________________________
  // methods
  load(jsonPath, imagePath){
    
    this._content = {}

    let xhr = new XMLHttpRequest();

    xhr.open('GET', jsonPath, true);
    xhr.onreadystatechange = ()=>{
      
      if(xhr.status === 404){
        super.loadIOErrorHandler()
      }else{
        if(xhr.readyState === 0){ }
        else if(xhr.readyState === 1){ 
          super.loaderProgressHandler();
        }
        else if(xhr.readyState === 2){ }
        else if(xhr.readyState === 3){ }
        else if(xhr.readyState === 4){
          if(xhr.status === 200){
            this._content['json'] = xhr.responseText;
          }else if(xhr0.status === 0){
            this._content['json'] = xhr.responseText;
          }
          this.secondLoad(imagePath);
        }
      }
    };
    xhr.send(null);
  }

  secondLoad(path){
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', path, true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = ()=>{
      
      if(xhr.status === 404){
        super.loadIOErrorHandler()
      }else{
        if(xhr.readyState === 0){ }
        else if(xhr.readyState === 1){ 
          super.loaderProgressHandler();
        }
        else if(xhr.readyState === 2){ }
        else if(xhr.readyState === 3){ }
        else if(xhr.readyState === 4){
          if(xhr.status === 200){
            this._content['image'] = URL.createObjectURL(xhr.response);
          }else if(xhr0.status === 0){
            this._content['image'] = URL.createObjectURL(xhr.response);
          }
          super.loaderCompleteHandler();
        }
      }
    };
    xhr.send(null);
  }
}
