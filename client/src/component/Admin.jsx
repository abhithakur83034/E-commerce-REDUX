import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
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
const Admin = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();



  const onSubmit = (data) => {
    console.log(data,".....")
    let email = data.email
    let password = data.password
    let r={email,password}
    console.log(r,"rrrr")
    let promise = fetch('http://localhost:4000/admin',{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify(r)
    })
    promise.then((res)=>{
     if(res.ok){
      return res.json()
     }
    }).then((data)=>{
      console.log("datatata",data)
      if (data.token) {
              localStorage.setItem("admin", JSON.stringify(data.Admin));
              localStorage.setItem("token", JSON.stringify(data.token));
              toast.success("Welcome Admin")
              navigate("/");
            }
      reset()
    }).catch((error)=>{
      console.log(error)
      toast.error(error)
    })
  console.log(data,">>>>>>>>>>>")}
  //   axios.post('http://localhost:4000/signin',data)
  //   .then((res)=>{
  //     const result = res.data
  //     console.log(result)
  //     if (result.token) {
  //       localStorage.setItem("user", JSON.stringify(result.user));
  //       localStorage.setItem("token", JSON.stringify(result.token));
  //       toast.success("Welcome Admin")
  //       navigate("/");
  //     }
  //   }).catch((error)=>{
  //     console.log(error)
  //     toast.error(error.response.data)
  //   })

  //   console.log(data,'adminnnn');
  // };
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

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Card className="mt-5">
              <Card.Title>Admin Login</Card.Title>
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

export default Admin;
