import React from "react"
import PropTypes from "prop-types";

const Button = (props) => {

  const { handleClick, text } = props

  return (
      <button onClick={handleClick}>
        {text}
      </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Button;