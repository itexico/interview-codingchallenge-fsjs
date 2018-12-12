import React, { Component } from 'react';
import {Navbar, NavbarBrand, Card, Button, CardTitle, CardText, Row, Col, Form, Input } from 'reactstrap';

class App extends Component {
constructor() {
    super();
    this.state= {
        title:'',
        description:[],
        tasks: [],
        _id: ''
    };
    this.addTask= this.addTask.bind(this);
    this.handleChange= this.handleChange.bind(this);
}


addTask(e){
    fetch('./test', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({title: this.state.title, description: ''});
            this.fetchTasks();

        })
        .catch(err => console.error(err));
    e.preventDefault();
}
componentDidMount(){
    this.fetchTasks();
}

fetchTasks() {
    fetch('./test')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({tasks: data});
        });

}

deleteTask(id){
    fetch(`./test/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        
        }
    })
    .then(res => res.json())
    this.fetchTasks();
}

editTask(id){
    fetch(`./test/${id}`)
        .then (res => res.json())
        .then (data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })

        });

}

handleChange(e) {
    const { name, value } = e.target;
    this.setState({
        [name]: value
    });
};

    render(){
        return (
            <div className="container">
                <div className="row bg-info mt-2">
                <header>
                    <Navbar className="bg-light">
                        <NavbarBrand href="/">
                        The Challenge
                        </NavbarBrand>
                    </Navbar>
                </header> 
                </div>
                <main className="mt-5">
                    <Row>
                        <Col sm="6">
                            <Card body>
                            <CardTitle className="d-flex justify-content-center">Lists of my favorite stuff!</CardTitle>
                                <Form onSubmit={this.addTask} className="mb-3">
                                    <Input className="mb-2"  name="title" onChange={this.handleChange} text="text" placeholder="Your favorite stuff title!" value={this.state.title}></Input>
                                    <textarea name="description" onChange={this.handleChange} placeholder="Add your favorite stuff!" value={this.state.description}></textarea>
                                        <div>
                                            <Button type="submit">
                                            <i className="fas fa-plus-circle mr-2"> Add</i>
                                            </Button>
                                            <Button type="submit" color="info">
                                            <i className="fas fa-check-circle"> Save</i>
                                            </Button>
                                            <Button>
                                            <i className="fas fa-edit"></i>
                                            </Button>
                                         </div>
                                </Form>
                            </Card>
                        </Col>
                        <Col sm="6">
                            <Card body>
                            <CardTitle className="text-info" >My List  </CardTitle>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <tr>
                                                        <td className= "col-3 text-info">My list</td>
                                                        <td className="col-5 text-info">My stuff</td>
                                                        <td>     </td>
                                                    </tr>
                                                    
                                                    <td>{task.title} </td>
                                                    <td className="mr-2">   {task.description} </td>
                                                    <td>
                                                            <i className="fas fa-minus-circle" onClick={() => this.deleteTask(task._id)}></i>
                                                            <i className="fas fa-edit" onClick={() => this.editTask(task._id)}></i>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                <Button color="info">Save</Button>
                            </Card>
                        </Col>
                    </Row> 
                </main> 
            </div>
            );
    };
};

export default App;