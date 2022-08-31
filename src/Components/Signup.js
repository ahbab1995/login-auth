import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { auth } from "../firebase/Firebase.init";

const Signup = () => {

  const provider = new GoogleAuthProvider();

  const handlegoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  };
  return (
    <div className="py-4">
      <h2 className="text-center">Sign Up Form</h2>
      <div className="w-25 mx-auto">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="mt-3 d-flex justify-content-center">
          <Button onClick={handlegoogleAuth}> Continue with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
