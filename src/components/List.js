import React from 'react';
import Items from './Items';
import '../App.css';

class List extends React.Component {
    render() {
        return (
            <div className="List">
                <h3> List name </h3>
                <div className="container-items">
                    <ol>
                        <Items/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default List;