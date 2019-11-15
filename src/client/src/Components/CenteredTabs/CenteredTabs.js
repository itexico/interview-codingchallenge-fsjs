import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import AddList from '../AddList/AddList';
import ShowLists from '../ShowLists/ShowLists';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  mainContainer: {
    margin: '20px 10px 5px 10px',
    padding: '20px',
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Add a list" />
            <Tab label="See your lists" />
          </Tabs>
        </AppBar>
        <Paper className={classes.mainContainer}>
          {value === 0 && <AddList handleChangeCurrentTab={this.handleChange}/>}
          {value === 1 && <ShowLists/>}
        </Paper>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);