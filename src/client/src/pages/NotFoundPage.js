import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import routes from '../helpers/routes';

export default function NotFoundPage() {
    return (
        <Container>
            <Row className="mt-5">
                <Col md={{ span: 8, offset: 2 }} className="text-center">
                    <img style={{ width: '100%' }} src="/img/dead-link.jpg" alt="error-404" />
                    <p>Back to <br />
                        <Button as={Link} to={routes.home} className="ml-1" >HomePage</Button>
                    </p>
                </Col>
            </Row>
        </Container >
    );
}