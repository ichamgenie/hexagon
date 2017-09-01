var canvas = getCanvas();
var sqrt32 = Math.sqrt(3)/2;
var H = 4;
var taMap = new Map();
var width = canvas.width;
var height = canvas.height;
var D = getD();

var keyCatch = "";

fabric.Object.prototype.transparentCorners = false;

canvas.on('mouse:move', function(option) {
    var taKey = calKey(option.e.offsetX, option.e.offsetY, width, height, D);
    if(keyCatch == taKey)
    {
        
    }
    else
    {
        var currectTa = taMap.get(taKey);
        var formerTa = taMap.get(keyCatch);
        if(currectTa instanceof TriangleCell)
        {
            moveOn(currectTa);
        }
        if(formerTa instanceof TriangleCell)
        {
            moveOff(formerTa);
        }
        
        console.log(taKey);
    }
    
    
    keyCatch = taKey;
});

drawCanvas(canvas, getD());

function drawCanvas(canvas, d)
{
    drawTriangles(canvas, canvas.width, canvas.height, d, canvas.width/(d*2));
}

function moveOn(taCell)
{
    taCell.triangle.set({ fill: 'orange' });
    canvas.renderAll();
}

function moveOff(taCell)
{
    taCell.triangle.set({ fill: 'pink' });
    canvas.renderAll();
}

function drawTriangles(canvas, width, height, l, h)
{
    var taHeight = l * sqrt32;
    var midX = width/2;
    var midY = height/2;
    
    for(var j=0;j<h;j++)
    {
        y = midY + j*taHeight;
        var x0 = midX -j*l/2;
        for(var i=0;i<j;i++)
        {
            x = x0 + i*l;
            taMap.set(getKey(x, y), new TriangleCell(canvas, x, y, l, 0));
            taMap.set(getKey(x + l/2, y), new TriangleCell(canvas, x + l/2, y, l, 180));
        }
        x = x0 + j*l;
        taMap.set(getKey(x, y), new TriangleCell(canvas, x , y, l, 0));
    }
    
    for(var ta of taMap)
    {
        ta[1].draw();
    }
}

function TriangleCell(canvas, x, y, l, a)
{
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.l = l;
    this.a = a;
    
    this.taWidth = l;
    this.taHeight = l*sqrt32;
    
    if(a===180)
    {
        this.taTop = y+sqrt32*l+1;
        this.taLeft = x+l/2+1;
        this.taAngle = 180;
        this.taColor = "#dddddd";
    }
    else
    {
        this.taTop = y;
        this.taLeft = x-l/2;
        this.taAngle = 0;
        this.taColor = "#cccccc";
    }
    
    this.triangle = null;
    this.draw = draw;
    function draw()
    {
        this.triangle = new fabric.Triangle({ 
            top: this.taTop, 
            left: this.taLeft, 
            width: this.taWidth, 
            height: this.taHeight, 
            angle: this.taAngle, 
            fill: this.taColor,
            selectable:false,
            hoverCursor:"default"});
        canvas.add(this.triangle);
    }
    
}

function getKey(x, y)
{
    return "" + Math.round(x) + "," + Math.round(y);
}

function calKey(x, y, width, height, L)
{
    var x0 = width/2;
    var y0 = height/2;
    var H = L*sqrt32;
    
    var l1 = y - y0;
    var l2 = (y - y0)/2 - 0.75*(x - x0)/sqrt32;
    var l3 = (y - y0)/2 + 0.75*(x - x0)/sqrt32;
    
    taY = y0 + Math.floor(l1/H)*H;
    n2 = Math.floor(l2/H);
    n3 = Math.floor(l3/H);
    taX = x0 + (n3-n2)*L/2;
    
    return getKey(taX, taY);
}
