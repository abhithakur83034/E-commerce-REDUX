import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Col,
  Container,
  Row,
  Card,
  FloatingLabel,
  Form,
  Button,
  Nav,
  Navbar,
} from "react-bootstrap";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("user"));


  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/register", data)
      .then((res) => {
        let result = res.data;
        console.log("result", result);

        // if (result) {
        //   localStorage.setItem("user", JSON.stringify(result.result));
        //   localStorage.setItem("token", JSON.stringify(result.token));
          navigate("/login");
        // }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(data);
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand>E-Comm</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav>              
                      <Nav.Link href="/login">Login</Nav.Link>
                      <Nav.Link href="/">Back</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Card className="mt-5">
              <Card.Title>User Registration</Card.Title>
              <Card.Body>
                <FloatingLabel
                  controlId="floatingInput"
                  label="User Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="user name"
                    name="name"
                    {...register("name")}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    {...register("email")}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...register("password")}
                  />
                </FloatingLabel>
              </Card.Body>
              <Card.Footer>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="outline-success"
                >
                  Success
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
