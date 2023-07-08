import React from "react";
import { useForm } from "react-hook-form";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Add = () => {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const admin = JSON.stringify(localStorage.getItem("admin"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const onSubmit = async (data) => {

    const file = data.image[0];
    const formData = new FormData();

    formData.append('image',file);
    formData.append('name',data.name);
    formData.append('price',data.price);
    formData.append('quality',data.quality);
    formData.append('quantity',data.quantity);

       const  headers= {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }

    axios.post('http://localhost:4000/add',formData,{headers})
    .then((res)=>{
        console.log(res.data)
        reset();
        toast.success('product added successfully')
    }).catch((error)=>{
      toast.error(error.response.data || "Unknown error")
    })


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
                  { admin ? (
                    <>
                      {" "}
                      <Nav.Link
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </Nav.Link>
                      <Nav.Link href="/show">Dashboard</Nav.Link>
                    </>
                  ) :
                    ""
                  }


                
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Card className="mt-5">
              <Card.Title>Add Your Products</Card.Title>
              <Card.Body>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Product_Image"
                  className="mb-3"
                >
                  <Form.Control
                    type="file"
                    placeholder="Product_Image"
                    name="image"
                    {...register("image", { required: true })}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Product_Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Product_Name"
                    name="name"
                    {...register("name", { required: true })}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Product_Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Product_Price"
                    name="price"
                    {...register("price", { required: true })}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingPassword"
                  label="Product_quality"
                >
                  <Form.Control
                    type="text"
                    placeholder="Product_quality"
                    name="quality"
                    {...register("quality", { required: true })}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingPassword"
               
                >
                  <Form.Control
                    
                    readOnly
                   defaultValue="1"
                    name="quantity"
                    {...register("quantity")}
                  />
                </FloatingLabel>
              </Card.Body>
              <Card.Footer>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                  variant="outline-success"
                >
                  Add Product
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default Add;
