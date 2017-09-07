import React from 'react';
import ImageCanvas from './../common/Image';
import Board from './../common/Board';

const styles = {
    container:{
        marginTop:10,
        marginLeft:'3%'
    },
    board:{
        position:'absolute',
        right:0,
        top:50,
        marginRight:50,
        width:400
    }
}
export default class ColorDetect extends React.Component{
    constructor(){
        super();
        this.state={
            color:{
                red:0,
                green:0,
                blue:0
            },
            image:"./images/cocaro.png"
        }
    }
    _imageCanvasClick(color){
        console.log(color);
        this.setState({
            ...this.state,
            color:color,

        });
    }
    _openFile(image){
        console.log(image);
        this.setState({
            ...this.state,
            image:"./images/"+image
        })
    }
    render(){
        return(
            <div style={styles.container}>
                <div>
                    <ImageCanvas image={this.state.image}
                                 handleClick={this._imageCanvasClick.bind(this)}/>
                </div>
                <div style={styles.board}>
                    <Board color={this.state.color} handleOpenFile={this._openFile.bind(this)}/>
                </div>

            </div>
        );
    }
}