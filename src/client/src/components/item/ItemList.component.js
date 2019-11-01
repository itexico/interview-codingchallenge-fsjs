import React, { Component } from "react";

class ItemList extends Component {
  render() {
    return (
            <div>
                <li className="list-group-item d-flex justify-content-between my-2">
                    <h6>{this.props.item.title}</h6>
                    <div className="todo-icon">
                        <span className="mx-2 text-success">
                            <i className="fas fa-pen"></i>
                        </span>
                        <span className="mx-2 text-danger">
                            <i className="fas fa-trash"></i>
                        </span>
                    </div>
                </li>
            </div>
    );
  }
}

export default ItemList;