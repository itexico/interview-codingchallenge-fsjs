import React, { Component } from 'react';

import InputText from './components/stateless/InputText';
import InputButton from './components/stateless/InputButton';
import Lists from './components/stateless/Lists'

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      listName: '',
      lists: []
    };
  }

  //Gets name for new list from text field
  getListName = (event) => {

    let newValue = event.target.value

    this.setState ({
      listName: newValue
    });
  }

  //Pushes new list into 'lists' array
  createList = () => {

    if (this.state.listName) {

      let existingLists = new Array(...this.state.lists)
      let newList = {...this.state, items: new Array(0)}

      existingLists.push(newList)

      this.setState ({
        lists: existingLists,
        listName: ''
      })
    }
  }

  //Creates a new item for a designated list
  createListItem = (index) => {

    let newValue = prompt('Write your new item here:')

    if (newValue) {

      let itemsArray = this.state.lists[index].items

      itemsArray.push(newValue)

      this.setState ({
        lists: [...this.state.lists]
      })
    }
  }

  //Deletes an item from an existing list, receives the list index for 'lists' array and item number for 'items' array
  deleteListItem = (listIndex, itemNo) => {

    let itemsArray = this.state.lists[listIndex].items
    const list = this.state.lists[listIndex].listName

    let confirmation = window.confirm(`Are you sure you want to delete '${itemsArray[itemNo]}' from list '${list}'?`)

    if (confirmation) {

      itemsArray.splice(itemNo, 1)

      this.setState({
        lists: [...this.state.lists]
      })
    }
  }

  //Edits a particular list item from an existing lists, receives the list index for 'lists' array and item number for 'items' array
  editListItem = (listIndex, itemNo) => {

    let itemsArray = this.state.lists[listIndex].items
    const list = this.state.lists[listIndex].listName

    let newValue = window.prompt(`Edit '${itemsArray[itemNo]}' from list '${list}':`)

    if (newValue) {

      itemsArray.splice(itemNo, 1, newValue)

      this.setState ({
        lists: [...this.state.lists]
      })
    }
  }

  render() {

    return (
      <div className='m-5'>
        <div className='d-flex flex-column align-items-center justify-content-center app-input'>
          <h2 className='text-center mb-4'>MERN Coding Challenge</h2>
          <p className='h5'>Add a new list</p>
          <InputText
              className='my-2'
              type='text'
              id='list_name'
              value={this.state.listName}
              handleChange={this.getListName}
          />
          <InputButton
              handleClick={this.createList}
              buttonText='Add new list'
              buttonSize={'lg'}
              buttonColor={'primary'}
          />
        </div>
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