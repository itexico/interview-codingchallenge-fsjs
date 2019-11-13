import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DisplayListElements from './Components/DisplayListElements';
import AddItem from './Components/AddItem';
import { handleChange } from '../../shared';
import axios from '../../axios';

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

function AddList({ classes }) {

  const [list, setList] = React.useState({ title: '', items: []});

  function addListItem(_, item) {
    setList({...list, items: [
      ...list.items, item,
    ]})
  }

  function editListItem(e, item) {
    const key = item.key;
    setList({
      ...list, 
      items: list.items.map(el => el.key === key ? { ...el, item: e.target.value } : el)})
  }

  function toggleEditionItem(_, itemKey) {
    setList({
      ...list, 
      items: list.items.map(el => el.key === itemKey ? { ...el, inEdition: !el.inEdition } : el)})
  }

  function deleteListItem(_, itemKey) {
    setList({
      ...list,
      items: list.items.filter(item => item.key !== itemKey),
    })
  }

  function submitList(e) {
    e.preventDefault();
    console.log('list: ', list);
    axios.post('/list', list);
  }

  const isFormInvalid = () => 
    list.title.length === 0 || 
    list.items.length === 0 || 
    !list.items.every(el => el.item.length >= 1);

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
      <AddItem addListItem={addListItem}/>
      <DisplayListElements 
        deleteListItem={deleteListItem}
        toggleEditionItem={toggleEditionItem}
        editListItem={editListItem}
        rows={list.items}
      />
      {!list.items.every(el => el.item.length >= 1) ? 
        <p className={classes.itemsAlert}>Please fill all the items before continuing...</p> : 
        null
      }
      <div className={classes.actionsContainer}>
        <Button 
          className={classes.addListButton}
          disabled={isFormInvalid()}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add list
        </Button>
      </div>
    </form>
  );
}

export default withStyles(styles)(AddList);
