import React from "react"
import PropTypes from "prop-types";

import Button from "./Button"

const Lists = (props) => {

  const { listsArray, onAddNewItem, onDeleteItem, onEditItem } = props
  const lists = Object.values(listsArray)

  let renderedLists = lists.map((item, index) => {

    let itemsFromList = lists[index].items
    let renderedItems = itemsFromList.map((v, i) => {

      return (
        <li key={i}>
          {v}
        <Button
            handleClick={(e) => onDeleteItem(index, i)}
            text="Delete"/>
        <Button
            handleClick={(e) => onEditItem(index, i)}
            text="Edit"/>
        </li>
      )
    });

    return (
      <div key={index}>
        <br/>
        <div>
          <span>List #{index+1}</span>
          <br/>
          <span>Category: {lists[index].category}</span>
        </div>
        <div>
          <ul>
            {renderedItems}
          </ul>
        </div>
        <div>
          <Button handleClick={(e) => onAddNewItem(index)} text="Add new item to this list"/>
        </div>
      </div>
    )
  });

  return (
    <div>
      {renderedLists}
    </div>
  )
}

Lists.propTypes = {
  onAddNewItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  listsArray: PropTypes.array.isRequired
}

export default Lists;