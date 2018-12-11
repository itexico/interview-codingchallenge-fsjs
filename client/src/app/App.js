import React, { Component } from 'react';
import {Navbar, NavbarBrand, Card, Button, CardTitle, CardText, Row, Col, Form, Input } from 'reactstrap';

class App extends Component {
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
                            <Form className="mb-3">
                                <Input placeholder="Add your favorite stuff!" ></Input>
                            </Form>
                            <Button color="info">Go somewhere</Button>
                            </Card>
                        </Col>
                        <Col sm="6">
                            <Card body>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button color="info" >Go somewhere</Button>
                            </Card>
                        </Col>
                    </Row> 
                </main> 
            </div>
        );
    };
};

export default App;