import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, lighten } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditList from '../EditList/EditList';
import axios from '../../axios';
import { wait } from '../shared.list.logic';


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
  hideElement: {
    display: 'none',
  },
  listOptions: {
    display: 'flex',
  }
});

class ShowLists extends React.Component {
  state = {
    lists: [],
    initialLoad: false,
  };

  async componentDidMount() {
    const { data: lists } = await axios.get('/list').catch(err => console.log(err));
    this.setState({ lists: lists.map(list => ({ ...list, editing: false, deleting: false })), initialLoad: true });
  }

  deleteList = async (e, list) => {
    await this.toggleStateList(null, list, 'deleting');
    await axios.delete(`/list/${list._id}`).catch(err => console.log(err));
    await wait(1000);
    await this.toggleStateList(null, list, 'deleting');
    this.setState(prevState => ({
      lists: prevState.lists.filter(currentList => currentList._id !== list._id)
    }));

  }

  toggleStateList = (e, baseList, property) => {
    const lists = this.state.lists
      .map(list => list._id === baseList._id ? { ...list, [property]: !list[property] } : list);
    
    // Promise to wait for setState to finish the state update.
    return new Promise(resolve => {
      this.setState({ lists }, resolve);
    })
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
              <div className={classes.listOptions}>
                <IconButton 
                  className={classes.button}
                  aria-label="Edit"
                  color="primary"
                  onClick={e => this.toggleStateList(e, row, 'editing')}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  className={`${classes.button} ${row.deleting ? classes.hideElement : ''}`}
                  aria-label="Edit"
                  color="primary"
                  onClick={e => this.deleteList(e, row, 'deleting')}
                >
                  <DeleteIcon />
                </IconButton>
                <CircularProgress className={`${classes.button} ${!row.deleting ? classes.hideElement : ''}`}/>
              </div> 
              
              :

              <IconButton 
                className={classes.button}
                aria-label="Edit"
                color="primary"
                onClick={e => this.toggleStateList(e, row, 'editing')}
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