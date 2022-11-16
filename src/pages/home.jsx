import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Categories from './categories';

const Home = () => {
  return (
    <Container variant="dark">
      <Row>
        <Col>
          <Categories />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
