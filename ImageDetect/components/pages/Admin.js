import React from 'react';
import Color from './../common/Color';
var axios = require('axios');
const styles = {
    center:{
        textAlign:'center'
    }
}
export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            colors:[]
        }
    }
    delete(id){
        var self  = this;
        axios.delete('http://localhost:1111/colors/'+id)
            .then(function (response) {
                console.log(response.data);
                self.setState({
                    ...self.state,
                    colors:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        if(this.state.colors == []){
            return <h1>Loading...</h1>;
        }

        return(
            <div style={{marginLeft:100, marginRight:100}}>
                <h1 style={styles.center}>This is my admin page</h1>
                <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                    {
                        this.state.colors.map((item, key)=>{
                            return(<Color key={key} id={key} red={item.code.r} green={item.code.g} blue={item.code.b}
                                          name={item.name} handleDelete={this.delete.bind(this)}/>)
                        })
                    }

                </div>
            </div>
        );
    }
    componentDidMount(){
        var self  = this;
        axios.get('http://localhost:1111/colors')
            .then(function (response) {
                console.log(response.data);
                self.setState({
                    ...self.state,
                    colors:response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}