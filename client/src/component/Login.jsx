import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
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
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("user"));


  const onSubmit = (data) => {
    axios.post('http://localhost:4000/login',data)
    .then((res)=>{
      const result = res.data
      console.log("rer",result)
      if (result.token) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.token));
        toast.success("login successfully")
        navigate("/");
      }else{
        toast.warn("please provide correct information")
      }
    }).catch((error)=>{
      toast.error(error.response.data)
    })

    console.log(data,'prem');
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand>E-Comm</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav>              
                <Nav.Link href="/">Back</Nav.Link>

                      <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Card className="mt-5">
              <Card.Title>User Login</Card.Title>
              <Card.Body>
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
                  type="submit"
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
    </div>
  );
};

export default Login;
