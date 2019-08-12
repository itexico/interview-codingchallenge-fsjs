import React from 'react';
import '../App.css';

class BtnEdit extends React.Component{
    render() { 
        return ( 
            <button className="btn" type="button">
                <i className="fas fa-pen"></i>
            </button>
        );
    }
};

export default BtnEdit;