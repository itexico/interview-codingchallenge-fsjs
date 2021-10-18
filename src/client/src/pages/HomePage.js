import { Container, Row, Col, Button } from 'react-bootstrap';
import routes from '../helpers/routes';
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <Container>
            <Row className="mt-5">
                <Col xs={{ span: 12 }} md={{ span: 6 }} className="mb-5">
                    <h2>Welcome to My Favorites</h2>
                    <p>Here you will be able to manage your favorite lists!</p>
                    <div>
                        <Link to={routes.login}>Login</Link> &nbsp;
                        <Button as={Link} to={routes.register} className="ml-2">Register</Button>
                    </div>
                </Col>
                <Col>
                    <img
                        className="img-fluid"
                        src="/img/spideyDance.gif"
                        alt="top-list"
                    />
                    <h5 className="text-center">Crete your favorites Top lists!</h5>
                </Col>
            </Row>
        </Container>
    );
}