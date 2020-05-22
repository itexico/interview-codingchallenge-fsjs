import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const StyledForm = styled.form`
  display: block;
  width: 100%;
`;

const Form = ({ onSubmit, buttonText }) => {
  const [title, setTitle] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    onSubmit(title);
    setTitle("");
  };

  const validateInputAndUpdate = (value) => {
    setTitle(value);
  };

  return (
    <StyledForm onSubmit={submitForm}>
      <Input value={title} onChange={validateInputAndUpdate} />
      <Button disabled={title.length === 0}>{buttonText}</Button>
    </StyledForm>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Form;
