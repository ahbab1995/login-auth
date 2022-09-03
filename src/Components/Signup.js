import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase.init";

const Signup = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  console.log(email);
  const handelEmail = (e) => {
    const emailInput = e.target.value;
    if (/\S+@\S+\.\S+/.test(emailInput)) {
      setEmail({ value: emailInput, error: "" });
    } else {
      setEmail({ value: "", error: "Please Provide a valid Email" });
    }
  };

  const handleSignupForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="py-4">
      <h2 className="text-center">Sign Up Form</h2>
      <div className="w-25 mx-auto">
        <Form onSubmit={handleSignupForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onBlur={handelEmail}
            />
            <Form.Text className="text-muted">
              {email?.error && <p>{email.error}</p>}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
        <div className="mt-3 d-flex justify-content-center">
          <Button onClick={handleGoogleAuth}> Continue with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
