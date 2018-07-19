import React from 'react';



export default class Wave extends React.Component{
    componentDidMount() {
    	const self = this;
    	const canvas = this.refs.canvas;
    	canvas.height = 500;
    	canvas.width = 500;
    	this.canvas = canvas;
    	this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
		this.isDrawCircle=false;
    	const ctx = canvas.getContext('2d');
		this.drawSin(ctx);
		this.xOffset=0;
		this.speed=0.1;
		this.rangeValue=0.7;
		this.nowRange=0;
		//下面这句看不大懂，为啥要再传一个canvas进去？？？
		requestAnimationFrame(this.draw.bind(this,canvas));
    }
    render() {
      	return (
        	<div className="content page">
        	  <canvas ref="canvas"></canvas>
        	</div>
      	);
    }

	draw(){
		const canvas=this.canvas;
		const ctx=canvas.getContext('2d');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		if(!this.isDrawCircle){
			this.drawCircle(ctx);
		}
		this.drawSin(ctx,this.xOffset,this.nowRange);
		this.xOffset+=this.speed;
		if(this.nowRange<this.rangeValue){
			this.nowRange+=0.01;
		}
		requestAnimationFrame(this.draw.bind(this));
		
	}
	drawCircle(ctx){
		const r=this.canvasWidth/2;
		const lineWidth=3;
		const cR=r-lineWidth;
		ctx.lineWidth=lineWidth;
		ctx.beginPath();
		ctx.arc(r,r,cR,0,2*Math.PI);
		ctx.stroke();
		ctx.clip();
		this.isDrawCircle=true;
	}
    drawSin(ctx,xOffset=0,nowRange=0){
        const points=[];
        const canvasWidth=this.canvasWidth;
        const canvasHeight=this.canvasHeight;
        const startX=0;
        const waveWidth=0.05;
        const waveHeight=20;

        ctx.beginPath();
        for(let x=startX;x<startX+canvasWidth;x+=20/canvasWidth){
            const y=waveHeight*Math.sin((startX+x)*waveWidth+xOffset);
            points.push([x,(1-nowRange)*canvasHeight+y]);
            ctx.lineTo(x,(1-nowRange)*canvasHeight+y);           
        }
        ctx.lineTo(canvasWidth,canvasHeight);
        ctx.lineTo(startX,canvasHeight);
        ctx.lineTo(points[0][0],points[0][1]);
		ctx.stroke();
		var grd=ctx.createLinearGradient(canvasWidth/2,canvasHeight/2,canvasWidth/2,canvasHeight);
		grd.addColorStop(0,'rgb(226, 125, 24)');
		grd.addColorStop(1,'rgb(180, 159, 138)');
		ctx.fillStyle=grd;
		ctx.strokeStyle='#ccc';
		ctx.fill();
	}

}
