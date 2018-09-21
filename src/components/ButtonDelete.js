import React from 'react';
import '../App.css';

class BtnDelete extends React.Component{
    render() { 
        return ( 
            <button className="btn" type="button">
                <i className="fas fa-trash-alt"></i>
            </button>
        );
    }
};

export default BtnDelete;