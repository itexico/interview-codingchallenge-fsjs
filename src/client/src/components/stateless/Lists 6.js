import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

import InputButton from "./InputButton"

const Lists = (props) => {

  const { listsArray, onAddNewItem, onDeleteItem, onEditItem } = props
  const lists = Object.values(listsArray)

  let renderedLists = lists.map((item, index) => {

    let itemsFromList = lists[index].items
    let renderedItems = itemsFromList.map((v, i) => {

      return (
        <li className="list-group-item list-group-flush d-flex justify-content-between" key={i}>
          <div>
          {v}
          </div>
          <div>
            <InputButton
                handleClick={(e) => onEditItem(index, i)}
                buttonText="Edit"
                buttonSize={'sm'}
                buttonColor={'secondary'}/>
            <div/>
            <InputButton
                handleClick={(e) => onDeleteItem(index, i)}
                buttonText="Delete"
                buttonSize={'sm'}
                buttonColor={'warning'}/>
          </div>
        </li>
      )
    });

    return (
      <Col md="3" className="lists-list m-2" key={index}>
        <div className="mb-3">
          <div className="h4 mb-0 text-center">"{lists[index].category}"</div>
          <div className="h6 mb-3 text-center">List #{index+1}</div>
        </div>
        <div className="mb-3">
          <ul className="list-group">
            {renderedItems}
          </ul>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <InputButton
              handleClick={(e) => onAddNewItem(index)}
              buttonText="Add new item to this list"
              buttonColor={'info'}
              buttonSize={''}/>
        </div>
      </Col>
    )
  });

  return (
    <Row className="mt-5 d-flex justify-content-center align-items-center">
      {renderedLists}
    </Row>
  )
}

Lists.propTypes = {
  onAddNewItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  listsArray: PropTypes.array.isRequired
}

export default Lists;
