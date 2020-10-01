import React from 'react';
import HeaderBlock from './Components/HeaderBlock';
import CardBlock from './Components/CardBlock';
import 'antd/dist/antd.css';

const Main = () => {
    return (
        <div style={{padding: "25px"}}>
            <HeaderBlock />
            <CardBlock />
        </div>
    )
}

export default Main;