import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import uuidv4 from 'uuid/v4';
import { handleChange } from '../../../shared';

const styles = () => ({
  addItemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: '100%',
    marginLeft: '15px',
  },
  textbox: {
    height: '100%',
    width: '50%'
  }
});

function AddItem(props) {

  const [currentItem, setItem] = React.useState({ 
    key: uuidv4(),
    item: '',
    inEdition: false,
  });
  const { classes } = props;

  return (
    <div className={classes.addItemContainer}>
      <TextField
        className={classes.textbox}
        id="item"
        name="item"
        label="List item"
        margin="normal"
        value={currentItem.item}
        onChange={e => handleChange(e, currentItem, setItem)}
        type="text"
        variant="outlined"
      />
      <Button 
        onClick={e => {
          props.addListItem(e, currentItem);
          setItem({ key: uuidv4(), item: '' });
        }}
        className={classes.button}
        color="secondary"
        variant="contained"
        disabled={currentItem.item.length === 0}
      >
        Add item
      </Button>
    </div>
  );
}


export default withStyles(styles)(AddItem);
