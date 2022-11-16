import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState('');
  const [classes, setClasses] = useState('disabled');
  const [disabled, setDisabled] = useState(true);
  const baseUrl =
    //'https://63723958025414c637098b29.mockapi.io/api/v1/categories/';
    'http://localhost:50000/categories/';
  const getData = () => {
    axios.get(baseUrl).then((response) => {
      const data = response.data;
      setCategories(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  function handleDelete(id) {
    axios
      .delete(baseUrl + id)
      .then(function (response) {
        console.log(response);
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleAdd() {
    if (input != '' && input != undefined && input != null) {
      axios
        .post(baseUrl, {
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
    } else {
      alert('vazio');
    }
  }

  function handlePatch(id, newValue) {
    axios
      .patch(baseUrl + id, {
        category: newValue,
      })
      .then(function (response) {
        getData();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col>
            <Form>
              <Row>
                {/* <Col>
                  <Form.Group>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Select
                    // onChange={(event) => setType(event.target.value)}
                    >
                      <option value={'categories'}>Categoria</option>
                      <option value={'services'}>Serviço</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                      Selection o tipo de campo a ser inserido
                    </Form.Text>
                  </Form.Group>
                </Col> */}
                <Col>
                  <Form.Group>
                    <Form.Label>Adicionar</Form.Label>
                    <Form.Control
                      type="text"
                      // placeholder="Informa a Nova Categoria"
                      onSubmit={(e) => alert()}
                      onChange={(e) => {
                        setInput(e.target.value);
                      }}
                    />
                    <Form.Text className="text-muted">
                      Adicione um novo campo
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                className="mt-2"
                variant="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  e.target.value = '';
                  handleAdd();
                }}
              >
                Adicionar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <div className="d-flex">
              <h2>Categorias</h2>
              <Icon
                className="align-self-center ml-5 btn-add"
                icon="material-symbols:add-circle"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <strong>ID</strong>
          </Col>
          <Col>
            <strong>Categoria</strong>
          </Col>
          <Col>
            <strong>Ação</strong>
          </Col>
        </Row>
        <hr />
        {categories.map((cat) => {
          return (
            <Row key={cat.id}>
              <Col>{cat.id}</Col>
              <Col className="d-flex">
                <Form>
                  <Form.Control
                    className="mb-2 changeble-input"
                    type="text"
                    placeholder={cat.category}
                  />
                </Form>
              </Col>
              <Col>
                <Icon
                  icon="ic:baseline-save"
                  className="align-self-center btn-save"
                  onClick={(event) => {
                    handlePatch(cat.id, event.target.value);
                  }}
                />
                <Icon
                  icon="ic:baseline-delete-forever"
                  className="btn-delete"
                  onClick={() => handleDelete(cat.id)}
                />
              </Col>
            </Row>
          );
        })}
      </Container>
    </>
  );
};
export default Categories;
