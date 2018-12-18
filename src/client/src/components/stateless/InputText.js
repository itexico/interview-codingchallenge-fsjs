import React from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

const InputText = (props) => {

  const { type, id, value, handleChange, className } = props

  return (
      <div>
        <Input
            className={className}
            type={type}
            id={id}
            value={value}
            onChange={handleChange}
        />
      </div>
  )
};

InputText.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default InputText;