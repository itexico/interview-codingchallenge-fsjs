import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  transition: background-color 600ms ease;
  padding: 0 1.5rem;
  outline: none;
  margin: 1rem 0;
  line-height: 3;
  font-size: 1rem;
  font-family: inherit;
  display: block;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 3rem;
  background-color: var(--color-contrast);

  :hover {
    background-color: var(--color-contrast-dark);
  }

  :disabled {
    cursor: normal;
    pointer-events: none;
    background-color: var(--color-main-soft);
    color: var(--color-shadow);
  }
`;

const Button = ({ children, disabled = false, onClick = null }) => {
  return (
    <StyledButton type="submit" onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
