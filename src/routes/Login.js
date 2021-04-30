import React, { useState, useRef } from "react";
import CenteredContainer from "../components/CenteredContainer";
import { Card, Button, Alert, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import img from "../assets/img.jpg";


export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      console.log(emailRef.current.value);
      console.log(passwordRef.current.value);
      let user; // await API
      // if (user.token != null) {
      //     history.push('/')
      // }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <img src={img} alt="happy" width="100%" className="img" />
      <CenteredContainer>
        <Card>
          <Card.Body className="card">
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label> password </Form.Label>
                <Form.Control type="password" required ref={passwordRef} />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2 link1">
          Need An Account ?{" "}
          <Link to="/register">
            <span className="reg">Register</span>
          </Link>
        </div>
      </CenteredContainer>
    </>
  );
}
