import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';

const Services = () => {
  const [services, setServices] = useState([]);
  const [input, setInput] = useState('');
  const [type, setType] = useState(0);

  const getData = () => {
    axios.get(`http://localhost:50000/services`).then((response) => {
      const data = response.data;
      setServices(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  function handleDelete(id, type) {
    axios
      .delete(`http://localhost:50000/${type}/${id}`)
      .then(function (response) {
        console.log(response);
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleAdd(type) {
    axios
      .post(`http://localhost:50000/${type}/`, {
        createdAt: Date(),
        category: input,
      })
      .then(function (response) {
        console.log(response);
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Container>
      <Row>
        <Col>
          <h2>Serviços</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <strong>ID</strong>
        </Col>
        <Col>
          <strong>Serviço</strong>
        </Col>
        <Col>
          <strong>Deletar</strong>
        </Col>
      </Row>
      <hr />
      {services.map((serv) => {
        return (
          <Row key={serv.id}>
            <Col>{serv.id}</Col>
            <Col>{serv.service}</Col>
            <Col>
              <span onClick={() => handleDelete(serv.id, type)}>deletar</span>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default Services;
