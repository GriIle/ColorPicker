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
      this.aktiveElement = 0;

      this.buildHTML(id);
      this.addEvents();
      this.render();

    }
    buildHTML(id){
      let div;
      div = document.createElement('div');
      div.className ="color-div";
      div.style.display = "none";
      div.UNSELECTABLE = "on";
      div.id = ("colorDiv"+id);
      div.style.left = "100px";
      div.style.top = "100px";
      div.style.width = "470px";
      div.style.height = "210px";
      document.body.appendChild(div);

      let obj;
      obj = document.createElement('label');
      obj.className ="color-frame";obj.id = ("colorFrame"+id);
      obj.innerHTML  = "ColorPicker v0.1";
      obj.style.left = "-1px";obj.style.top = "-1px";
      obj.style.width = "470px";obj.style.height = "20px";
      div.appendChild(obj);

      obj = document.createElement('canvas');
      obj.className ="color-pick";obj.id = ("colorPick"+id);
      obj.style.left = "10px";obj.style.top = "30px";
      obj.width = 170;obj.height = 170;
      div.appendChild(obj);

      obj = document.createElement('canvas');
      obj.className ="color-lever";obj.id = ("colorLeverY"+id);
      obj.style.left = "190px";obj.style.top = "30px";
      obj.width = 20;obj.height = 170;
      div.appendChild(obj);

      let identifier = ["H","S","V","R","G","B"];
      for(let i=1;i<=6;i++){

      obj = document.createElement('label');
      obj.className ="color-txt";
      obj.UNSELECTABLE = "on";
      obj.innerHTML  = identifier[i-1]+":";
      obj.style.left = "240px";obj.style.top = (30*i)+"px";
      obj.style.width = "20px";obj.style.height = "20px";
      div.appendChild(obj);

      obj = document.createElement('canvas');
      obj.className ="color-lever";obj.id = ("colorLeverX"+i+""+id);
      obj.style.left = "270px";obj.style.top = 30*i+"px";
      obj.width = 140;obj.height = 20;
      div.appendChild(obj);


      obj = document.createElement('input');
      obj.className ="color-input";obj.id = ("colorTxtInput"+i+""+id);
      obj.style.left = "420px";obj.style.top = (30*i)+"px";
      obj.style.width = "40px";obj.style.height = "20px";
      div.appendChild(obj);
      }


    }
    addEvents(){
      document.addEventListener('mousedown', (e) => {this.mouseDown=true;console.log(this.mouseDown);});
      document.addEventListener('mouseup', (e) => {this.mouseDown=false;console.log(this.mouseDown);this.aktiveElement=0;});



      document.addEventListener('mousemove', (e) => {if (this.mouseDown===true){      this.startRender() }});

      document.getElementById("colorFrame"+this.id).addEventListener('mousemove', (e) => {
        if (this.mouseDown===true){        
          this.posX += e.movementX
          this.posY += e.movementY
          let div = document.getElementById("colorDiv"+this.id);
          div.style.left = this.posX+"px";
          div.style.top = this.posY+"px";
        }
      });
      document.getElementById("colorPick"+this.id).addEventListener('mousemove', (e) => {
        if (this.mouseDown===true){
          this.aktiveElement=1;
          let click = this.click(e.layerX-5,e.layerY-5,160,160);
          this.colorHSV[2] = click[0];this.colorHSV[1] = 1-click[1];
         // this.colorRGB = this.createRGBfromHSV(this.colorHSV);
        }
      });
      document.getElementById("colorLeverY"+this.id).addEventListener('mousemove', (e) => {
        if (this.mouseDown===true){
          this.aktiveElement=1;
          let click = this.click(e.layerX,e.layerY+0.01,1,170);
          this.colorHSV[0] = 1-click[1];
          //this.colorRGB = this.createRGBfromHSV(this.colorHSV);
        }
      });
    }
    setLevler(lever1,lever2,lever3,lever4,lever5,lever6){
    }
  //--Logik---------------------------------------------------------------------------------------------------------------------------------
    show(posX,posY){
      this.posX=posX;this.posY=posY;
      let div = document.getElementById("colorDiv"+this.id)
      div.style.display = "inline";
      div.style.left = this.posX+"px";
      div.style.top = this.posY+"px";
    }
    hide(){
      document.getElementById("colorDiv"+this.id).style.display = "none";
    }
    click(posX,posY,width,height){
      posX/=width;posY/=height
      if (posX<0)posX=0;if (posY<0)posY=0;
      if (posX>1)posX=1;if (posY>1)posY=1;
      return [posX,posY];
    }
  //--ColorOperators---------------------------------------------------------------------------------------------------------------------------------
    createRGBfromH(value,max) {
      let pos = (value / max*6)|0;
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
      let colorHSV=[0,0,0];
      return colorHSV;
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
          color = this.addRGBandS(ix,canvas.width,color);
          color = this.addRGBandV(this.colorHSV[2],1,color);
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
          color[0] = 255/canvas.width*ix;
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
          color[1] = 255/canvas.width*ix;
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX6(resolution) {
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
      console.log(this.aktiveElement);
      if (this.mouseDown===true && this.aktiveElement===1){
        this.render();
        setTimeout(this.startRender.bind(this), 40);
      }
    }
    clearCanvas(canvasName,SmoothingEnabled,fillStyle){
      let canvas = document.getElementById(""+canvasName+""+this.id);
      let context = canvas.getContext("2d");
      context.imageSmoothingEnabled = SmoothingEnabled;context.mozImageSmoothingEnabled = SmoothingEnabled;context.fillStyle = fillStyle; 
      context.clearRect(0, 0, canvas.width, canvas.height);
      return context;
    }
    render(){
      let context;let SmoothingEnabled = true;
      let resolution = 42;
      let fillStyle = "rgba(75,75,75,1)"; 

      this.colorRGB = this.createRGBfromHSV(this.colorHSV);

      context = this.clearCanvas("colorPick",SmoothingEnabled,fillStyle)
      context.fillRect(0, this.colorHSV[1]*160, 170, 10);
      context.fillRect(this.colorHSV[2]*160, 0, 10, 170);
      context.drawImage(this.drawColorPick(resolution), 5, 5, 160, 160);

      context = this.clearCanvas("colorLeverY",SmoothingEnabled,fillStyle)
      context.fillRect(0, (1-this.colorHSV[0])*170-5, 20, 10);
      context.drawImage(this.drawColorLeverY(resolution), 5, 0, 10, 170);

      context = this.clearCanvas("colorLeverX1",SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[0])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX1(resolution), 0, 5, 140, 10);
      document.getElementById("colorTxtInput1"+this.id).value = (this.colorHSV[0]*360)|0;

      context = this.clearCanvas("colorLeverX2",SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[1])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX2(resolution), 0, 5, 140, 10);
      document.getElementById("colorTxtInput2"+this.id).value = (this.colorHSV[1]*100)|0;

      context = this.clearCanvas("colorLeverX3",SmoothingEnabled,fillStyle)
      context.fillRect((this.colorHSV[2])*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX3(resolution), 0, 5, 140, 10);
      document.getElementById("colorTxtInput3"+this.id).value = (this.colorHSV[2]*100)|0;

      context = this.clearCanvas("colorLeverX4",SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[0]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX4(resolution), 0, 5, 140, 10);
      document.getElementById("colorTxtInput4"+this.id).value = this.colorRGB[0]|0;

      context = this.clearCanvas("colorLeverX5",SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[1]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX5(resolution), 0, 5, 140, 10);
      document.getElementById("colorTxtInput5"+this.id).value = this.colorRGB[1]|0;
      
      context = this.clearCanvas("colorLeverX6",SmoothingEnabled,fillStyle)
      context.fillRect((this.colorRGB[2]/255)*140-5,0, 10, 20);
      context.drawImage(this.drawColorLeverX6(resolution), 0, 5, 140, 10);
      document.getElementById("colorTxtInput6"+this.id).value = this.colorRGB[2]|0;
    }
}