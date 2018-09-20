import React from 'react';
import '../App.css';

class Items extends React.Component { 
    render() {
        return (
            <li className="item"> _texto_ 
                <i className="fas fa-plus"></i>
                <i className="fas fa-trash-alt"></i>
                <i className="fas fa-pen"></i>
            </li>
        );
    }
};

export default Items;
