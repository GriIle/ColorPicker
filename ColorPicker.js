"use strict";
class ColorPicker{
  //--buildColorPicker---------------------------------------------------------------------------------------------------------------------------------
    constructor(id) {
      this.colorHSV = [0,0,0];
      this.colorRGB = [0,0,0];
      this.mouseDown = false;
      this.aktiveElement = 0;

      this.buildHTML(5754);
      this.addEvents();
      this.render();

    }
    addEvents(){
      colorDiv.addEventListener('mousedown', (e) => {this.mouseDown=true;console.log(this.mouseDown);});
      colorDiv.addEventListener('mouseup', (e) => {this.mouseDown=false;console.log(this.mouseDown);});
      colorDiv.addEventListener('mousemove', (e) => {if (this.mouseDown===true)this.render();});

      colorPick.addEventListener('mousemove', (e) => {
        if (this.mouseDown===true){
          let click = this.click(e,180,180);
          this.colorHSV[2] = click[0];this.colorHSV[1] = click[1];
         // this.colorRGB = this.createRGBfromHSV(this.colorHSV);
        }
      });
      colorLeverY.addEventListener('mousemove', (e) => {
        if (this.mouseDown===true){
          let click = this.click(e,1,180);
          this.colorHSV[0] = 1-click[1];
          //this.colorRGB = this.createRGBfromHSV(this.colorHSV);
        }
      });
    }
    buildHTML(id){
      colorPick.width = 180;
      colorPick.height = 180;
      colorPreview.width = 30;
      colorPreview.height = 30;
      colorLeverY.width=10;
      colorLeverY.height=180;

      colorLeverX1.width=180;
      colorLeverX1.height=10;
          colorLeverX2.width=180;
      colorLeverX2.height=10;
          colorLeverX3.width=180;
      colorLeverX3.height=10;
          colorLeverX4.width=180;
      colorLeverX4.height=10;
          colorLeverX5.width=180;
      colorLeverX5.height=10;
          colorLeverX6.width=180;
      colorLeverX6.height=10;
    }
    setLevler(lever1,lever2,lever3,lever4,lever5,lever6){
    }
  //--Logik---------------------------------------------------------------------------------------------------------------------------------
    show(color){
    }
    hide(color){
    }
    click(e,width,height){
      return [e.layerX/width,e.layerY/height];
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
      colorRGB[0] = colorRGB[0]*(1-pro)+((255)*(pro));//r
      colorRGB[1] = colorRGB[1]*(1-pro)+((255)*(pro));//g
      colorRGB[2] = colorRGB[2]*(1-pro)+((255)*(pro));//b
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
    drawColorPick() {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 100;
      canvas.height = 100;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          for (let iy = 0; iy < canvas.height; iy++) {
            let offset = (imgData.width * iy + ix) * 4;
            mod.data[offset + 3] = 255;//a
            let color = this.createRGBfromH(this.colorHSV[0],1);
            color = this.addRGBandS(iy,canvas.height,color);
            color = this.addRGBandV(ix,canvas.width,color);
            mod.data[offset]     = color[0];
            mod.data[offset + 1] = color[1];
            mod.data[offset + 2] = color[2];
          }
        }
      context.putImageData(mod, 0, 0);

      context.fillStyle = "rgba(0,0,0,1)"; 
      context.fillRect((this.colorHSV[2]*canvas.width)|0, 0,1, canvas.height);
      context.fillRect(0, (this.colorHSV[1]*canvas.height)|0,canvas.width, 1);

      return (canvas);
    };
    drawColorLeverY() {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 1;
      canvas.height = 42;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
          for (let iy = 0; iy < canvas.height; iy++) {
            let offset = (imgData.width * iy) * 4;
            mod.data[offset + 3] = 255;//a
            let color = this.createRGBfromH(41-iy,canvas.height);
            mod.data[offset]     = color[0];
            mod.data[offset + 1] = color[1];
            mod.data[offset + 2] = color[2];
          }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX1() {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 42;
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
    drawColorLeverX2() {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 42;
      canvas.height = 1;
      let mod = context.createImageData(canvas.width, canvas.height);
      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (let ix = 0; ix < canvas.width; ix++) {
          let offset = ix * 4;
          mod.data[offset + 3] = 255;//a
          let color = this.createRGBfromH(this.colorHSV[0],1);
          color = this.addRGBandS(41-ix,canvas.width,color);
          color = this.addRGBandV(this.colorHSV[2],1,color);
          mod.data[offset]     = color[0];
          mod.data[offset + 1] = color[1];
          mod.data[offset + 2] = color[2];
        }
      context.putImageData(mod, 0, 0);
      return (canvas);
    };
    drawColorLeverX3() {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 42;
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
    drawColorLeverX4() {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 42;
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
    drawColorLeverX5() {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 42;
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
    drawColorLeverX6() {
      let canvas = document.createElement("canvas");
      let context  = canvas.getContext("2d");
      canvas.width = 42;
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
    render(){
      let context;let SmoothingEnabled = false;
      context  =  colorPick.getContext("2d");
      context.imageSmoothingEnabled = false;context.mozImageSmoothingEnabled = SmoothingEnabled;
      context.drawImage(this.drawColorPick(), 0, 0, 180, 180);
      context  =  colorLeverY.getContext("2d");
      context.imageSmoothingEnabled = false;context.mozImageSmoothingEnabled = SmoothingEnabled;
      context.drawImage(this.drawColorLeverY(), 0, 0, 10, 180);

      context  =  colorLeverX1.getContext("2d");
      context.imageSmoothingEnabled = false;context.mozImageSmoothingEnabled = SmoothingEnabled;
      context.drawImage(this.drawColorLeverX1(), 0, 0, 180, 10);
      context  =  colorLeverX2.getContext("2d");
      context.imageSmoothingEnabled = false;context.mozImageSmoothingEnabled = SmoothingEnabled;
      context.drawImage(this.drawColorLeverX2(), 0, 0, 180, 10);
      context  =  colorLeverX3.getContext("2d");
      context.imageSmoothingEnabled = false;context.mozImageSmoothingEnabled = SmoothingEnabled;
      context.drawImage(this.drawColorLeverX3(), 0, 0, 180, 10);

      this.colorRGB = this.createRGBfromHSV(this.colorHSV);

      context  =  colorLeverX4.getContext("2d");
      context.imageSmoothingEnabled = false;context.mozImageSmoothingEnabled = SmoothingEnabled;
      context.drawImage(this.drawColorLeverX4(), 0, 0, 180, 10);
      context  =  colorLeverX5.getContext("2d");
      context.imageSmoothingEnabled = false;context.mozImageSmoothingEnabled = SmoothingEnabled;
      context.drawImage(this.drawColorLeverX5(), 0, 0, 180, 10);
      context  =  colorLeverX6.getContext("2d");
      context.imageSmoothingEnabled = false;context.mozImageSmoothingEnabled = SmoothingEnabled;
      context.drawImage(this.drawColorLeverX6(), 0, 0, 180, 10);

      context  =  colorPreview.getContext("2d");
      context.fillStyle = "rgba("+this.colorRGB[0]+","+this.colorRGB[1]+","+this.colorRGB[2]+",1)"; 
      context.fillRect(0, 0,30, 30);
    }
}