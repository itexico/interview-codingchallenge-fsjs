import React, { Component } from "react";
import ItemList from '../item/ItemList.component';
import "./list.component.css";

class List extends Component {
    constructor() {
        super();
        this.state = {
          items: [{id: 1, title:"jugar"}, {id: 1, title:"oso"}]
        };
    } 

    onSubmit = event => {
        event.preventDefault();
      };   

  render() {
    return (
        <div className="list-container">
            <div className="title-list-container">
                <h1 className="title-list-content">List</h1>
            </div>
            <form onSubmit={this.onSubmit}>
                <div className="input-group">
                <div className="input-group-prepend">
                <div className="input-group-text bg-primary text-white">
                    <i className="fas fa-book"></i>
                </div>
                </div>
                <input type="text" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-block btn-primary mt-3">Add Item</button>
            </form>
            {this.state.items.map((item, index) => (
                <ItemList key={index} item={item}/>
            ))
            }
        </div>
    );
  }
}

export default List;