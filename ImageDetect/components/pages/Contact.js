import React from 'react';

const styles = {
    center:{
        textAlign:'center'
    }
}
export default class Contact extends React.Component{
    render(){
        return(
            <div>
                <h1 style={styles.center}>Sinh viên thực hiện</h1>
                <h2 style={styles.center}>TẠ MINH LUẬN</h2>
                <h2 style={styles.center}>NGUYỄN VĂN THẮNG</h2>
                <h2 style={styles.center}>LƯƠNG HỒNG QUẢNG</h2>
                <h2 style={styles.center}>HOÀNG CÔNG HIẾU</h2>
            </div>
        );
    }
}