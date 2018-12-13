import React, { Component } from "react";

import Input from "../stateless/Input";
import Button from "../stateless/Button";
import Lists from "../stateless/Lists"

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      newList: {
        category: ''
      },
      lists: []
    };

    this.getCategoryText = this.getCategoryText.bind(this)
    this.createCategory = this.createCategory.bind(this)
  }

  getCategoryText(event) {

    let newValue = event.target.value

    this.setState ({
      newList: {
        category: newValue
      }
    });
  }

  createCategory() {

    if (this.state.newList.category) {

      let tempList = this.state.lists
      let tempNewList = this.state.newList

      tempList.push(tempNewList)

      this.setState ({
        lists: tempList,
        newList: {
          category: ''
        }
      })
    }
  }

  render() {

    return (
      <div>
        <Input
            text="List Category"
            label="list_category"
            type="text"
            id="list_category"
            value={this.state.newList.category}
            handleChange={this.getCategoryText}
        />
        <Button
            handleClick={this.createCategory}
            text="Add new list"
        />
        <br/>
        <Lists
            listsArray={this.state.lists}
        />
      </div>
    );
  }
}
export default App;