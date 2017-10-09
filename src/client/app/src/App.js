import React from 'react';
import { render } from 'react-dom';
import Navigation from './components/Navigation';
import Title      from './components/Title';

import axios from 'axios';
import {Col, Grid, Row, ListGroup, ListGroupItem,Glyphicon } from 'react-bootstrap';

const ListForm = ({addList}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addList(input.value);
        input.value = '';
      }}>
      <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};

const ListRow = ({list, remove}) => {
  return (<div>
              <a href="" className="list-group-item" >
                  <Row>
                    <Col lg={10} md={10} sm={10} xs={12}>
                      <h4>{list.name}</h4>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={12}>
                      <Glyphicon glyph="remove" onClick={() => {remove(list["_id"])}}></Glyphicon>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={12}>
                      <Glyphicon glyph="edit"></Glyphicon>
                    </Col>
                  </Row>
              </a>
              <Items items={list.items}></Items>
          </div>);
};

const List = ({lists, remove}) => {
  const todoNode = lists.map((list) => {
    return (<ListRow list={list} key={list["_id"]} remove={remove}></ListRow>)
  });
  return (<ListGroup className="list-group" style={{marginTop:'30px'}}>{todoNode}</ListGroup>);
}

const Items = ({items,remove}) => {
  const itemNode = items.map((item) => {
    return (<ListGroupItem key={item["_id"]}>{item.name}</ListGroupItem>)
  })
  return (<ListGroup>{itemNode}</ListGroup>)
};

// Todo Id
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.apiUrl = 'http://localhost:3000/lists'
  }

  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({data:res.data.results.lists});
      });
  }

  addList(val){
    // Assemble data
    const list = {name: val, items : ["name" : 'TestItem']}
    // Update data
    axios.post(this.apiUrl, list)
       .then((res) => {
           axios.get(this.apiUrl)
      .then((res) => {
        this.setState({data:res.data.results.lists});
      });
    });
  };

  // Handle remove
  handleRemove(id){
    const remainder = this.state.data.filter((list) => {
      if(list["_id"] !== id) return list;
    });
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});
      })
  }
  render(){
    return (
      <div>
        <Navigation/>
        <Grid>
            <Title listCount={this.state.data.length}/>
            <Row>
            <Col lg={4} md={4} sm={4} xs={12}>
                <ListForm addList={this.addList.bind(this)}/>
                  <List
                    lists={this.state.data}
                    remove={this.handleRemove.bind(this)}
                  />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
render(<App />, document.getElementById('root'));

export default App;
