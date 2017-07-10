var canvas = getCanvas();
var sqrt32 = Math.sqrt(3)/2;
var H = 4;
fabric.Object.prototype.transparentCorners = false;

canvas.on('mouse:over', function(e) {
    e.target.set({ fill: 'orange' });
    console.log('mouse:over ' + e.target);
    canvas.renderAll();
});

canvas.on('mouse:out', function(e) {
    e.target.set({ fill: 'pink' });
    console.log('mouse:out ' + e.target);
    canvas.renderAll();
});

drawCanvas(canvas, getD());

function drawCanvas(canvas, d)
{
    drawTriangles(canvas, canvas.width, canvas.height, d, canvas.width/(d*2));
}

function drawTriangles(canvas, width, height, l, h)
{
    var taHeight = l * sqrt32;
    var midX = width/2;
    var midY = height/2;
    
    var triangeleList = [];
    for(var j=0;j<h;j++)
    {
        y = midY + j*taHeight;
        var x0 = midX -j*l/2;
        for(var i=0;i<j;i++)
        {
            x = x0 + i*l;
            triangeleList.push(new TriangleCell(canvas, x, y, l, 0));
            triangeleList.push(new TriangleCell(canvas, x + l/2, y, l, 180));
        }
        x = x0 + j*l;
        triangeleList.push(new TriangleCell(canvas, x , y, l, 0));
    }
    
    for(var k=0;k<triangeleList.length;k++)
    {
        triangeleList[k].draw();
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
    
    this.draw = draw;
    function draw()
    {
        ta = new fabric.Triangle({ top: this.taTop, left: this.taLeft, width: this.taWidth, height: this.taHeight, angle: this.taAngle, fill: this.taColor });
        canvas.add(ta);
    }
    
}
