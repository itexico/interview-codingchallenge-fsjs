import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    wordBreak: 'break-word',
  },
  buttonColumns: {
    width: '10px',
  },
  hideElement: {
    display: 'none',
  },
  inputEdit: {
    width: '300px'
  }
});

function DisplayListElements(props) {
  const { classes, rows, deleteListItem, editListItem, toggleEditionItem, setList } = props;

  if(rows.length === 0) return null;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row._id}>
                <TableCell scope="row">
                  <strong 
                    className={row.inEdition ? classes.hideElement : ''}
                  >{row.itemDescription}</strong>
                  <input
                    className={`${classes.inputEdit} ${!row.inEdition ? classes.hideElement : ''}`}
                    id="edit-item"
                    name="edit-item"
                    label="Editing item"
                    margin="normal"
                    value={row.itemDescription}
                    onChange={e => editListItem(e, row, setList)}
                    type="text"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell className={classes.buttonColumns}>
                  <IconButton 
                    className={classes.button}
                    aria-label="Delete"
                    color="primary"
                    onClick={e => deleteListItem(e, row._id, setList)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.buttonColumns}>
                  { !row.inEdition ? 
                    <IconButton 
                      className={classes.button}
                      aria-label="Edit"
                      color="primary"
                      onClick={e => toggleEditionItem(e, row._id, setList)}
                    >
                      <EditIcon />
                    </IconButton> 
                    
                    :

                    <IconButton 
                      className={classes.button}
                      aria-label="Edit"
                      color="primary"
                      onClick={e => toggleEditionItem(e, row._id, setList)}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  }
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

DisplayListElements.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
};

export default withStyles(styles)(DisplayListElements);