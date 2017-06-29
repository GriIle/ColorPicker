function main(){
	let Test = new ColorPicker("1");
             //(   fontColor,     		inputColor,					leverColor,			backColor,							frameColor,					border,										font                       )
	Test.setStyle("rgb(230,230,230)","rgba(20,20,20,0.95)","rgb(75,75,75)","rgba(31,31,31,0.95)","rgba(18,18,18,0.95)","1px solid rgb(42,42,42)","13px Arial, Times, serif")
	Test.show(500,200);




	let Test2 = new ColorPicker("1");
	Test2.setStyle("rgb(0,0,0)","rgba(200,200,220,0.95)","rgb(80,80,255)","rgba(180,180,240,0.95)","rgba(100,100,255,0.95)","1px rgb(0,0,0)","13px Arial, Times, serif")
	Test2.show(700,300);
	let Test3 = new ColorPicker("1");
	Test3.setStyle("rgb(255,150,0)","rgba(10,20,0,0.95)","rgb(255,150,0)","rgba(20,30,10,0.95)","rgba(10,20,0,0.95)","1px solid rgb(100,102,0)","15px Consolas, Times, serif")
	Test3.show(600,100);

}
main();