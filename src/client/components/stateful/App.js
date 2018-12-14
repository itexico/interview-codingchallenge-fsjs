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
    this.createListItem = this.createListItem.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    this.editListItem = this.editListItem.bind(this)
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

      let existingLists = new Array(...this.state.lists)
      let newList = {...this.state.newList, items: new Array(0)}

      existingLists.push(newList)

      this.setState ({
        lists: existingLists,
        newList: {
          category: ''
        }
      })
    }
  }

  createListItem(index) {

    let newValue = prompt('Write your new item here:')

    if (newValue) {

      let itemsArray = this.state.lists[index].items

      itemsArray.push(newValue)

      this.setState ({
        lists: [...this.state.lists]
      })
    }
  }

  deleteListItem(listIndex, itemNo) {

    let itemsArray = this.state.lists[listIndex].items
    itemsArray.splice(itemNo, 1)

    this.setState ({
      lists: [...this.state.lists]
    })
  }

  editListItem(listIndex, itemNo) {

    let itemsArray = this.state.lists[listIndex].items

    let newValue = prompt(`Edit "${itemsArray[itemNo]}":`)

    if (newValue) {

      itemsArray.splice(itemNo, 1, newValue)

      this.setState ({
        lists: [...this.state.lists]
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
            onAddNewItem={this.createListItem}
            onDeleteItem={this.deleteListItem}
            onEditItem={this.editListItem}
        />
      </div>
    );
  }
}

export default App;