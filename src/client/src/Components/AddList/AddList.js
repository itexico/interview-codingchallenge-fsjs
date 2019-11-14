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
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '50px',
  },
  addListButton: {
    width: '200px',
  },
  itemsAlert: {
    marginTop: '10px',
  }
});

function AddList({ classes, handleChangeCurrentTab }) {

  const [list, setList] = React.useState({ title: '', items: []});
  const [submitting, setSubmitting] = React.useState(false);

  async function submitList(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await Promise.all([
        // Artificial delay to improve LinearProgress experience for the user.
        wait(1000),
        await axios.post('/list', list).catch(err => console.log(err)),
      ]);

      setSubmitting(false);
      handleChangeCurrentTab(null, 1);
    } catch(err) {
      console.log('err: ', err);
    }

  }

  return (
    <form onSubmit={e => submitList(e)}>
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
          Add list
        </Button>
      </div>
      { submitting && <LinearProgress /> }
    </form>
  );
}

export default withStyles(styles)(AddList);
