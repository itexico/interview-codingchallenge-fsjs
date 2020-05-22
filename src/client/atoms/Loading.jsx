import React from "react";
import styled from "styled-components";

const StyledLoading = styled.div`
  z-index: -1;
  transform: translateY(-50%);
  top: 50%;
  text-transform: uppercase;
  position: fixed;
  left: 20%;
  font-weight: 900;
  font-size: 30vh;
  word-wrap: none;
  color: var(--color-shadow);
`;

const Loading = () => {
  return <StyledLoading>Loading</StyledLoading>;
};

export default Loading;
