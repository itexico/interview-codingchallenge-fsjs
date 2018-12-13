import React from "react";
import PropTypes from "prop-types";

const Input = (props) => {

  const { label, text, type, id, value, handleChange } = props

  return (
      <div>
        <label htmlFor={label}>{text}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={handleChange}
            required
        />
      </div>
  )
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Input;