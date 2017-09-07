import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';

const styles = {
    ul:{
        listStyle:'none',
        margin:0,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-start',
        alignItems:'center'
    },
    li:{
        paddingRight:25,
        fontSize:20,
    },
    a:{
        textDecoration:'none',
        color:'white'
    }
}

export default class Nav extends React.Component{
    render(){
        const nav =
            <ul style={styles.ul}>
                <li style={styles.li}><Link style={styles.a} to="/home">KNN</Link></li>
                <li style={styles.li}><Link style={styles.a} to="/color-detect">Color Detect</Link></li>
                <li style={styles.li}><Link style={styles.a} to="/contact">Group</Link></li>
                <li style={styles.li}><Link style={styles.a} to="/admin">Admin</Link></li>
            </ul>
        return(
        <AppBar
            title={nav}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        );
    }
}