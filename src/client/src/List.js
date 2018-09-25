import React from 'react';
import Favorite from './Favorite';

class List extends React.Component {
  
  render(){
    // console.log(this.props.favorites);
    const favorites = this.props.favorites;
    const favs = [];
    if(typeof favorites !== "undefined"){
      favs.push(favorites.split(","));
      console.log(favs.length);
    }
      
    let favorite;
      favs.forEach(item=>{
        favorite = item.map(element =>{
          return <Favorite  favorite={element}/>
        });
      })
  
      return(
        <div className ="row">
          <div className ="list offset-l1 offset-m1 offset-s1 col l10 m10 s10">
            <h6>{this.props.name}</h6>
            
            <ul>
              {favorite}
            </ul>
          </div>
        </div>
      )
    }
}

export default List;


//DOCUMENTATION
//https://medium.com/@baphemot/how-to-make-ajax-requests-in-react-a6a52bb5a8b1