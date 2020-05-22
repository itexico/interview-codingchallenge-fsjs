import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CounterShadow = styled.span`
  z-index: -1;
  transform: translateY(-50%);
  top: 50%;
  text-transform: uppercase;
  position: absolute;
  left: 20%;
  font-weight: 900;
  font-size: 80vh;
  word-wrap: none;
  color: var(--color-shadow);
`;

const PageTitle = styled.h1`
  text-transform: uppercase;
  margin-bottom: 3rem;
`;

const FormSlot = styled.aside`
  padding: 2rem;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

const BoxesSlot = styled.main`
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
`;

const StyledAppLayout = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 100vh;
  flex-direction: column;
  display: flex;

  @media screen and (min-width: 1024px) {
    flex-direction: row;

    ${FormSlot} {
      flex: 2;
    }

    ${BoxesSlot} {
      flex: 3;
    }
  }
`;

const AppLayout = ({ pageTitle, formSlot, boxesSlot }) => {
  return (
    <StyledAppLayout>
      <FormSlot>
        <PageTitle>{pageTitle}</PageTitle>
        {formSlot}
      </FormSlot>
      <BoxesSlot>{boxesSlot}</BoxesSlot>
      <CounterShadow>{boxesSlot.length}</CounterShadow>
    </StyledAppLayout>
  );
};

AppLayout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  formSlot: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  boxesSlot: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};

export default AppLayout;
