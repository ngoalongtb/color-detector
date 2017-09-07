import React from 'react';
import Nav from '../common/Nav';

export default class Layout extends React.Component{
    render(){
        return(
            <div className="layout">
                <div>
                    <Nav/>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}