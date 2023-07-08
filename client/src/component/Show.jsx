import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Navbar,
  Container,
  Nav,
  Row,
  CardGroup,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { item } from "../redux/action/action";
import { toast } from "react-toastify";

const Show = () => {
  const itemData = useSelector((state) => state.itemData); //useSelector
  const cartData = useSelector((state) => state.cartData); //useSelector
  const dispatch = useDispatch();
  const [alldata, setAlldata] = useState([]);

  console.log("selector", itemData.data.payload);

  const navigate = useNavigate();

  const headers = {
    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/show", { headers })
      .then((res) => {
        dispatch({ payload: item(res.data), type: "ITEM" });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setAlldata(itemData.data.payload);
  }, [itemData]);

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDelete = (id) => {
    let del = axios.delete("http://localhost:4000/product/" + id, { headers });
    if (del) {
      toast.success("item deleted successfully..");
      navigate(0);
    } else {
      toast.error("unable to delete the item");
    }
  };

  const handleSearch = (e) => {
    setAlldata(
      alldata.filter((item) => item.name.toLowerCase().includes(e.target.value))
    );
  };
  console.log("fgfgfgfgfgfgfg", cartData);
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
                    <>
                      {" "}
                      <Nav.Link
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </Nav.Link>
                      <Nav.Link>
                        <Link to="/cart" className="abc">
                          Cart
                        </Link>
                      </Nav.Link>
                      <span className="abc">{cartData?.length}</span>
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
        </Row>
        <Form className="d-flex mt-2">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
          />
        </Form>
        <Row></Row>
        <Row>
          <CardGroup>
            {alldata?.length > 0 &&
              alldata?.map((item, index) => {
                return (
                  <div key={index}>
                    <Card className="mt-4 ms-5">
                      <Card.Img
                        variant="top"
                        height="100px"
                        width="100px"
                        src={`http://localhost:4000/img/${item.image}`}
                      />

                      <Card.Body>
                        <Card.Text>Product_name : {item.name}</Card.Text>
                        <Card.Text>Product_price : {item.price}</Card.Text>
                        <Card.Text>Product_quality : {item.quality}</Card.Text>

                        <Card.Text>
                          <Button
                            variant="outline-success"
                            onClick={() => {
                              return dispatch({
                                type: "ADD_TO_CART",
                                payload: { ...item },
                              });
                            }}
                          >
                            Cart
                          </Button>
                        </Card.Text>
                        {admin ? (
                          <Card.Text>
                            <Button
                              variant="outline-danger"
                              onClick={() => {
                                handleDelete(item._id);
                              }}
                            >
                              Delete
                            </Button>
                          </Card.Text>
                        ) : (
                          ""
                        )}
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
export default Show;
