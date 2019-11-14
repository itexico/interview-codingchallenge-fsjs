import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import DisplayListElements from '../DisplayListElements/DisplayListElements';
import AddItem from '../AddItem/AddItem';
import { handleChange } from '../../shared';
import axios from '../../axios';
import { 
  addListItem,
  editListItem,
  toggleEditionItem,
  deleteListItem,
  isFormInvalid,
  wait,
 } from '../shared.list.logic';

const styles = () => ({
  editForm: {
    width: '95%',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '50px',
    marginBottom: '20px',
  },
  addListButton: {
    maxWidth: '200px',
  },
  itemsAlert: {
    marginTop: '10px',
  }
});

function EditList({ classes, currentList, updateCurrentEditedList }) {

  const [list, setList] = React.useState(currentList);
  const [submitting, setSubmitting] = React.useState(false);

  async function submitList(e) {
    e.preventDefault();

    try {
      setSubmitting(true);
      await Promise.all([
        // Artificial delay to improve LinearProgress experience for the user.
        wait(1000),
        axios.patch(`/list/${list._id}`, list),
      ]);

      setSubmitting(false);
      updateCurrentEditedList(list);
    } catch(err) {
      console.log('err: ', err);
    }

  }

  return (
    <form className={classes.editForm} onSubmit={e => submitList(e)}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="List title"
        placeholder="Type the title of the list..."
        margin="normal"
        value={list.title}
        onChange={e => handleChange(e, list, setList)}
        type="text"
        variant="outlined"
      />
      <AddItem addListItem={addListItem} setList={setList}/>
      <DisplayListElements
        setList={setList} 
        deleteListItem={deleteListItem}
        toggleEditionItem={toggleEditionItem}
        editListItem={editListItem}
        rows={list.items}
      />
      {!list.items.every(el => el.itemDescription.length >= 1) ? 
        <p className={classes.itemsAlert}>Please fill all the items before continuing...</p> : 
        null
      }
      <div className={classes.actionsContainer}>
        <Button 
          className={classes.addListButton}
          disabled={isFormInvalid(list) || submitting}
          variant="contained"
          color="primary"
          type="submit"
        >
          Save list changes
        </Button>
      </div>
      { submitting && <LinearProgress /> }
    </form>
  );
}

export default withStyles(styles)(EditList);
