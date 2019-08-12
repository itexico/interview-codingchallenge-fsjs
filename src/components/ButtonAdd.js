import React from 'react';
import '../App.css';

class BtnAdd extends React.Component{
    render() { 
        return ( 
            <button className="btn" type="button">
                <i className="fas fa-plus"></i>
            </button>
        );
    }
};

export default BtnAdd;