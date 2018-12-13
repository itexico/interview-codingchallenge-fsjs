import React from "react"
import PropTypes from "prop-types";

const Lists = (props) => {

  const { listsArray } = props

  let renderedLists = listsArray.map((item, index) => {

    return (
        <div key={index}>
          <br/>
          <span>Index: {index}</span>
          <br/>
          <span>Category: {item.category}</span>
          <br/>
          <ul>
            <li>Example</li>
            <li>Example</li>
            <li>Example</li>
          </ul>
        </div>
    )
  })

  return (
      <div>
        {renderedLists}
      </div>
  )
}

Lists.propTypes = {
  listsArray: PropTypes.array.isRequired
}

export default Lists;