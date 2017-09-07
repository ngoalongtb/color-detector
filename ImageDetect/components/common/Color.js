import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    container:{
        textAlign:'center',
        width:100,
        marginLeft:10,
        display:'flex',
        flexDirection:'column'
    }
}
export default class Color extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isHover:false
        }
    }
    delete(){
        this.props.handleDelete(this.props.id);
    }
    render(){
        return(
            <div style={styles.container} >
                <div style={{width:100,height:100, display:'flex', justifyContent:'center', alignItems:'center',

                    backgroundColor:'rgb('+this.props.red+','+this.props.green+','+this.props.blue+')',

                }} onMouseEnter={()=>{
                    this.setState({isHover:true})
                }} onMouseLeave={()=>{
                    this.setState({isHover:false})
                }}>
                    <RaisedButton label="delete" style={{display:this.state.isHover?'':'none'}}
                                  onTouchTap={this.delete.bind(this)}/>
                </div>
                <h4 style={{margin:0}}>{this.props.name}</h4>
            </div>
        );
    }
}