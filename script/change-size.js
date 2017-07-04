var btn=document.getElementById("submit-btn");

btn.onclick=function()
{
	var w=document.getElementById("text-width").value;
	var h=document.getElementById("text-height").value;
	var d=document.getElementById("text-d").value;
	var c=document.getElementById("myCanvas");
	
	c.width = Number(w);
	c.height = Number(h);
	draw_can(c, Number(d));
}
