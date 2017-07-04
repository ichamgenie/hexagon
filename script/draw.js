var c=document.getElementById("myCanvas");

c.width = getWidth();
c.height = getHeight();

draw_can(c, getD());

function draw_can(canv, d)
{
	var cxt=canv.getContext("2d");
	var width = canv.width;
	var height = canv.height;

	var path1=new Path2D();
	draw_parallel_lines(path1, 0, d, width, height);
	draw_parallel_lines(path1, 60, d, width, height);
	draw_parallel_lines(path1, 120, d, width, height);

	cxt.strokeStyle = '#bbbbbb';
	cxt.stroke(path1);

	cxt.beginPath()
	var path2=new Path2D();
	draw_line(path2, width/2, height/2, 0, width, height);
	draw_line(path2, width/2, height/2, 60, width, height);
	draw_line(path2, width/2, height/2, 120, width, height);

	cxt.strokeStyle = '#ffbbbb';
	cxt.stroke(path2);
}


function draw_parallel_lines(path, ang, d, width, height)
{
	midX = width/2;
	midY = height/2;
	
	if(ang==0)
	{
		y = midY;
		while(y>0)
		{
			y = y-d;
		}		
		while(y<height)
		{
			draw_line(path, midX, y, 0, width, height);
			y = y+d;
		}
	}
	else
	{
		dx = d/Math.abs(Math.sin(ang*Math.PI/180));
		x = midX;
		while(x>0)
		{
			x = x-dx;
		}
		x = x + dx;
		while(x<width)
		{
			draw_line(path, x, midY, ang, width, height);
			x = x+dx;
		}
	}
}

function draw_line(path, x, y, ang, width, height)
{
	var maxX = width - 1;
	var maxY = height - 1;
	
	if(ang==90)
	{
		x1 = x;
		y1 = 0;
		x2 = x;
		y2 = maxY;
	}
	else
	{
		tanA = Math.tan(ang*Math.PI/180);
		x1 = 0;
		y1 = (x1-x)*tanA + y;
		x2 = maxX;
		y2 = (x2-x)*tanA + y;
	}
	path.moveTo(x1, y1);
	path.lineTo(x2, y2);
	
}