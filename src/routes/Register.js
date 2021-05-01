import React, { useState, useRef, useContext } from "react";
import { Card, Button, Alert, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
//import './style.css'
import { AuthContext } from "../context/Context";

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const endpoint = new URL("http://131.181.190.87:3000/user/register");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      };
      let user = await fetch(endpoint, requestOptions);
      if (user.status === 201) {
        history.push("/login");
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="page-container">
      <Card>
        <Card.Body className="card">
          <h2 className="text-center mb-4">Register</h2>
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
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 link1">
        Have an Account ?{" "}
        <Link to="/login">
          <span className="reg">Login</span>
        </Link>
      </div>
    </div>
  );
}
