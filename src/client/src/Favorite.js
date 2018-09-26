import React from 'react';

class Favorite extends React.Component {
    render(){
        console.log(this.props.favorite);
        
        return(
            <li className="favorite">
                <p>{this.props.favorite}</p>
            </li>
        )
    }
}

export default Favorite;