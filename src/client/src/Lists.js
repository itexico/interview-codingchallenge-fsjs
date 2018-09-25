import React from 'react';
import List from './List';

class Lists extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            lists: [
                        // {id: "1", text: "Example Favorites 1"},
                        // {id: "2", text: "Example Favorites 2"},
                        // {id: "3", text: "Example Favorites 3"}
                    ]
        }
    }

    componentWillMount() {
        fetch('http://localhost:5656/api/Lists')
          .then((response) => {
            return response.json()
            
          })
          .then((Lists) => {
            console.log(Lists);
            
            this.setState({lists: Lists })
          })
      }

      render() {
        if (this.state.lists.length > 0) {
          const lists = this.state.lists.map(list=>{
           return <List key={list._id} name={list.name} favorites={list.favorites}/>
          })
          return (
            <section className="lists-container row">
              <div className="offset-l1 offset-m1 offset-s1 col l3 m5 s10">
                <ul>
                  {lists}
                </ul>
              </div>
            </section>
          )
        } else {
          return <p className="text-center">Loading Lists...</p>
        }
      }


}

export default Lists;