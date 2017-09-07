import React from 'react';


export default class ImageCanvas extends React.Component{
    constructor(){
        super();
    }
    clickCanvas(event){
        var canvas = document.getElementById('canvas');

        let mouseX = event.pageX - canvas.offsetLeft;
        let mouseY = event.pageY - canvas.offsetTop;
        console.log(mouseX+"  "+ mouseY);
        var data = canvas.getContext('2d').getImageData(mouseX, mouseY, 1, 1).data;
        if(data[3] == 0) return;

        var color = {
            red:data[0],
            green:data[1],
            blue:data[2]
        }
        this.props.handleClick(color);
    }
    render(){
        console.log('renderd');
        return(
            <canvas id="canvas" width="500" height="500" 
                onClick={(event)=>this.clickCanvas(event)}>
            </canvas>
        );
    }
    componentDidUpdate(){
        var canvas = document.getElementById('canvas'); 
        var context = canvas.getContext('2d');
        this.canvas = canvas;

        var image = new Image();
        image.crossOrigin = "Anonymous";
        image.src= this.props.image;

        image.onload = ()=>{
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
        }
    }
}