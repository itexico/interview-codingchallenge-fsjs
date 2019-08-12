import React from 'react';
import BtnDelete from './ButtonDelete';
import BtnAdd from './ButtonAdd';
import BtnEdit from './ButtonEdit';
import '../App.css';

class Items extends React.Component { 
    render() {
        return (
            <li className="item">
                <input type="text" className="input-item"/>
                <BtnAdd />
                <BtnEdit/>
                <BtnDelete/>
            </li>
        );
    }
};

export default Items;
