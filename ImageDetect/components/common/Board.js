import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import data from './../../data/data.json';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

var axios = require('axios');


const styles = {
    center:{
        textAlign:'center',
        justifyContent:'center'
    },
    boardContainer:{
        width:400,
        height:600,
        paddingLeft:10
    },
    button: {
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    mgL10:{
        marginLeft:10
    }

}
export default class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource:[],
            colorName:'',
            inputFile:null,
            txtColor:'',
            k:1,
            openSave:false,

        }
    }
    openFile(){
        this.props.handleOpenFile(this.state.inputFile.files.item(0).name);
    }
    handleUpdateInput = (value) => {
        this.setState({
            ...this.state,
            txtColor:value,
        });
    };
    dropdownChange = (event, index, value) => this.setState(
        {
            ...this.state,
            k:value
        }
    );
    detectColor(){
        var self = this;
        axios.post('http://localhost:1111/color',{
            r:this.props.color.red,
            g:this.props.color.green,
            b:this.props.color.blue,
            k:this.state.k
        })
            .then(function (response) {
                self.setState({
                    ...self.state,
                    colorName:response.data.name
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    save(){
        var self = this;
        console.log(this.state.nameColor);
        axios.post('http://localhost:1111/colors',
            {
                name: this.state.txtColor,
                code: {
                    r: this.props.color.red,
                    g: this.props.color.green,
                    b: this.props.color.blue
                }
            }
        )
            .then(function (response) {
                self.setState({
                    ...self.state,
                    openSave:true
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    txtKChange(event, value){
        this.setState(
        {
            ...this.state,
            k:value
        });
    }
    render(){
        return(
            <Paper style={styles.boardContainer}>
                <h1 style={styles.center}>Color detector</h1>
                <RaisedButton
                    label="Choose an Image"
                    labelPosition="before"
                    style={styles.button}
                    containerElement="label"
                >
                    <input type="file" ref={(item)=>this.state.inputFile=item} style={styles.exampleImageInput} onChange={this.openFile.bind(this)}/>
                </RaisedButton>

                <AutoComplete
                    hintText="Type color"
                    ref={(item)=>this.state.autoComplete=item}
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />
                <RaisedButton label="Save" primary={true} style={styles.mgL10} onTouchTap={this.save.bind(this)}/>

                <div>
                    <span>color:</span><div
                        style={{backgroundColor:'rgb('+this.props.color.red+','+this.props.color.green+','+this.props.color.blue+')',
                        width:100, height:40}}> </div>
                </div>

                <div>
                    <h3>red: {this.props.color.red}</h3>
                    <h3>green: {this.props.color.green}</h3>
                    <h3>blue: {this.props.color.blue}</h3>
                </div>
                <div>
                    <h2>color name: <b>{this.state.colorName}</b></h2>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <span style={{ paddingTop:20}}>Số láng giềng K:</span>
                        <DropDownMenu value={this.state.k} onChange={this.dropdownChange.bind(this)}>
                            <MenuItem value={1} primaryText="1" />
                            <MenuItem value={2} primaryText="2" />
                            <MenuItem value={3} primaryText="3" />
                            <MenuItem value={4} primaryText="4" />
                            <MenuItem value={5} primaryText="5" />
                        </DropDownMenu>

                    </div>

                    <div style={styles.center}>
                        <RaisedButton label="Detect color" primary={true} onTouchTap={this.detectColor.bind(this)}/>
                    </div>
                </div>
                <Snackbar
                    open={this.state.openSave}
                    message="Lưu thành công"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </Paper>
        );
    }
    componentDidMount(){
        var self = this;
        axios.get('http://localhost:1111/colors')
            .then(function (response) {
                console.log(response.data);
                let tam = [];
                response.data.map((item, key)=>{
                    tam.push(item.name);
                });
                tam = tam.filter((x, i, a) => a.indexOf(x) == i)
                self.setState({
                    ...self.state,
                    dataSource:tam
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        {/*<TextField*/}
            {/*onChange={this.txtKChange.bind(this)}*/}
            {/*defaultValue={3}*/}
            {/*hintText="Hint Text"*/}
        {/*/>*/}
    }
}

