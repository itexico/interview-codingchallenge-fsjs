import React from 'react';
import { Card, Form, CardTitle, CardText} from 'reactstrap';

class Main extends React.Component {
   
    render() {
        return (
            <div className="row">
                <Card className="col s6">
                    <CardTitle>
                        lists of my favorite stuff! 
                    </CardTitle>
                    <CardText>
                    <form>
                        <div className="input-field">
                        <input type="text" placeholder="Task Title"></input>
                        </div>
                    </form>
                    </CardText>
                </Card>
                <Card className="col s6">
                    <CardTitle>
                        lists of my favorite stuff! 
                    </CardTitle>
                    <CardText>
                    <Form>
                        <div className="input-field">
                        <input type="text" placeholder="Task Title"></input>
                        </div>
                    </Form>
                    </CardText>
                </Card>
            </div>
            
        );
    };
};

export default Main;