import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, lighten } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import EditList from '../EditList/EditList';
import axios from '../../axios';


const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    '&:hover': {
      background: lighten(theme.palette.primary.light, 0.95),
    },
    border: `2px solid ${lighten(theme.palette.primary.light, 0.95)}`,
    borderRadius: '5px',
    margin: '10px 5px 10px 5px',
  },
  rowEditing: {
    flexDirection: 'column',
  },
  hint: {
    fontStyle: 'italic',
  },
  listTitle: {
    wordBreak: 'break-word',
    fontSize: '18px',
  },
  button: {
    width: '50px',
    height: '50px',
  },
  cancelIcon: {
    color: '#9E0101',
    fontSize: '50px',
  },
});

class ShowLists extends React.Component {
  state = {
    lists: [],
    initialLoad: false,
  };

  async componentDidMount() {
    const { data: lists } = await axios.get('/list').catch(err => console.log(err));
    this.setState({ lists: lists.map(list => ({ ...list, editing: false })), initialLoad: true });
  }

  toggleEditList = (e, listToEdit) => {
    const lists = this.state.lists.map(list => list._id === listToEdit._id ? { ...list, editing: !listToEdit.editing } : list);
    this.setState({ lists });
  }

  updateCurrentEditedList = list => {
    const { lists: currentLists } = this.state; 
    
    this.setState({
      lists: currentLists.map(current => {
        if(current._id === list._id) {
          return {
            ...current,
            editing: !current.editing,
            title: list.title,
            items: list.items,
          };
        } else return current;
      })
    });
    
  }

  render() {
    const { classes } = this.props;
    const { lists, initialLoad } = this.state;

    return (
      <React.Fragment>
        <h1>CURRENT LISTS</h1> { lists.length !== 0 ? <p className={classes.hint}>Here are your current lists!</p> : null }
        {lists.map(row => (
          <div key={row._id} className={`${classes.row} ${row.editing ? classes.rowEditing : ''}`}>
            <strong className={classes.listTitle}>{row.title}</strong>
            { row.editing ? 
              <EditList
                updateCurrentEditedList={this.updateCurrentEditedList}
                currentList={row}/> : null 
            }

            { !row.editing ? 
              <IconButton 
                className={classes.button}
                aria-label="Edit"
                color="primary"
                onClick={e => this.toggleEditList(e, row)}
              >
                <EditIcon />
              </IconButton> 
              
              :

              <IconButton 
                className={classes.button}
                aria-label="Edit"
                color="primary"
                onClick={e => this.toggleEditList(e, row)}
              >
                <CancelIcon className={classes.cancelIcon} />
              </IconButton>
            }
          </div>
        ))}
        {lists.length === 0 && initialLoad ? 
          <p>No lists available at the time, register a new one!</p> :
          null
        }
      </React.Fragment>
      
    );
  }
}

ShowLists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowLists);