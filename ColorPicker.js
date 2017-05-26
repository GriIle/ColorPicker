"use strict";
class ColorPicker{
  //--buildColorPicker---------------------------------------------------------------------------------------------------------------------------------
    constructor(id) {
      this.id = id;
      this.posX=0;
      this.posY=0;
      this.colorHSV = [0,0,0];
      this.colorRGB = [0,0,0];
      this.mouseDown = false;
      this.aktiveElementObj = null;
      this.aktiveElement = 0;
      this.htmlDiv;
      this.htmlFrame;
      this.htmlObj = [];
      this.htmlCanvas;
      this.htmlLeverY;
      this.htmlLeverX = [];
      this.htmlTxtX = [];
      this.buildHTML(id);
      this.addEvents();
      this.startRender();

    }
    buildHTML(id){
      this.htmlDiv = document.createElement('div');
      this.htmlDiv.className ="color-div";
      this.htmlDiv.style.display = "none";
      this.htmlDiv.style.left = "100px";
      this.htmlDiv.style.top = "100px";
      this.htmlDiv.style.width = "470px";
      this.htmlDiv.style.height = "210px";
      document.body.appendChild(this.htmlDiv);

      let obj;
      this.htmlFrame = document.createElement('label');
      this.htmlFrame.className ="color-frame";
      this.htmlFrame.innerHTML  = "ColorPicker v0.1";
      this.htmlFrame.style.left = "-1px";this.htmlFrame.style.top = "-1px";
      this.htmlFrame.style.width = "470px";this.htmlFrame.style.height = "20px";
      this.htmlDiv.appendChild(this.htmlFrame);

      this.htmlCanvas = document.createElement('canvas');
      this.htmlCanvas.className ="color-pick";
      this.htmlCanvas.style.left = "10px";this.htmlCanvas.style.top = "30px";
      this.htmlCanvas.width = 170;this.htmlCanvas.height = 170;
      this.htmlDiv.appendChild(this.htmlCanvas);

      this.htmlLeverY = document.createElement('canvas');
      this.htmlLeverY.className ="color-lever";
      this.htmlLeverY.style.left = "190px";this.htmlLeverY.style.top = "30px";
      this.htmlLeverY.width = 20;this.htmlLeverY.height = 170;
      this.htmlDiv.appendChild(this.htmlLeverY);

      let identifier = ["H","S","V","R","G","B"];
      for(let i=1;i<=6;i++){

      obj = document.createElement('label');
      obj.className ="color-txt";
      obj.innerHTML  = identifier[i-1]+":";
      obj.style.left = "240px";obj.style.top = (30*i)+"px";
      obj.style.width = "20px";obj.style.height = "20px";
      this.htmlDiv.appendChild(obj);

      this.htmlLeverX[i-1] = document.createElement('canvas');
      this.htmlLeverX[i-1].className ="color-lever";
      this.htmlLeverX[i-1].style.left = "270px";this.htmlLeverX[i-1].style.top = 30*i+"px";
      this.htmlLeverX[i-1].width = 140;this.htmlLeverX[i-1].height = 20;
      this.htmlDiv.appendChild(this.htmlLeverX[i-1]);


      this.htmlTxtX[i-1] = document.createElement('input');
      this.htmlTxtX[i-1].className ="color-input";
      this.htmlTxtX[i-1].style.left = "420px";this.htmlTxtX[i-1].style.top = (30*i)+"px";
      this.htmlTxtX[i-1].style.width = "40px";this.htmlTxtX[i-1].style.height = "20px";
      this.htmlDiv.appendChild(this.htmlTxtX[i-1]);
      }


    }
    addEvents(){
      document.addEventListener('mousedown', (e) => {this.mouseDown=true;console.log(this.mouseDown);});
      document.addEventListener('mouseup', (e) => {this.mouseDown=false;console.log(this.mouseDown);this.aktiveElementObj=null;this.aktiveElement=0;});

      let obj;
      this.htmlFrame.addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=1;});

      this.htmlCanvas.addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=2;});
      this.htmlLeverY.addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=3;});

      this.htmlLeverX[0].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=4;});
      this.htmlLeverX[1].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=5;});
      this.htmlLeverX[2].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=6;});
      this.htmlLeverX[3].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=7;});
      this.htmlLeverX[4].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=8;});
      this.htmlLeverX[5].addEventListener('mousedown', (e) => {this.aktiveElementObj=obj;this.aktiveElement=9;});


      document.addEventListener('mousemove', (e) => {
        if (this.mouseDown===true){
          let click = null;
          switch(this.aktiveElement)
          {
            case 1:
            this.posX += e.movementX
            this.posY += e.movementY
            this.htmlDiv.style.left = this.posX+"px";
            this.htmlDiv.style.top = this.posY+"px";
            break;
            case 2:
              click = this.click(this.htmlCanvas,e,-5,-5,160,160);
              this.colorHSV[2] = click[0];this.colorHSV[1] = 1-click[1];
			  this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 3:
              click = this.click(this.htmlLeverY,e,0,0,1,170);
              this.colorHSV[0] = 1-click[1];
			  this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 4:
              click = this.click(this.htmlLeverX[0],e,0,0,140,1);
              this.colorHSV[0] = click[0];
			  this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 5:
              click = this.click(this.htmlLeverX[1],e,0,0,140,1);
              this.colorHSV[1] = click[0];
			  this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 6:
              click = this.click(this.htmlLeverX[2],e,0,0,140,1);
              this.colorHSV[2] = click[0];
			  this.colorRGB = this.createRGBfromHSV(this.colorHSV);
            break;
            case 7:
              click = this.click(this.htmlLeverX[3],e,0,0,140,1);
              this.colorRGB[0] = click[0]*255;
			  this.colorHSV = this.createHSVfromRGB(this.colorRGB);
            break;
            case 8:
              click = this.click(this.htmlLeverX[4],e,0,0,140,1);
              this.colorRGB[1] = click[0]*255;
			  this.colorHSV = this.createHSVfromRGB(this.colorRGB);
            break;
            case 9:
              click = this.click(this.htmlLeverX[5],e,0,0,140,1);
              this.colorRGB[2] = click[0]*255;
			  this.colorHSV = this.createHSVfromRGB(this.colorRGB);
            break;
          }
        }
      });
    //FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUNNNNNNNNNNNNNNNNNNNNNNNNN
    }
    setLevler(lever1,lever2,lever3,lever4,lever5,lever6){
    }
  //--Logik---------------------------------------------------------------------------------------------------------------------------------
    show(posX,posY){
      this.posX=posX;this.posY=posY;
      this.htmlDiv.style.display = "inline";
      this.htmlDiv.style.left = this.posX+"px";
      this.htmlDiv.style.top = this.posY+"px";
    }
    hide(){
      this.htmlDiv.style.display = "none";
    }
    click(htmlObj,e,posX,posY,width,height){
      let rect = htmlObj.getBoundingClientRect();
      posX+=e.clientX-rect.left;
      posY+=e.clientY-rect.top;
      posX/=width;posY/=height
      if (posX<0)posX=0;if (posY<0)posY=0;
      if (posX>1)posX=1;if (posY>1)posY=1;
      return [posX,posY];
    }
  //--ColorOperators---------------------------------------------------------------------------------------------------------------------------------
    createRGBfromH(value,max) {
      let pos = (value / max*6)|0;
      if(pos>5)pos-=6;
      let x = value / max * (256*6);
      let r = 0,g = 0,b = 0;
      while (x > 255)x-=255;
      switch (pos)
      {
        case 0:r += 255;   g += x;     b += 0;     break;
        case 1:r += 255-x; g += 255;   b+= 0;      break;
        case 2:r += 0;     g += 255;   b += x;     break;
        case 3:r += 0;     g += 255-x; b += 255;   break;
        case 4:r += x;     g += 0;     b += 255;   break;
        case 5:r += 255;   g += 0;     b+= 255-x;  break;
      }
      return [r,g,b]
    }
    addRGBandS(value,max,oldvalue) {
      let colorRGB = oldvalue
      let pro = (((value)/max));
      colorRGB[0] = colorRGB[0]*(pro)+((255)*(1-pro));//r
      colorRGB[1] = colorRGB[1]*(pro)+((255)*(1-pro));//g
      colorRGB[2] = colorRGB[2]*(pro)+((255)*(1-pro));//b
      return colorRGB;
    }
    addRGBandV(value,max,oldvalue) {
      let colorRGB = oldvalue
      let pro = value/max;
      colorRGB[0] *= pro;//r
      colorRGB[1] *= pro;//g
      colorRGB[2] *= pro;//b
      return colorRGB;
    }
    createRGBfromHSV(colorHSV){
      let colorRGB = this.createRGBfromH(this.colorHSV[0],1);
      colorRGB = this.addRGBandS(colorHSV[1],1,colorRGB)
      colorRGB = this.addRGBandV(colorHSV[2],1,colorRGB);
      return colorRGB;
    }
    createHSVfromRGB(colorRGB){

      let r = colorRGB[0]/255,g = colorRGB[1]/255,b = colorRGB[2]/255
      let min,max
      min = r;if(min > g)min=g;if(min > b)min=b;
      max = r;if(max < g)max=g;if(max < b)max=b;
      let delta = max - min;
      let h,s,v;
	  v = max;   
	  if (delta < 0.00001)
	  {
        s = 0;
        h = 0; // undefined, maybe nan?
        return [h/360,s,v];
	  }
	  
	  if( max > 0.0 ) { // NOTE: if Max is == 0, this divide would cause a crash
        s = (delta / max);                  // s
	  }else{
        // if max is 0, then r = g = b = 0              
        // s = 0, v is undefined
        s = 0.0;
        h = null;   
	    // its now undefined
        return [h/360,s,v];
      }
	  // > is bogus, just keeps compilor happy
	  if( r >= max ) h = ( g - b ) / delta;        // between yellow & magenta
      else if( g >= max ) h = 2.0 + ( b - r ) / delta;  // between cyan & yellow
      else h = 4.0 + ( r - g ) / delta;  // between magenta & cyan
	  h *= 60.0;                              // degrees
      if( h < 0.0 ) h += 360.0;

      return [h/360,s,v];

    }
    createRGBfromRGB(colorRGB){
      return [colorRGB[0],colorRGB[1],colorRGB[2]];//pass by value
    }
  //--Render---------------------------------------------------------------------------------------------------------------------------------
    drawColorPick(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = resolution;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          for (let iy = 0; iy < canvas.height; iy++) {
            let offset = (imgData.width * iy + ix) * 4;
            mod.data[offset + 3] = 255;//a
            let color = this.createRGBfromH(this.colorHSV[0],1);
            color = this.addRGBandS((resolution-1)-iy,canvas.height,color);
            color = this.addRGBandV(ix,canvas.width,color);
            mod.data[offset]     = color[0];
            mod.data[offset + 1] = color[1];
            mod.data[offset + 2] = color[2];
          }
        }
      context.putImageData(mod, 0, 0);

      return (canvas);
    };
    drawColorLeverY(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 1;
      canvas.height = resolution;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
          for (let iy = 0; iy < canvas.height; iy++) {
            let offset = (imgData.width * iy) * 4;
            mod.data[offset + 3] = 255;//a
            let color = this.createRGBfromH((resolution-1)-iy,canvas.height);
            mod.data[offset]     = color[0];
            mod.data[offset + 1] = color[1];
            mod.data[offset + 2] = color[2];
          }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX0(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromH(ix,canvas.width);
          color = this.addRGBandS(this.colorHSV[1],1,color);
          color = this.addRGBandV(this.colorHSV[2],1,color);
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX1(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromH(this.colorHSV[0],1);
          color = this.addRGBandS(ix,canvas.width,color);
          color = this.addRGBandV(this.colorHSV[2],1,color);
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX2(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromH(this.colorHSV[0],1);
          color = this.addRGBandS(this.colorHSV[1],1,color);
          color = this.addRGBandV(ix,canvas.width,color);
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX3(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromRGB(this.colorRGB);
          color[0] = 255/canvas.width*ix;
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX4(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromRGB(this.colorRGB);
          color[1] = 255/canvas.width*ix;
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX5(resolution) {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = resolution;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromRGB(this.colorRGB);
          color[2] = 255/canvas.width*ix;
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    startRender(){
        this.render();
        setTimeout(this.startRender.bind(this), 40);
    }
    clearCanvas(htmlObj,SmoothingEnabled,fillStyle){
      let context = htmlObj.getContext("2d");
      context.imageSmoothingEnabled = SmoothingEnabled;context.mozImageSmoothingEnabled = SmoothingEnabled;context.fillStyle = fillStyle; 
      context.clearRect(0, 0, htmlObj.width, htmlObj.height);
      return context;
    }
    render(){
      let context;let SmoothingEnabled = true;
      let resolution = 42;
      let fillStyle = "rgba(75,75,75,1)"; 
	

      context = this.clearCanvas(this.htmlCanvas,SmoothingEnabled,fillStyle)
      context.fillRect(0, (1-this.colorHSV[1])*160, 5, 10);
      context.fillRect(165, (1-this.colorHSV[1])*160, 5, 10);
      context.fillRect((this.colorHSV[2])*160, 0, 10, 5);
      context.fillRect((this.colorHSV[2])*160, 165, 10, 5);
      context.drawImage(this.drawColorPick(resolution), 5, 5, 160, 160);

      context = this.clearCanvas(this.htmlLeverY,SmoothingEnabled,fillStyle)
      context.fillRect(0, (1-this.colorHSV[0])*170-5, 20, 10);
      context.drawImage(this.drawColorLeverY(resolution), 5, 0, 10, 170);

      context = this.clearCanvas(this.htmlLeverX[0],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[0])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX0(resolution), 0, 5, 140, 10);
      this.htmlTxtX[0].value = (this.colorHSV[0]*360)|0;

      context = this.clearCanvas(this.htmlLeverX[1],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[1])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX1(resolution), 0, 5, 140, 10);
      this.htmlTxtX[1].value = (this.colorHSV[1]*100)|0;

      context = this.clearCanvas(this.htmlLeverX[2],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[2])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX2(resolution), 0, 5, 140, 10);
      this.htmlTxtX[2].value = (this.colorHSV[2]*100)|0;

      context = this.clearCanvas(this.htmlLeverX[3],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[0]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX3(resolution), 0, 5, 140, 10);
      this.htmlTxtX[3].value = this.colorRGB[0]|0;

      context = this.clearCanvas(this.htmlLeverX[4],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[1]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX4(resolution), 0, 5, 140, 10);
      this.htmlTxtX[4].value = this.colorRGB[1]|0;
      
      context = this.clearCanvas(this.htmlLeverX[5],SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[2]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX5(resolution), 0, 5, 140, 10);
      this.htmlTxtX[5].value = this.colorRGB[2]|0;
    }
}