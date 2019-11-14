import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DisplayListElements from '../DisplayListElements/DisplayListElements';
import AddItem from '../AddItem/AddItem';
import { handleChange } from '../../shared';
import axios from '../../axios';
import { 
  addListItem,
  editListItem,
  toggleEditionItem,
  deleteListItem,
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

function EditList({ classes, currentList }) {
  console.log('currentList: ', currentList);

  const [list, setList] = React.useState(currentList);
  console.log('list: ', list);

  // React.useEffect(() => {
  //   setList(list => ({ ...list, title: currentList.title, items: [ ...list.items, ...currentList.items ] }))
  // }, [currentList]);
  async function submitList(e) {
    // e.preventDefault();
    // await axios.post('/list', list).catch(err => console.log(err));
    // handleChangeCurrentTab(null, 1);
  }

  const isFormInvalid = () => 
    list.title.length === 0 || 
    list.items.length === 0 || 
    !list.items.every(el => el.itemDescription.length >= 1);

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
          disabled={isFormInvalid()}
          variant="contained"
          color="primary"
          type="submit"
        >
          Edit list
        </Button>
      </div>
    </form>
  );
}

export default withStyles(styles)(EditList);
