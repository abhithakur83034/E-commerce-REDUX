import React from "react";
import {
  Table,
  Container,
  Nav,
  Navbar,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartData = useSelector((state) => state.cartData);
  //useSelector
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const dispatch = useDispatch();

  let totalPrice = cartData.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  let totalProducts = cartData.reduce(
    (total, item) => total + item.quantity,
    0
  );
  console.log("564545", cartData);

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>E-Comm</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {user || admin ? (
                <>
                  {" "}
                  <Nav.Link>
                    <Link to="/show" className="abc">
                      Add more
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                ""
              )}

              {user || !admin ? (
                ""
              ) : (
                <Nav.Link>
                  <Link to="/add" className="abc">
                    Add_Product
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped="columns">
        <thead>
          <tr>
            <th>Index</th>
            <th>Pro_Name</th>
            <th>Pro_Price</th>
            <th>Pro_Quantity</th>
            <th>Action</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button
                    onClick={() =>
                      dispatch({ type: "INCREMENT", payload: item })
                    }
                    variant="outline-success"
                  >
                    inc
                  </Button>
                  &nbsp;
                  <Button
                    onClick={() =>
                      dispatch({ type: "DECREMENT", payload: item })
                    }
                    variant="outline-danger"
                  >
                    dec
                  </Button>
                </td>
                <td>
                  <Button
                   onClick={() =>
                    dispatch({ type: "REMOVE_TO_CART", payload: item })
                  }                  
                  variant="outline-danger">Remove</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Container fluid>
        <Row>
          <Col sm={4}></Col>
          <Col sm={4}>
            <span>Total_Price = {totalPrice}</span> <br />
            <span>Total_Products ={totalProducts}</span>
          </Col>
          <Col sm={4}>
            <Button variant="outline-success">CheckOut</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
