import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input`
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-main-dark);
  width: 100%;
  display: block;
  padding: 0 1.5rem;
  line-height: 3;
  border-radius: 3rem;
  border: none;
  outline: none;
  background-color: var(--color-main-soft);
`;

const Input = ({ value, placeholder = "Add a new one here", onChange }) => {
  const getCurrentInputValue = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <StyledInput
      type="text"
      value={value}
      onChange={getCurrentInputValue}
      placeholder={placeholder}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
