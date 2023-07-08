import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Navbar,
  Container,
  Nav,
  Row,
  CardGroup,
  Toast,
} from "react-bootstrap";
const Home = () => {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  //   const headers = {
  //     authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //   };

  useEffect(() => {
    axios
      .get("http://localhost:4000/showw")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
        Toast.error(error);
      });
  }, []);
  console.log("show", data);

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
                {user || admin ? (
                  <Nav.Link href="/show">Dashboard</Nav.Link>
                ) : (
                  <>
                    <Nav.Link href="/login">LogIn</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/admin">Admin</Nav.Link>
                  </>
                )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <CardGroup>
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div key={index}>
                    <Card className="mt-4 me-3">
                      <Card.Img
                        variant="top"
                        height="150px"
                        width="150px"
                        src={`http://localhost:4000/img/${item.image}`}
                      />
                      <Card.Body>
                        <Card.Text>Product_name : {item.name}</Card.Text>
                        <Card.Text>Product_price : {item.price}</Card.Text>
                        <Card.Text>Product_quality : {item.quality}</Card.Text>
                        <Card.Text>
                          Product_quantity : {item.quantity}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </CardGroup>
        </Row>
      </Container>
    </>
  );
};

export default Home;
