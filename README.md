# ColorPicker
window for color picking<br>
<br>

## Features
Color picking ^^<br>
Easy integration with Complet js based interface<br>
Individual designing of the window<br>
No IE support<br>

## Use
Add ColorPicker.js to you files<br>
Make a new object from the ColorPicker class<br>
````js
  ColorPicker colorP = new ColorPicker()
````

setStyle use css:<br>
  - Color = "rgb(75,75,75)"<br>
  - Font = "13px Arial, Times, serif"<br>
````js
  colorP.setStyle(fontColor,inputColor,leverColor,backColor,frameColor,borderColor,font)
````

Add events to ok button event listener<br>
Last parameter selects the return type, Example with green:<br>
  - "cssRGB" return "rgb(0,255,0)"<br>
  - "RGB" return [0,255,0]<br>
  - "HSV" return [120,100,100]<br>
````js
  colorP.setRefToColor(() => {body.style.background = colorP.returnColor("cssRGB");});
````
Show the ColorPicker at the specified position<br>
````js
  colorP.show(posX,posY);
````
