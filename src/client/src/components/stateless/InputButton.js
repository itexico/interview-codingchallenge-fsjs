import React from 'react'
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const InputButton = (props) => {

  const { handleClick, buttonText, buttonColor, buttonSize, className } = props

  return (
      <Button
          onClick={handleClick}
          color={buttonColor}
          size={buttonSize}
          className={className}>
        {buttonText}
      </Button>
  )
}

InputButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired
}

export default InputButton;