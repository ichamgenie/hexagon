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
            mouseOn(currectTa);
        }
        if(formerTa instanceof TriangleCell)
        {
            mouseOff(formerTa);
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

function mouseOn(taCell)
{
    taCell.triangle.set({ fill: 'orange' });
    canvas.renderAll();
}

function mouseOff(taCell)
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
    
    for(var ta of taMap)
    {
        ta[1].drawLines();
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
    
    var lx1 = 0;
    var ly1 = 0;
    var lx2 = 0;
    var ly2 = 0;
    var lx3 = 0;
    var ly3 = 0;
    
    
    if(a===180)
    {
        this.taTop = y+sqrt32*l+1;
        this.taLeft = x+l/2+1;
        this.taAngle = 180;
        this.taColor = "#dddddd";
        
        lx1 = l/2;
        ly1 = this.taHeight;
        lx2 = l;
        ly2 = 0;
        lx3 = 0;
        ly3 = 0;
    }
    else
    {
        this.taTop = y;
        this.taLeft = x-l/2;
        this.taAngle = 0;
        this.taColor = "#cccccc";
        
        lx1 = l/2;
        ly1 = 0;
        lx2 = l;
        ly2 = this.taHeight;
        lx3 = 0;
        ly3 = this.taHeight;
    }
    
    this.triangle = null;
    this.draw = draw;
    this.drawLines = drawLines;
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
    
    function drawLines()
    {
        this.line1 = new fabric.Line([lx1, ly1, lx2, ly2], 
            {
                top: y,
                left: x,
                stroke: "white",
                selectable:false,
                hoverCursor:"default"
            });
        this.line2 = new fabric.Line([lx2, ly2, lx3, ly3], 
            {
                top: y + ly2,
                left: x - l/2,
                stroke: "white",
                selectable:false,
                hoverCursor:"default"
            });
        this.line3 = new fabric.Line([lx3, ly3, lx1, ly1], 
            {
                top: y,
                left: x - l/2,
                stroke: "white",
                selectable:false,
                hoverCursor:"default"
            });
        canvas.add(this.line1);
        canvas.add(this.line2);
        canvas.add(this.line3);
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
