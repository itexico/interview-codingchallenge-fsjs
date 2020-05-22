import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Action = styled.button`
  transition: background-color 600ms ease;
  padding: 0.5rem 1.5rem;
  outline: none;
  font-size: 1.2rem;
  font-family: inherit;
  display: block;
  cursor: pointer;
  border: none;
  border-radius: 3rem;
  background-color: var(--color-contrast);

  :hover {
    background-color: var(--color-contrast-dark);
  }

  :disabled {
    pointer-events: none;
    cursor: normal;
    background-color: var(--color-main-soft);
  }
`;

const ActionsSlot = styled.div`
  margin-left: 1rem;
  justify-content: space-between;
  flex: 1;
  display: none;
`;

const Counter = styled.span`
  transform: translateY(50%);
  text-align: right;
  right: 2rem;
  position: absolute;
  line-height: 1;
  font-weight: 900;
  font-size: 3rem;
  color: var(--color-contrast);
  bottom: 0;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  line-height: 1.5rem;

  a {
    color: inherit;
    text-decoration: none;

    :hover {
      color: var(--color-contrast);
    }
  }
`;

const TitleInput = styled.input`
  color: inherit;
  width: 80%;
  padding: 0;
  outline: none;
  line-height: 1.5rem;
  font-size: 1.4rem;
  display: block;
  border: none;
  background-color: transparent;
`;

const ItemSlot = styled.div`
  position: relative;
  padding: 3rem 2rem 1rem 2rem;
  flex: 3;
  border-radius: 20px;
  background-color: var(--color-main-soft);
`;

const StyledEditableBox = styled.div`
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  &:hover ${ActionsSlot} {
    display: flex;
  }
`;

const EditableBox = ({
  id,
  title,
  counter = null,
  onDelete,
  onEdit,
  withLink = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const deleteBox = () => {
    onDelete(id);
  };

  const toggleEdit = () => {
    setNewTitle("");
    setIsEditing(!isEditing);
  };

  const modifyNewTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const save = async (event) => {
    event.preventDefault();
    await onEdit(id, newTitle);
    toggleEdit();
  };

  return (
    <StyledEditableBox>
      <ItemSlot>
        <Counter>{counter}</Counter>
        {isEditing ? (
          <form onSubmit={save}>
            <TitleInput
              type="text"
              value={newTitle}
              onChange={modifyNewTitle}
              placeholder={title}
              autoFocus
            />
          </form>
        ) : (
          <Title>
            {withLink ? (
              <a href={`/list/${id}`}>{title}</a>
            ) : (
              <span>{title}</span>
            )}
          </Title>
        )}
      </ItemSlot>
      <ActionsSlot>
        <Action onClick={toggleEdit}>✍️</Action>
        {isEditing ? (
          <Action onClick={save} disabled={!newTitle}>
            👍🏼
          </Action>
        ) : (
          <Action onClick={deleteBox}>🗑</Action>
        )}
      </ActionsSlot>
    </StyledEditableBox>
  );
};

EditableBox.propTypes = {
  id: PropTypes.string.isRequired,
  counter: PropTypes.number,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  withLink: PropTypes.bool,
};

export default EditableBox;
