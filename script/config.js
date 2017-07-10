var WIDTH = 1024;
var HEIGHT = 1024;
var D = 64;

var c=document.getElementById("c");

c.width = getWidth();
c.height = getHeight();

var canvas = new fabric.Canvas('c');

function getWidth()
{
    return WIDTH;
}
function getHeight()
{
    return HEIGHT;
}
function getD()
{
    return D;
}
function getCanvas()
{
    return canvas;
}